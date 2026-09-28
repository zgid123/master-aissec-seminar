from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from dlp_demo.audit import JsonlAuditLog  # noqa: E402
from dlp_demo.gateway import ExportGateway  # noqa: E402
from dlp_demo.models import ExportRequest  # noqa: E402
from dlp_demo.policy import PolicyEngine  # noqa: E402
from dlp_demo.spark import create_spark  # noqa: E402


def main() -> None:
    spark = create_spark("dlp-seminar-scenarios")
    gateway = ExportGateway(
        PolicyEngine(ROOT / "policies/export-policy.yaml"),
        JsonlAuditLog(ROOT / "audit/events.jsonl"),
        ROOT / "data/destinations",
    )
    gateway.clear_destinations()

    scenarios = (
        ("customer_segments", "external_drive"),
        ("customer_segments", "internal_analytics"),
        ("segment_summary", "external_drive"),
    )

    try:
        for dataset, destination in scenarios:
            dataframe = spark.read.parquet(str(ROOT / f"data/derived/{dataset}"))
            result = gateway.export(
                dataframe,
                ExportRequest(
                    actor="phong",
                    actor_role="data_analyst",
                    action="export",
                    dataset=dataset,
                    destination=destination,
                ),
            )
            print(json.dumps(result.to_dict(), ensure_ascii=False, indent=2))
    finally:
        spark.stop()


if __name__ == "__main__":
    main()
