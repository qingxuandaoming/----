<template>
  <view class="page">
    <view class="card">
      <text class="title">饮水目标</text>
      <view class="row" style="margin-top:10px">
        <input type="number" v-model.number="waterTarget" style="flex:1;color:#e5e7eb" />
        <view class="chip" @tap="saveWater">保存</view>
      </view>
    </view>
    <view class="card" style="margin-top:14px">
      <text class="title">身高</text>
      <view class="row" style="margin-top:10px">
        <input type="number" v-model.number="height" style="flex:1;color:#e5e7eb" />
        <view class="chip" @tap="saveHeight">保存</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { state, actions } from '../../common/store'
const waterTarget=ref(state.stats.water.target)
function saveWater(){actions.setWaterTarget(waterTarget.value)}
const height=ref(state.stats.weight.height_cm)
function saveHeight(){state.stats.weight.height_cm=height.value}
</script>

<style scoped>
</style>