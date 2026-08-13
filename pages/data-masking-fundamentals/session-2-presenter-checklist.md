# Session 2 Presenter Checklist

## 1) Before presentation day

- Confirm final speaking order: Member 1 -> Member 2 -> Member 3 -> Member 4.
- Ask Member 1 to end with the exact problem question so your opening matches smoothly.
- Ask Member 3 for the exact first sentence of Section 3 to align your handoff tone.
- Rehearse your script twice with a timer.

## 2) Time budget (target 2.5 - 3 minutes)

- Slide 1: 55 - 65 seconds
- Slide 2: 55 - 65 seconds
- Slide 3: 35 - 45 seconds
- Transition slide: 20 - 30 seconds

If you are over time, shorten Slide 3 first.

## 3) On-stage delivery plan

- Opening line: "Từ vấn đề ở section 1, mình đi vào cách giảm lộ dữ liệu bằng Data Masking."
- Slide 1 emphasis: "Che phần nhạy cảm nhưng vẫn đủ dùng cho công việc."
- Slide 2 emphasis: "Static bảo vệ bản sao, Dynamic kiểm soát khả năng nhìn thấy."
- Slide 3 emphasis: "Masking không thay thế Encryption."
- Handoff line: "Mình xin mời bạn tiếp theo trình bày section 3: Dynamic Data Masking in DuckDB."

## 4) Likely questions and short answers

Q1. Why not only use encryption?
A1. Encryption protects storage and transport; masking controls what users can see in query results.

Q2. Why dynamic masking instead of static masking?
A2. Static is great for non-production copies; dynamic is for runtime visibility control on live original data.

Q3. Is masking enough for security?
A3. No. It must be combined with access control, encryption, and auditing.

Q4. Why choose DuckDB?
A4. It is easy to prototype in-process and has SQL building blocks to model masking behavior clearly.

## 5) Emergency fallback (90-second mode)

- Use file: session-2-speaker-script-90s.md
- Keep only one sentence per slide objective.
- Preserve the handoff sentence unchanged.
