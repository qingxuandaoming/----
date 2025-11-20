<template>
  <view class="order-success">
    <u-icon name="checkmark" color="#8B5A2B" size="56" />
    <text class="title">下单成功</text>
    <text class="desc">我们已为您安排配膳，请耐心等待配送</text>
    <view class="row">
      <u-button shape="circle" plain @click="toHome">返回首页</u-button>
      <u-button type="primary" shape="circle" @click="toCart">查看购物车</u-button>
    </view>
  </view>
</template>

<script setup>
const toHome = () => uni.switchTab({ url: '/pages/tabbar/home/index' })
const toCart = () => uni.switchTab({ url: '/pages/tabbar/cart/index' })
</script>

<style lang="scss" scoped>
.order-success { padding: 24rpx; display: flex; flex-direction: column; gap: 12rpx; align-items: center; justify-content: center; min-height: 60vh; }
.title { font-size: 34rpx; color: $text-primary; font-weight: 700; }
.desc { color: $text-secondary; }
.row { margin-top: 16rpx; display: flex; gap: 12rpx; }
</style>