from dlp_demo.scanner import scan_dataframe


def test_scanner_reclassifies_the_derived_dataset(spark):
    dataframe = spark.createDataFrame(
        [
            ("CUS-0001", "alice@example.test", "0912345678", "gold", 1000.0),
            ("CUS-0002", "bob@example.test", "0987654321", "silver", 500.0),
        ],
        ["customer_id", "email", "phone", "segment", "spend"],
    )

    report = scan_dataframe(dataframe, "customer_segments")

    assert report.row_count == 2
    assert "PII" in report.labels
    assert "DIRECT_IDENTIFIER" in report.labels
    assert "CONTACT_INFORMATION" in report.labels
    assert any(finding.detector == "email-pattern" for finding in report.findings)


def test_aggregate_dataset_has_no_sensitive_label(spark):
    dataframe = spark.createDataFrame(
        [("HCM", "gold", 20, 1000.0)],
        ["region", "segment", "customer_count", "average_spend"],
    )

    report = scan_dataframe(dataframe, "segment_summary")

    assert report.labels == ()
    assert report.findings == ()


def test_scanner_combines_pattern_fingerprint_and_context_ml(spark):
    dataframe = spark.createDataFrame(
        [
            (
                "CUS-0001",
                "alice@example.test",
                "AURORA-2026",
                "Khách hàng đang điều trị HIV và cần tư vấn bảo hiểm.",
            ),
            (
                "CUS-0002",
                "bob@example.test",
                "PUBLIC-CAMPAIGN",
                "Khách hàng hỏi về chương trình tích điểm.",
            ),
        ],
        ["customer_id", "email", "campaign_code", "support_note"],
    )

    report = scan_dataframe(dataframe, "customer_segments")

    methods = {finding.method for finding in report.findings}
    assert {"pattern", "fingerprint", "context-ml"}.issubset(methods)
    assert "CONFIDENTIAL_CAMPAIGN" in report.labels
    assert "HEALTH_INFORMATION" in report.labels
