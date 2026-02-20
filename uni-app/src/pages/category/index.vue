<template>
  <view class="category">
    <view class="sidebar">
      <view v-for="(m,i) in menus" :key="i" :class="['m-item', current===i?'active':'']" @click="onMenuClick(i)">
        <image class="m-icon" :src="menuIcons[i]" mode="widthFix"/>
        <text>{{ m }}</text>
      </view>
    </view>
    <view class="content">
      <view v-for="(sec, i) in sections" :key="i" :id="'sec-'+i" class="section">
        <SectionHeader :title="sec.title" />
        <view class="list">
          <ProductCard v-for="g in sec.items" :key="g.id" :item="g" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../../components/SectionHeader.vue'
import ProductCard from '../../components/ProductCard.vue'
import { goodsList } from '../../mock/goods.js'

const menus = ['汤膳','糕点','茶饮','粥膳']
const menuIcons = ['./icon-soup.svg','./icon-dessert.svg','./icon-tea.svg','./icon-porridge.svg']
const current = ref(0)
const sections = computed(() => [
  { title: '汤膳', items: goodsList.filter(g => (g.tags||[]).includes('滋阴润燥') || (g.tags||[]).includes('补气养血') || (g.tags||[]).includes('清热降火')) },
  { title: '糕点', items: goodsList.filter(g => (g.tags||[]).includes('糕点')) },
  { title: '茶饮', items: goodsList.filter(g => (g.tags||[]).includes('清热')) },
  { title: '粥膳', items: goodsList.filter(g => (g.tags||[]).includes('粥膳')) }
])

const onMenuClick = (i) => {
  current.value = i
  // Use setTimeout to allow DOM to update before scrolling
  setTimeout(() => {
    const el = document.getElementById('sec-' + i)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 50)
}
</script>

<style lang="scss" scoped>
.category { padding: 0; }
.sidebar {
  position: fixed;
  left: 0;
  top: 44px;
  bottom: 50px;
  width: 220rpx;
  background: #faf6e9;
  overflow-y: auto;
  z-index: 10;
}
.content {
  margin-left: 220rpx;
  padding: 24rpx;
}
.m-item { padding: 20rpx; border-bottom: 1rpx solid #eee; color: $text-secondary; display: flex; align-items: center; gap: 12rpx; cursor: pointer; }
.m-icon { width: 32rpx; }
.active { color: $color-primary; font-weight: 600; background: #fff; }
.section { display: flex; flex-direction: column; gap: 12rpx; margin-bottom: 16rpx; }
.list { display: flex; flex-direction: column; gap: 12rpx; }
</style>