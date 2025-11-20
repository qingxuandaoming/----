<template>
  <view class="page">
    <view class="row" style="flex-wrap:wrap">
      <image v-for="(src,idx) in imgs" :key="idx" :src="src" mode="aspectFill" style="width:48%;height:160px;margin-right:2%;margin-bottom:10px;border-radius:12px;border:1px solid #1f2937" />
    </view>
  </view>
</template>

<script setup>
const imgs=[
  '../../../0.jpg',
  '../../../1.jpg',
  '../../../2.jpg',
  '../../../3.jpg',
  '../../../4.jpg',
  '../../../5.jpg',
  '../../../6.jpg',
  '../../../7.jpg',
  '../../../8.jpg',
  '../../../9.jpg',
  '../../../10.jpg'
]
</script>

<style scoped>
</style>