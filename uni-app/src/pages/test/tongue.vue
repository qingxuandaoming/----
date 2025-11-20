<template>
  <view class="tongue-page">
    <view class="camera">
      <view class="overlay">
        <view class="guide"></view>
        <text class="hint">请对准舌头轮廓拍摄</text>
      </view>
    </view>
    <view class="actions">
      <u-button shape="circle" plain @click="pickFromAlbum">相册上传</u-button>
      <u-button type="primary" shape="circle" @click="takePhoto">拍摄</u-button>
    </view>

    <u-popup :show="showResult" mode="center" @close="showResult=false">
      <view class="result">
        <image v-if="img" :src="img" class="preview" mode="aspectFit" />
        <text class="res-title">分析结果：湿热体质</text>
        <text class="res-desc">建议清热祛湿：薏米赤小豆汤、绿豆百合汤</text>
        <u-button type="primary" shape="circle" @click="toAdapt">查看适配药膳</u-button>
      </view>
    </u-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const img = ref('')
const showResult = ref(false)

const pickFromAlbum = () => {
  uni.chooseImage({ count: 1, sourceType: ['album'], success(res){ img.value = res.tempFilePaths?.[0] || ''; showResult.value = true } })
}
const takePhoto = () => {
  uni.chooseImage({ count: 1, sourceType: ['camera'], success(res){ img.value = res.tempFilePaths?.[0] || ''; showResult.value = true } })
}
const toAdapt = () => {
  showResult.value = false
  uni.switchTab({ url: '/pages/category/index' })
}
</script>

<style lang="scss" scoped>
.tongue-page { padding: 24rpx; display: flex; flex-direction: column; gap: 20rpx; }
.camera { position: relative; height: 520rpx; background: #111; border-radius: $radius-card; overflow: hidden; }
.overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.guide { width: 360rpx; height: 220rpx; border-radius: 180rpx 180rpx 120rpx 120rpx; border: 4rpx dashed rgba(255,255,255,0.8); }
.hint { margin-top: 16rpx; color: #fff; }
.actions { display: flex; justify-content: space-between; }
.result { width: 600rpx; max-width: 90vw; background-color: $color-card-bg; border-radius: $radius-card; padding: 24rpx; display: flex; flex-direction: column; gap: 12rpx; }
.preview { width: 100%; height: 240rpx; border-radius: 12rpx; background: #f7f7f7; }
.res-title { font-size: 30rpx; color: $text-primary; }
.res-desc { color: $text-secondary; }
</style>