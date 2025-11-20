<template>
  <component :is="currentComp" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import IndexPage from './pages/index/index.vue'
import LoginPage from './pages/login/index.vue'
import CategoryPage from './pages/category/index.vue'
import PointsPage from './pages/points/index.vue'
import TestIndexPage from './pages/test/index.vue'
import QuestionnairePage from './pages/test/questionnaire.vue'
import TestResultPage from './pages/test/result.vue'
import TestTongueScanPage from './pages/test/tongue-scan.vue'
import GoodsDetailPage from './pages/goods/detail.vue'
import CartPage from './pages/cart/index.vue'
import ProfilePage from './pages/profile/index.vue'
import VipPage from './pages/vip/index.vue'
import SearchPage from './pages/common/search.vue'
import OrderSuccessPage from './pages/order/success.vue'


const route = ref((typeof location !== 'undefined' && location.hash ? location.hash.slice(1) : '/pages/tabbar/home/index'))
const routesMap = {
  '/pages/tabbar/home/index': IndexPage,
  '/pages/tabbar/category/index': CategoryPage,
  '/pages/tabbar/test/index': TestIndexPage,
  '/pages/tabbar/cart/index': CartPage,
  '/pages/tabbar/profile/index': ProfilePage,
  '/pages/login/login': LoginPage,
  '/pages/common/search': SearchPage,
  '/pages/test/questionnaire': QuestionnairePage,
  '/pages/test/tongue-scan': TestTongueScanPage,
  '/pages/test/result': TestResultPage,
  '/pages/goods/detail': GoodsDetailPage,
  '/pages/marketing/points-mall': PointsPage,
  '/pages/marketing/vip-center': VipPage,
  '/pages/order/success': OrderSuccessPage
}
const currentComp = computed(() => routesMap[route.value] || IndexPage)

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      route.value = (location.hash || '').slice(1) || '/pages/tabbar/home/index'
    })
  }
})
</script>

<style lang="scss">
@import './uni.scss';
</style>
