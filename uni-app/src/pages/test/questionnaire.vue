<template>
  <view class="questionnaire">
    <view class="progress-section">
      <view class="progress-bar">
        <view class="progress-inner" :style="{ width: percent + '%' }"></view>
      </view>
      <text class="p-text">目前进度 {{ cur+1 }}/{{ qs.length }}</text>
    </view>

    <view class="q-card">
      <view class="q-header">
        <text class="q-num">Q{{ cur+1 }}</text>
        <text class="q-title">{{ qs[cur].text }}</text>
      </view>

      <view class="options-group">
        <view 
          v-for="opt in options" 
          :key="opt.value" 
          class="option-item" 
          :class="{ active: ans === opt.value }"
          @click="onSelect(opt.value)">
          <text class="opt-label">{{ opt.label }}</text>
          <u-icon v-if="ans === opt.value" name="checkbox-mark" color="#8B5A2B" size="20"></u-icon>
          <view v-else class="opt-circle"></view>
        </view>
      </view>

      <view class="actions">
        <u-button size="normal" plain shape="circle" color="#8B5A2B" @click="prev" :disabled="cur===0" customStyle="width: 45%;">上一步</u-button>
        <u-button size="normal" type="primary" shape="circle" color="#8B5A2B" @click="next" customStyle="width: 45%;">{{ cur===qs.length-1?'提交测试':'下一题' }}</u-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const qs = ref([
  { id: 1, text: '您是否经常感到疲劳乏力，精神不振？' },
  { id: 2, text: '稍微活动一下就容易出虚汗吗？' },
  { id: 3, text: '您的睡眠质量如何，是否容易惊醒或失眠？' },
  { id: 4, text: '平时是否经常口干咽燥，或者感觉容易上火？' },
  { id: 5, text: '您的胃口如何，是否常有消化不良或食欲不振？' }
])
const options = [
  { value: 4, label: '总是如此' },
  { value: 3, label: '经常这样' },
  { value: 2, label: '偶尔会有' },
  { value: 1, label: '很少发生' },
  { value: 0, label: '完全没有' }
]
const cur = ref(0)
const answers = ref(Array(qs.value.length).fill(null))
const ans = ref(null)
const percent = computed(() => Math.round(answers.value.filter(a => a!==null).length / qs.value.length * 100))

const onSelect = (v) => {
  ans.value = v
  answers.value[cur.value] = v
  setTimeout(() => {
    if (cur.value < qs.value.length - 1) {
      cur.value += 1
      ans.value = answers.value[cur.value]
    }
  }, 300)
}
const next = () => {
  if (ans.value === null) {
    uni.showToast({ title: '请选择一项', icon: 'none' })
    return
  }
  answers.value[cur.value] = ans.value
  if (cur.value < qs.value.length - 1) {
    cur.value += 1
    ans.value = answers.value[cur.value]
  } else {
    submit()
  }
}
const prev = () => {
  if (cur.value > 0) {
    cur.value -= 1
    ans.value = answers.value[cur.value]
  }
}
const submit = () => {
  uni.showLoading({ title: 'AI分析中...' })
  setTimeout(() => {
    uni.hideLoading()
    const score = answers.value.reduce((s, v) => s + (v||0), 0)
    const res = score > 12 ? '湿热质' : (score > 6 ? '气虚质' : '平和质')
    const history = uni.getStorageSync('test_history') || []
    history.unshift({ date: new Date().toLocaleDateString(), result: res })
    uni.setStorageSync('test_history', history.slice(0,10))
    uni.navigateTo({ url: '/pages/test/result' })
  }, 1200)
}
</script>

<style lang="scss" scoped>
.questionnaire { 
  display: flex; 
  flex-direction: column; 
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  background-color: #FDF6E3;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
}
.progress-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 40rpx;
}
.progress-bar {
  width: 100%;
  height: 16rpx;
  background-color: #EFE1C6;
  border-radius: 8rpx;
  overflow: hidden;
}
.progress-inner {
  height: 100%;
  background: linear-gradient(90deg, #D4AF37, #8B5A2B);
  border-radius: 8rpx;
  transition: width 0.3s ease;
}
.p-text { 
  align-self: flex-end;
  color: #8B5A2B; 
  font-size: 26rpx;
  font-weight: bold;
}
.q-card { 
  background-color: #fff; 
  border-radius: 24rpx; 
  padding: 50rpx 40rpx; 
  display: flex; 
  flex-direction: column; 
  box-shadow: 0 8rpx 30rpx rgba(139, 90, 43, 0.08);
  box-sizing: border-box;
}
.q-header {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 50rpx;
}
.q-num {
  font-size: 40rpx;
  font-weight: 900;
  color: #8B5A2B;
  opacity: 0.8;
}
.q-title { 
  font-size: 34rpx; 
  color: #333; 
  line-height: 1.6;
  font-weight: 600;
}
.options-group {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 60rpx;
}
.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 40rpx;
  border-radius: 16rpx;
  background-color: #F8F9FA;
  border: 2rpx solid transparent;
  transition: all 0.2s ease;
  box-sizing: border-box;
}
.option-item.active {
  background-color: rgba(139, 90, 43, 0.05);
  border-color: #8B5A2B;
}
.opt-label {
  font-size: 30rpx;
  color: #444;
}
.option-item.active .opt-label {
  color: #8B5A2B;
  font-weight: bold;
}
.opt-circle {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 2rpx solid #ddd;
}
.actions { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}
</style>