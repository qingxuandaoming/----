<template>
  <view class="page">
    <view class="card">
      <text class="title">最近体重</text>
      <text class="big">{{ lastText }}</text>
      <text class="muted">身高 {{ state.stats.weight.height_cm }} cm</text>
      <view class="row" style="margin-top:14px">
        <view class="chip">BMI {{ bmiText }}</view>
        <view class="chip" style="background:#f87171">目标 65 kg</view>
      </view>
    </view>
    <view class="card" style="margin-top:14px">
      <text class="title">记录体重</text>
      <view class="row" style="margin-top:10px">
        <input type="number" v-model="input" placeholder="kg" style="flex:1;color:#e5e7eb" />
        <view class="chip" @tap="save">保存</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { state, selectors, actions } from '../../common/store'
const lastText=computed(()=>{const w=selectors.lastWeight();return w?`${w.kg} kg`:'—'})
const bmiText=computed(()=>{const v=selectors.bmi();return v?`${v}`:'—'})
const input=ref('')
function save(){const v=parseFloat(input.value);if(!isNaN(v)){actions.logWeight(v);input.value=''}}
</script>

<style scoped>
</style>