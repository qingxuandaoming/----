<template>
  <view class="tongue-scan">
    <view class="canvas">
      <view class="grid" v-if="scanning">
        <view v-for="i in 36" :key="i" class="cell"></view>
      </view>
      <image v-if="img" :src="img" class="preview" mode="aspectFit" />
    </view>
    <view class="actions">
      <u-button shape="circle" plain @click="pickFromAlbum">上传照片</u-button>
      <u-button type="primary" shape="circle" @click="takePhoto">拍摄</u-button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const img = ref('')
const scanning = ref(false)

const startScan = () => {
  scanning.value = true
  setTimeout(() => {
    scanning.value = false
    uni.navigateTo({ url: '/pages/test/result' })
  }, 3000)
}

const pickFromAlbum = () => {
  uni.chooseImage({ count: 1, sourceType: ['album'], success(res){ img.value = res.tempFilePaths?.[0] || ''; startScan() } })
}
const takePhoto = () => {
  uni.chooseImage({ count: 1, sourceType: ['camera'], success(res){ img.value = res.tempFilePaths?.[0] || ''; startScan() } })
}
</script>

<style lang="scss" scoped>
.tongue-scan { padding: 24rpx; display: flex; flex-direction: column; gap: 20rpx; }
.canvas { position: relative; height: 520rpx; background: #111; border-radius: $radius-card; overflow: hidden; }
.grid { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(6,1fr); grid-template-rows: repeat(6,1fr); gap: 2rpx; padding: 20rpx; animation: scan 3s linear infinite; }
.cell { border: 1rpx solid rgba(255,255,255,0.1); }
.preview { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.7; }
.actions { display: flex; justify-content: space-between; }
@keyframes scan { 0% { transform: translateY(-10%); } 50% { transform: translateY(10%); } 100% { transform: translateY(-10%); } }
</style>