<template>
  <view class="trend-chart">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" @touchstart="onTouch" @touchmove="onTouch" @mouseleave="hideTooltip">
      <g :transform="`translate(${margin.left}, ${margin.top})`">
        <rect :width="innerW" :height="innerH" fill="transparent" />
        <g>
          <path v-for="(s, si) in series" :key="si" :d="paths[si]" :stroke="s.color" fill="none" :stroke-width="2" :class="'line line-'+si"/>
        </g>
        <g v-if="tooltip.visible">
          <line :x1="tooltip.x" :x2="tooltip.x" y1="0" :y2="innerH" stroke="#ddd" stroke-dasharray="4 4" />
          <circle v-for="(p, pi) in tooltip.points" :key="pi" :cx="p.x" :cy="p.y" :r="4" :fill="series[pi].color" />
        </g>
      </g>
    </svg>
    <view v-if="tooltip.visible" class="tooltip" :style="{ left: tooltip.screenX + 'px', top: tooltip.screenY + 'px' }">
      <text class="label">{{ labels[tooltip.index] }}</text>
      <view class="rows">
        <view class="row" v-for="(s, si) in series" :key="si">
          <view class="dot" :style="{ backgroundColor: s.color }"></view>
          <text>{{ s.name }} {{ s.data[tooltip.index] }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, reactive, watchEffect } from 'vue'

const props = defineProps({
  width: { type: Number, default: 700 },
  height: { type: Number, default: 320 },
  labels: { type: Array, default: () => [] },
  series: { type: Array, default: () => [] },
  smooth: { type: Boolean, default: true }
})

const margin = { left: 40, right: 20, top: 10, bottom: 30 }
const innerW = computed(() => props.width - margin.left - margin.right)
const innerH = computed(() => props.height - margin.top - margin.bottom)

const xScale = (i) => {
  const n = Math.max(1, props.labels.length - 1)
  return (i / n) * innerW.value
}
const yDomain = computed(() => {
  const all = props.series.flatMap(s => s.data)
  const min = Math.min(...all)
  const max = Math.max(...all)
  const pad = Math.max(1, (max - min) * 0.1)
  return [min - pad, max + pad]
})
const yScale = (v) => {
  const [min, max] = yDomain.value
  const t = (v - min) / (max - min || 1)
  return innerH.value - t * innerH.value
}

const paths = computed(() => {
  return props.series.map(s => {
    const pts = s.data.map((d, i) => [xScale(i), yScale(d)])
    if (props.smooth && pts.length > 2) {
      let d = `M ${pts[0][0]} ${pts[0][1]}`
      for (let i = 1; i < pts.length; i++) {
        const [x, y] = pts[i]
        const [px, py] = pts[i - 1]
        const cx = (px + x) / 2
        d += ` Q ${px} ${py} ${cx} ${(py + y) / 2}`
        d += ` T ${x} ${y}`
      }
      return d
    }
    return 'M ' + pts.map(p => p.join(' ')).join(' L ')
  })
})

const tooltip = reactive({ visible: false, index: 0, x: 0, screenX: 0, screenY: 0, points: [] })

const onTouch = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  const x = clientX - rect.left - margin.left
  const step = innerW.value / Math.max(1, props.labels.length - 1)
  const idx = Math.round(x / step)
  const clamped = Math.max(0, Math.min(props.labels.length - 1, idx))
  tooltip.index = clamped
  tooltip.x = xScale(clamped)
  tooltip.visible = true
  tooltip.screenX = clientX + 12
  tooltip.screenY = clientY - 40
  tooltip.points = props.series.map(s => ({ x: xScale(clamped), y: yScale(s.data[clamped]) }))
}

const hideTooltip = () => { tooltip.visible = false }

watchEffect(() => {
  void paths.value
})
</script>

<style lang="scss" scoped>
.trend-chart { position: relative; }
.tooltip {
  position: fixed;
  background: #ffffff;
  border-radius: 12rpx;
  box-shadow: 0 6rpx 24rpx rgba(0,0,0,0.08);
  padding: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  z-index: 10;
}
.label { color: $text-secondary; }
.rows { display: flex; flex-direction: column; gap: 6rpx; }
.row { display: flex; align-items: center; gap: 8rpx; }
.dot { width: 12rpx; height: 12rpx; border-radius: 50%; }
.line { stroke-linecap: round; }
.line { stroke-dasharray: 1000; animation: draw 0.8s ease forwards; }
@keyframes draw { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
</style>