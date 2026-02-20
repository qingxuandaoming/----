<template>
  <view class="about-container">
    <view class="banner">
      <text class="banner-title">辨体施膳</text>
      <text class="banner-sub">传承中医智慧，引领健康生活</text>
    </view>

    <view class="section">
      <view class="section-title">品牌介绍</view>
      <text class="section-content">
        “辨体施膳”致力于将传统中医体质学说与现代营养学相融合，为用户提供科学、个性化的健康管理方案。通过智能化的体质测试与舌苔分析，我们帮助用户深入了解自身健康状况，并提供针对性的饮食建议与优质的健康产品。
      </text>
    </view>

    <view class="section">
      <view class="section-title">我们的愿景</view>
      <text class="section-content">
        让每一个人都能掌握适合自己的健康密码，享受平衡、自然、充满活力的美好生活。
      </text>
    </view>

    <view class="section contact-box">
      <view class="section-title">联系我们</view>
      <u-cell-group :border="false">
        <u-cell title="官方客服" value="400-123-4567" icon="phone"></u-cell>
        <u-cell title="合作邮箱" value="bd@biantishishan.com" icon="email"></u-cell>
        <u-cell title="公司地址" value="科技创新产业园A座888室" icon="map"></u-cell>
      </u-cell-group>
    </view>
    
    <view class="footer">
      <text>Copyright © 2024 辨体施膳 版权所有</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped lang="scss">
.about-container {
  min-height: 100vh;
  background-color: #FDF6E3;
  padding-bottom: 40px;

  .banner {
    height: 200px;
    background: linear-gradient(135deg, #8B5A2B 0%, #A06F3D 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-bottom: 20px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    box-shadow: 0 4px 15px rgba(139, 90, 43, 0.2);

    .banner-title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 12px;
      letter-spacing: 2px;
    }

    .banner-sub {
      font-size: 14px;
      opacity: 0.9;
    }
  }

  .section {
    background-color: #fff;
    margin: 0 16px 16px 16px;
    padding: 24px 20px;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);

    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 16px;
      position: relative;
      padding-left: 12px;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 16px;
        background-color: #8B5A2B;
        border-radius: 2px;
      }
    }

    .section-content {
      font-size: 14px;
      color: #666;
      line-height: 1.8;
      text-align: justify;
    }
  }

  .contact-box {
    padding: 16px 8px;
  }

  .footer {
    margin-top: 40px;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
</style>
