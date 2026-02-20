<template>
  <view class="download-container">
    <view class="header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="title">辨体施膳 App</text>
      <text class="subtitle">您的私人中医健康管家</text>
    </view>
    
    <view class="content">
      <view class="feature-item">
        <u-icon name="scan" size="32" color="#8B5A2B"></u-icon>
        <text class="desc">智能舌苔检测</text>
      </view>
      <view class="feature-item">
        <u-icon name="file-text" size="32" color="#8B5A2B"></u-icon>
        <text class="desc">专业体质问卷</text>
      </view>
      <view class="feature-item">
        <u-icon name="shopping-bag" size="32" color="#8B5A2B"></u-icon>
        <text class="desc">严选健康好物</text>
      </view>
    </view>

    <view class="download-actions">
      <u-button 
        type="primary" 
        shape="circle" 
        customStyle="background-color: #8B5A2B; border-color: #8B5A2B; width: 80%; margin-bottom: 20px;"
        @click="handleDownload('android')"
      >
        <u-icon name="android-fill" color="#fff" size="20" style="margin-right: 8px;"></u-icon>
        Android 版下载
      </u-button>

      <u-button 
        type="primary" 
        shape="circle" 
        customStyle="background-color: #333; border-color: #333; width: 80%;"
        @click="handleDownload('ios')"
      >
        <u-icon name="apple-fill" color="#fff" size="20" style="margin-right: 8px;"></u-icon>
        iOS 版敬请期待
      </u-button>
    </view>

    <view class="scan-box">
      <text class="scan-text">或使用手机扫描二维码下载</text>
      <!-- Placeholder for QR Code -->
      <view class="qr-placeholder">二维码区域</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const handleDownload = (platform) => {
  if (platform === 'android') {
    // 实际项目中替换为真实的应用包下载地址
    uni.showToast({
      title: '开始下载 Android 客户端',
      icon: 'none'
    })
    window.location.href = '/download/app-release.apk'
  } else {
    uni.showToast({
      title: 'iOS版正在加紧研发中',
      icon: 'none'
    })
  }
}
</script>

<style scoped lang="scss">
.download-container {
  min-height: 100vh;
  background-color: #FDF6E3;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;

    .logo {
      width: 100px;
      height: 100px;
      margin-bottom: 16px;
      border-radius: 20px;
      background-color: #fff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 14px;
      color: #666;
    }
  }

  .content {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
    background: #fff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(139, 90, 43, 0.05);

    .feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .desc {
        margin-top: 8px;
        font-size: 12px;
        color: #666;
      }
    }
  }

  .download-actions {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }

  .scan-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .scan-text {
      font-size: 12px;
      color: #999;
      margin-bottom: 12px;
    }

    .qr-placeholder {
      width: 120px;
      height: 120px;
      background-color: #fff;
      border: 1px dashed #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ccc;
      font-size: 12px;
      border-radius: 8px;
    }
  }
}
</style>
