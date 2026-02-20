<template>
  <view class="profile">
    <view class="header-card" :style="{ backgroundImage: 'url(' + profileBg + ')' }">
      <view class="overlay"></view>
      <view class="header-content">
        <image class="avatar" src="https://picsum.photos/seed/avatar/200/200" mode="cover" />
        <view class="meta">
          <text class="name">{{ user.name }}</text>
          <view class="tags">
            <u-tag :text="'VIP '+user.vipLevel" type="warning" plain size="mini" />
            <u-tag :text="user.constitution" type="success" plain size="mini" />
          </view>
        </view>
      </view>
      <view class="stats-card">
        <view class="stat" @click="toPoints">
          <text class="num">{{ user.points }}</text>
          <text class="label">积分</text>
        </view>
        <view class="stat">
          <text class="num">{{ user.healthScore }}</text>
          <text class="label">健康分</text>
        </view>
        <view class="stat" @click="toVIP">
          <u-icon name="kefu-ermai" size="24" color="#8B5A2B"></u-icon>
          <text class="label mt">会员中心</text>
        </view>
      </view>
    </view>

    <view class="main-content">
      <SectionHeader title="我的服务" />
      <view class="quick">
        <view class="quick-item" @click="toTest">
          <view class="icon-wrap bg-primary">
            <u-icon name="heart-fill" color="#fff" size="24"></u-icon>
          </view>
          <text>体质测试</text>
        </view>
        <view class="quick-item" @click="toOrders">
          <view class="icon-wrap bg-warning">
            <u-icon name="order" color="#fff" size="24"></u-icon>
          </view>
          <text>我的订单</text>
        </view>
        <view class="quick-item" @click="toCollection">
          <view class="icon-wrap bg-success">
            <u-icon name="star-fill" color="#fff" size="24"></u-icon>
          </view>
          <text>我的收藏</text>
        </view>
        <view class="quick-item" @click="toSettings">
          <view class="icon-wrap bg-info">
            <u-icon name="setting-fill" color="#fff" size="24"></u-icon>
          </view>
          <text>设置</text>
        </view>
      </view>

      <view class="logout-btn">
        <u-button shape="circle" plain color="#8B5A2B" @click="toLogin">退出/切换账号</u-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeader from '../../components/SectionHeader.vue'
import { userInfo as user } from '../../mock/user.js'
import profileBgImage from '@/static/tcm_profile_bg.png'

const profileBg = ref(profileBgImage)
const toLogin = () => uni.navigateTo({ url: '/pages/login/login' })
const toVIP = () => uni.navigateTo({ url: '/pages/marketing/vip-center' })
const toPoints = () => uni.navigateTo({ url: '/pages/points/index' })
const toTest = () => uni.switchTab({ url: '/pages/tabbar/test/index' })
const toOrders = () => uni.showToast({ title: '敬请期待', icon: 'none' })
const toCollection = () => uni.showToast({ title: '敬请期待', icon: 'none' })
const toSettings = () => uni.showToast({ title: '敬请期待', icon: 'none' })
</script>

<style lang="scss" scoped>
.profile { 
  display: flex; 
  flex-direction: column; 
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  background-color: #FDF6E3;
  box-sizing: border-box;
}
.header-card {
  position: relative;
  padding: 60rpx 40rpx 100rpx;
  background-size: cover;
  background-position: center;
  border-bottom-left-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(139, 90, 43, 0.1);
  overflow: visible;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  border-bottom-left-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
}
.header-content {
  position: relative;
  z-index: 1;
  display: flex; 
  gap: 30rpx; 
  align-items: center;
}
.avatar { 
  width: 140rpx; 
  height: 140rpx; 
  border-radius: 50%; 
  border: 4rpx solid #fff;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}
.meta { 
  display: flex; 
  flex-direction: column; 
  gap: 12rpx; 
}
.name { 
  font-size: 40rpx; 
  color: #333; 
  font-weight: bold; 
}
.tags { 
  display: flex; 
  gap: 12rpx; 
}
.stats-card {
  position: absolute;
  bottom: -60rpx;
  left: 40rpx;
  right: 40rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 8rpx 24rpx rgba(139, 90, 43, 0.08);
  z-index: 2;
  box-sizing: border-box;
}
.stat { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 8rpx; 
  flex: 1;
}
.num { 
  font-size: 36rpx; 
  color: #8B5A2B; 
  font-weight: bold; 
}
.label { 
  font-size: 24rpx; 
  color: #666; 
}
.mt {
  margin-top: 4rpx;
}
.main-content {
  padding: 100rpx 30rpx 40rpx;
  flex: 1;
  box-sizing: border-box;
}
.quick { 
  display: grid; 
  grid-template-columns: repeat(4, 1fr); 
  gap: 20rpx; 
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx 20rpx;
  margin-top: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.02);
}
.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  font-size: 24rpx;
  color: #333;
}
.icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-primary { background: linear-gradient(135deg, #A87C51, #8B5A2B); }
.bg-warning { background: linear-gradient(135deg, #F3C258, #E2A018); }
.bg-success { background: linear-gradient(135deg, #70A880, #4A7C59); }
.bg-info { background: linear-gradient(135deg, #8CA5C0, #5B7A9C); }
.logout-btn {
  margin-top: 60rpx;
  padding: 0 40rpx;
}
</style>