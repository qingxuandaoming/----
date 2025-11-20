<template>
  <IndexPage v-if="!hasUniRuntime" />
</template>

<script setup>
import IndexPage from './pages/index/index.vue'
const hasUniRuntime = typeof window !== 'undefined' && typeof window.uni !== 'undefined' && typeof window.__uniRoutes !== 'undefined'
</script>

<style lang="scss">
@import './uni.scss';
</style>

<style lang="scss">
@import './uni.scss';
</style>
