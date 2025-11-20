<template>
  <view class="profile">
    <view class="card">
      <text class="title">我的</text>
      <text class="desc">会员中心与个人信息后续接入</text>
    </view>
  </view>
</template>

<script setup>
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
</style>