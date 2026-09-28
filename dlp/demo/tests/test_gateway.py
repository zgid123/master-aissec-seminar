import json
from pathlib import Path

from dlp_demo.audit import JsonlAuditLog
from dlp_demo.gateway import ExportGateway
from dlp_demo.models import ExportRequest
from dlp_demo.policy import PolicyEngine


ROOT = Path(__file__).resolve().parents[1]


def make_request(destination: str) -> ExportRequest:
    return ExportRequest(
        actor="phong",
        actor_role="data_analyst",
        action="export",
        dataset="customer_segments",
        destination=destination,
    )


def test_same_sensitive_dataset_is_allowed_or_blocked_by_destination(spark, tmp_path):
    dataframe = spark.createDataFrame(
        [("CUS-0001", "alice@example.test", "0912345678", "gold")],
        ["customer_id", "email", "phone", "segment"],
    )
    audit_path = tmp_path / "audit/events.jsonl"
    destination_root = tmp_path / "destinations"
    gateway = ExportGateway(
        PolicyEngine(ROOT / "policies/export-policy.yaml"),
        JsonlAuditLog(audit_path),
        destination_root,
    )

    allowed = gateway.export(dataframe, make_request("internal_analytics"))
    blocked = gateway.export(dataframe, make_request("external_drive"))

    assert allowed.policy.decision == "ALLOW"
    assert allowed.output_files > 0
    assert allowed.bytes_released > 0
    assert Path(allowed.output_path).exists()

    assert blocked.policy.decision == "BLOCK"
    assert blocked.output_path is None
    assert blocked.output_files == 0
    assert blocked.bytes_released == 0
    assert not (destination_root / "external_drive").exists()

    events = [json.loads(line) for line in audit_path.read_text().splitlines()]
    assert [event["policy"]["decision"] for event in events] == ["ALLOW", "BLOCK"]

