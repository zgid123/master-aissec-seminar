from __future__ import annotations

import math
import re
from collections import Counter
from dataclasses import dataclass


TRAINING_SAMPLES = (
    ("khách hàng đang mang thai và cần hỗ trợ giao hàng tại nhà", 1),
    ("bệnh nhân có tiền sử ung thư và đang dùng thuốc", 1),
    ("hồ sơ ghi nhận chẩn đoán tiểu đường", 1),
    ("khách hàng khai báo tình trạng sức khỏe tâm thần", 1),
    ("kết quả xét nghiệm dương tính cần được bảo mật", 1),
    ("khách hàng hỏi về chương trình tích điểm", 0),
    ("yêu cầu cập nhật địa chỉ giao hàng", 0),
    ("phản hồi về thời gian giao đơn hàng", 0),
    ("khách hàng muốn đổi hạng thành viên", 0),
    ("hỏi thông tin khuyến mãi cuối tuần", 0),
)


def _tokens(text: str) -> list[str]:
    return re.findall(r"\w+", text.lower(), flags=re.UNICODE)


@dataclass(frozen=True)
class ContextPrediction:
    sensitive: bool
    probability: float


class TinyContextClassifier:
    """Small Multinomial Naive Bayes model for an offline seminar demonstration.

    The model is intentionally trained on a tiny synthetic fixture. It demonstrates
    where contextual ML fits in DLP, not production accuracy.
    """

    def __init__(self) -> None:
        self.class_documents = Counter(label for _, label in TRAINING_SAMPLES)
        self.word_counts = {0: Counter(), 1: Counter()}
        for text, label in TRAINING_SAMPLES:
            self.word_counts[label].update(_tokens(text))
        self.vocabulary = set(self.word_counts[0]) | set(self.word_counts[1])
        self.total_words = {label: sum(counts.values()) for label, counts in self.word_counts.items()}

    def predict(self, text: str) -> ContextPrediction:
        scores: dict[int, float] = {}
        total_docs = sum(self.class_documents.values())
        vocabulary_size = len(self.vocabulary)
        for label in (0, 1):
            score = math.log(self.class_documents[label] / total_docs)
            denominator = self.total_words[label] + vocabulary_size
            for token in _tokens(text):
                score += math.log((self.word_counts[label][token] + 1) / denominator)
            scores[label] = score

        maximum = max(scores.values())
        exp_sensitive = math.exp(scores[1] - maximum)
        exp_safe = math.exp(scores[0] - maximum)
        probability = exp_sensitive / (exp_sensitive + exp_safe)
        return ContextPrediction(sensitive=probability >= 0.65, probability=round(probability, 3))
