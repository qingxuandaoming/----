<template>
  <component :is="currentComp" v-if="!hasUniRuntime" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import IndexPage from './pages/index/index.vue'
import LoginPage from './pages/login/index.vue'
import CategoryPage from './pages/category/index.vue'
import PointsPage from './pages/points/index.vue'
import TestIndexPage from './pages/test/index.vue'
import TestResultPage from './pages/test/result.vue'
import TestTonguePage from './pages/test/tongue.vue'
import GoodsDetailPage from './pages/goods/detail.vue'
import CartPage from './pages/cart/index.vue'
import ProfilePage from './pages/profile/index.vue'
import VipPage from './pages/vip/index.vue'

const hasUniRuntime = typeof window !== 'undefined' && typeof window.__uniRoutes !== 'undefined'

const route = ref((typeof location !== 'undefined' && location.hash ? location.hash.slice(1) : '/pages/index/index'))
const routesMap = {
  '/pages/index/index': IndexPage,
  '/pages/login/index': LoginPage,
  '/pages/category/index': CategoryPage,
  '/pages/points/index': PointsPage,
  '/pages/test/index': TestIndexPage,
  '/pages/test/result': TestResultPage,
  '/pages/test/tongue': TestTonguePage,
  '/pages/goods/detail': GoodsDetailPage,
  '/pages/cart/index': CartPage,
  '/pages/profile/index': ProfilePage,
  '/pages/vip/index': VipPage
}
const currentComp = computed(() => routesMap[route.value] || IndexPage)

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      route.value = (location.hash || '').slice(1) || '/pages/index/index'
    })
  }
})
</script>

<style lang="scss">
@import './uni.scss';
</style>
