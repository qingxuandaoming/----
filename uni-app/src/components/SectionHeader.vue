<template>
  <view class="section-header">
    <text class="title">{{ title }}</text>
  </view>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
.section-header {
  background-color: #000000;
  padding: 24rpx 28rpx;
  border-radius: $radius-card;
}
.title {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 600;
}
</style>
