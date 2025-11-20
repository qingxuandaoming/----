<template>
  <view class="test-page">
    <view class="intro" v-if="step===0">
      <view class="card">
        <text class="title">中医体质测试</text>
        <text class="desc">依据问卷评估体质倾向，结果用于饮食与养生方案推荐。</text>
        <u-button type="primary" shape="circle" @click="start">立即开始测试</u-button>
      </view>
    </view>

    <view v-else class="quiz">
      <view class="progress">
        <u-line-progress :percent="progress" height="16" activeColor="#8B5A2B" />
        <text class="progress-text">{{ curIndex+1 }}/{{ questions.length }}</text>
      </view>
      <view class="q-card">
        <text class="q-text">{{ curQ.text }}</text>
        <u-radio-group v-model="curAnswer" placement="column" class="options">
          <u-radio v-for="opt in options" :key="opt.value" :name="opt.value" :label="opt.label" />
        </u-radio-group>
        <view class="actions">
          <u-button size="small" plain shape="circle" @click="prev" :disabled="curIndex===0">上一步</u-button>
          <u-button size="small" type="primary" shape="circle" @click="next">{{ curIndex===questions.length-1?'提交':'下一题' }}</u-button>
        </view>
      </view>
      <view class="preview">
        <SectionHeader title="结果预览" />
        <view class="card">
          <text>可能体质：气虚体质</text>
          <text class="tip">建议：黄芪党参乌鸡汤</text>
          <view class="row">
            <u-button size="small" shape="circle" plain @click="toTongue">舌苔检测</u-button>
            <u-button size="small" type="primary" shape="circle" @click="toResult">查看分析</u-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHeader from '../../components/SectionHeader.vue'

const step = ref(0)
const start = () => { step.value = 1 }

const questions = ref([
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
const answers = ref(Array(questions.value.length).fill(null))
const curIndex = ref(0)
const curQ = computed(() => questions.value[curIndex.value] || {})
const curAnswer = ref(null)

const progress = computed(() => {
  const done = answers.value.filter(a => a !== null).length
  return Math.round((done / questions.value.length) * 100)
})

const syncAnswer = () => { answers.value[curIndex.value] = curAnswer.value }
const next = () => {
  syncAnswer()
  if (curIndex.value < questions.value.length - 1) {
    curIndex.value++
    curAnswer.value = answers.value[curIndex.value]
  } else {
    uni.showToast({ title: '已提交', icon: 'none' })
  }
}
const prev = () => {
  syncAnswer()
  if (curIndex.value > 0) {
    curIndex.value--
    curAnswer.value = answers.value[curIndex.value]
  }
}

const toTongue = () => uni.navigateTo({ url: '/pages/test/tongue' })
const toResult = () => uni.navigateTo({ url: '/pages/test/result' })
</script>

<style lang="scss" scoped>
.test-page { padding: 24rpx; display: flex; flex-direction: column; gap: 24rpx; }
.card { background-color: $color-card-bg; border-radius: $radius-card; padding: 24rpx; display: flex; flex-direction: column; gap: 16rpx; }
.title { font-family: $font-title; font-size: 36rpx; color: $text-primary; }
.desc { color: $text-secondary; }
.quiz { display: flex; flex-direction: column; gap: 16rpx; }
.progress { display: flex; align-items: center; gap: 12rpx; }
.progress-text { color: $text-secondary; }
.q-card { @extend .card; gap: 20rpx; }
.q-text { font-size: 30rpx; color: $text-primary; }
.options { display: flex; flex-direction: column; gap: 8rpx; }
.actions { display: flex; justify-content: space-between; align-items: center; }
.preview { display: flex; flex-direction: column; gap: 12rpx; }
.row { margin-top: 8rpx; display: flex; gap: 12rpx; }
.tip { color: $color-secondary; }
</style>