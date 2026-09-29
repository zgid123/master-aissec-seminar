<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import DataBaseIcon from '~icons/carbon/data-base'
import DataCenterIcon from '~icons/carbon/data-center'
import FlowIcon from '~icons/carbon/flow'
import DataStructuredIcon from '~icons/carbon/data-structured'
import ShareIcon from '~icons/carbon/share'

const { $clicks } = useSlideContext()

const stages = [
  { label: 'Nguồn dữ liệu', icon: DataBaseIcon, tone: 'neutral', step: 0 },
  { label: 'Lưu trữ', icon: DataCenterIcon, tone: 'amber', badge: 'A', step: 2 },
  { label: 'Xử lý và biến đổi', icon: FlowIcon, tone: 'neutral', step: 0 },
  { label: 'Dữ liệu dẫn xuất', icon: DataStructuredIcon, tone: 'cyan', badge: 'B', step: 3 },
  { label: 'Chia sẻ hoặc xuất', icon: ShareIcon, tone: 'violet', badge: 'C', step: 4 },
] as const

const callouts = [
  {
    badge: 'A', tone: 'amber', step: 2, heading: 'Phát hiện và phân loại',
    description: 'Finding ghi bằng chứng; label gắn classification cho dữ liệu.',
    source: 'Liu et al. (2015) · quét quy mô lớn',
  },
  {
    badge: 'B', tone: 'cyan', step: 3, heading: 'Rà soát sau biến đổi',
    description: 'Lineage hỗ trợ truy vết; rà soát hoặc quét lại đầu ra khi cần.',
  },
  {
    badge: 'C', tone: 'violet', step: 4, heading: 'Đánh giá policy và enforcement',
    description: 'Xét label, người thực hiện, hành động và đích; điểm tích hợp áp dụng quyết định.',
    outcome: 'Cho phép · Cảnh báo · Chặn',
  },
] as const
</script>

<template>
  <div class="pipeline-with-callouts">
    <div class="stages" aria-label="Các giai đoạn của pipeline Big Data">
      <div
        v-for="(stage, index) in stages"
        :key="stage.label"
        class="stage"
        :class="`tone-${stage.step && $clicks >= stage.step ? stage.tone : 'neutral'}`"
      >
        <span v-if="stage.badge" class="badge stage-badge reveal" :class="{ revealed: $clicks >= stage.step }">{{ stage.badge }}</span>
        <component :is="stage.icon" class="stage-icon" aria-hidden="true" />
        <span class="stage-label">{{ stage.label }}</span>
        <span v-if="index < 4" class="flow-arrow" aria-hidden="true">→</span>
      </div>
    </div>

    <svg class="control-connectors" viewBox="0 0 1000 68" preserveAspectRatio="none" aria-hidden="true">
      <path class="amber-line reveal" :class="{ revealed: $clicks >= 2 }" d="M 300 0 V 26 L 166.67 54 V 68" />
      <path class="cyan-line reveal" :class="{ revealed: $clicks >= 3 }" d="M 700 0 V 26 L 500 54 V 68" />
      <path class="violet-line reveal" :class="{ revealed: $clicks >= 4 }" d="M 900 0 V 26 L 833.33 54 V 68" />
    </svg>

    <div class="callouts" aria-label="Các điểm kiểm soát DLP">
      <div
        v-for="callout in callouts"
        :key="callout.badge"
        class="callout"
        :class="`tone-${callout.tone}`"
        v-click="callout.step"
      >
        <div class="callout-heading">
          <span class="badge">{{ callout.badge }}</span>
          <strong>{{ callout.heading }}</strong>
        </div>
        <p>{{ callout.description }}</p>
        <small v-if="'source' in callout" class="callout-source">{{ callout.source }}</small>
        <div v-if="'outcome' in callout" class="outcome">{{ callout.outcome }}</div>
      </div>
    </div>
    <div class="pipeline-extras">
      <p class="qualification reveal" :class="{ revealed: $clicks >= 4 }">Chặn chỉ có hiệu lực tại đường đã tích hợp kiểm soát.</p>
      <p class="challenges reveal" :class="{ revealed: $clicks >= 4 }">Thách thức: quy mô lớn · đa định dạng · dữ liệu biến đổi · nhiều đường xuất.</p>
    </div>
  </div>
</template>

<style scoped>
.pipeline-with-callouts {
  width: 100%;
  margin-top: 14px;
  color: #18334f;
}

.stages {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 24px;
}

.stage {
  position: relative;
  height: 108px;
  border: 1px solid var(--border);
  border-radius: 13px;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  color: var(--ink);
  transition: border-color 250ms ease, background-color 250ms ease, color 250ms ease;
}

.tone-neutral { --surface: #f1f5f9; --border: #d5dee9; --ink: #18334f; --accent: #60758b; }
.tone-amber { --surface: #fffbeb; --border: #f2ca72; --ink: #92400e; --accent: #d69216; }
.tone-cyan { --surface: #ecfeff; --border: #8bd9e4; --ink: #0e6175; --accent: #18a3b8; }
.tone-violet { --surface: #f5f3ff; --border: #c7b9f3; --ink: #5b3aa2; --accent: #8762d3; }

.stage-icon { width: 25px; height: 25px; color: var(--accent); transition: color 250ms ease; }
.stage-label { padding: 0 5px; font-size: 13px; font-weight: 700; line-height: 1.18; transition: color 250ms ease; }

.badge {
  display: inline-flex;
  width: 23px;
  height: 23px;
  flex: 0 0 23px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
}

.stage-badge { position: absolute; top: 6px; right: 7px; width: 20px; height: 20px; font-size: 11px; }
.flow-arrow {
  position: absolute;
  left: calc(100% + 3px);
  top: 50%;
  width: 18px;
  transform: translateY(-50%);
  color: #74869a;
  font-size: 21px;
  font-weight: 400;
  line-height: 1;
}

.control-connectors { display: block; width: 100%; height: 68px; overflow: visible; }
.control-connectors path { fill: none; stroke-width: 1.6; vector-effect: non-scaling-stroke; }
.reveal { opacity: 0; pointer-events: none; transition: opacity 250ms ease; }
.reveal.revealed { opacity: 1; pointer-events: auto; }
.amber-line { stroke: #d69216; }
.cyan-line { stroke: #18a3b8; }
.violet-line { stroke: #8762d3; }

.callouts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.callout {
  min-height: 148px;
  padding: 15px 17px 13px;
  border: 1px solid var(--border);
  border-radius: 13px;
  background: var(--surface);
  color: var(--ink);
  transition: opacity 250ms ease;
}
.callout-heading { display: flex; align-items: center; gap: 9px; font-size: 15px; line-height: 1.2; }
.callout p { margin: 10px 0 0; font-size: 14px; line-height: 1.35; color: #334b63; }
.outcome { margin-top: 9px; color: var(--ink); font-size: 12px; font-weight: 700; }
.pipeline-extras { min-height: 55px; margin-top: 11px; text-align: center; }
.pipeline-extras p { margin: 0; line-height: 1.35; }
.qualification { color: #5b3aa2; font-size: 13px; font-weight: 700; }
.challenges { display: inline-block; margin-top: 5px !important; padding: 5px 12px; border-radius: 6px; background: #eef2f7; color: #334b63; font-size: 13px; }
.callout-source { display: block; margin-top: 7px; color: #64788c; font-size: 10px; font-weight: 650; line-height: 1.2; }
@media (prefers-reduced-motion: reduce) {
  .stage, .stage-icon, .stage-label, .callout, .reveal { transition: none; }
}
</style>
