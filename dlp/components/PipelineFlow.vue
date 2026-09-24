<script setup lang="ts">
const props = withDefaults(defineProps<{
  focus?: 'ingest' | 'lake' | 'process' | 'derived' | 'export' | 'none'
  outcome?: 'risk' | 'allow' | 'block' | 'neutral'
  compact?: boolean
}>(), {
  focus: 'none',
  outcome: 'neutral',
  compact: false,
})

const stages = [
  { id: 'ingest', label: 'Thu thập', sub: 'customer.csv', icon: '↓' },
  { id: 'lake', label: 'Data lake', sub: 'dữ liệu gốc', icon: '▤' },
  { id: 'process', label: 'Xử lý', sub: 'công việc phân tích', icon: '⚙' },
  { id: 'derived', label: 'Dẫn xuất', sub: 'customer_segments', icon: '◇' },
  { id: 'export', label: 'Xuất dữ liệu', sub: 'đích đến?', icon: '↗' },
] as const
</script>

<template>
  <div class="pipeline" :class="[`outcome-${props.outcome}`, { compact: props.compact }]">
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
        <div v-if="stage.id === 'derived'" class="tag">Nhạy?</div>
        <div v-if="stage.id === 'export' && props.outcome === 'block'" class="decision block">CHẶN</div>
        <div v-if="stage.id === 'export' && props.outcome === 'allow'" class="decision allow">CHO PHÉP</div>
        <div v-if="stage.id === 'export' && props.outcome === 'risk'" class="decision risk">RÒ RỈ</div>
      </div>
      <div v-if="index < stages.length - 1" class="connector">
        <span></span><b>›</b>
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
  padding: 14px 0;
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
.connector {
  display: flex;
  align-items: center;
  width: 34px;
  color: #54809f;
}
.connector span {
  height: 2px;
  flex: 1;
  background: #406783;
}
.connector b {
  font-size: 25px;
  line-height: 1;
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
