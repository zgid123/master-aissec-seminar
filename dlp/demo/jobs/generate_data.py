from __future__ import annotations

import argparse
import sys
from pathlib import Path

from pyspark.sql import functions as F

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from dlp_demo.spark import create_spark  # noqa: E402


def generate(rows: int, partitions: int, output: Path) -> None:
    spark = create_spark("dlp-generate-synthetic-data")
    try:
        base = spark.range(rows, numPartitions=partitions)
        suffix = F.lpad(F.col("id").cast("string"), 8, "0")
        customers = base.select(
            F.concat(F.lit("CUS-"), suffix).alias("customer_id"),
            F.concat(F.lit("Customer "), F.col("id")).alias("full_name"),
            F.concat(F.lit("customer"), F.col("id"), F.lit("@example.test")).alias("email"),
            F.concat(F.lit("09"), suffix).alias("phone"),
            F.concat(F.lit("079"), F.lpad(F.col("id").cast("string"), 9, "0")).alias(
                "national_id"
            ),
            F.element_at(
                F.array(F.lit("HCM"), F.lit("HN"), F.lit("DN")),
                (F.col("id") % 3 + 1).cast("int"),
            ).alias("region"),
            F.element_at(
                F.array(F.lit("bronze"), F.lit("silver"), F.lit("gold")),
                (F.col("id") % 3 + 1).cast("int"),
            ).alias("segment"),
            (F.col("id") % 100_000).cast("double").alias("spend"),
        )
        customers.write.mode("overwrite").partitionBy("region").parquet(str(output))
    finally:
        spark.stop()


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate deterministic synthetic customer data")
    parser.add_argument("--rows", type=int, default=1_000_000)
    parser.add_argument("--partitions", type=int, default=8)
    parser.add_argument("--output", type=Path, default=ROOT / "data/raw/customers")
    args = parser.parse_args()
    generate(args.rows, args.partitions, args.output)
    print(f"Generated {args.rows:,} synthetic rows at {args.output}")


if __name__ == "__main__":
    main()

