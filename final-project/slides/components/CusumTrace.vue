<script setup lang="ts">
import { computed } from 'vue'

interface TraceWindow {
  s: number
  label: 'genuine' | 'mixed' | 'impostor'
  action: string
}

const props = withDefaults(defineProps<{
  windows: TraceWindow[]
  h1: number
  h2: number
  maxS?: number
}>(), { maxS: 2.4 })

const W = 420
const H = 190
const padL = 38
const padB = 28
const padT = 12
const plotW = W - padL - 8
const plotH = H - padB - padT

const y = (v: number) => padT + plotH - (Math.min(v, props.maxS) / props.maxS) * plotH
const slot = computed(() => plotW / props.windows.length)
const fill = (label: string) => ({ genuine: '#0ea5e9', mixed: '#a855f7', impostor: '#f43f5e' } as Record<string, string>)[label] ?? '#94a3b8'
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" class="w-full" role="img" aria-label="Diễn biến điểm tích lũy S theo cửa sổ">
    <line :x1="padL" :x2="W - 8" :y1="y(0)" :y2="y(0)" stroke="#94a3b8" />
    <line :x1="padL" :x2="W - 8" :y1="y(h1)" :y2="y(h1)" stroke="#d97706" stroke-dasharray="5 4" />
    <text :x="padL - 4" :y="y(h1) + 4" text-anchor="end" style="font-size: 13px; font-weight: 700; line-height: 1" fill="#b45309">h₁={{ h1 }}</text>
    <line :x1="padL" :x2="W - 8" :y1="y(h2)" :y2="y(h2)" stroke="#e11d48" stroke-dasharray="5 4" />
    <text :x="padL - 4" :y="y(h2) + 4" text-anchor="end" style="font-size: 13px; font-weight: 700; line-height: 1" fill="#be123c">h₂={{ h2 }}</text>
    <g v-for="(w, i) in windows" :key="i">
      <rect
        :x="padL + i * slot + slot * 0.18"
        :y="y(w.s)"
        :width="slot * 0.64"
        :height="Math.max(y(0) - y(w.s), 1.5)"
        :fill="fill(w.label)"
        rx="2"
      />
      <text :x="padL + i * slot + slot / 2" :y="H - 8" text-anchor="middle" style="font-size: 12px; font-weight: 500; line-height: 1" fill="#475569">W{{ i }}</text>
      <text
        v-if="w.action !== 'CONTINUE'"
        :x="padL + i * slot + slot / 2"
        :y="y(w.s) - 5"
        text-anchor="middle"
        style="font-size: 12px; line-height: 1; font-weight: 700"
        fill="#be123c"
      >MFA</text>
    </g>
  </svg>
</template>
