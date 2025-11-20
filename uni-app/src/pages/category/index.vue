<template>
  <view class="category">
    <view class="empty">
      <image class="empty-img" src="https://cdn.uviewui.com/uview/empty/list.png" />
      <text class="empty-text">分类开发中</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.category {
  padding: 24rpx;
}
.empty { display: flex; flex-direction: column; align-items: center; gap: 12rpx; color: $text-secondary; }
.empty-img { width: 240rpx; height: 240rpx; }
</style>