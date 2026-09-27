<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  offsetY: number
  color: string
}>()

const label = ref<HTMLElement | null>(null)
const connector = ref<HTMLElement | null>(null)
const width = ref(30)
const animated = ref(false)

let title: HTMLElement | null = null
let observer: ResizeObserver | null = null
let animationObserver: MutationObserver | null = null

function updateWidth() {
  const dot = connector.value?.querySelector<HTMLElement>('.alpha-circular-pyramid-stack-title__dot')
  if (!connector.value || !dot) return

  // Both offsets are in the connector's own coordinate system, so Slidev's
  // presentation scale cannot make the SVG extend beyond the dot.
  width.value = Math.max(1, dot.offsetLeft + dot.offsetWidth / 2)
}

onMounted(() => {
  title = label.value?.closest<HTMLElement>('.alpha-circular-pyramid-stack-title') ?? null
  connector.value = title?.querySelector<HTMLElement>('.alpha-circular-pyramid-stack-title__connector') ?? null
  title?.style.setProperty('--did-title-offset', `${props.offsetY}px`)
  updateWidth()

  const line = connector.value?.querySelector<HTMLElement>('.alpha-circular-pyramid-stack-title__line')
  if (line) {
    const updateAnimation = () => {
      animated.value = line.classList.contains('alpha-circular-pyramid-stack-title__line--animated')
    }
    updateAnimation()
    animationObserver = new MutationObserver(updateAnimation)
    animationObserver.observe(line, { attributes: true, attributeFilter: ['class'] })
  }

  if (connector.value && typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(updateWidth)
    observer.observe(connector.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
  animationObserver?.disconnect()
  title?.style.removeProperty('--did-title-offset')
})

const svgHeight = computed(() => Math.abs(props.offsetY) + 8)
const minY = computed(() => Math.min(0, props.offsetY) - 4)
const path = computed(() => {
  const end = width.value
  if (!props.offsetY) return `M 0 0 L ${end} 0`

  const stub = Math.min(14, end * 0.2)
  const ramp = Math.min(28, Math.max(14, (end - stub) * 0.45))
  const bend = Math.min(end, stub + ramp)
  return `M 0 ${props.offsetY} L ${stub} ${props.offsetY} L ${bend} 0 L ${end} 0`
})
</script>

<template>
  <span ref="label" class="did-title-label"><slot /></span>
  <Teleport v-if="connector" :to="connector">
    <svg
      class="did-title-connector"
      :width="width"
      :height="svgHeight"
      :viewBox="`0 ${minY} ${width} ${svgHeight}`"
      :style="{ top: `calc(50% + ${minY}px)` }"
      aria-hidden="true"
    >
      <path
        :class="{ 'did-title-connector__path--animated': animated }"
        :d="path"
        fill="none"
        :stroke="color"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        pathLength="1"
        opacity="0.65"
      />
    </svg>
  </Teleport>
</template>

<style scoped>
.did-title-label {
  display: contents;
}

.did-title-connector {
  position: absolute;
  left: 0;
  overflow: visible;
  pointer-events: none;
}

.did-title-connector__path--animated {
  stroke-dasharray: 1;
  animation: did-title-line-draw 500ms cubic-bezier(0.4, 0, 0.2, 1) calc(var(--title-delay) + 120ms) both;
}

@keyframes did-title-line-draw {
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
}
</style>
