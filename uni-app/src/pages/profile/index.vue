<template>
  <view class="profile">
    <view class="header-card">
      <image class="avatar" src="https://picsum.photos/seed/avatar/200/200" mode="cover" />
      <view class="meta">
        <text class="name">{{ user.name }}</text>
        <view class="tags">
          <u-tag :text="'VIP '+user.vipLevel" type="success" plain />
          <u-tag :text="user.constitution" type="warning" plain />
        </view>
        <view class="stats">
          <view class="stat"><text>积分</text><text class="num">{{ user.points }}</text></view>
          <view class="stat"><text>健康分</text><text class="num">{{ user.healthScore }}</text></view>
        </view>
      </view>
    </view>

    <SectionHeader title="快捷入口" />
    <view class="quick">
      <u-button shape="circle" plain @click="toLogin">登录/切换账号</u-button>
      <u-button type="primary" shape="circle" @click="toVIP">会员中心</u-button>
      <u-button shape="circle" plain @click="toPoints">积分商城</u-button>
      <u-button shape="circle" plain @click="toTest">体质测试</u-button>
    </view>
  </view>
  </template>

<script setup>
import SectionHeader from '../../components/SectionHeader.vue'
import { userInfo as user } from '../../mock/user.js'
const toLogin = () => uni.navigateTo({ url: '/pages/login/login' })
const toVIP = () => uni.navigateTo({ url: '/pages/marketing/vip-center' })
const toPoints = () => uni.navigateTo({ url: '/pages/points/index' })
const toTest = () => uni.switchTab({ url: '/pages/tabbar/test/index' })
</script>

<style lang="scss" scoped>
.profile { padding: 24rpx; display: flex; flex-direction: column; gap: 20rpx; }
.header-card {
  display: flex; gap: 16rpx; align-items: center;
  background: linear-gradient(90deg, #FDF6E3, #fff);
  border-radius: $radius-card; padding: 16rpx;
}
.avatar { width: 120rpx; height: 120rpx; border-radius: 50%; }
.meta { display: flex; flex-direction: column; gap: 8rpx; }
.name { font-size: 32rpx; color: $text-primary; font-weight: 700; }
.tags { display: flex; gap: 8rpx; }
.stats { display: flex; gap: 20rpx; align-items: baseline; }
.stat { display: flex; align-items: baseline; gap: 8rpx; }
.num { font-size: 30rpx; color: $color-primary; font-weight: 700; }
.quick { display: grid; grid-template-columns: repeat(2,1fr); gap: 12rpx; }
</style>