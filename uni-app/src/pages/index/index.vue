<template>
  <view class="home">
    <view class="top-bar">
      <text class="logo" @click="toCategory">分类</text>
      <u-search v-model="keyword" placeholder="搜索药膳食材/养生方案" :show-action="false" shape="round" bgColor="#FDF6E3" @focus="toSearch" />
      <view class="top-actions">
        <text class="link" @click="toProfile">我的</text>
        <text class="link" @click="toService">客服</text>
      </view>
    </view>

    <view class="category-tabs">
      <u-tabs :list="tabs" :current="currentTab" @change="onTabChange" lineColor="#8B5A2B" :scrollable="true" />
    </view>

    <view class="banner">
      <u-swiper class="swiper" :list="banners" keyName="image" circular autoplay indicator :height="360" radius="20" />
    </view>

    <view class="hot-list">
      <SectionHeader title="热门生膳套餐" />
      <view class="list">
        <ProductCard v-for="item in goodsFiltered" :key="item.id" :item="item" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../../components/SectionHeader.vue'
import ProductCard from '../../components/ProductCard.vue'
import { goodsList } from '../../mock/goods.js'

const keyword = ref('')
const currentTab = ref(0)
const onTabChange = (e) => {
  currentTab.value = typeof e === 'number' ? e : e.index
}
const toCategory = () => uni.switchTab({ url: '/pages/tabbar/category/index' })
const toProfile = () => uni.switchTab({ url: '/pages/tabbar/profile/index' })
const toSearch = () => uni.navigateTo({ url: '/pages/common/search' })
const toService = () => {
  uni.showActionSheet({ itemList: ['在线客服', '拨打电话 400-123-456'], success(res){
    if (res.tapIndex === 0) uni.switchTab({ url: '/pages/tabbar/profile/index' })
    if (res.tapIndex === 1) uni.makePhoneCall({ phoneNumber: '400123456' })
  } })
}
const tabs = ref([
  { name: '补气养血' },
  { name: '健脾养胃' },
  { name: '清热降火' },
  { name: '滋阴润燥' },
  { name: '安神助眠' },
  { name: '润肺止咳' }
])
const banners = ref([
  { image: './illustration-health.svg', title: '健康管理' },
  { image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1200&q=60', title: '膳食平衡' },
  { image: 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?auto=format&fit=crop&w=1200&q=60', title: '清爽茶饮' }
])
const goods = ref(goodsList)
const goodsFiltered = computed(() => {
  const name = tabs.value[currentTab.value]?.name
  if (!name) return goods.value
  return goods.value.filter(g => (g.tags||[]).includes(name))
})
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
.search { flex: 1; }
.top-actions {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.link { color: $color-primary; }
.category-tabs {
  margin: 20rpx 0;
}
.tabs { white-space: nowrap; }
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