# Big Data Data Loss Prevention Demo

This runnable seminar demo follows a fictional retail-company dataset from a customer master through Spark transformation and an explicit export path. PySpark scans derived Parquet with schema/pattern rules, a registered fingerprint, and a small contextual ML classifier. Policy then evaluates the findings together with actor, action, and destination context. The gateway writes bytes only when policy returns `ALLOW`.

It implements the static `customer_segments` policy walkthrough in the slide deck as an executable, auditable experiment. All records are deterministic synthetic data.

## What the demo proves

The same sensitive dataset produces different outcomes when only the destination changes:

| Dataset | Destination | Expected decision | Enforcement evidence |
| --- | --- | --- | --- |
| `customer_segments` | `external_drive` | `BLOCK` | Destination receives zero files and zero bytes |
| `customer_segments` | `internal_analytics` | `ALLOW` | Parquet files are written |
| `segment_summary` | `external_drive` | `ALLOW` | Aggregate output contains no configured PII label |

The policy also uses actor role and action. An `external_contractor` cannot export identified customer data even to the approved internal destination. Unknown destinations fail closed.

## Architecture

```text
partitioned Parquet
        |
        v
Spark derived dataset
        |
        v
schema/pattern + fingerprint + context ML
        |
        v
sensitive-data labels
        |
        v
actor + action + destination policy
        |
        +---- ALLOW ---> write Parquet ---> audit
        |
        +---- BLOCK ---> release 0 bytes -> audit
```

The contextual classifier is a tiny Multinomial Naive Bayes model trained on synthetic Vietnamese phrases. It demonstrates where ML contributes a contextual label that regex cannot provide. It is not production training data, a production model, or evidence of production accuracy. The fingerprint detector compares SHA-256 values with a protected reference without storing that reference in plaintext in the detector configuration.

## Requirements

- Python 3.11+
- A Java runtime compatible with the installed PySpark release

## Setup

```bash
cd dlp/demo
python3 -m venv .venv
.venv/bin/pip install '.[dev]'
```

The non-editable install is intentional: some Java/Python build tools mishandle editable `.pth`
files when a workspace path contains decomposed Vietnamese Unicode characters. The application
and scripts still load the current `src/` tree directly.

## Prepare the synthetic data

The default command creates one million rows and writes region-partitioned Parquet:

```bash
.venv/bin/python jobs/generate_data.py
.venv/bin/python jobs/build_datasets.py
```

For a quick rehearsal dataset:

```bash
.venv/bin/python jobs/generate_data.py --rows 100000
.venv/bin/python jobs/build_datasets.py
```

## Run

Run all three scenarios from the terminal:

```bash
.venv/bin/python jobs/run_scenarios.py
```

Or use the seminar UI:

```bash
.venv/bin/streamlit run app.py
```

Open the UI and run case A once before the presentation. This warms up Spark and avoids spending live-demo time on JVM startup.
The UI presents the experiment as a story: an excerpt from the derived Parquet data, the export
context, detector findings, the matched policy, and the final destination state. Tracked excerpts
under `evidence/` come from the generated synthetic datasets and keep the opening screen available
before Spark starts.

## Verify

```bash
.venv/bin/pytest
.venv/bin/python scripts/benchmark.py --sizes 100000 1000000
.venv/bin/python scripts/evaluate_detection.py
```

The integration test verifies that the approved export creates files and that the blocked export creates no external destination, releases zero bytes, and records an audit event.
The benchmark warms up Spark and reports the median of three scans. Detection precision and
recall are calculated from the labeled fixture in `tests/fixtures/`; this small fixture verifies
the measurement path and is not evidence of production accuracy.

## Suggested presentation flow

1. Introduce the retail-company scenario, the Spark pipeline, the analyst's legitimate access, and the unapproved partner destination.
2. Show that the derived `customer_segments` dataset contains structured PII, a registered confidential campaign value, and a health disclosure in free text.
3. Run the external case. Compare what schema/regex, fingerprinting, and context ML each contribute.
4. Follow the policy trace to `BLOCK`, then show `destination_files = 0` and `bytes_released = 0`.
5. Run the same sensitive dataset to `internal_analytics` to show that policy uses destination context.
6. Select `segment_summary` and export externally. The partner receives only the aggregate it needs, not one row per customer.
7. Open the audit table and close with the trust-boundary limitations.

## Trust boundary

This is a prototype of application-enforced DLP at one controlled export gateway. It does not intercept direct filesystem access, arbitrary scripts, browser uploads, privileged routes, or other channels that bypass the gateway. Detection can produce false positives or false negatives, and production deployments need broader channel coverage, policy lifecycle management, authentication, authorization, and tamper-resistant audit storage.

DLP is one layer of defense in depth. It does not replace access control, encryption, backup, or disaster recovery.
