from __future__ import annotations

from pathlib import Path
from time import perf_counter
from typing import Any

import yaml

from .models import ExportRequest, PolicyDecision, ScanReport


class PolicyEngine:
    def __init__(self, policy_path: Path | str):
        self.policy_path = Path(policy_path)
        with self.policy_path.open(encoding="utf-8") as stream:
            self.config: dict[str, Any] = yaml.safe_load(stream)

    def destination_trust(self, destination: str) -> str:
        destination_config = self.config.get("destinations", {}).get(destination, {})
        return str(destination_config.get("trust", "unknown"))

    def evaluate(self, request: ExportRequest, scan: ScanReport) -> PolicyDecision:
        started = perf_counter()
        trust = self.destination_trust(request.destination)
        labels = set(scan.labels)

        for rule in self.config.get("rules", []):
            if not self._matches(rule.get("when", {}), request, labels, trust):
                continue
            return PolicyDecision(
                decision=str(rule["decision"]).upper(),
                policy_id=str(rule["id"]),
                reason=str(rule["reason"]),
                destination_trust=trust,
                decision_time_ms=round((perf_counter() - started) * 1000, 3),
            )

        default = self.config.get("default", {})
        return PolicyDecision(
            decision=str(default.get("decision", "BLOCK")).upper(),
            policy_id=str(default.get("id", "DEFAULT-DENY")),
            reason=str(default.get("reason", "No allow rule matched; fail closed.")),
            destination_trust=trust,
            decision_time_ms=round((perf_counter() - started) * 1000, 3),
        )

    @staticmethod
    def _matches(
        conditions: dict[str, Any],
        request: ExportRequest,
        labels: set[str],
        destination_trust: str,
    ) -> bool:
        if conditions.get("actions") and request.action not in conditions["actions"]:
            return False
        if conditions.get("actor_roles"):
            roles = set(conditions["actor_roles"])
            if "*" not in roles and request.actor_role not in roles:
                return False
        if conditions.get("destination_trust"):
            if destination_trust not in conditions["destination_trust"]:
                return False
        if conditions.get("destinations") and request.destination not in conditions["destinations"]:
            return False
        if conditions.get("labels_any") and labels.isdisjoint(conditions["labels_any"]):
            return False
        if conditions.get("labels_none") and not labels.isdisjoint(conditions["labels_none"]):
            return False
        return True

