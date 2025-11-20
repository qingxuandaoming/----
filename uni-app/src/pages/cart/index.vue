<template>
  <view class="cart-page">
    <view class="header">
      <text class="title">购物车</text>
      <u-button type="primary" size="small" plain @click="toggleEdit">{{ editing ? '完成' : '编辑' }}</u-button>
    </view>

    <view class="list">
      <u-swipe-action>
        <u-swipe-action-item
          v-for="item in cart"
          :key="item.id"
          :options="swipeOptions"
          @click="() => removeItem(item.id)"
        >
          <view class="item">
            <image :src="item.image" class="thumb" mode="aspectFill"></image>
            <view class="info">
              <text class="name">{{ item.name }}</text>
              <text class="spec">规格：默认</text>
              <view class="row">
                <text class="price">¥{{ item.price.toFixed(2) }}</text>
                <u-number-box v-model="item.quantity" :min="1" :max="99" integer @change="val => onQtyChange(item, val)" />
              </view>
            </view>
            <view class="delete" v-if="editing">
              <u-button type="error" size="small" @click="removeItem(item.id)">删除</u-button>
            </view>
          </view>
        </u-swipe-action-item>
      </u-swipe-action>
    </view>

    <view class="bottom-bar">
      <view class="left">
        <text>合计：</text>
        <text class="total">¥{{ totalAmount.toFixed(2) }}</text>
      </view>
      <u-button shape="circle" type="primary" :plain="true" @click="checkout">去结算</u-button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { cartList } from '../../mock/cart.js'

const editing = ref(false)
const cart = ref(cartList.map(i => ({ ...i })))
const swipeOptions = [
  { text: '删除', style: { backgroundColor: '#fa436a', color: '#fff' } }
]

const toggleEdit = () => {
  editing.value = !editing.value
}

const removeItem = (id) => {
  cart.value = cart.value.filter(i => i.id !== id)
}

const onQtyChange = (item, val) => {
  item.quantity = Math.max(1, Math.min(99, Number(val)))
}

const inc = (item) => { if (item.quantity < 99) item.quantity++ }
const dec = (item) => { if (item.quantity > 1) item.quantity-- }

const totalAmount = computed(() => {
  return cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
})

const checkout = () => {
  uni.showModal({ title: '去结算', content: `合计 ¥${totalAmount.value.toFixed(2)}`, confirmText: '确认', success(res){ if (res.confirm) uni.switchTab({ url: '/pages/profile/index' }) } })
}
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