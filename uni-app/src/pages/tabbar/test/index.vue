<template>
  <view class="test-home">
    <view class="banner-container">
      <image class="banner" :src="testBannerImage" mode="aspectFill" />
      <view class="banner-overlay"></view>
      <view class="banner-text">
        <text class="banner-title">中医体质辨识</text>
        <text class="banner-desc">了解自己的体质，获取最适合你的养生膳食方案</text>
      </view>
    </view>

    <view class="action-section">
      <view class="action-card primary" @click="toQuestionnaire">
        <view class="icon-box">
          <u-icon name="list-dot" color="#8B5A2B" size="32"></u-icon>
        </view>
        <view class="action-info">
          <text class="action-title">标准问卷辨体</text>
          <text class="action-desc">通过60道专业中医测试题，精准判断体质</text>
        </view>
        <u-icon name="arrow-right" color="#8B5A2B" size="16"></u-icon>
      </view>
      
      <view class="action-card secondary" @click="toTongueScan">
        <view class="icon-box">
          <u-icon name="camera" color="#8b5a2b" size="32"></u-icon>
        </view>
        <view class="action-info">
          <text class="action-title">AI 智能舌诊</text>
          <text class="action-desc">拍照上传舌苔照片，AI 快速分析您的健康状况</text>
        </view>
        <u-icon name="arrow-right" color="#8b5a2b" size="16"></u-icon>
      </view>
    </view>

    <view class="history-section">
      <SectionHeader title="最近测试记录" />
      <view class="history" v-if="history.length">
        <view class="history-item" v-for="(h,i) in history" :key="i">
          <view class="history-left">
            <u-icon name="clock" color="#999" size="16"></u-icon>
            <text class="date">{{ h.date }}</text>
          </view>
          <view class="history-right">
            <text class="res">{{ h.result }}</text>
          </view>
        </view>
      </view>
      <view v-else class="empty">
        <u-empty mode="history" icon="http://cdn.uviewui.com/uview/empty/history.png" text="暂无测试记录" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeader from '../../../components/SectionHeader.vue'

const testBannerImage = ref('/static/tcm_test_banner.png')
const history = ref(uni.getStorageSync('test_history') || [
  { date: '2026-02-18', result: '气虚质' },
  { date: '2026-01-05', result: '平和质' }
])
const toQuestionnaire = () => uni.navigateTo({ url: '/pages/test/questionnaire' })
const toTongueScan = () => uni.navigateTo({ url: '/pages/test/tongue-scan' })
</script>

<style lang="scss" scoped>
.test-home { 
  display: flex; 
  flex-direction: column; 
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  background-color: #FDF6E3;
  box-sizing: border-box;
}
.banner-container {
  position: relative;
  width: 100%;
  height: 480rpx;
}
.banner {
  width: 100%;
  height: 100%;
}
.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(253,246,227,1));
}
.banner-text {
  position: absolute;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.banner-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
}
.banner-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.action-section {
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-top: -20rpx;
  position: relative;
  z-index: 10;
  box-sizing: border-box;
}
.action-card {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-radius: 20rpx;
  background: #fff;
  box-shadow: 0 4rpx 16rpx rgba(139, 90, 43, 0.05);
  gap: 24rpx;
  box-sizing: border-box;
}
.action-card:active {
  opacity: 0.8;
}
.primary {
  border: 2rpx solid rgba(139, 90, 43, 0.1);
}
.secondary {
  border: 2rpx solid rgba(139, 90, 43, 0.1);
}
.icon-box {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  background: #FDF6E3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.action-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #333;
}
.action-desc {
  font-size: 24rpx;
  color: #888;
}

.history-section {
  padding: 40rpx 30rpx;
  box-sizing: border-box;
}
.history { 
  display: flex; 
  flex-direction: column; 
  gap: 20rpx; 
  margin-top: 20rpx;
}
.history-item { 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  background-color: #fff; 
  border-radius: 16rpx; 
  padding: 24rpx 30rpx; 
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.02);
  box-sizing: border-box;
}
.history-left {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.date {
  font-size: 28rpx;
  color: #666;
}
.res { 
  color: #8B5A2B; 
  font-weight: bold;
  font-size: 30rpx;
}
.empty { 
  margin-top: 40rpx;
}
</style>