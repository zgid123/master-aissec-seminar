---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Các kỹ thuật masking phổ biến

<QuadHub title="4 kỹ thuật" subtitle="Data Masking" class="h-[380px]">
  <QuadHubCallout color="#38bfc8" icon="i-lucide-eye-off">
    <QuadHubHeading>
      Che toàn bộ
      <span class="block text-[18px]">(Full Masking)</span>
    </QuadHubHeading>
    <QuadHubContent>
      Thay toàn bộ bằng giá trị mặc định cùng kiểu.
      <br>
      <code class="text-[12px]!">50,000,000 → 0</code>
    </QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#62b6a8" icon="i-lucide-scan-text">
    <QuadHubHeading>
      Che một phần
      <span class="block text-[18px]">(Partial Masking)</span>
    </QuadHubHeading>
    <QuadHubContent>
      Giữ lại phần tối thiểu để nhận diện.
      <br>
      <code class="text-[12px]!">0901234567 → ******4567</code>
    </QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#e9717a" icon="i-lucide-circle-slash-2">
    <QuadHubHeading>
      Làm rỗng
      <span class="block text-[18px]">(Nullification)</span>
    </QuadHubHeading>
    <QuadHubContent>
      Không cung cấp giá trị cho consumer.
      <br>
      <code class="text-[12px]!">alice@gmail.com → NULL</code>
    </QuadHubContent>
  </QuadHubCallout>
  <QuadHubCallout color="#f29e4b" icon="i-lucide-fingerprint">
    <QuadHubHeading>
      Giả danh hóa
      <span class="block text-[18px]">(Pseudonymization)</span>
    </QuadHubHeading>
    <QuadHubContent>
      Thay định danh thật bằng một bí danh.
      <br>
      <code class="text-[12px]!">alice@gmail.com → customer_7F2A</code>
    </QuadHubContent>
  </QuadHubCallout>
</QuadHub>

<!--
Chọn kỹ thuật dựa trên mục đích sử dụng và kiểu dữ liệu cần trả về.

**Che toàn bộ** thay giá trị thật bằng một giá trị mặc định cùng kiểu. Với số, output có thể là 0 thay vì một chuỗi dấu sao.

**Che một phần** giữ lại phần tối thiểu để người dùng nhận diện hoặc đối soát dữ liệu.

**Làm rỗng** trả về NULL khi consumer không cần nhận giá trị và có thể xử lý dữ liệu thiếu.

**Giả danh hóa** thay định danh thật bằng một bí danh nhất quán. Substitution, hashing hoặc tokenization có thể được dùng để tạo bí danh, tùy cách triển khai và khả năng liên kết lại với dữ liệu gốc.
-->
