<template>
  <view class="page">
    <view class="card">
      <text class="title">今日记录</text>
      <view v-for="(i,idx) in items" :key="idx" style="padding:10px 0">
        <text>{{ i.type }} · {{ i.text }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { state } from '../../common/store'
function today(){return new Date().toISOString().slice(0,10)}
const items=computed(()=>{
  const t=today();
  const out=[]
  state.stats.water.log.filter(x=>x.date===t).forEach(x=>out.push({type:'饮水',text:`${x.time} ${x.ml} ml`}))
  state.stats.steps.log.filter(x=>x.date===t).forEach(x=>out.push({type:'步数',text:`${x.steps}`}))
  state.stats.sleep.log.filter(x=>x.date===t).forEach(x=>out.push({type:'睡眠',text:`${x.start?.slice(11,16)}-${x.end?.slice(11,16)} ${x.h||0}h${x.m||0}m`}))
  state.stats.food.log.filter(x=>x.date===t).forEach(x=>out.push({type:'饮食',text:`${x.name} ${x.kcal} kcal`}))
  return out
})
</script>

<style scoped>
</style>