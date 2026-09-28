from __future__ import annotations

import argparse
import sys
from pathlib import Path

from pyspark.sql import functions as F

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from dlp_demo.spark import create_spark  # noqa: E402


def build(raw_path: Path, derived_root: Path) -> None:
    spark = create_spark("dlp-build-derived-datasets")
    try:
        customers = spark.read.parquet(str(raw_path))

        # Five customer records receive data from two additional sources. This makes the
        # demo's fingerprint and context findings a real join outcome, not a loose prop.
        sensitive_ids = [f"CUS-{index:08d}" for index in range(0, 1_000_000, 200_000)]
        campaign_assignments = spark.createDataFrame(
            [(customer_id, "AURORA-2026") for customer_id in sensitive_ids],
            ["customer_id", "campaign_code"],
        )
        support_notes = spark.createDataFrame(
            [
                (
                    customer_id,
                    "Khách hàng đang điều trị HIV và cần tư vấn bảo hiểm.",
                )
                for customer_id in sensitive_ids
            ],
            ["customer_id", "support_note"],
        )
        enriched = (
            customers.join(F.broadcast(campaign_assignments), "customer_id", "left")
            .join(F.broadcast(support_notes), "customer_id", "left")
            .fillna(
                {
                    "campaign_code": "PUBLIC-CAMPAIGN",
                    "support_note": "Khách hàng hỏi về chương trình tích điểm.",
                }
            )
        )

        # The analytical output intentionally retains sensitive fields from all sources.
        customer_segments = enriched.select(
            "customer_id",
            "email",
            "phone",
            "segment",
            "spend",
            "region",
            "campaign_code",
            "support_note",
        )
        customer_segments.write.mode("overwrite").partitionBy("region").parquet(
            str(derived_root / "customer_segments")
        )

        # This control dataset removes identifiers and is safe for the optional third scenario.
        segment_summary = customers.groupBy("region", "segment").agg(
            F.count("*").alias("customer_count"),
            F.round(F.avg("spend"), 2).alias("average_spend"),
        )
        segment_summary.write.mode("overwrite").parquet(str(derived_root / "segment_summary"))

    finally:
        spark.stop()


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the sensitive and aggregate demo datasets")
    parser.add_argument("--raw", type=Path, default=ROOT / "data/raw/customers")
    parser.add_argument("--output", type=Path, default=ROOT / "data/derived")
    args = parser.parse_args()
    build(args.raw, args.output)
    print(f"Built customer_segments and segment_summary at {args.output}")


if __name__ == "__main__":
    main()
