Mình đề xuất chốt seminar thành **4 sections chính**, tương ứng luôn với **4 members**. Mỗi section có scope đủ rõ để từng người tự research và làm slides mà ít bị overlap.

# Table of Contents

### 01 — Database Security Overview

**Tổng quan về bảo mật cơ sở dữ liệu**

Mục tiêu của section này là tạo nền tảng: **DBMS đang phải bảo vệ những gì, trước những nguy cơ nào, và tại sao các cơ chế security truyền thống vẫn chưa giải quyết hoàn toàn việc lộ dữ liệu nhạy cảm.**

Nội dung nên tìm hiểu:

**Security principles**

* CIA Triad

  * Confidentiality
  * Integrity
  * Availability
* AAA

  * Authentication
  * Authorization
  * Accounting / Auditing

**Common Database Security Threats**

* SQL Injection
* Unauthorized Access
* Privilege Abuse / Excessive Privileges
* Insider Threats
* Misconfiguration
* Network Attacks
* Data Leakage / Data Exposure
* Data Loss / Ransomware

**Common Security Controls**

* Authentication
* Authorization / Access Control
* Encryption

  * Data at rest
  * Data in transit
* Network Security

  * TLS
  * Firewall
  * Network isolation
* Backup & Recovery
* Auditing & Monitoring
* Principle of Least Privilege

**Vấn đề dùng để dẫn sang Section 2**

Đây là phần quan trọng nhất của Section 1:

```text
User
 │
 ├── Authenticated ✓
 ├── Authorized ✓
 ├── Secure Connection ✓
 └── Database Encrypted ✓
          │
          ▼
       Query Data
          │
          ▼
Sensitive information is still visible
```

Ví dụ:

```text
Customer Support

Can access customer record ✓

But should they see:

Name          ✓
Order status  ✓
Email         ?
Phone         ?
Credit card   ✗
Salary        ✗
```

Câu hỏi chuyển section:

> **How can we allow users to access the data they need without exposing sensitive information they don't need to see?**

→ **Data Masking**

**Thời lượng:** ~2–2.5 phút
**Member 1**

---

# 02 — Data Masking Fundamentals

**Những khái niệm nền tảng về Data Masking**

Mục tiêu section này là trả lời:

> Data Masking là gì và tại sao nó giải quyết được vấn đề ở Section 1?

### Data Masking là gì?

Nên tìm hiểu:

* Definition
* Purpose
* Sensitive Data / PII
* Typical use cases

Ví dụ:

```text
Original:
john.doe@gmail.com

Masked:
j***@gmail.com
```

Các loại dữ liệu thường được mask:

* Email
* Phone number
* Credit card
* National ID
* Address
* Salary
* Medical information
* Financial information

### Why Data Masking?

Các mục tiêu chính:

* Reduce sensitive-data exposure
* Protect PII / confidential data
* Limit unnecessary visibility
* Support least privilege
* Safely expose data to developers, analysts, support staff...

---

### Static Data Masking vs Dynamic Data Masking

Đây là phần **bắt buộc**, vì seminar nói về **Dynamic Data Masking**.

**Static Data Masking**

```text
Production Data
      │
    Mask
      ▼
Masked Copy
      │
      ▼
Development / Testing
```

Dữ liệu được thay đổi trong một bản copy.

**Dynamic Data Masking**

```text
Original Data
      │
     Query
      │
      ▼
Masking Policy
   ┌───────┴───────┐
   ▼               ▼
Allowed        Restricted
   │               │
Original          Masked
```

Original data **không thay đổi**.

---

### Data Masking vs Encryption

Nên có comparison nhưng không dành quá nhiều thời gian.

|               | Data Masking                 | Encryption                      |
| ------------- | ---------------------------- | ------------------------------- |
| Goal          | Reduce exposure              | Protect confidentiality         |
| Output        | Readable but hidden/modified | Ciphertext                      |
| Original data | Usually remains usable       | Encoded                         |
| Reversible    | Usually not required         | Decryptable with key            |
| Main use      | Control visibility           | Protect stored/transmitted data |

Điểm cần nhấn mạnh:

> **Data Masking does not replace Encryption.**

Hai thứ giải quyết **hai vấn đề khác nhau**.

---

### Transition sang Section 3

Kết section bằng:

> Dynamic Data Masking sounds straightforward in a traditional database system. But how can we implement it in an embedded analytical database like DuckDB?

→ **Dynamic Data Masking in DuckDB**

**Thời lượng:** ~2.5–3 phút
**Member 2**

---

# 03 — Dynamic Data Masking in DuckDB

**Dynamic Data Masking trong DuckDB**

Đây là phần technical chính của seminar.

Mục tiêu:

> Tìm hiểu DuckDB hoạt động như thế nào và những cơ chế nào có thể được sử dụng để xây dựng Dynamic Data Masking.

---

### DuckDB Overview

Chỉ giới thiệu những gì **liên quan đến security/masking**, không cần biến thành “Introduction to DuckDB”.

Tìm hiểu:

* What is DuckDB?
* Embedded / in-process database
* OLAP / analytical database
* Serverless architecture
* How applications interact with DuckDB

Có thể so sánh:

```text
Traditional DBMS

Application
     │
   Network
     │
     ▼
Database Server
```

vs.

```text
DuckDB

Application Process
┌──────────────────────┐
│ Application          │
│                      │
│ DuckDB Engine        │
│                      │
│ database.duckdb      │
└──────────────────────┘
```

---

### DuckDB Security Model

Đây mới là điểm quan trọng.

Tìm hiểu:

* DuckDB chạy trong application process như thế nào
* User/role model của DuckDB
* Authentication / authorization situation
* Permissions của host process
* Security implications của embedded database architecture

Câu hỏi cần trả lời:

> **Does DuckDB have built-in Dynamic Data Masking?**

Nếu không, chúng ta cần xây nó bằng các primitives mà DuckDB cung cấp.

---

### Masking Techniques in DuckDB

Member này nên research các cách implement:

#### SQL Expressions

Ví dụ:

```sql
SELECT
    name,
    CONCAT(
        LEFT(email, 1),
        '***@',
        SPLIT_PART(email, '@', 2)
    ) AS email
FROM customers;
```

---

#### SQL Functions / String Functions

Tìm các function phù hợp để mask:

* substring
* regexp
* replace
* concat
* hash
* CASE
* ...

---

#### Macros

Ví dụ concept:

```sql
mask_email(email)
mask_phone(phone)
mask_salary(salary)
```

Mục tiêu là reusable masking logic.

---

#### Views

Ví dụ:

```text
customers
     │
     ├── original table
     │
     ▼
masked_customers
     │
     ▼
application
```

Research xem view có thể được sử dụng như abstraction layer thế nào.

---

### Dynamic / Context-aware Masking

Đây là phần quan trọng nhất của Section 3.

Concept:

```text
User / Application
        │
        ▼
 Access Context
        │
        ▼
     Query
        │
        ▼
 Masking Policy
   ┌────┴─────┐
   ▼          ▼
Privileged  Restricted
   │          │
Original    Masked
```

Tìm hiểu:

* Masking dựa trên role?
* Masking dựa trên application context?
* Masking policy nằm ở đâu?
* DuckDB xử lý phần nào?
* Application phải xử lý phần nào?

---

### Optional research

Nếu còn thời gian, member có thể tìm hiểu:

* DuckDB extensions liên quan đến anonymization/masking
* Quack / authentication / authorization
* Custom DuckDB extensions
* Hashing / anonymization approaches

Nhưng đây là **optional**, không nên chiếm phần chính.

---

### Transition sang Section 4

> We now understand how masking can be constructed in DuckDB. Let's see what this looks like with actual data.

→ Demo.

**Thời lượng:** ~3–3.5 phút
**Member 3**

---

# 04 — Demonstration & Discussion

**Demo và thảo luận**

Section cuối có nhiệm vụ chứng minh concept bằng ví dụ thực tế và chỉ ra những giới hạn.

---

## Demo Scenario

Nên chọn dataset cực đơn giản.

Ví dụ:

```text
customers

id
name
email
phone
credit_card
salary
```

Original:

```text
Alice Smith
alice@gmail.com
0901234567
4111 1111 1111 1234
50,000,000
```

---

### Masking Functions

Demo một vài loại:

```text
Email
alice@gmail.com
→ a***@gmail.com
```

```text
Phone
0901234567
→ ******4567
```

```text
Credit Card
4111 1111 1111 1234
→ **** **** **** 1234
```

```text
Salary
50,000,000
→ ********
```

Không nên demo quá nhiều transformation.

---

## Dynamic Masking Scenario

Demo 2 loại access.

### Privileged User

```text
Alice Smith
alice@gmail.com
0901234567
4111 1111 1111 1234
50,000,000
```

### Restricted User

```text
Alice Smith
a***@gmail.com
******4567
**** **** **** 1234
********
```

Điểm cần cho audience thấy:

```text
               SAME DATABASE

                     │
              SAME ORIGINAL DATA
                     │
                     ▼
               Access Context
                /          \
               /            \
              ▼              ▼
        Privileged       Restricted
              │              │
              ▼              ▼
         Original          Masked
```

Đây chính là phần thể hiện **Dynamic**.

---

## Limitations

Phần này rất quan trọng để seminar không biến thành:

> `substring()` = Dynamic Data Masking.

Member 4 nên research:

* DuckDB có native DDM hay không
* Macro có phải security boundary không?
* View có thể bị bypass không?
* Điều gì xảy ra nếu user có direct access vào original table?
* Authentication / authorization nằm ở đâu?
* Application-level security
* Role-based masking limitations
* Performance implications nếu có
* Masking không thay thế authorization/encryption

Core problem:

```text
Masking Logic
     ≠
Access Control
```

Có thể implement:

```text
mask_email(email)
```

nhưng câu hỏi security thật sự là:

```text
Who can call/query what?

Who decides whether mask_email()
should be applied?
```

---

## Conclusion

Chỉ cần **3 takeaways**.

### 1

> **Database security requires multiple layers of protection.**

### 2

> **Dynamic Data Masking limits sensitive-data exposure without modifying the original data.**

### 3

> **DuckDB provides building blocks for data masking, but true authorization-aware Dynamic Data Masking requires an appropriate access-control layer.**

**Thời lượng:** ~3–3.5 phút
**Member 4**

---

# Tổng thể seminar

Cuối cùng flow của toàn seminar sẽ rất rõ:

```text
01 — DATABASE SECURITY
        │
        │
        │ "We protected the database,
        │  but sensitive data can still
        │  be unnecessarily exposed."
        ▼
02 — DATA MASKING
        │
        │
        │ "Dynamic masking solves this
        │  without changing original data."
        ▼
03 — DYNAMIC DATA MASKING IN DUCKDB
        │
        │
        │ "How can DuckDB implement it?"
        ▼
04 — DEMONSTRATION & DISCUSSION
        │
        ▼
     TAKEAWAYS
```

## Table of Contents chính thức mình nghĩ nên chốt

> **01 — Database Security Overview**
> **02 — Data Masking Fundamentals**
> **03 — Dynamic Data Masking in DuckDB**
> **04 — Demonstration & Discussion**

Và scope từng member:

| Member | Section                        | Main question                                                                   |
| ------ | ------------------------------ | ------------------------------------------------------------------------------- |
| **1**  | Database Security Overview     | **Why is protecting a database not enough to prevent sensitive-data exposure?** |
| **2**  | Data Masking Fundamentals      | **What is Data Masking and how does Dynamic Masking differ?**                   |
| **3**  | Dynamic Data Masking in DuckDB | **How can Dynamic Data Masking be implemented with DuckDB?**                    |
| **4**  | Demonstration & Discussion     | **Does it actually work, and what are its limitations?**                        |

Mình nghĩ đây là outline đủ cụ thể để **4 người có thể tách ra research độc lập từ đây**, nhưng vẫn đảm bảo lúc ráp slide lại thành một câu chuyện duy nhất thay vì 4 bài presentation riêng lẻ.
