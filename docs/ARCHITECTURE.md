# 双端并发架构说明 (Architecture)

本项目采用 **Single Codebase Multi-Platform (单体跨端架构)**。依靠 `uni-app` 的跨平台编译能力和条件编译（Conditional Compilation）宏，实现 Web 端（官网）与 Android 端（应用）共用超过 95% 的业务逻辑和 UI 组件。

## 架构拓扑栈

```text
┌─────────────────────────────────────────────────────────┐
│                    “辨体施膳” 业务核心                        │
│   ┌────────────────┐ ┌────────────────┐ ┌────────────────┐  │
│   │ 模块：中医体质测试 │ │ 模块：电商与购物车 │ │ 模块：用户与积分 │  │
│   └────────────────┘ └────────────────┘ └────────────────┘  │
└────────────────┬───────────────────────────────┬────────┘
                 │                               │
                 ▼                               ▼
     【 条件编译宏 // #ifdef 】            【 跨端兼容性组件与 API 】
                 │                               │
       ┌─────────┴─────────┐           ┌─────────┴─────────┐
       │                   │           │                   │
       ▼                   ▼           ▼                   ▼
┌──────────────┐    ┌─────────────┐
│ Web 端 (官网) │    │ Android App │
├──────────────┤    ├─────────────┤
│ + 下载移动应用 │    │ + 原生能力     │
│ + 关于我们     │    │   (推送/沉浸) │
└──────────────┘    └─────────────┘
```

## 路由及配置隔离策略

要实现官网拥有独占页面（如`/pages/web/download`），必须通过条件编译保护这些特有的页面和路由，防止它们被打包进 App。

### 1. 路由配置 (`pages.json`) 隔离策略

在 `pages.json` 中配置任何仅属于官网（H5）的页面时，必须用以下语法进行包裹屏蔽。这会让 uni-app 在打包 App 时完全忽略这些页面，缩小包体积并避免资源浪费。

```json
{
  "pages": [
    {
      "path": "pages/tabbar/home/index"
      // 公共主页
    },
    // #ifdef H5
    {
      "path": "pages/web/download/index",
      "style": { "navigationBarTitleText": "应用下载" }
    },
    {
      "path": "pages/web/about/index",
      "style": { "navigationBarTitleText": "关于我们" }
    }
    // #endif
  ]
}
```

### 2. 导航与入口的隔离策略

在公共页面（例如首页 `pages/tabbar/home/index.vue`）添加跳转到官网独占页面的入口时，入口按钮或导航项也必须使用条件编译屏蔽。

```vue
<!-- 首页中 -->
<template>
  <view>
    <!-- 公用模块 -->
    <view class="banner">...</view>

    <!-- #ifdef H5 -->
    <!-- 仅在官网首页显示的引导访问下载页入口 -->
    <button @click="goDownload">下载完整 App 体验更多功能</button>
    <!-- #endif -->
  </view>
</template>

<script setup>
const goDownload = () => {
    // #ifdef H5
    uni.navigateTo({ url: '/pages/web/download/index' });
    // #endif
}
</script>
```

## 统一组件与原生交互规范

- **统一 UI 规范**：全站需使用统一的 `uview-plus` 及兼容的 Vue 3 组件，避免直接操作 DOM (如 `document.getElementById`)，确保 Android 环境不会因为未定义的环境变量报错。
- **环境安全检测**：当调用浏览器对象如 `window` 时，需要使用 `typeof window !== 'undefined'` 结合条件编译进行安全降级。
- **静态资源划分**：共用资源放在 `src/static` 目录下；各端存在巨大隔离的体积型资源建议使用 CDN 图床而非本地引入。
