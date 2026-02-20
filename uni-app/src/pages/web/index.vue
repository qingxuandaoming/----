<template>
  <view class="official-web-container">
    <!-- Header / Navbar -->
    <view class="navbar">
      <view class="nav-content">
        <view class="logo-area">
          <image class="logo-img" src="/static/logo.png" mode="aspectFit" />
          <text class="logo-text">辨体施膳</text>
        </view>
        <view class="nav-links">
          <text class="nav-item active">首页</text>
          <text class="nav-item" @click="goTo('/pages/web/about')">关于我们</text>
          <text class="nav-item" @click="goTo('/pages/web/download')">应用下载</text>
          <view class="nav-btn" @click="goTo('/pages/tabbar/home/index')">进入App版</view>
        </view>
      </view>
    </view>

    <!-- Hero Section -->
    <view class="hero-section">
      <view class="hero-content">
        <text class="hero-title">辨体施膳 - 您的私人中医健康管家</text>
        <text class="hero-subtitle">传承中医智慧，融合现代科技，为您提供量身定制的食疗养生方案。</text>
        <view class="hero-actions">
          <view class="primary-btn" @click="goTo('/pages/web/download')">下载应用</view>
          <view class="secondary-btn" @click="goTo('/pages/tabbar/home/index')">在线体验</view>
        </view>
      </view>
    </view>

    <!-- Features Section -->
    <view class="features-section">
      <text class="section-title">核心功能</text>
      <view class="features-grid">
        <view class="feature-card">
          <view class="icon-wrap">
            <u-icon name="scan" size="40" color="#8B5A2B"></u-icon>
          </view>
          <text class="card-title">智能辨体</text>
          <text class="card-desc">结合中医理论与AI技术，通过舌面诊分析，准确辨识您的体质类型。</text>
        </view>
        <view class="feature-card">
          <view class="icon-wrap">
            <u-icon name="list" size="40" color="#8B5A2B"></u-icon>
          </view>
          <text class="card-title">定制膳食</text>
          <text class="card-desc">根据您的体质测试结果，为您精准推荐药膳食谱和日常饮食宜忌。</text>
        </view>
        <view class="feature-card">
          <view class="icon-wrap">
            <u-icon name="shopping-bag" size="40" color="#8B5A2B"></u-icon>
          </view>
          <text class="card-title">养生商城</text>
          <text class="card-desc">严选优质药食同源食材及滋补佳品，一站式满足您的健康生活需求。</text>
        </view>
      </view>
    </view>

    <!-- Footer Section -->
    <view class="footer">
      <view class="footer-content">
        <view class="footer-links">
          <text class="footer-link" @click="goTo('/pages/web/about')">关于辨体施膳</text>
          <text class="footer-divider">|</text>
          <text class="footer-link" @click="goTo('/pages/web/download')">下载中心</text>
          <text class="footer-divider">|</text>
          <text class="footer-link">联系客服</text>
        </view>
        <text class="copyright">Copyright © 2024. 辨体施膳 版权所有</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted } from 'vue'

const goTo = (url) => {
  // 如果是前往 tabbar 页面，需要使用 switchTab
  if (url.includes('tabbar')) {
    uni.switchTab({ url })
    return
  }
  
  uni.navigateTo({
    url
  })
}
</script>

<style scoped lang="scss">
.official-web-container {
  min-height: 100vh;
  background-color: #FAFAFA;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(253, 246, 227, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.logo-text {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-item {
  font-size: 16px;
  color: #555;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #8B5A2B;
  }
  
  &.active {
    color: #8B5A2B;
    font-weight: bold;
  }
}

.nav-btn {
  padding: 8px 20px;
  background-color: transparent;
  color: #8B5A2B;
  border: 1px solid #8B5A2B;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #8B5A2B;
    color: #fff;
  }
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #FDF6E3 0%, #EFE1C6 100%);
  padding: 100px 20px;
  text-align: center;
  overflow: hidden;
}

/* 装饰性光晕 */
.hero-section::before {
  content: '';
  position: absolute;
  top: -50px;
  left: -50px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: -100px;
  right: -50px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 90, 43, 0.1) 0%, rgba(139, 90, 43, 0) 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.hero-title {
  display: block;
  font-size: 48px;
  font-weight: 800;
  color: #333;
  margin-bottom: 24px;
  line-height: 1.2;
  letter-spacing: 2px;
}

.hero-subtitle {
  display: block;
  font-size: 20px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.primary-btn {
  padding: 14px 40px;
  background-color: #8B5A2B;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(139, 90, 43, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 90, 43, 0.4);
  }
}

.secondary-btn {
  padding: 14px 40px;
  background-color: #fff;
  color: #8B5A2B;
  font-size: 18px;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
}

/* Features Section */
.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  text-align: center;
}

.section-title {
  display: block;
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 50px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: #8B5A2B;
    border-radius: 2px;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.feature-card {
  background-color: #fff;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(139, 90, 43, 0.08);
  }
}

.icon-wrap {
  width: 80px;
  height: 80px;
  background-color: #FDF6E3;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

.card-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}

.card-desc {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
}

/* Footer Section */
.footer {
  background-color: #2C2C2C;
  color: #999;
  padding: 40px 20px;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-link {
  font-size: 14px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
}

.footer-divider {
  font-size: 14px;
  color: #666;
}

.copyright {
  font-size: 12px;
}

/* 响应式设计 (针对移动端 H5 竖屏) */
@media (max-width: 768px) {
  .nav-links {
    display: none; // 移动端简化导航，避免拥挤，可扩展为汉堡菜单
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .hero-actions {
    flex-direction: column;
    gap: 15px;
  }
  
  .primary-btn, .secondary-btn {
    width: 100%;
    box-sizing: border-box;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .feature-card {
    padding: 30px 20px;
  }
}
</style>
