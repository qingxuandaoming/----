<template>
  <view class="product-card">
    <image :src="item.image" class="thumb" mode="aspectFill"></image>
    <view class="info">
      <text class="name">{{ item.name }}</text>
      <text class="desc">{{ item.desc }}</text>
      <view class="meta">
        <text class="price">¥{{ Number(item.price).toFixed(2) }}</text>
        <text class="tag">月销 {{ item.sales || 0 }}</text>
      </view>
    </view>
    <view class="actions">
      <button class="btn-add">加入购物车</button>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true }
})
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx;
  background-color: $color-card-bg;
  border-radius: $radius-card;
}
.thumb { width: 160rpx; height: 160rpx; border-radius: 16rpx; }
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.name {
  font-size: 30rpx;
  color: $text-primary;
}
.desc {
  font-size: 24rpx;
  color: $text-secondary;
}
.meta {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.price {
  color: $text-danger;
  font-weight: 600;
}
.tag { font-size: 22rpx; color: $text-secondary; border: 1rpx solid #ddd; padding: 6rpx 10rpx; border-radius: 20rpx; }
.actions {
}
.btn-add { background-color: $color-primary; color: #fff; border: none; padding: 12rpx 20rpx; border-radius: $radius-button; }
</style>