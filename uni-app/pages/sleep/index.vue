<template>
  <view class="page">
    <view class="card">
      <text class="title">最近一次</text>
      <text class="big">{{ lastDur }}</text>
      <text class="muted">{{ lastRange }}</text>
    </view>
    <view class="row" style="margin-top:14px">
      <view class="card" style="flex:1;align-items:center" @tap="start"><text class="value">开始睡眠</text></view>
      <view class="card" style="flex:1;align-items:center" @tap="end"><text class="value">结束睡眠</text></view>
    </view>
    <view class="card" style="margin-top:14px">
      <text class="title">本周统计</text>
      <view class="row" style="justify-content:space-between;margin-top:10px">
        <view style="align-items:center;flex:1">
          <text class="value">{{ avgH }} h</text>
          <text class="muted">平均</text>
        </view>
        <view style="align-items:center;flex:1">
          <text class="value">{{ maxH }} h</text>
          <text class="muted">最长</text>
        </view>
        <view style="align-items:center;flex:1">
          <text class="value">{{ minH }} h</text>
          <text class="muted">最短</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { state, actions } from '../../common/store'
function start(){actions.startSleep()}
function end(){actions.endSleep()}
const last=computed(()=>{const l=state.stats.sleep.log;return l.length?l[l.length-1]:null})
const lastDur=computed(()=>{const s=last.value;if(!s)return '暂无';return `${s.h||0} h ${s.m||0} m`})
const lastRange=computed(()=>{const s=last.value;if(!s)return '';return `${s.start?.slice(11,16)||''} - ${s.end?.slice(11,16)||''}`})
const week=computed(()=>{const t=new Date();const arr=state.stats.sleep.log.filter(x=>{const d=new Date(x.date);const diff=(t-d)/86400000;return diff>=0&&diff<7});return arr})
const avgH=computed(()=>{const arr=week.value;if(!arr.length)return 0;const sum=arr.reduce((a,b)=>a+(b.h||0)+(b.m||0)/60,0);return Math.round((sum/arr.length)*10)/10})
const maxH=computed(()=>{const arr=week.value;if(!arr.length)return 0;const v=Math.max(...arr.map(x=>(x.h||0)+(x.m||0)/60));return Math.round(v*10)/10})
const minH=computed(()=>{const arr=week.value;if(!arr.length)return 0;const v=Math.min(...arr.map(x=>(x.h||0)+(x.m||0)/60));return Math.round(v*10)/10})
</script>

<style scoped>
</style>