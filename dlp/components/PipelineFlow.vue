<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  focus?: 'ingest' | 'lake' | 'process' | 'derived' | 'export' | 'none'
  outcome?: 'risk' | 'allow' | 'block' | 'neutral'
  compact?: boolean
  prominent?: boolean
  derivedTag?: string
}>(), {
  focus: 'none',
  outcome: 'neutral',
  compact: false,
  prominent: false,
  derivedTag: 'Chứa PII',
})

const scenarioStages = [
  { id: 'ingest', label: 'Thu thập', sub: 'customer.csv', icon: '↓' },
  { id: 'lake', label: 'Data Lake', sub: 'Lưu trữ gốc', icon: '▤' },
  { id: 'process', label: 'Xử lý', sub: 'Truy vấn / ETL', icon: '⚙' },
  { id: 'derived', label: 'Bản phân tích', sub: 'customer_segments', icon: '◇' },
  { id: 'export', label: 'Xuất dữ liệu', sub: 'Gửi ra ngoài', icon: '↗' },
] as const

const genericStages = [
  { id: 'ingest', label: 'Nguồn dữ liệu', sub: '', icon: '↓' },
  { id: 'lake', label: 'Lưu trữ', sub: '', icon: '▤' },
  { id: 'process', label: 'Xử lý và biến đổi', sub: '', icon: '⚙' },
  { id: 'derived', label: 'Dữ liệu dẫn xuất', sub: '', icon: '◇' },
  { id: 'export', label: 'Chia sẻ hoặc xuất', sub: '', icon: '↗' },
] as const

const stages = computed(() => props.generic ? genericStages : scenarioStages)
</script>

<template>
  <div class="pipeline" :class="[`outcome-${props.outcome}`, { compact: props.compact, prominent: props.prominent }]">
    <template v-for="(stage, index) in stages" :key="stage.id">
      <div
        class="stage"
        :class="{
          active: props.focus === stage.id,
          leak: stage.id === 'export' && props.outcome === 'risk',
        }"
      >
        <div class="stage-icon">{{ stage.icon }}</div>
        <div class="stage-label">{{ stage.label }}</div>
        <div class="stage-sub">{{ stage.sub }}</div>
        <div v-if="stage.id === 'derived' && props.derivedTag" class="tag">{{ props.derivedTag }}</div>
        <div v-if="stage.id === 'export' && props.outcome === 'block'" class="decision block">CHẶN</div>
        <div v-if="stage.id === 'export' && props.outcome === 'allow'" class="decision allow">CHO PHÉP</div>
        <div v-if="stage.id === 'export' && props.outcome === 'risk'" class="decision risk">RÒ RỈ</div>
      </div>
      <div v-if="index < stages.length - 1" class="connector" aria-hidden="true">
        <svg class="connector-arrow" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="6" x2="25" y2="6" stroke="#406783" stroke-width="2.5" stroke-linecap="round" />
          <path d="M19 2L26 6L19 10" stroke="#54809f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </template>
  </div>
</template>

<style scoped>
.pipeline {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 4px 0;
}
.stage {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 112px;
  border: 1px solid #31506e;
  border-radius: 14px;
  background: linear-gradient(145deg, #10243a, #0a1728);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px #02091480;
}
.stage.active {
  border-color: #44d7ff;
  box-shadow:
    0 0 0 2px #44d7ff40,
    0 0 28px #159bd455;
  transform: translateY(-3px);
}
.stage.leak {
  border-color: #ff657a;
  box-shadow: 0 0 26px #ff365155;
}
.stage-icon {
  font-size: 29px;
  line-height: 1;
  color: #7de2ff;
}
.stage-label {
  margin-top: 9px;
  color: #f1f7ff;
  font-size: 15px;
  font-weight: 700;
}
.stage-sub {
  color: #91a9bf;
  font-size: 10px;
  margin-top: 2px;
  white-space: nowrap;
}
.generic .stage-label {
  font-size: 12px;
  line-height: 1.15;
  text-align: center;
  padding: 0 4px;
}
.connector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  flex-shrink: 0;
}
.connector-arrow {
  width: 100%;
  height: 12px;
  display: block;
}
.tag {
  position: absolute;
  right: -5px;
  top: -9px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #f3b63f;
  color: #17202a;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: 0 2px 6px #00000040;
}
.decision {
  position: absolute;
  bottom: -13px;
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.08em;
}
.decision.block,
.decision.risk {
  color: #fff;
  background: #d93f57;
}
.decision.allow {
  color: #04251a;
  background: #49df9d;
}
.compact .stage {
  height: 88px;
}
.compact .stage-icon {
  font-size: 23px;
}
.compact .stage-label {
  margin-top: 5px;
  font-size: 14px;
}
.compact .stage-sub {
  font-size: 9px;
}
</style>

<style scoped>
.prominent .stage { height: 108px; }
.prominent .stage-icon { font-size: 27px; }
.prominent .stage-label { font-size: 18px; }
.prominent .stage-sub { font-size: 13px; color: #d5e1eb; }
.prominent .tag, .prominent .decision { font-size: 13px; }
</style>
