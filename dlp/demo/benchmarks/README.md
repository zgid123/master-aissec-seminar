# Recorded local results

These results were recorded on 2026-09-28 with PySpark 4.2.0 in `local[*]` mode. They demonstrate the evaluation workflow for the seminar prototype; they are not production or cluster benchmarks.

## Scanner microbenchmark

The benchmark warms up Spark, uses eight partitions, and reports the median of three trials.

| Rows | Median scan time |
| ---: | ---: |
| 100,000 | 294.23 ms |
| 1,000,000 | 338.05 ms |

Raw trials are stored in `latest.json`. The scanner operates on a generated Spark DataFrame, so these numbers exclude reading source Parquet and writing an allowed export.

## Detection fixture

The 12-row labeled fixture produced six true positives, one false positive, and one false negative:

| Metric | Result |
| --- | ---: |
| Precision | 0.8571 |
| Recall | 0.8571 |

The false positive is a generic 12-digit value that matches the simplified national-ID rule. The false negative is a deliberately short phone number. This fixture is intentionally small and exposes the limitations of deterministic patterns; it must not be presented as production accuracy.

## Enforcement integration run

With the expanded one-million-row `customer_segments` dataset recorded on 2026-09-28:

- unapproved `external_drive`: `BLOCK`, zero output files and zero released bytes; full scan 3,539.05 ms on the recorded run;
- approved `internal_analytics`: `ALLOW`, 18 output files and 19,589,777 bytes; full scan 2,438.33 ms on the recorded run;
- aggregate `segment_summary` to `external_drive`: `ALLOW`.

File counts and byte sizes may change across Spark or Parquet versions. The security invariant is that a blocked request releases zero files and zero bytes.
