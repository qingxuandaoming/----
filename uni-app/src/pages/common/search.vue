<template>
  <view class="search-page">
    <u-search v-model="keyword" placeholder="搜索药膳/功效" shape="round" bgColor="#FDF6E3" @search="onSearch" />
    <view v-if="filtered.length" class="results">
      <ProductCard v-for="item in filtered" :key="item.id" :item="item" />
    </view>
    <view v-else class="empty">
      <image class="empty-img" :src="emptySrc" mode="widthFix" />
      <view class="suggests">
        <u-tag text="清热" plain type="warning" @click="keyword='清热'" />
        <u-tag text="补气养血" plain type="success" @click="keyword='补气养血'" />
        <u-tag text="滋阴润燥" plain type="primary" @click="keyword='滋阴润燥'" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../../components/ProductCard.vue'
import { goodsList } from '../../mock/goods.js'

const keyword = ref('')
const emptySrc = '/empty-search.svg'
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
.empty { display: flex; flex-direction: column; align-items: center; gap: 16rpx; background: $color-card-bg; border-radius: $radius-card; padding: 24rpx; }
.empty-img { width: 320rpx; }
.suggests { display: flex; gap: 12rpx; }
</style>