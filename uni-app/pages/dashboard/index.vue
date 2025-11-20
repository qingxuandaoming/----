<template>
  <view class="page">
    <view class="grid">
      <view class="card" style="width:48%;margin-right:2%;margin-bottom:16px" @tap="go('hydration')">
        <text class="title">今日饮水</text>
        <text class="big">{{ waterToday }}/{{ state.stats.water.target }} ml</text>
        <view class="progress"><view class="progress-bar" :style="{width: waterProgress+'%'}"></view></view>
      </view>
      <view class="card" style="width:48%;margin-bottom:16px" @tap="go('sleep')">
        <text class="title">最近睡眠</text>
        <text class="big">{{ sleepSummary }}</text>
      </view>
      <view class="card" style="width:48%;margin-right:2%;margin-bottom:16px" @tap="go('steps')">
        <text class="title">今日步数</text>
        <text class="big">{{ stepsToday }}</text>
      </view>
      <view class="card" style="width:48%;margin-bottom:16px" @tap="go('weight')">
        <text class="title">体重与BMI</text>
        <text class="big">{{ lastWeightText }}</text>
        <text class="muted">BMI: {{ bmiText }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { state, selectors } from '../../common/store'

function go(p){uni.navigateTo({url:`/pages/${p}/index`})}
const waterToday=computed(()=>selectors.waterToday())
const waterProgress=computed(()=>selectors.waterProgress())
const sleepSummary=computed(()=>{const s=selectors.lastSleep();if(!s)return '暂无';return `${s.h||0} h ${s.m||0} m`})
const stepsToday=computed(()=>selectors.todaySteps())
const lastWeightText=computed(()=>{const w=selectors.lastWeight();return w?`${w.kg} kg`:'—'})
const bmiText=computed(()=>{const v=selectors.bmi();return v?`${v}`:'—'})
</script>

<style scoped>
</style>