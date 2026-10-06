<script setup lang="ts">
import { computed, unref } from 'vue'
import { useSlideContext } from '@slidev/client'
import DataBaseIcon from '~icons/carbon/data-base'
import DataCenterIcon from '~icons/carbon/data-center'
import FlowIcon from '~icons/carbon/flow'
import DataStructuredIcon from '~icons/carbon/data-structured'
import ShareIcon from '~icons/carbon/share'

const { $clicks } = useSlideContext()

const stages = [
  {
    label: 'Tiếp nhận', icon: DataBaseIcon, tone: 'amber',
    problem: 'Nguồn có email/mã khách; báo cáo chỉ cần tổng hợp.',
    data: 'raw → kho hạn chế | bản giảm cột → xử lý',
    check: 'Detector tìm email/mã khách; policy xét mục đích và người nhận.',
    action: 'Job bỏ email ở bản xử lý; raw và bản chi tiết vẫn ở vùng hạn chế.',
    limit: 'Nhánh khác bỏ qua job không chịu kiểm soát này.',
  },
  {
    label: 'Lưu trữ', icon: DataCenterIcon, tone: 'cyan',
    problem: 'Email ở nhiều bảng; nhóm rộng vẫn có quyền đọc.',
    data: 'contacts(customer_id, email)',
    check: 'Scanner tìm email trong nội dung/schema và tạo finding.',
    action: 'Workflow chuyển finding để chủ kho rà soát và thu hẹp quyền đọc.',
    limit: 'Scan không chặn lượt đọc đã xảy ra trước khi quyền được sửa.',
  },
  {
    label: 'Xử lý / làm sạch', icon: FlowIcon, tone: 'violet',
    problem: 'Join hai nguồn trong kho hạn chế nối danh tính với giao dịch.',
    data: 'customer_id + email + giao dịch',
    check: 'Detector quét bản join trong vùng chờ; policy xét nhóm nhận báo cáo.',
    action: 'Orchestrator giữ bản join; job tổng hợp, bỏ khóa và kiểm tra lại trước công bố.',
    limit: 'Output mới phải được kiểm tra lại; lineage một mình không phân loại nó.',
  },
  {
    label: 'Phân tích / trực quan hóa', icon: DataStructuredIcon, tone: 'blue',
    problem: 'Drill-down lộ giao dịch chi tiết cho nhóm báo cáo rộng.',
    data: 'query + người xem + drill-down',
    check: 'Tích hợp DLP xét kết quả query, người xem và thao tác drill-down.',
    action: 'Query/app chỉ trả tổng hợp cho nhóm rộng; giữ hàng chi tiết cho nhóm được duyệt.',
    limit: 'Chỉ query và thao tác qua app đã tích hợp chịu kiểm soát.',
  },
  {
    label: 'Chia sẻ / export', icon: ShareIcon, tone: 'teal',
    problem: 'File khách hàng bị gửi tới email cá nhân.',
    data: 'file khách → email cá nhân',
    check: 'Gateway inline xét nội dung đọc được, người gửi, thao tác và đích.',
    action: 'Policy cấm đích cá nhân; gateway chặn lần gửi trước khi file rời hệ thống.',
    limit: 'Payload mã hóa hoặc đường bypass cần kiểm soát khác.',
  },
] as const

const activeIndex = computed(() => Math.min(Math.max(unref($clicks) - 1, -1), stages.length - 1))
const activeStage = computed(() => activeIndex.value >= 0 ? stages[activeIndex.value] : undefined)
</script>

<template>
  <div class="pipeline-with-callouts">
    <div class="stages" aria-label="Các giai đoạn của pipeline Big Data">
      <div
        v-for="(stage, index) in stages"
        :key="stage.label"
        class="stage"
        :class="[`tone-${activeIndex === index ? stage.tone : 'neutral'}`, { active: activeIndex === index }]"
      >
        <component :is="stage.icon" class="stage-icon" aria-hidden="true" />
        <span class="stage-label">{{ stage.label }}</span>
        <span v-if="index < stages.length - 1" class="flow-arrow" aria-hidden="true">→</span>
      </div>
    </div>

    <div v-if="activeStage" class="stage-detail" :class="`detail-${activeStage.tone}`" aria-live="polite">
      <div class="detail-heading"><component :is="activeStage.icon" aria-hidden="true" /><h2>{{ activeStage.label }}</h2></div>
      <div class="stage-story">
        <article class="story-problem"><small>TÌNH HUỐNG</small><p>{{ activeStage.problem }}</p><code>{{ activeStage.data }}</code></article>
        <article class="story-check"><small>DLP KIỂM TRA TẠI ĐÂU?</small><p>{{ activeStage.check }}</p></article>
        <article class="story-action"><small>THỰC THI / KẾT QUẢ</small><p>{{ activeStage.action }}</p></article>
      </div>
      <p class="stage-limit">{{ activeStage.limit }}</p>
    </div>
  </div>
</template>

<style scoped>
.pipeline-with-callouts { width: 100%; margin-top: 10px; color: #18334f; }
.stages { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 19px; }
.stage {
  position: relative; min-height: 68px; padding: 8px 7px; border: 1px solid var(--border); border-radius: 12px;
  background: var(--surface); color: var(--ink); display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 7px; text-align: center; transition: border-color 200ms ease, background-color 200ms ease, transform 200ms ease;
}
.stage.active { transform: translateY(-3px); box-shadow: 0 3px 12px #18334f18; }
.tone-neutral { --surface: #f1f5f9; --border: #d5dee9; --ink: #52677b; --accent: #8192a3; }
.tone-amber { --surface: #fffbeb; --border: #f2ca72; --ink: #92400e; --accent: #d69216; }
.tone-cyan { --surface: #ecfeff; --border: #8bd9e4; --ink: #0e6175; --accent: #18a3b8; }
.tone-violet { --surface: #f5f3ff; --border: #c7b9f3; --ink: #5b3aa2; --accent: #8762d3; }
.tone-blue { --surface: #eff6ff; --border: #a8c8f0; --ink: #1d4f91; --accent: #3977bf; }
.tone-teal { --surface: #ecfdf5; --border: #9addbd; --ink: #14634e; --accent: #18916e; }
.stage-icon { width: 21px; height: 21px; color: var(--accent); }
.stage-label { max-width: 150px; font-size: 14px; font-weight: 700; line-height: 1.15; }
.flow-arrow { position: absolute; left: calc(100% + 4px); top: 50%; width: 15px; transform: translateY(-50%); color: #74869a; font-size: 19px; line-height: 1; }
.stage-detail { height: 225px; box-sizing: border-box; margin-top: 12px; padding: 10px 18px; border: 1px solid var(--detail-border); border-left: 5px solid var(--detail-accent); border-radius: 11px; background: var(--detail-bg); color: #18334f; display: flex; flex-direction: column; }
.detail-amber { --detail-border: #f2ca72; --detail-accent: #d69216; --detail-bg: #fffcf1; }
.detail-cyan { --detail-border: #8bd9e4; --detail-accent: #18a3b8; --detail-bg: #f1fdfe; }
.detail-violet { --detail-border: #c7b9f3; --detail-accent: #8762d3; --detail-bg: #f8f6ff; }
.detail-blue { --detail-border: #a8c8f0; --detail-accent: #3977bf; --detail-bg: #f4f8fe; }
.detail-teal { --detail-border: #9addbd; --detail-accent: #18916e; --detail-bg: #f1fcf6; }
.detail-heading { display: flex; flex-shrink: 0; align-items: center; gap: 10px; margin-bottom: 8px; color: var(--detail-accent); }
.detail-heading svg { width: 25px; height: 25px; }
.detail-heading h2 { margin: 0; font-size: 21px; line-height: 1.1; }
.stage-story { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: minmax(0, 1fr); gap: 10px; }
.stage-story article { min-height: 0; height: 100%; box-sizing: border-box; padding: 8px 14px; border: 1px solid var(--detail-border); border-radius: 8px; background: #ffffffd9; }
.stage-story small { display: block; margin-bottom: 6px; color: var(--detail-accent); font-size: 12px; line-height: 1.2; font-weight: 800; }
.stage-story p { margin: 0; color: #243b55; font-size: 16px; line-height: 1.32; }
.stage-story code { display: block; margin-top: 8px; color: #52677b; font-size: 13px; line-height: 1.25; white-space: normal; overflow-wrap: anywhere; }
.story-check { border-top: 3px solid #18a3b8 !important; }
.story-action { border-top: 3px solid #18916e !important; }
.stage-limit { flex: 0 0 22px; box-sizing: border-box; margin: 7px 0 0; color: #52677b; font-size: 13px; line-height: 1.2; font-weight: 600; text-align: right; display: flex; align-items: center; justify-content: flex-end; }
@media (prefers-reduced-motion: reduce) { .stage { transition: none; } }
</style>
