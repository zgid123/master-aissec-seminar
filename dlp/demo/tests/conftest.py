from __future__ import annotations

import pytest

from dlp_demo.spark import create_spark


@pytest.fixture(scope="session")
def spark():
    session = create_spark("dlp-demo-tests")
    yield session
    session.stop()

