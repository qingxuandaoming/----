<template>
  <view class="product-card" @click="goDetail">
    <image :src="item.image" class="thumb" mode="aspectFill"></image>
    <view class="info">
      <text class="name">{{ item.name }}</text>
      <text class="desc">{{ item.desc }}</text>
      <view class="meta">
        <text class="price">¥{{ Number(item.price).toFixed(2) }}</text>
        <text class="tag">月销 {{ item.sales || 0 }}</text>
      </view>
    </view>
    <view class="actions" @click.stop>
      <u-button type="primary" shape="circle" size="small" @click="addToCart">加入购物车</u-button>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true }
})
const goDetail = () => {
  uni.navigateTo({ url: `/pages/goods/detail?id=${props.item.id}` })
}
const addToCart = () => {
  const cart = uni.getStorageSync('cart') || []
  const idx = cart.findIndex(i => i.goodsId === props.item.id)
  if (idx >= 0) cart[idx].quantity += 1
  else cart.push({ id: Date.now(), goodsId: props.item.id, name: props.item.name, price: props.item.price || 0, quantity: 1, image: props.item.image })
  uni.setStorageSync('cart', cart)
  uni.showToast({ title: '已加入购物车', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx;
  background-color: $color-card-bg;
  border-radius: $radius-card;
  transition: transform 0.12s ease, box-shadow 0.2s ease;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
}
.product-card:active { transform: scale(0.98); box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06); }
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