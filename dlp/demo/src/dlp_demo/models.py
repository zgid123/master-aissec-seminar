from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any, Literal


Decision = Literal["ALLOW", "BLOCK"]


@dataclass(frozen=True)
class Finding:
    detector: str
    column: str
    method: str
    label: str
    matches: int
    evidence: str = ""


@dataclass(frozen=True)
class ScanReport:
    dataset: str
    row_count: int
    partition_count: int
    labels: tuple[str, ...]
    findings: tuple[Finding, ...]
    scan_time_ms: float

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class ExportRequest:
    actor: str
    actor_role: str
    action: str
    dataset: str
    destination: str


@dataclass(frozen=True)
class PolicyDecision:
    decision: Decision
    policy_id: str
    reason: str
    destination_trust: str
    decision_time_ms: float

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class ExportResult:
    event_id: str
    request: ExportRequest
    scan: ScanReport
    policy: PolicyDecision
    output_path: str | None
    output_files: int
    bytes_released: int
    total_time_ms: float

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)
