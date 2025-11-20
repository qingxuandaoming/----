<template>
  <view class="result-page">
    <SectionHeader title="体质占比" />
    <view class="donut-wrap">
      <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
        <g transform="translate(0,0)">
          <circle :cx="center" :cy="center" :r="radius" stroke="#eee" stroke-width="20" fill="none" />
          <template v-for="(seg, idx) in arcs" :key="idx">
            <circle
              :cx="center"
              :cy="center"
              :r="radius"
              :stroke="seg.color"
              stroke-width="20"
              fill="none"
              :stroke-dasharray="`${seg.len} ${circumference - seg.len}`"
              :stroke-dashoffset="seg.offset"
              stroke-linecap="butt"
            />
          </template>
        </g>
      </svg>
      <view class="legend">
        <view class="legend-item" v-for="(seg, i) in segments" :key="i">
          <view class="dot" :style="{ backgroundColor: seg.color }"></view>
          <text>{{ seg.name }} {{ seg.value }}%</text>
        </view>
      </view>
    </view>

    <SectionHeader title="趋势指标" />
    <view class="bars">
      <view class="bar-row">
        <text class="label">疲劳度</text>
        <view class="bar"><view class="fill" :style="{ width: fatigue + '%' }"></view></view>
        <text class="value">{{ fatigue }}%</text>
      </view>
      <view class="bar-row">
        <text class="label">睡眠质量</text>
        <view class="bar"><view class="fill alt" :style="{ width: sleep + '%' }"></view></view>
        <text class="value">{{ sleep }}%</text>
      </view>
    </view>

    <view class="recommend">
      <text class="tip">推荐：黄芪党参乌鸡汤</text>
    </view>

    <view class="overview">
      <view class="card">
        <text>体质状态分数</text>
        <text class="num">{{ user.healthScore }}</text>
      </view>
      <view class="card">
        <text>饮食记录次数</text>
        <text class="num">{{ records }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../../components/SectionHeader.vue'
import { userInfo as user } from '../../mock/user.js'

const segments = ref([
  { name: '平和质', value: 60, color: '#8B5A2B' },
  { name: '气虚质', value: 20, color: '#D4AF37' },
  { name: '湿热质', value: 10, color: '#C0392B' },
  { name: '阴虚质', value: 10, color: '#6c757d' }
])
const fatigue = ref(40)
const sleep = ref(75)
const records = ref(12)

const size = 220
const center = size / 2
const radius = 80
const circumference = 2 * Math.PI * radius

const arcs = computed(() => {
  let acc = 0
  return segments.value.map(s => {
    const len = (s.value / 100) * circumference
    const seg = { len, offset: -acc, color: s.color }
    acc += len
    return seg
  })
})
</script>

<style lang="scss" scoped>
.result-page { padding: 24rpx; display: flex; flex-direction: column; gap: 24rpx; }
.donut-wrap { display: flex; gap: 24rpx; align-items: center; }
.legend { display: flex; flex-direction: column; gap: 12rpx; }
.legend-item { display: flex; align-items: center; gap: 12rpx; }
.dot { width: 24rpx; height: 24rpx; border-radius: 50%; }
.bars { display: flex; flex-direction: column; gap: 16rpx; }
.bar-row { display: flex; align-items: center; gap: 12rpx; }
.label { width: 180rpx; color: $text-secondary; }
.bar { flex: 1; height: 20rpx; background-color: #eee; border-radius: 20rpx; overflow: hidden; }
.fill { height: 100%; background-color: $color-primary; }
.fill.alt { background-color: $color-secondary; }
.value { width: 100rpx; text-align: right; }
.recommend { background-color: $color-card-bg; border-radius: $radius-card; padding: 20rpx; }
.tip { color: $text-primary; }
.overview { display: flex; gap: 16rpx; }
.card { flex: 1; background-color: $color-card-bg; border-radius: $radius-card; padding: 20rpx; display: flex; justify-content: space-between; align-items: center; }
.num { font-size: 36rpx; color: $text-primary; font-weight: 700; }
</style>