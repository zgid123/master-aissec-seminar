from __future__ import annotations

import os
import tempfile
from pathlib import Path

import pyspark
from pyspark.sql import SparkSession


def _configure_ascii_spark_home() -> None:
    """Keep Spark's JVM classpath valid when the project path contains Unicode marks."""
    package_home = Path(pyspark.__file__).resolve().parent
    try:
        str(package_home).encode("ascii")
        return
    except UnicodeEncodeError:
        pass

    link = Path(tempfile.gettempdir()) / f"dlp-pyspark-{pyspark.__version__}"
    if not link.exists():
        link.symlink_to(package_home, target_is_directory=True)
    os.environ["SPARK_HOME"] = str(link)


def create_spark(app_name: str = "big-data-dlp-demo") -> SparkSession:
    _configure_ascii_spark_home()
    os.environ.setdefault("SPARK_LOCAL_IP", "127.0.0.1")
    return (
        SparkSession.builder.appName(app_name)
        .master("local[*]")
        .config("spark.sql.shuffle.partitions", "8")
        .config("spark.ui.enabled", "false")
        .config("spark.ui.showConsoleProgress", "false")
        .config("spark.driver.bindAddress", "127.0.0.1")
        .getOrCreate()
    )
