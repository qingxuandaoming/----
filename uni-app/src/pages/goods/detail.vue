<template>
  <view class="detail-page">
    <u-swiper :list="images" keyName="image" indicator circular :height="380" radius="20" />
    <view class="basic">
      <text class="name">{{ item?.name }}</text>
      <text class="desc">{{ item?.desc || '营养均衡' }}</text>
      <view class="row">
        <text class="price">¥{{ (item?.price || 0).toFixed(2) }}</text>
        <text class="sold">月销 {{ item?.sales || 0 }}</text>
      </view>
      <view class="shop">
        <text>店铺：本草养生馆</text>
      </view>
    </view>
    <view class="bottom-bar">
      <u-number-box v-model="quantity" :min="1" :max="99" integer />
      <view class="btns">
        <u-button shape="circle" plain @click="onAddCart">加入购物车</u-button>
        <u-button type="primary" shape="circle" @click="onBuyNow">立即购买</u-button>
      </view>
    </view>
    <SectionHeader title="Ingredients" />
    <view class="ingredients" v-if="item?.ingredients?.length">
      <view class="ing" v-for="(ing, i) in item.ingredients" :key="i">
        <text class="ing-name">{{ ing.name }}</text>
        <text class="ing-eff">{{ ing.efficacy }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import SectionHeader from '../../components/SectionHeader.vue'
import { goodsList } from '../../mock/goods.js'

const item = ref(null)
const images = ref([])
const quantity = ref(1)

onLoad((query) => {
  const id = Number(query.id || 1)
  const found = goodsList.find(g => g.id === id) || goodsList[0]
  item.value = found
  images.value = [{ image: found.image }]
})

const onAddCart = () => {
  uni.showToast({ title: '已加入购物车', icon: 'none' })
}
const onBuyNow = () => {
  uni.switchTab({ url: '/pages/cart/index' })
}
</script>

<style lang="scss" scoped>
.detail-page { padding: 24rpx; padding-bottom: 160rpx; display: flex; flex-direction: column; gap: 20rpx; }
.basic { display: flex; flex-direction: column; gap: 12rpx; background-color: $color-card-bg; border-radius: $radius-card; padding: 16rpx; }
.name { font-size: 34rpx; color: $text-primary; font-weight: 700; }
.desc { color: $text-secondary; }
.row { display: flex; justify-content: space-between; align-items: center; }
.price { color: $text-danger; font-size: 32rpx; font-weight: 600; }
.sold { color: $text-secondary; }
.shop { color: $text-secondary; }
.ingredients { display: flex; flex-direction: column; gap: 12rpx; }
.ing { display: flex; justify-content: space-between; background-color: $color-card-bg; border-radius: $radius-card; padding: 16rpx; }
.ing-name { color: $text-primary; }
.ing-eff { color: $text-secondary; }
.bottom-bar { position: fixed; left: 0; right: 0; bottom: 0; background-color: $color-card-bg; padding: 16rpx 24rpx; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 -6rpx 20rpx rgba(0,0,0,0.06); }
.btns { display: flex; gap: 12rpx; }
</style>