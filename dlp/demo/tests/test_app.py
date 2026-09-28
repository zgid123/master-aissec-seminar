from pathlib import Path

from streamlit.testing.v1 import AppTest


ROOT = Path(__file__).resolve().parents[1]


def test_streamlit_app_renders_without_runtime_errors():
    app = AppTest.from_file(str(ROOT / "app.py"), default_timeout=15).run()

    assert not app.exception
    assert app.title[0].value == "DLP trên đường xuất dữ liệu"
    assert app.button[0].label == "Kiểm tra và gửi dữ liệu"
    assert len(app.radio) == 1
    assert len(app.selectbox) == 1
