<script setup lang="ts">
const props = defineProps<{ active: number }>()

const steps = ['Yêu cầu', 'Dữ liệu', 'Phát hiện', 'Quyết định', 'Chia sẻ']
</script>

<template>
  <div class="demo-progress" aria-label="Tiến trình minh họa DLP">
    <div
      v-for="(step, index) in steps"
      :key="step"
      class="demo-step"
      :class="{ active: props.active === index + 1, done: props.active > index + 1 }"
    >
      <span class="demo-number">{{ index + 1 }}</span>
      <span>{{ step }}</span>
    </div>
  </div>
</template>

<style scoped>
.demo-progress {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  margin-top: 0.25rem;
  border-bottom: 1px solid #cbd5e1;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
}

.demo-step {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.45rem 0 0.55rem;
  border-bottom: 3px solid transparent;
}

.demo-step.active {
  border-bottom-color: #0284c7;
  color: #0f172a;
}

.demo-step.done {
  color: #0369a1;
}

.demo-number {
  display: inline-flex;
  width: 1.25rem;
  height: 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #e2e8f0;
  font-size: 10px;
}

.demo-step.active .demo-number {
  background: #0284c7;
  color: white;
}

.demo-step.done .demo-number {
  background: #bae6fd;
  color: #075985;
}
</style>
