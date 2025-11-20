<template>
  <view class="questionnaire">
    <view class="progress">
      <u-line-progress :percent="percent" height="16" activeColor="#8B5A2B" />
      <text class="p-text">{{ cur+1 }}/{{ qs.length }}</text>
    </view>
    <view class="q-card">
      <text class="q-text">{{ qs[cur].text }}</text>
      <u-radio-group v-model="ans" placement="column" class="options" @change="onSelect">
        <u-radio v-for="opt in options" :key="opt.value" :name="opt.value" :label="opt.label" />
      </u-radio-group>
      <view class="actions">
        <u-button size="small" plain shape="circle" @click="prev" :disabled="cur===0">上一步</u-button>
        <u-button size="small" type="primary" shape="circle" @click="next">{{ cur===qs.length-1?'提交':'下一题' }}</u-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const qs = ref([
  { id: 1, text: '是否经常感到疲劳乏力？' },
  { id: 2, text: '容易出汗，尤其活动后？' },
  { id: 3, text: '睡眠质量不稳定？' },
  { id: 4, text: '口干咽燥或容易上火？' },
  { id: 5, text: '食欲偏弱或消化不良？' }
])
const options = [
  { value: 3, label: '符合' },
  { value: 2, label: '比较符合' },
  { value: 1, label: '比较不符' },
  { value: 0, label: '完全不符' }
]
const cur = ref(0)
const answers = ref(Array(qs.value.length).fill(null))
const ans = ref(null)
const percent = computed(() => Math.round(answers.value.filter(a => a!==null).length / qs.value.length * 100))

const onSelect = (v) => {
  answers.value[cur.value] = v
  if (cur.value < qs.value.length - 1) {
    cur.value += 1
    ans.value = answers.value[cur.value]
  } else {
    submit()
  }
}
const next = () => {
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
  uni.showLoading({ title: '分析中' })
  setTimeout(() => {
    uni.hideLoading()
    const score = answers.value.reduce((s, v) => s + (v||0), 0)
    const res = score > 8 ? '湿热质' : '气虚质'
    const history = uni.getStorageSync('test_history') || []
    history.unshift({ date: new Date().toLocaleString(), result: res })
    uni.setStorageSync('test_history', history.slice(0,10))
    uni.navigateTo({ url: '/pages/test/result' })
  }, 800)
}
</script>

<style lang="scss" scoped>
.questionnaire { padding: 24rpx; display: flex; flex-direction: column; gap: 20rpx; }
.progress { display: flex; align-items: center; gap: 12rpx; }
.p-text { color: $text-secondary; }
.q-card { background-color: $color-card-bg; border-radius: $radius-card; padding: 24rpx; display: flex; flex-direction: column; gap: 16rpx; }
.q-text { font-size: 30rpx; color: $text-primary; }
.options { display: flex; flex-direction: column; gap: 8rpx; }
.actions { display: flex; justify-content: space-between; align-items: center; }
</style>