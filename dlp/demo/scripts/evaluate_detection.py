from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from pyspark.sql import functions as F

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from dlp_demo.scanner import CONTENT_DETECTORS  # noqa: E402
from dlp_demo.spark import create_spark  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(description="Evaluate pattern detectors against ground truth")
    parser.add_argument(
        "--fixture",
        type=Path,
        default=ROOT / "tests/fixtures/detection_evaluation.csv",
    )
    parser.add_argument(
        "--output", type=Path, default=ROOT / "benchmarks/detection-evaluation.json"
    )
    args = parser.parse_args()

    spark = create_spark("dlp-detection-evaluation")
    try:
        fixture = spark.read.option("header", True).csv(str(args.fixture))
        totals = {"true_positive": 0, "false_positive": 0, "false_negative": 0}
        per_detector = []

        for detector in CONTENT_DETECTORS:
            predicted = F.col("text").rlike(detector.pattern)
            expected = F.col("expected_detector") == detector.name
            row = fixture.agg(
                F.sum(F.when(predicted & expected, 1).otherwise(0)).alias("true_positive"),
                F.sum(F.when(predicted & ~expected, 1).otherwise(0)).alias("false_positive"),
                F.sum(F.when(~predicted & expected, 1).otherwise(0)).alias("false_negative"),
            ).first()
            metrics = {key: int(row[key]) for key in totals}
            per_detector.append({"detector": detector.name, **metrics})
            for key, value in metrics.items():
                totals[key] += value

        denominator_precision = totals["true_positive"] + totals["false_positive"]
        denominator_recall = totals["true_positive"] + totals["false_negative"]
        result = {
            "fixture_rows": fixture.count(),
            **totals,
            "precision": round(totals["true_positive"] / denominator_precision, 4)
            if denominator_precision
            else 0.0,
            "recall": round(totals["true_positive"] / denominator_recall, 4)
            if denominator_recall
            else 0.0,
            "per_detector": per_detector,
        }
    finally:
        spark.stop()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(json.dumps(result, indent=2))
    print(f"Wrote detection evaluation to {args.output}")


if __name__ == "__main__":
    main()

