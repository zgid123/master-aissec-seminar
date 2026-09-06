---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Bốn mối đe dọa đối với DBMS

<div class="flex origin-top items-center justify-center h-[380px]" v-click="1">
  <QuadHub title="4 mối đe dọa DBMS">
    <QuadHubCallout color="#f29e4b" icon="i-lucide-terminal-square">
      <QuadHubHeading>SQL Injection · C/I</QuadHubHeading>
      <QuadHubContent>Input độc hại thay đổi câu SQL, dẫn đến đọc hoặc sửa dữ liệu trái phép.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout color="#a4cb81" icon="i-lucide-user-round-search">
      <QuadHubHeading>Insider Threat · C</QuadHubHeading>
      <QuadHubContent>Người nội bộ lạm dụng quyền hợp lệ để xem dữ liệu ngoài nhu cầu công việc.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout color="#62b6a8" icon="i-lucide-key-round">
      <QuadHubHeading>Privilege Abuse · C/I</QuadHubHeading>
      <QuadHubContent>Quyền được cấp rộng hơn nhiệm vụ, làm tăng thiệt hại khi xảy ra sai sót hoặc chiếm đoạt.</QuadHubContent>
    </QuadHubCallout>
    <QuadHubCallout color="#e9717a" icon="i-lucide-file-lock-2">
      <QuadHubHeading>Ransomware · I/A</QuadHubHeading>
      <QuadHubContent>Dữ liệu bị mã hóa hoặc phá hoại, khiến dịch vụ không thể tiếp tục hoạt động.</QuadHubContent>
    </QuadHubCallout>
  </QuadHub>
</div>

<!--
Sau khi xác định ba mục tiêu CIA, chúng ta dùng chúng để phân loại tác động của bốn mối đe dọa tiêu biểu. Một mối đe dọa có thể ảnh hưởng nhiều mục tiêu cùng lúc. Các ký hiệu C, I và A bên cạnh tên mối đe dọa cho biết mục tiêu bị ảnh hưởng.

[click]
**SQL Injection** có thể đọc dữ liệu trái phép, ảnh hưởng Confidentiality, hoặc sửa dữ liệu, ảnh hưởng Integrity.

**Insider Threat** làm lộ dữ liệu ngoài nhu cầu công việc, nên tác động chính là Confidentiality.

**Privilege Abuse** cho phép tài khoản xem hoặc thay đổi nhiều dữ liệu hơn cần thiết, nên ảnh hưởng Confidentiality và Integrity.

**Ransomware** thay đổi dữ liệu bằng cách mã hóa trái phép và làm dữ liệu không thể sử dụng, nên ảnh hưởng Integrity và Availability.
-->
