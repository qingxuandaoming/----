<template>
  <view class="app-root">
    <slot />
  </view>
</template>

<script setup>
import { onLaunch } from '@dcloudio/uni-app'
onLaunch(() => {})
</script>

<style lang="scss">
@import './uni.scss';
.app-root{background-color:$bg;min-height:100vh;color:$text}
</style>