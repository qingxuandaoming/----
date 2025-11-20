<template>
  <view class="page">
    <view class="card">
      <text class="title">今日步数</text>
      <text class="big">{{ steps }}</text>
      <view class="progress"><view class="progress-bar" :style="{width: progress+'%'}"></view></view>
      <text class="muted">目标 10000</text>
    </view>
    <view class="row" style="margin-top:14px">
      <view class="card" style="flex:1;align-items:center" @tap="log(1000)"><text class="value">+1000</text></view>
      <view class="card" style="flex:1;align-items:center" @tap="log(2000)"><text class="value">+2000</text></view>
      <view class="card" style="flex:1;align-items:center" @tap="log(3000)"><text class="value">+3000</text></view>
    </view>
    <view class="row" style="margin-top:14px">
      <view class="card" style="flex:1"><text class="title">距离</text><text class="value">{{ dist }} km</text></view>
      <view class="card" style="flex:1"><text class="title">时长</text><text class="value">{{ dur }} m</text></view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { selectors, actions } from '../../common/store'
const steps=computed(()=>selectors.todaySteps())
const target=10000
const progress=computed(()=>{const v=steps.value;return Math.min(100,Math.round(v*100/target))})
const dist=ref(0)
const dur=ref(0)
function log(n){actions.logSteps(n,Math.round(n*0.0008*10)/10,n/100);dist.value=Math.round(n*0.0008*10)/10;dur.value=n/100}
</script>

<style scoped>
</style>