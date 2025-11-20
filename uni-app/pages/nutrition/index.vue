<template>
  <view class="page">
    <view class="card">
      <text class="title">今日总热量</text>
      <text class="big">{{ totalKcal }} kcal</text>
      <view class="row" style="justify-content:space-between;margin-top:10px">
        <view style="align-items:center;flex:1"><text class="title">蛋白质</text><text class="value">{{ macroSum('protein') }} g</text></view>
        <view style="align-items:center;flex:1"><text class="title">碳水</text><text class="value">{{ macroSum('carb') }} g</text></view>
        <view style="align-items:center;flex:1"><text class="title">脂肪</text><text class="value">{{ macroSum('fat') }} g</text></view>
      </view>
    </view>
    <view class="card" style="margin-top:14px">
      <text class="title">新增餐食</text>
      <view class="row" style="margin-top:10px">
        <input v-model="name" placeholder="名称" style="flex:1;color:#e5e7eb" />
        <input v-model.number="kcal" type="number" placeholder="kcal" style="width:100px;color:#e5e7eb" />
        <view class="chip" @tap="add">添加</view>
      </view>
    </view>
    <view class="card" style="margin-top:14px">
      <text class="title">今日餐单</text>
      <view v-for="(i,idx) in todayMeals" :key="idx" style="flex-direction:row;display:flex;justify-content:space-between;padding:10px 0">
        <text>{{ i.name }}</text>
        <text style="font-weight:600">{{ i.kcal }} kcal</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { state, actions } from '../../common/store'
function today(){return new Date().toISOString().slice(0,10)}
const todayMeals=computed(()=>state.stats.food.log.filter(x=>x.date===today()))
const totalKcal=computed(()=>todayMeals.value.reduce((a,b)=>a+(b.kcal||0),0))
function macroSum(k){return todayMeals.value.reduce((a,b)=>a+((b.macro&&b.macro[k])||0),0)}
const name=ref('')
const kcal=ref(0)
function add(){if(!name.value)return;actions.logMeal(name.value,kcal.value,{protein:0,carb:0,fat:0});name.value='';kcal.value=0}
</script>

<style scoped>
</style>