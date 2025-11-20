<template>
  <view class="home">
    <view class="top-bar">
      <u-icon name="grid" size="26" color="#8B5A2B"></u-icon>
      <u-search v-model="keyword" placeholder="搜索药膳食材/养生方案" shape="round" :showAction="false"></u-search>
      <view class="top-actions">
        <u-icon name="account" size="26" color="#8B5A2B"></u-icon>
        <u-icon name="kefu" size="26" color="#8B5A2B"></u-icon>
      </view>
    </view>

    <view class="category-tabs">
      <u-tabs :list="tabs" v-model="currentTab" scrollable lineColor="#8B5A2B" :activeStyle="{color: '#8B5A2B', fontWeight: '600'}"></u-tabs>
    </view>

    <view class="banner">
      <u-swiper :list="banners" height="180" border-radius="20" indicator></u-swiper>
    </view>

    <view class="hot-list">
      <SectionHeader title="热门生膳套餐" />
      <view class="list">
        <ProductCard v-for="item in goods" :key="item.id" :item="item" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeader from '../../components/SectionHeader.vue'
import ProductCard from '../../components/ProductCard.vue'
import { goodsList } from '../../mock/goods.js'

const keyword = ref('')
const currentTab = ref(0)
const tabs = ref([
  { name: '补气养血' },
  { name: '健脾养胃' },
  { name: '清热降火' },
  { name: '滋阴润燥' },
  { name: '安神助眠' },
  { name: '润肺止咳' }
])
const banners = ref([
  { image: 'https://picsum.photos/seed/winter/800/400', title: '冬季温补' },
  { image: 'https://picsum.photos/seed/autumn/800/400', title: '秋季润燥' },
  { image: 'https://picsum.photos/seed/summer/800/400', title: '夏季滋阴' }
])
const goods = ref(goodsList)
</script>

<style lang="scss" scoped>
.home {
  padding: 24rpx;
}
.top-bar {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.top-actions {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.category-tabs {
  margin: 20rpx 0;
}
.banner {
  margin-bottom: 24rpx;
}
.hot-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>