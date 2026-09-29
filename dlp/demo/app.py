from __future__ import annotations

import sys
from pathlib import Path

import pandas as pd
import streamlit as st

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / "src"))

from dlp_demo.audit import JsonlAuditLog  # noqa: E402
from dlp_demo.gateway import ExportGateway  # noqa: E402
from dlp_demo.models import ExportRequest  # noqa: E402
from dlp_demo.policy import PolicyEngine  # noqa: E402
from dlp_demo.spark import create_spark  # noqa: E402


st.set_page_config(page_title="Big Data DLP Demo", page_icon="🛡️", layout="wide")


@st.cache_resource
def spark_session():
    return create_spark("big-data-dlp-streamlit")


def gateway() -> ExportGateway:
    return ExportGateway(
        PolicyEngine(ROOT / "policies/export-policy.yaml"),
        JsonlAuditLog(ROOT / "audit/events.jsonl"),
        ROOT / "data/destinations",
    )


SCENARIOS = {
    "1 · Gửi dữ liệu chi tiết cho đối tác": {
        "dataset": "customer_segments",
        "destination": "external_drive",
        "question": "File này có chứa thứ mà đối tác không nên nhận hay không?",
    },
    "2 · Giữ dữ liệu chi tiết trong nội bộ": {
        "dataset": "customer_segments",
        "destination": "internal_analytics",
        "question": "Cùng một file, nhưng nơi nhận nằm trong vùng đã được duyệt.",
    },
    "3 · Chỉ gửi số liệu tổng hợp cho đối tác": {
        "dataset": "segment_summary",
        "destination": "external_drive",
        "question": "Đối tác chỉ cần số lượng khách theo phân khúc, không cần từng khách hàng.",
    },
}

SENSITIVE_COLUMNS = {"customer_id", "email", "phone", "campaign_code", "support_note"}


def load_preview(dataset: str) -> pd.DataFrame:
    return pd.read_csv(
        ROOT / "evidence" / f"{dataset}_sample.csv",
        dtype={"customer_id": "string", "email": "string", "phone": "string"},
    )


def highlight_sensitive(column: pd.Series) -> list[str]:
    color = "background-color: #ffe4e6; color: #9f1239; font-weight: 650"
    return [color if column.name in SENSITIVE_COLUMNS else "" for _ in column]


st.title("DLP trên đường xuất dữ liệu")
st.caption(
    "Một công ty bán lẻ cần gửi số liệu phân khúc khách hàng cho đối tác chạy chiến dịch."
)

with st.sidebar:
    st.header("Kịch bản")
    scenario_name = st.radio("Chọn case", list(SCENARIOS), label_visibility="collapsed")
    scenario = SCENARIOS[scenario_name]
    st.caption(scenario["question"])
    st.divider()
    actor = st.text_input("Người gửi", value="phong")
    role = st.selectbox("Vai trò", ["data_analyst", "manager", "external_contractor"])
    dataset = scenario["dataset"]
    destination = scenario["destination"]
    run_export = st.button("Kiểm tra và gửi dữ liệu", type="primary", width="stretch")

dataset_path = ROOT / "data/derived" / dataset
if not dataset_path.exists():
    st.warning(
        "Chưa có dữ liệu Parquet. Chạy `python jobs/generate_data.py`, sau đó "
        "`python jobs/build_datasets.py`."
    )

st.markdown("### 1. Dữ liệu đến từ đâu?")
system_context = pd.DataFrame(
    [
        ("Dữ liệu khách hàng", "Email, số điện thoại, giao dịch"),
        ("Chăm sóc khách hàng", "Ghi chú dạng văn bản tự do"),
        ("Dữ liệu chiến dịch", "Mã chiến dịch nội bộ"),
        ("Spark", "Ghép các nguồn và tạo bảng phân khúc"),
    ],
    columns=["Nguồn", "Nội dung"],
)
context_map, gap = st.columns([2, 1])
with context_map:
    st.dataframe(system_context, width="stretch", hide_index=True, height=178)
with gap:
    st.warning(
        "**Phong được phép đọc dữ liệu.**\n\n"
        "Nhưng quyền đọc không trả lời được câu hỏi: file kết quả có được gửi cho đối tác hay không?"
    )

st.markdown("### 2. Spark tạo ra file nào?")
data_flow = pd.DataFrame(
    [
        ("customers", "Dữ liệu gốc", "Thông tin khách hàng và giao dịch"),
        ("Spark job", "Xử lý", "Ghép ghi chú và mã chiến dịch"),
        (dataset, "Kết quả", "File chuẩn bị gửi đi"),
    ],
    columns=["Bảng hoặc bước", "Vai trò", "Nội dung"],
)
st.dataframe(data_flow, width="stretch", hide_index=True)

st.markdown("#### Bản dữ liệu chuẩn bị xuất")
preview_col, story_col = st.columns([2.2, 1])
with preview_col:
    preview = load_preview(dataset)
    st.dataframe(
        preview.style.apply(highlight_sensitive),
        width="stretch",
        hide_index=True,
        height=248,
    )
with story_col:
    if dataset == "customer_segments":
        st.error(
            "**File phân khúc vẫn còn dữ liệu nhạy cảm.**\n\n"
            "Ngoài email và số điện thoại, năm dòng còn mang mã chiến dịch nội bộ "
            "và ghi chú có thông tin sức khỏe."
        )
    else:
        st.success(
            "**Đây là phần đối tác thực sự cần.**\n\n"
            "Bảng chỉ còn vùng, phân khúc, số khách và mức chi tiêu trung bình."
        )
    st.caption("Các dòng mẫu được trích từ dữ liệu Parquet tổng hợp của demo.")

st.markdown("### 3. Ai đang gửi và gửi đi đâu?")
context = pd.DataFrame(
    [
        ("Người gửi", actor),
        ("Vai trò", role),
        ("Hành động", "export"),
        ("Bảng dữ liệu", dataset),
        ("Nơi nhận", destination),
        (
            "Mức tin cậy",
            "đã duyệt" if destination == "internal_analytics" else "chưa duyệt",
        ),
    ],
    columns=["Thuộc tính", "Giá trị"],
)
context_col, comparison_col = st.columns([1, 1.4])
with context_col:
    st.dataframe(context, width="stretch", hide_index=True, height=248)
with comparison_col:
    st.markdown("**Ba trường hợp cần so sánh**")
    comparison = pd.DataFrame(
        [
            ("Dữ liệu chi tiết", "Kho nội bộ", "Đã duyệt", "Cho phép"),
            ("Dữ liệu chi tiết", "Ổ đĩa ngoài", "Chưa duyệt", "Chặn"),
            ("Bảng tổng hợp", "Ổ đĩa ngoài", "Chưa duyệt", "Cho phép"),
        ],
        columns=["Dữ liệu", "Nơi nhận", "Mức tin cậy", "Kết quả"],
    )
    st.dataframe(comparison, width="stretch", hide_index=True)
    st.caption("Quyết định dựa trên cả nội dung file và nơi nhận.")

if run_export and dataset_path.exists():
    with st.status("DLP đang kiểm tra file", expanded=True) as status:
        st.write("Spark đọc các partition Parquet")
        dataframe = spark_session().read.parquet(str(dataset_path))
        st.write("Quét file bằng quy tắc định dạng, fingerprint và mô hình ngữ cảnh")
        st.write("Đối chiếu kết quả với người gửi, hành động và nơi nhận")
        result = gateway().export(
            dataframe,
            ExportRequest(
                actor=actor,
                actor_role=role,
                action="export",
                dataset=dataset,
                destination=destination,
            ),
        )
        status.update(
            label=(
                "DLP: CHO PHÉP" if result.policy.decision == "ALLOW" else "DLP: CHẶN"
            ),
            state="complete" if result.policy.decision == "ALLOW" else "error",
        )

    st.markdown("### 4. DLP tìm thấy gì?")
    first, second, third = st.columns(3)
    first.metric("Số dòng đã quét", f"{result.scan.row_count:,}")
    second.metric("Số partition", result.scan.partition_count)
    third.metric("Thời gian quét", f"{result.scan.scan_time_ms:,.0f} ms")
    findings = pd.DataFrame(
        [
            {
                "Cột": finding.column,
                "Bộ kiểm tra": finding.detector,
                "Cách phát hiện": finding.method,
                "Nhãn": finding.label,
                "Số khớp": finding.matches,
            }
            for finding in result.scan.findings
        ]
    )
    if findings.empty:
        st.success("Không phát hiện nội dung thuộc các nhóm nhạy cảm đã cấu hình.")
    else:
        st.dataframe(findings, width="stretch", hide_index=True)
    st.caption("Nhãn kết quả: " + (", ".join(result.scan.labels) or "không có nhãn nhạy cảm"))
    if any(finding.method == "context-ml" for finding in result.scan.findings):
        st.info(
            "**Mô hình ngữ cảnh giúp ở đâu?** Quy tắc định dạng không hiểu ý nghĩa của câu "
            "'đang mang thai và cần hỗ trợ giao hàng tại nhà'. Mô hình thử nghiệm nhận ra "
            "đây là thông tin sức khỏe. "
            "Mô hình này chỉ dùng để minh họa cách tích hợp và chưa đủ để triển khai thực tế."
        )

    st.markdown("### 5. Vì sao yêu cầu được cho phép hoặc bị chặn?")
    has_pii = "PII" in result.scan.labels
    trace = pd.DataFrame(
        [
            ("Hành động", result.request.action, "Loại thao tác"),
            ("Vai trò", result.request.actor_role, "Phạm vi được phép"),
            ("Nhãn nhạy cảm", "PII" if has_pii else "không có", "Kết quả quét"),
            ("Nơi nhận", result.policy.destination_trust, "Mức tin cậy"),
            ("Policy khớp", result.policy.policy_id, result.policy.decision),
        ],
        columns=["Đầu vào policy", "Giá trị", "Ý nghĩa"],
    )
    trace_col, decision_col = st.columns([1.6, 1])
    with trace_col:
        st.dataframe(trace, width="stretch", hide_index=True, height=213)
    with decision_col:
        if result.policy.decision == "ALLOW":
            st.success(f"# CHO PHÉP\n{result.policy.reason}")
        else:
            st.error(f"# CHẶN\n{result.policy.reason}")
        st.caption(f"Thời gian xét policy: {result.policy.decision_time_ms:.3f} ms")

    st.markdown("### 6. Kết quả tại nơi nhận")
    file_col, byte_col, audit_col = st.columns(3)
    file_col.metric("Số tệp tại nơi nhận", result.output_files)
    byte_col.metric("Số byte đã ghi", f"{result.bytes_released:,}")
    audit_col.metric("Mã sự kiện", result.event_id)
    if result.policy.decision == "BLOCK":
        st.error("Cổng xuất không gọi lệnh ghi. Nơi nhận có 0 tệp và 0 byte.")
        st.info(
            "Cách xử lý phù hợp hơn: không gửi từng dòng khách hàng. Hãy tạo `segment_summary`, "
            "quét lại và chỉ gửi đúng số liệu mà đối tác cần."
        )
    else:
        st.success(f"Dữ liệu đã được ghi tới `{result.output_path}`.")

st.divider()
st.subheader("Lịch sử xử lý")
events = JsonlAuditLog(ROOT / "audit/events.jsonl").recent(10)
if events:
    st.dataframe(
        [
            {
                "Thời gian": event["timestamp"][11:19],
                "Mã sự kiện": event["event_id"],
                "Bảng dữ liệu": event["request"]["dataset"],
                "Nơi nhận": event["request"]["destination"],
                "Quyết định": event["policy"]["decision"],
                "Policy": event["policy"]["policy_id"],
                "Số byte đã ghi": event["bytes_released"],
            }
            for event in events
        ],
        width="stretch",
        hide_index=True,
    )
else:
    st.caption("Chưa có sự kiện nào.")
