<template>
  <view class="vip-page">
    <view class="card">
      <text class="tier">VIP {{ user.vipLevel }}</text>
      <text class="name">{{ user.name }}</text>
      <view class="stats">
        <view class="stat"><text>积分</text><text class="num">{{ user.points }}</text></view>
        <view class="stat"><text>体质</text><text class="num">{{ user.constitution }}</text></view>
      </view>
    </view>
    <SectionHeader title="会员权益" />
    <view class="benefits">
      <view class="benefit"><text>专属折扣</text><u-tag text="9折" type="success" plain /></view>
      <view class="benefit"><text>优先客服</text><u-tag text="优先" type="primary" plain /></view>
      <view class="benefit"><text>健康档案管理</text><u-tag text="加倍" type="warning" plain /></view>
    </view>
    <u-button type="primary" shape="circle">立即开通/续费</u-button>
  </view>
</template>

<script setup>
import SectionHeader from '../../components/SectionHeader.vue'
import { userInfo as user } from '../../mock/user.js'
</script>

<style lang="scss" scoped>
.vip-page { padding: 24rpx; display: flex; flex-direction: column; gap: 20rpx; }
.card {
  background: linear-gradient(135deg, #8B5A2B, #D4AF37);
  color: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.tier { font-size: 32rpx; font-weight: 700; }
.name { font-size: 28rpx; }
.stats { display: flex; gap: 20rpx; }
.stat { display: flex; align-items: baseline; gap: 8rpx; }
.num { font-size: 32rpx; font-weight: 700; }
.benefits { display: flex; flex-direction: column; gap: 12rpx; background-color: $color-card-bg; border-radius: $radius-card; padding: 16rpx; }
.benefit { display: flex; justify-content: space-between; align-items: center; }
</style>