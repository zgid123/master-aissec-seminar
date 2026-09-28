from __future__ import annotations

import argparse
import json
import statistics
import sys
from pathlib import Path

from pyspark.sql import functions as F

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from dlp_demo.scanner import scan_dataframe  # noqa: E402
from dlp_demo.spark import create_spark  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(description="Benchmark deterministic DLP scanning")
    parser.add_argument("--sizes", type=int, nargs="+", default=[100_000, 1_000_000])
    parser.add_argument("--trials", type=int, default=3)
    parser.add_argument("--output", type=Path, default=ROOT / "benchmarks/latest.json")
    args = parser.parse_args()

    spark = create_spark("dlp-scanner-benchmark")
    results = []
    try:
        # Exclude one-time JVM and Spark SQL initialization from the reported trials.
        spark.range(1).count()
        for size in args.sizes:
            suffix = F.lpad(F.col("id").cast("string"), 8, "0")
            dataframe = spark.range(size, numPartitions=8).select(
                F.concat(F.lit("CUS-"), suffix).alias("customer_id"),
                F.concat(F.lit("customer"), F.col("id"), F.lit("@example.test")).alias(
                    "email"
                ),
                F.concat(F.lit("09"), suffix).alias("phone"),
                (F.col("id") % 100_000).alias("spend"),
            )
            trial_times = [
                scan_dataframe(dataframe, f"benchmark-{size}").scan_time_ms
                for _ in range(args.trials)
            ]
            result = {
                "rows": size,
                "partitions": dataframe.rdd.getNumPartitions(),
                "trials_ms": trial_times,
                "median_scan_ms": round(statistics.median(trial_times), 2),
                "min_scan_ms": round(min(trial_times), 2),
                "max_scan_ms": round(max(trial_times), 2),
            }
            results.append(result)
            print(
                f"{size:,} rows: median {result['median_scan_ms']:,.2f} ms "
                f"over {args.trials} trials"
            )
    finally:
        spark.stop()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"Wrote benchmark results to {args.output}")


if __name__ == "__main__":
    main()
