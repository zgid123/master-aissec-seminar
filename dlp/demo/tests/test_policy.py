from pathlib import Path

from dlp_demo.models import ExportRequest, ScanReport
from dlp_demo.policy import PolicyEngine


ROOT = Path(__file__).resolve().parents[1]


def report(*labels: str) -> ScanReport:
    return ScanReport("test", 1, 1, tuple(labels), (), 1.0)


def request(destination: str, role: str = "data_analyst") -> ExportRequest:
    return ExportRequest("tester", role, "export", "test", destination)


def test_sensitive_internal_export_is_allowed():
    decision = PolicyEngine(ROOT / "policies/export-policy.yaml").evaluate(
        request("internal_analytics"), report("PII")
    )
    assert decision.decision == "ALLOW"
    assert decision.policy_id == "ALLOW-APPROVED-INTERNAL"


def test_sensitive_external_export_is_blocked():
    decision = PolicyEngine(ROOT / "policies/export-policy.yaml").evaluate(
        request("external_drive"), report("PII")
    )
    assert decision.decision == "BLOCK"
    assert decision.policy_id == "BLOCK-PII-EXTERNAL"


def test_unknown_destination_fails_closed():
    decision = PolicyEngine(ROOT / "policies/export-policy.yaml").evaluate(
        request("personal_cloud"), report()
    )
    assert decision.decision == "BLOCK"
    assert decision.policy_id == "DEFAULT-DENY"


def test_contractor_cannot_export_pii_internally():
    decision = PolicyEngine(ROOT / "policies/export-policy.yaml").evaluate(
        request("internal_analytics", "external_contractor"), report("PII")
    )
    assert decision.decision == "BLOCK"
    assert decision.policy_id == "BLOCK-CONTRACTOR-PII"

