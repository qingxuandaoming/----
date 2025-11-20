<template>
  <view class="profile">
    <view class="card">
      <text class="title">我的</text>
      <text class="desc">会员中心与个人信息后续接入</text>
      <view class="row">
        <u-button shape="circle" plain @click="toLogin">立即登录</u-button>
        <u-button type="primary" shape="circle" @click="toVIP">会员中心</u-button>
      </view>
    </view>
  </view>
</template>

<script setup>
const toLogin = () => uni.navigateTo({ url: '/pages/login/index' })
const toVIP = () => uni.navigateTo({ url: '/pages/vip/index' })
</script>

<style lang="scss" scoped>
.profile {
  padding: 24rpx;
}
.card {
  background-color: $color-card-bg;
  border-radius: $radius-card;
  padding: 24rpx;
}
.title {
  font-size: 32rpx;
  color: $text-primary;
}
.desc {
  margin-top: 12rpx;
  color: $text-secondary;
}
.row { margin-top: 16rpx; display: flex; gap: 12rpx; }
</style>