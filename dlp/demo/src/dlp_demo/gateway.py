from __future__ import annotations

import shutil
from datetime import UTC, datetime
from pathlib import Path
from time import perf_counter
from uuid import uuid4

from pyspark import StorageLevel
from pyspark.sql import DataFrame

from .audit import JsonlAuditLog
from .models import ExportRequest, ExportResult
from .policy import PolicyEngine
from .scanner import scan_dataframe


class ExportGateway:
    """The controlled export path: scan, decide, then write only on ALLOW."""

    def __init__(
        self,
        policy_engine: PolicyEngine,
        audit_log: JsonlAuditLog,
        destination_root: Path | str,
    ):
        self.policy_engine = policy_engine
        self.audit_log = audit_log
        self.destination_root = Path(destination_root).resolve()

    def export(self, dataframe: DataFrame, request: ExportRequest) -> ExportResult:
        started = perf_counter()
        event_id = f"evt-{uuid4().hex[:12]}"
        dataframe.persist(StorageLevel.MEMORY_AND_DISK)

        try:
            scan = scan_dataframe(dataframe, request.dataset)
            decision = self.policy_engine.evaluate(request, scan)
            output_path: Path | None = None

            if decision.decision == "ALLOW":
                output_path = self._safe_output_path(request.destination, event_id)
                dataframe.write.mode("errorifexists").parquet(str(output_path))

            output_files, bytes_released = self._output_stats(output_path)
            result = ExportResult(
                event_id=event_id,
                request=request,
                scan=scan,
                policy=decision,
                output_path=str(output_path) if output_path else None,
                output_files=output_files,
                bytes_released=bytes_released,
                total_time_ms=round((perf_counter() - started) * 1000, 2),
            )
            event = result.to_dict()
            event["timestamp"] = datetime.now(UTC).isoformat()
            self.audit_log.append(event)
            return result
        finally:
            dataframe.unpersist()

    def clear_destinations(self) -> None:
        if self.destination_root.exists():
            shutil.rmtree(self.destination_root)
        self.destination_root.mkdir(parents=True, exist_ok=True)

    def _safe_output_path(self, destination: str, event_id: str) -> Path:
        if destination not in self.policy_engine.config.get("destinations", {}):
            raise ValueError(f"Unknown destination cannot be written: {destination}")
        target = (self.destination_root / destination / event_id).resolve()
        if self.destination_root not in target.parents:
            raise ValueError("Destination escaped the configured destination root")
        return target

    @staticmethod
    def _output_stats(path: Path | None) -> tuple[int, int]:
        if path is None or not path.exists():
            return 0, 0
        files = [item for item in path.rglob("*") if item.is_file()]
        return len(files), sum(item.stat().st_size for item in files)

