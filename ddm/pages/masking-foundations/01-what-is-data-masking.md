---
layout: shifting-intro
hideInToc: true
transition: slide-left
---

# Data Masking là gì?

Data Masking là quá trình <mark>thay thế hoặc biến đổi dữ liệu nhạy cảm</mark> thành một giá trị khác để giảm khả năng nhận biết dữ liệu thật, nhưng vẫn giữ đủ cấu trúc/tính hữu dụng cho mục đích được phép.

<div v-click="2">
  <ArcArrowProcess
    :animation="false"
    :count="3"
    :height="340"
    class="mt-[-0.5rem] origin-top scale-[0.82]"
  >
    <ArcArrowProcessCallout
      color="#1599a2"
      :icon="false"
    >
      <ArcArrowProcessHeading>DỮ LIỆU NHẠY CẢM</ArcArrowProcessHeading>
      <ArcArrowProcessContent>
        <code class="block text-[1.05rem]">alice@gmail.com</code>
        <span v-click="3" class="mt-2 block">
          <b class="block">Che giá trị thật</b>
          <span class="block text-[14px] leading-[1.35] opacity-75">
            Giảm dữ liệu nhạy cảm được tiết lộ.
          </span>
        </span>
      </ArcArrowProcessContent>
    </ArcArrowProcessCallout>
    <ArcArrowProcessCallout
      color="#c58a00"
      :icon="false"
    >
      <ArcArrowProcessHeading>MASKING RULE</ArcArrowProcessHeading>
      <ArcArrowProcessContent>
        <span class="block text-[14px]">Giữ ký tự đầu và domain</span>
        <span v-click="3" class="mt-2 block">
          <b class="block">Dựa trên mục đích</b>
          <span class="block text-[14px] leading-[1.35] opacity-75">
            Cách che phụ thuộc vào dữ liệu được dùng để làm gì.
          </span>
        </span>
      </ArcArrowProcessContent>
    </ArcArrowProcessCallout>
    <ArcArrowProcessCallout
      color="#109b70"
      :icon="false"
    >
      <ArcArrowProcessHeading>MASKED VALUE</ArcArrowProcessHeading>
      <ArcArrowProcessContent>
        <code class="block text-[1.05rem]">a***@gmail.com</code>
        <span v-click="3" class="mt-2 block">
          <b class="block">Giữ tính hữu dụng</b>
          <span class="block text-[14px] leading-[1.35] opacity-75">
            Output vẫn phù hợp với nghiệp vụ hoặc hệ thống nhận.
          </span>
        </span>
      </ArcArrowProcessContent>
    </ArcArrowProcessCallout>
  </ArcArrowProcess>
</div>

<!--
Ở phần trước, chúng ta thấy rằng một người có thể truy cập hoàn toàn hợp lệ nhưng vẫn nhìn thấy nhiều dữ liệu hơn mức công việc yêu cầu. Đây là khoảng trống mà Data Masking cần giải quyết.

[CLICK] Data Masking thay đổi giá trị được hiển thị, thay vì trả nguyên dữ liệu nhạy cảm cho mọi người dùng. Mục tiêu là giảm khả năng nhận biết dữ liệu thật nhưng vẫn giữ đủ cấu trúc và tính hữu dụng cho công việc được phép.

[CLICK] Luồng trên slide minh họa một phép che đơn giản. Đầu vào là email thật `alice@gmail.com`. Quy tắc masking giữ lại ký tự đầu và phần domain, đồng thời thay phần còn lại bằng dấu sao. Kết quả trả về là `a***@gmail.com`.

[CLICK] Ba ý quan trọng

Thứ nhất, masking che bớt giá trị thật để giảm dữ liệu nhạy cảm được tiết lộ.

Thứ hai, kết quả vẫn giữ đủ cấu trúc để nhân viên nhận biết đây là một địa chỉ Gmail và đối chiếu đúng hồ sơ.

Cuối cùng, quy tắc che phải dựa trên mục đích sử dụng: nghiệp vụ cần phần nào thì chỉ giữ lại phần đó. Vì vậy, các loại dữ liệu và tình huống khác nhau sẽ cần những kỹ thuật masking khác nhau.

[Sources]
- https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking
- https://docs.oracle.com/en/database/oracle/oracle-database/26/dbred/overview-faqs.html
[/Sources]
-->
