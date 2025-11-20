<template>
  <view class="test-home">
    <view class="card">
      <text class="title">体质测试</text>
      <text class="desc">选择测试方式，获取个性化饮食推荐</text>
      <view class="entry">
        <u-button type="primary" shape="circle" @click="toQuestionnaire">问卷测试</u-button>
        <u-button shape="circle" plain @click="toTongueScan">AI舌诊</u-button>
      </view>
    </view>
    <SectionHeader title="历史记录" />
    <view class="history" v-if="history.length">
      <view class="item" v-for="(h,i) in history" :key="i">
        <text>{{ h.date }}</text>
        <text class="res">{{ h.result }}</text>
      </view>
    </view>
    <view v-else class="empty">
      <text class="tip">暂无历史记录</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeader from '../../components/SectionHeader.vue'

const history = ref(uni.getStorageSync('test_history') || [])
const toQuestionnaire = () => uni.navigateTo({ url: '/pages/test/questionnaire' })
const toTongueScan = () => uni.navigateTo({ url: '/pages/test/tongue-scan' })
</script>

<style lang="scss" scoped>
.test-home { padding: 24rpx; display: flex; flex-direction: column; gap: 20rpx; }
.card { background-color: $color-card-bg; border-radius: $radius-card; padding: 24rpx; display: flex; flex-direction: column; gap: 12rpx; }
.title { font-size: 34rpx; color: $text-primary; font-weight: 700; }
.desc { color: $text-secondary; }
.entry { display: flex; gap: 12rpx; }
.history { display: flex; flex-direction: column; gap: 12rpx; }
.item { display: flex; justify-content: space-between; background-color: $color-card-bg; border-radius: $radius-card; padding: 16rpx; }
.res { color: $color-secondary; }
.empty { display: flex; justify-content: center; color: $text-secondary; }
.tip { color: $text-secondary; }
</style>