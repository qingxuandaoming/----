<template>
  <view class="home">
    <view class="top-bar">
      <text class="logo">分类</text>
      <input class="search" v-model="keyword" placeholder="搜索药膳食材/养生方案" />
      <view class="top-actions">
        <text>我的</text>
        <text>客服</text>
      </view>
    </view>

    <view class="category-tabs">
      <scroll-view scroll-x class="tabs">
        <view
          v-for="(t,i) in tabs"
          :key="i"
          class="tab"
          :class="{ active: currentTab===i }"
          @click="currentTab=i"
        >{{ t.name }}</view>
      </scroll-view>
    </view>

    <view class="banner">
      <swiper class="swiper" indicator-dots circular autoplay>
        <swiper-item v-for="(b, i) in banners" :key="i">
          <image :src="b.image" class="banner-img" mode="aspectFill" />
        </swiper-item>
      </swiper>
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
.logo { color: $color-primary; }
.search { flex: 1; background: $color-bg; border: 1rpx solid #e8e8e8; border-radius: 40rpx; padding: 14rpx 20rpx; }
.top-actions {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.category-tabs {
  margin: 20rpx 0;
}
.tabs { white-space: nowrap; }
.tab { display: inline-block; padding: 12rpx 18rpx; margin-right: 12rpx; border-radius: 30rpx; background: #fff; border: 1rpx solid #eee; }
.tab.active { color: #fff; background: $color-primary; border-color: $color-primary; }
.banner {
  margin-bottom: 24rpx;
}
.swiper { height: 360rpx; border-radius: 20rpx; overflow: hidden; }
.banner-img { width: 100%; height: 100%; }
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