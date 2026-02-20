<template>
  <view class="home">
    <!-- #ifdef H5 -->
    <view class="official-web-banner" @click="toWebHome">
      <text class="banner-text">欢迎访问辨体施膳官网，了解更多</text>
      <u-icon name="arrow-right" color="#8B5A2B" size="14"></u-icon>
    </view>
    <!-- #endif -->
    <view class="top-bar">
      <view class="logo" @click="toCategory">
        <u-icon name="grid" color="#8B5A2B" size="26"></u-icon>
      </view>
      <view class="search">
        <u-search v-model="keyword" placeholder="搜索药膳食材/养生方案" :show-action="false" shape="round" bgColor="#FDF6E3" @focus="toSearch" />
      </view>
      <view class="top-actions">
        <u-icon name="account" color="#8B5A2B" size="28" @click="toProfile"></u-icon>
        <u-icon name="server-man" color="#8B5A2B" size="28" @click="toService"></u-icon>
      </view>
    </view>

    <view class="category-tabs">
      <u-tabs :list="tabs" :current="currentTab" @change="onTabChange" lineColor="#8B5A2B" :scrollable="true" />
    </view>

    <view class="banner">
      <u-swiper class="swiper" :list="banners" keyName="image" circular autoplay indicator height="300rpx" radius="20" />
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

import banner1 from '../../static/tcm_diet_banner.png'
import banner2 from '../../static/tcm_banner_balance.png'
import banner3 from '../../static/tcm_banner_tea.png'

const banners = ref([
  { image: banner1, title: '健康管理' },
  { image: banner2, title: '膳食平衡' },
  { image: banner3, title: '清爽茶饮' }
])
const goods = ref(goodsList)
const goodsFiltered = computed(() => {
  const name = tabs.value[currentTab.value]?.name
  if (!name) return goods.value
  return goods.value.filter(g => (g.tags||[]).includes(name))
})
</script>

<style lang="scss" scoped>
/* #ifdef H5 */
.official-web-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #FDF6E3 0%, #EFE1C6 100%);
  padding: 16rpx 24rpx;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  cursor: pointer;
  box-sizing: border-box;
}
.banner-text {
  font-size: 26rpx;
  color: #8B5A2B;
  font-weight: 500;
}
/* #endif */

.home {
  padding: 32rpx 24rpx;
  box-sizing: border-box;
  background-color: #FAFAFA;
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
}
.top-bar {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 12rpx;
}
.logo { 
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-primary;
  padding: 8rpx;
}
.search { flex: 1; }
.top-actions {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding-left: 10rpx;
}
.category-tabs {
  margin: 20rpx 0;
}
.tabs { white-space: nowrap; }
.banner {
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(139, 90, 43, 0.08);
  border-radius: 20rpx;
}
.swiper { height: 300rpx; border-radius: 20rpx; overflow: hidden; }
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