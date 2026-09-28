from __future__ import annotations

from dataclasses import dataclass
from hashlib import sha256
from time import perf_counter

from pyspark.sql import DataFrame, functions as F
from pyspark.sql.types import StringType

from .models import Finding, ScanReport
from .context_model import TinyContextClassifier


@dataclass(frozen=True)
class ContentDetector:
    name: str
    pattern: str
    label: str


CONTENT_DETECTORS = (
    ContentDetector(
        "email-pattern",
        r"(?i)^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$",
        "CONTACT_INFORMATION",
    ),
    ContentDetector(
        "vn-phone-pattern",
        r"^(?:\+84|0)(?:3|5|7|8|9)[0-9]{8}$",
        "CONTACT_INFORMATION",
    ),
    ContentDetector("vn-national-id-pattern", r"^[0-9]{12}$", "DIRECT_IDENTIFIER"),
)

SCHEMA_LABELS = {
    "customer_id": "DIRECT_IDENTIFIER",
    "national_id": "DIRECT_IDENTIFIER",
    "email": "CONTACT_INFORMATION",
    "phone": "CONTACT_INFORMATION",
    "full_name": "PERSONAL_INFORMATION",
}

PROTECTED_FINGERPRINTS = {
    sha256("AURORA-2026".encode()).hexdigest(): "CONFIDENTIAL_CAMPAIGN"
}

CONTEXT_COLUMNS = ("support_note", "case_note", "description")


def scan_dataframe(dataframe: DataFrame, dataset: str) -> ScanReport:
    """Scan a materialized DataFrame with schema and deterministic content rules."""
    started = perf_counter()
    row_count = dataframe.count()
    string_columns = [
        field.name for field in dataframe.schema.fields if isinstance(field.dataType, StringType)
    ]

    expressions = []
    metadata: list[tuple[str, str, str, str]] = []

    for column, label in SCHEMA_LABELS.items():
        if column in dataframe.columns:
            alias = f"schema__{column}"
            expressions.append(F.count(F.col(column)).alias(alias))
            metadata.append((alias, f"sensitive-column:{column}", column, label))

    for column in string_columns:
        for detector in CONTENT_DETECTORS:
            alias = f"content__{column}__{detector.name}"
            expressions.append(
                F.sum(F.when(F.col(column).rlike(detector.pattern), 1).otherwise(0)).alias(alias)
            )
            metadata.append((alias, detector.name, column, detector.label))

        if column == "campaign_code":
            for fingerprint, label in PROTECTED_FINGERPRINTS.items():
                alias = f"fingerprint__{column}__{fingerprint[:8]}"
                expressions.append(
                    F.sum(
                        F.when(F.sha2(F.trim(F.col(column)), 256) == fingerprint, 1).otherwise(0)
                    ).alias(alias)
                )
                metadata.append((alias, "registered-fingerprint", column, label))

    metrics = dataframe.agg(*expressions).first().asDict() if expressions else {}
    findings: list[Finding] = []
    labels: set[str] = set()

    for alias, detector, column, label in metadata:
        matches = int(metrics.get(alias) or 0)
        if matches == 0:
            continue
        if alias.startswith("schema__"):
            method = "schema"
        elif alias.startswith("fingerprint__"):
            method = "fingerprint"
        else:
            method = "pattern"
        evidence = "SHA-256 match with protected reference" if method == "fingerprint" else ""
        findings.append(Finding(detector, column, method, label, matches, evidence=evidence))
        labels.add(label)

    classifier = TinyContextClassifier()
    for column in CONTEXT_COLUMNS:
        if column not in dataframe.columns:
            continue
        distinct_values = [
            row[column]
            for row in dataframe.select(column).where(F.col(column).isNotNull()).distinct().collect()
        ]
        predictions = [(value, classifier.predict(value)) for value in distinct_values]
        sensitive_values = [value for value, prediction in predictions if prediction.sensitive]
        if not sensitive_values:
            continue
        matches = dataframe.where(F.col(column).isin(sensitive_values)).count()
        findings.append(
            Finding(
                detector="tiny-nb-context-model",
                column=column,
                method="context-ml",
                label="HEALTH_INFORMATION",
                matches=matches,
                evidence="Synthetic Multinomial Naive Bayes demonstration",
            )
        )
        labels.add("HEALTH_INFORMATION")

    if labels.intersection({"DIRECT_IDENTIFIER", "CONTACT_INFORMATION", "PERSONAL_INFORMATION"}):
        labels.add("PII")

    if labels:
        labels.add("SENSITIVE")

    return ScanReport(
        dataset=dataset,
        row_count=row_count,
        partition_count=dataframe.rdd.getNumPartitions(),
        labels=tuple(sorted(labels)),
        findings=tuple(findings),
        scan_time_ms=round((perf_counter() - started) * 1000, 2),
    )
