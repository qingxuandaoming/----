<template>
  <view class="cart-page">
    <view class="header">
      <text class="title">购物车</text>
      <u-button type="primary" size="small" plain @click="toggleEdit">{{ editing ? '完成' : '编辑' }}</u-button>
    </view>

    <view class="list">
      <view class="item" v-for="item in cart" :key="item.id">
        <image :src="item.image" class="thumb" mode="aspectFill"></image>
        <view class="info">
          <text class="name">{{ item.name }}</text>
          <text class="spec">规格：默认</text>
          <view class="row">
            <text class="price">¥{{ item.price.toFixed(2) }}</text>
            <view class="number-box">
              <button class="btn" @click="dec(item)">-</button>
              <input class="num" type="number" v-model.number="item.quantity" @input="onQtyChange(item)" />
              <button class="btn" @click="inc(item)">+</button>
            </view>
          </view>
        </view>
        <view class="delete" v-if="editing">
          <button class="btn-del" @click="removeItem(item.id)">删除</button>
        </view>
      </view>
    </view>

    <view class="bottom-bar">
      <view class="left">
        <text>合计：</text>
        <text class="total">¥{{ totalAmount.toFixed(2) }}</text>
      </view>
      <u-button shape="circle" type="primary" :plain="true">去结算</u-button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { cartList } from '../../mock/cart.js'

const editing = ref(false)
const cart = ref(cartList.map(i => ({ ...i })))

const toggleEdit = () => {
  editing.value = !editing.value
}

const removeItem = (id) => {
  cart.value = cart.value.filter(i => i.id !== id)
}

const onQtyChange = (item) => {
  if (item.quantity < 1) item.quantity = 1
}

const inc = (item) => { if (item.quantity < 99) item.quantity++ }
const dec = (item) => { if (item.quantity > 1) item.quantity-- }

const totalAmount = computed(() => {
  return cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
})
</script>

<style lang="scss" scoped>
.cart-page {
  padding: 24rpx;
  padding-bottom: 160rpx;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}
.title {
  font-size: 34rpx;
  color: $text-primary;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  background-color: $color-card-bg;
  border-radius: $radius-card;
  padding: 20rpx;
}
.thumb { width: 140rpx; height: 140rpx; border-radius: 16rpx; }
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}
.name {
  font-size: 28rpx;
  color: $text-primary;
}
.spec {
  font-size: 24rpx;
  color: $text-tertiary;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.number-box { display: flex; align-items: center; gap: 8rpx; }
.btn { width: 60rpx; height: 48rpx; border: 1rpx solid #ddd; background: #fff; border-radius: 8rpx; }
.num { width: 80rpx; height: 48rpx; border: 1rpx solid #ddd; text-align: center; border-radius: 8rpx; }
.price {
  color: $text-danger;
  font-weight: 600;
}
.bottom-bar {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background-color: $color-card-bg;
  padding: 20rpx 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -6rpx 20rpx rgba(0,0,0,0.06);
}
.left { display: flex; align-items: baseline; gap: 8rpx; }
.total { color: $text-danger; font-size: 32rpx; font-weight: 600; }
.btn-del { background: #fa436a; color: #fff; border: none; padding: 10rpx 16rpx; border-radius: 8rpx; }
</style>