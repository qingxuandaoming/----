<template>
  <view class="points-page">
    <view class="banner">
      <text class="title">积分商城</text>
      <view class="points">
        <text>当前积分</text>
        <text class="num">{{ user.points }}</text>
      </view>
    </view>
    <SectionHeader title="精选兑换" />
    <view class="list">
      <view class="card" v-for="item in goods" :key="item.id">
        <image :src="item.image" class="thumb" mode="aspectFill" />
        <view class="info">
          <text class="name">{{ item.name }}</text>
          <text class="desc">{{ item.desc || '营养均衡，适合大众' }}</text>
          <view class="row">
            <text class="pts">{{ pointsPrice(item) }} 积分</text>
            <u-button type="primary" size="small" shape="circle">兑换</u-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeader from '../../components/SectionHeader.vue'
import { userInfo as user } from '../../mock/user.js'
import { goodsList } from '../../mock/goods.js'

const goods = ref(goodsList)
const pointsPrice = (item) => Math.round((item.price || 20) * 100)
</script>

<style lang="scss" scoped>
.points-page { padding: 24rpx; display: flex; flex-direction: column; gap: 20rpx; }
.banner { background: linear-gradient(90deg, #FDF6E3, #fff); border-radius: $radius-card; padding: 20rpx; display: flex; justify-content: space-between; align-items: center; }
.title { font-size: 32rpx; color: $text-primary; }
.points { display: flex; align-items: baseline; gap: 12rpx; }
.num { font-size: 42rpx; color: $color-primary; font-weight: 700; }
.list { display: flex; flex-direction: column; gap: 16rpx; }
.card { display: flex; gap: 16rpx; background-color: $color-card-bg; border-radius: $radius-card; padding: 16rpx; }
.thumb { width: 160rpx; height: 160rpx; border-radius: 16rpx; }
.info { flex: 1; display: flex; flex-direction: column; gap: 10rpx; }
.name { font-size: 28rpx; color: $text-primary; }
.desc { font-size: 24rpx; color: $text-secondary; }
.row { display: flex; justify-content: space-between; align-items: center; }
.pts { color: $color-secondary; font-weight: 600; }
</style>