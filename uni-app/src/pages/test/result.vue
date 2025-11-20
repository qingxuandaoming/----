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
    <TrendSvgChart :labels="labels" :series="trendSeries" :width="700" :height="320" />

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

    <SectionHeader title="饮食时间轴" />
    <view class="timeline">
      <view class="t-item" v-for="(r,i) in timeline" :key="i">
        <text class="t-time">{{ r.time }}</text>
        <view class="t-line"><view class="t-dot"></view></view>
        <view class="t-content">
          <text class="t-meal">{{ r.meal }}</text>
          <text class="t-eff">{{ r.effect }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../../components/SectionHeader.vue'
import TrendSvgChart from '../../components/TrendSvgChart.vue'
import { userInfo as user } from '../../mock/user.js'

const segments = ref([
  { name: '平和质', value: 60, color: '#8B5A2B' },
  { name: '气虚质', value: 20, color: '#D4AF37' },
  { name: '湿热质', value: 10, color: '#C0392B' },
  { name: '阴虚质', value: 10, color: '#6c757d' }
])
const fatigue = ref(40)
const sleep = ref(75)
const labels = ref(['周一','周二','周三','周四','周五','周六','周日'])
const trendSeries = ref([
  { name: '疲劳度', color: '#8B5A2B', data: [40, 45, 42, 50, 48, 43, 38] },
  { name: '睡眠质量', color: '#D4AF37', data: [70, 72, 68, 75, 78, 74, 76] }
])
const records = ref(12)

const timeline = ref([
  { time: '08:00', meal: '早餐：红枣燕麦粥', effect: '补气养血、健脾和胃' },
  { time: '12:30', meal: '午餐：滋阴润燥汤', effect: '滋阴润肺、润燥生津' },
  { time: '15:00', meal: '加餐：百合银耳羹', effect: '清热润燥、宁心安神' },
  { time: '19:00', meal: '晚餐：黄芪党参乌鸡汤', effect: '补气固表、益气健脾' }
])

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
.recommend { background-color: $color-card-bg; border-radius: $radius-card; padding: 20rpx; }
.tip { color: $text-primary; }
.overview { display: flex; gap: 16rpx; }
.card { flex: 1; background-color: $color-card-bg; border-radius: $radius-card; padding: 20rpx; display: flex; justify-content: space-between; align-items: center; }
.num { font-size: 36rpx; color: $text-primary; font-weight: 700; }
.timeline { display: flex; flex-direction: column; gap: 16rpx; margin-top: 8rpx; }
.t-item { display: grid; grid-template-columns: 120rpx 40rpx 1fr; align-items: start; gap: 12rpx; }
.t-time { color: $text-secondary; }
.t-line { position: relative; width: 40rpx; }
.t-line::after { content: ''; position: absolute; left: 19rpx; top: 0; bottom: 0; width: 2rpx; background: #e5e5e5; }
.t-dot { position: absolute; left: 14rpx; top: 4rpx; width: 12rpx; height: 12rpx; border-radius: 50%; background: $color-secondary; }
.t-content { background-color: $color-card-bg; border-radius: $radius-card; padding: 14rpx; display: flex; flex-direction: column; gap: 6rpx; }
.t-meal { color: $text-primary; font-weight: 600; }
.t-eff { color: $text-secondary; }
</style>
