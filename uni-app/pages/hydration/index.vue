<template>
  <view class="page">
    <view class="card">
      <text class="title">每日目标</text>
      <text class="big">{{ state.stats.water.target }} ml</text>
      <view class="progress"><view class="progress-bar" :style="{width: progress+'%'}"></view></view>
      <text class="muted">已完成 {{ progress }}%</text>
    </view>
    <view class="row" style="margin-top:14px">
      <view class="card" style="flex:1;align-items:center" @tap="add(250)"><text class="big">+250</text></view>
      <view class="card" style="flex:1;align-items:center" @tap="add(500)"><text class="big">+500</text></view>
      <view class="card" style="flex:1;align-items:center" @tap="add(750)"><text class="big">+750</text></view>
    </view>
    <view class="card" style="margin-top:14px">
      <text class="title">今日记录</text>
      <view v-for="(i,idx) in todayLog" :key="idx" style="flex-direction:row;display:flex;justify-content:space-between;padding:10px 0">
        <text>{{ i.time }}</text>
        <text style="font-weight:600">{{ i.ml }} ml</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { state, actions, selectors } from '../../common/store'
function add(n){actions.addWater(n)}
const progress=computed(()=>selectors.waterProgress())
function today(){return new Date().toISOString().slice(0,10)}
const todayLog=computed(()=>state.stats.water.log.filter(x=>x.date===today()))
</script>

<style scoped>
</style>