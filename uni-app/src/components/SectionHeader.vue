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
  background: linear-gradient(90deg, #FDF6E3, #FFFFFF);
  padding: 20rpx 24rpx;
  border-radius: $radius-card;
}
.title {
  color: $text-primary;
  font-size: 32rpx;
  font-weight: 600;
}
</style>
