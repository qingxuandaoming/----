<template>
  <view class="search-page">
    <u-search v-model="keyword" placeholder="搜索药膳/功效" shape="round" bgColor="#FDF6E3" @search="onSearch" />
    <view class="results">
      <ProductCard v-for="item in filtered" :key="item.id" :item="item" />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { goodsList } from '../mock/goods.js'

const keyword = ref('')
const filtered = computed(() => {
  const k = keyword.value.trim()
  if (!k) return goodsList
  return goodsList.filter(g => (g.name + (g.desc||'') + (g.tags||[]).join(','))
    .toLowerCase().includes(k.toLowerCase()))
})
const onSearch = () => {}
</script>

<style lang="scss" scoped>
.search-page { padding: 24rpx; display: flex; flex-direction: column; gap: 20rpx; }
.results { display: flex; flex-direction: column; gap: 16rpx; }
</style>