<template>
  <view class="login-page">
    <image class="bg" src="https://picsum.photos/seed/health/1200/800" mode="aspectFill" />
    <view class="mask"></view>

    <view class="content">
      <view class="logo-wrap">
        <text class="brand">辨体施膳</text>
        <text class="leaf">🌿</text>
      </view>

      <u-form :model="form" class="form">
        <u-form-item>
          <u-input v-model="form.mobile" type="number" placeholder="请输入手机号" border="none" inputAlign="center" />
        </u-form-item>
        <u-form-item>
          <view class="row">
            <u-input v-model="form.code" type="number" placeholder="请输入验证码" border="none" />
            <u-button class="ghost" size="small" plain @click="sendCode" :disabled="countdown>0">
              {{ countdown>0 ? `${countdown}s` : '获取验证码' }}
            </u-button>
          </view>
        </u-form-item>
      </u-form>

      <u-button class="login-btn" type="primary" shape="circle" @click="login">登录</u-button>

      <view class="links">
        <text @click="toForgot">忘记密码</text>
        <text>|</text>
        <text @click="toRegister">新用户注册</text>
      </view>

      <view class="oauth">
        <image class="oauth-icon" src="https://img.icons8.com/fluency/48/wechat.png" />
        <image class="oauth-icon" src="https://img.icons8.com/color/48/alipay.png" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({ mobile: '', code: '' })
const countdown = ref(0)
let timer = null

const sendCode = () => {
  if (countdown.value > 0) return
  if (!/^1\d{10}$/.test(form.value.mobile)) {
    uni.showToast({ title: '请输入正确手机号', icon: 'none' })
    return
  }
  countdown.value = 60
  timer = setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
  uni.showToast({ title: '验证码已发送', icon: 'none' })
}

const login = () => {
  if (!form.value.mobile || !form.value.code) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  uni.showLoading({ title: '登录中' })
  setTimeout(() => {
    uni.hideLoading()
    uni.switchTab({ url: '/pages/index/index' })
  }, 800)
}

const toForgot = () => uni.showToast({ title: '敬请期待', icon: 'none' })
const toRegister = () => uni.showToast({ title: '敬请期待', icon: 'none' })
</script>

<style lang="scss" scoped>
.login-page { position: relative; min-height: 100vh; background-color: $color-bg; }
.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(90%) contrast(95%); }
.mask { position: absolute; inset: 0; background: rgba(253, 246, 227, 0.85); }
.content { position: relative; z-index: 1; padding: 80rpx 40rpx; display: flex; flex-direction: column; align-items: center; gap: 24rpx; }
.logo-wrap { display: flex; align-items: baseline; gap: 12rpx; }
.brand { font-family: $font-title; font-size: 48rpx; color: $color-primary; letter-spacing: 2rpx; }
.leaf { font-size: 40rpx; }
.form { width: 88%; display: flex; flex-direction: column; gap: 16rpx; }
.row { display: flex; gap: 12rpx; align-items: center; }
.ghost { border-radius: $radius-button; }
.login-btn { width: 88%; border-radius: $radius-button; box-shadow: 0 8rpx 24rpx rgba(139, 90, 43, 0.25); }
.links { display: flex; gap: 12rpx; color: $text-secondary; }
.oauth { margin-top: 20rpx; display: flex; gap: 24rpx; }
.oauth-icon { width: 48rpx; height: 48rpx; }
</style>