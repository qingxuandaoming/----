<template>
  <view class="cart-page">
    <!-- 顶部操作栏 -->
    <view class="cart-header" v-if="cart.length > 0">
      <text class="cart-header__title">共 {{ cart.length }} 件商品</text>
      <text class="cart-header__action" @click="toggleEdit">{{ editing ? '完成' : '管理' }}</text>
    </view>

    <!-- 空购物车状态 -->
    <view class="cart-empty" v-if="cart.length === 0">
      <view class="cart-empty__icon">🛒</view>
      <text class="cart-empty__title">购物车是空的</text>
      <text class="cart-empty__desc">快去挑选心仪的药膳吧</text>
      <view class="cart-empty__btn" @click="goShopping">去逛逛</view>
    </view>

    <!-- 商品列表 -->
    <view class="cart-list" v-if="cart.length > 0">
      <view
        class="cart-item"
        v-for="item in cart"
        :key="item.id"
      >
        <!-- 选择框 -->
        <view class="cart-item__check" @click="toggleCheck(item)">
          <view class="checkbox" :class="{ 'checkbox--checked': item.checked }">
            <text v-if="item.checked" class="checkbox__tick">✓</text>
          </view>
        </view>

        <!-- 商品图片 -->
        <img :src="item.image" :alt="item.name" class="cart-item__img" />

        <!-- 商品信息 -->
        <view class="cart-item__info">
          <text class="cart-item__name">{{ item.name }}</text>
          <text class="cart-item__spec">规格：默认</text>
          <view class="cart-item__bottom">
            <text class="cart-item__price">¥{{ Number(item.price).toFixed(2) }}</text>
            <!-- 数量控制器 -->
            <view class="qty-stepper" v-if="!editing">
              <view class="qty-stepper__btn" :class="{ 'qty-stepper__btn--disabled': item.quantity <= 1 }" @click="dec(item)">
                <text>−</text>
              </view>
              <text class="qty-stepper__val">{{ item.quantity }}</text>
              <view class="qty-stepper__btn" :class="{ 'qty-stepper__btn--disabled': item.quantity >= 99 }" @click="inc(item)">
                <text>+</text>
              </view>
            </view>
            <!-- 编辑模式下的删除按钮 -->
            <view class="cart-item__del" v-if="editing" @click="removeItem(item.id)">
              <text>删除</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部结算栏 -->
    <view class="cart-bottom" v-if="cart.length > 0">
      <view class="cart-bottom__left">
        <view class="cart-bottom__check" @click="toggleAllChecked">
          <view class="checkbox" :class="{ 'checkbox--checked': isAllChecked }">
            <text v-if="isAllChecked" class="checkbox__tick">✓</text>
          </view>
          <text class="cart-bottom__label">全选</text>
        </view>
      </view>
      <view class="cart-bottom__right">
        <view class="cart-bottom__summary">
          <text class="cart-bottom__total-label">合计：</text>
          <text class="cart-bottom__total-price">¥{{ totalAmount.toFixed(2) }}</text>
        </view>
        <view class="cart-bottom__btn" @click="checkout">
          <text>结算({{ checkedCount }})</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { cartList as mockCart } from '../../mock/cart.js'

const editing = ref(false)
const cart = ref([])

onMounted(() => {
  const saved = uni.getStorageSync('cart')
  const source = saved && saved.length > 0 ? saved : mockCart
  cart.value = source.map(i => ({ ...i, checked: true }))
})

const saveCart = () => {
  uni.setStorageSync('cart', cart.value.map(({ checked, ...rest }) => rest))
}

const toggleEdit = () => {
  editing.value = !editing.value
}

const toggleCheck = (item) => {
  item.checked = !item.checked
}

const isAllChecked = computed(() => {
  return cart.value.length > 0 && cart.value.every(i => i.checked)
})

const toggleAllChecked = () => {
  const newVal = !isAllChecked.value
  cart.value.forEach(i => { i.checked = newVal })
}

const totalAmount = computed(() => {
  return cart.value.filter(i => i.checked).reduce((sum, i) => sum + i.price * i.quantity, 0)
})

const checkedCount = computed(() => {
  return cart.value.filter(i => i.checked).reduce((sum, i) => sum + i.quantity, 0)
})

const inc = (item) => {
  if (item.quantity < 99) {
    item.quantity++
    saveCart()
  }
}

const dec = (item) => {
  if (item.quantity > 1) {
    item.quantity--
    saveCart()
  }
}

const removeItem = (id) => {
  cart.value = cart.value.filter(i => i.id !== id)
  saveCart()
  if (cart.value.length === 0) editing.value = false
}

const goShopping = () => {
  uni.switchTab({ url: '/pages/tabbar/index/index' })
}

const checkout = () => {
  const selected = cart.value.filter(i => i.checked)
  if (selected.length === 0) {
    uni.showToast({ title: '请选择商品', icon: 'none' })
    return
  }
  uni.navigateTo({ url: '/pages/order/success' })
}
</script>

<style lang="scss" scoped>
.cart-page {
  min-height: calc(100vh - var(--window-top, 0px) - var(--window-bottom, 0px));
  padding: 20rpx 24rpx;
  padding-bottom: 200rpx;
  background-color: #F7F5F0;
  box-sizing: border-box;
}

/* ---- 顶部操作栏 ---- */
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
  padding: 0 4rpx;
}
.cart-header__title {
  font-size: 26rpx;
  color: $text-secondary;
}
.cart-header__action {
  font-size: 26rpx;
  color: $color-primary;
  font-weight: 500;
  padding: 8rpx 20rpx;
  border: 2rpx solid $color-primary;
  border-radius: 30rpx;
  transition: all 0.2s ease;
}
.cart-header__action:active {
  background-color: rgba(139, 90, 43, 0.08);
}

/* ---- 空购物车 ---- */
.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
}
.cart-empty__icon {
  font-size: 120rpx;
  margin-bottom: 32rpx;
  opacity: 0.4;
}
.cart-empty__title {
  font-size: 32rpx;
  color: $text-primary;
  font-weight: 500;
  margin-bottom: 12rpx;
}
.cart-empty__desc {
  font-size: 26rpx;
  color: $text-tertiary;
  margin-bottom: 48rpx;
}
.cart-empty__btn {
  background: linear-gradient(135deg, $color-primary 0%, #A0724D 100%);
  color: #fff;
  font-size: 28rpx;
  font-weight: 500;
  padding: 20rpx 80rpx;
  border-radius: 40rpx;
  box-shadow: 0 8rpx 24rpx rgba(139, 90, 43, 0.25);
  transition: transform 0.15s ease;
}
.cart-empty__btn:active {
  transform: scale(0.96);
}

/* ---- 自定义复选框 ---- */
.checkbox {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 3rpx solid #D0D0D0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  background-color: #fff;
}
.checkbox--checked {
  background: linear-gradient(135deg, $color-primary 0%, #A0724D 100%);
  border-color: $color-primary;
}
.checkbox__tick {
  color: #fff;
  font-size: 22rpx;
  font-weight: 700;
  line-height: 1;
}

/* ---- 商品列表 ---- */
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  background-color: $color-card-bg;
  border-radius: $radius-card;
  padding: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.04);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}
.cart-item:active {
  transform: scale(0.995);
}

.cart-item__check {
  flex-shrink: 0;
  padding: 8rpx;
}

.cart-item__img {
  width: 160rpx;
  height: 160rpx;
  min-width: 160rpx;
  border-radius: 16rpx;
  object-fit: cover;
  display: block;
  background-color: #f5f5f5;
}

.cart-item__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  min-width: 0;
}

.cart-item__name {
  font-size: 28rpx;
  color: $text-primary;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-item__spec {
  font-size: 22rpx;
  color: $text-tertiary;
  background-color: #F7F5F0;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  display: inline-block;
  align-self: flex-start;
}

.cart-item__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8rpx;
}

.cart-item__price {
  color: $text-danger;
  font-weight: 700;
  font-size: 32rpx;
}

/* ---- 数量步进器 ---- */
.qty-stepper {
  display: flex;
  align-items: center;
  gap: 0;
  background-color: #F7F5F0;
  border-radius: 24rpx;
  overflow: hidden;
}
.qty-stepper__btn {
  width: 56rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: $text-primary;
  font-weight: 600;
  transition: background-color 0.15s ease;
  cursor: pointer;
  user-select: none;
}
.qty-stepper__btn:active {
  background-color: rgba(139, 90, 43, 0.12);
}
.qty-stepper__btn--disabled {
  color: #D0D0D0;
  pointer-events: none;
}
.qty-stepper__val {
  width: 56rpx;
  text-align: center;
  font-size: 26rpx;
  color: $text-primary;
  font-weight: 500;
}

/* ---- 删除按钮 ---- */
.cart-item__del {
  background-color: rgba(192, 57, 43, 0.08);
  color: $text-danger;
  font-size: 24rpx;
  font-weight: 500;
  padding: 10rpx 24rpx;
  border-radius: 24rpx;
  border: 2rpx solid rgba(192, 57, 43, 0.2);
  transition: all 0.15s ease;
}
.cart-item__del:active {
  background-color: rgba(192, 57, 43, 0.15);
}

/* ---- 底部结算栏 ---- */
.cart-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 110rpx;
  background-color: $color-card-bg;
  padding: 20rpx 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4rpx 24rpx rgba(0, 0, 0, 0.06);
  z-index: 100;
}

.cart-bottom__left {
  display: flex;
  align-items: center;
}

.cart-bottom__check {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 8rpx;
}

.cart-bottom__label {
  font-size: 26rpx;
  color: $text-secondary;
}

.cart-bottom__right {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.cart-bottom__summary {
  display: flex;
  align-items: baseline;
}

.cart-bottom__total-label {
  font-size: 26rpx;
  color: $text-secondary;
}

.cart-bottom__total-price {
  font-size: 36rpx;
  color: $text-danger;
  font-weight: 700;
}

.cart-bottom__btn {
  background: linear-gradient(135deg, $color-primary 0%, #A0724D 100%);
  color: #fff;
  font-size: 28rpx;
  font-weight: 600;
  padding: 16rpx 40rpx;
  border-radius: 40rpx;
  box-shadow: 0 6rpx 20rpx rgba(139, 90, 43, 0.2);
  transition: transform 0.15s ease;
  white-space: nowrap;
}
.cart-bottom__btn:active {
  transform: scale(0.96);
}
</style>