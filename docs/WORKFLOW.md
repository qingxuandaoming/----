# “辨体施膳” 双端并行开发工作流 (Workflow)

为了实现官网（Web版）与应用（Android App版）同时推进并共享一套业务代码，本项目在普通的 uni-app 开发流程基础上，增加了以下双端并行开发的规范指引。

## 1. 运行与调试规范

在日常开发中，需要关注当前实现的功能是**公共功能**还是**某端特有功能**。

### 公共基础功能开发
绝大部分核心页面（如首页、测试、购物车、我的等）均属于公共功能。
推荐使用更轻量的 H5 环境进行开发调试：
```bash
# 启动 H5 开发服务器
npm run dev:h5
```

### 官网特有页面开发（如下载页、关于我们）
这类页面仅在 H5 平台可见。必须保持在 H5 环境中调试，并且需要在代码中增加平台隔离（参考架构规范 `ARCHITECTURE.md`）。

### Android 平台验证与打包
当涉及到设备底层接口（如扫码、相机调用）或是公共功能告一段落时，需要启动 App 环境进行验证，以确保移动端兼容性。
```bash
# 启动 Android App 开发环境 (需连接真实设备或模拟器)
npm run dev:app-android

# Android App 生产环境构建
npm run build:app-android
```

## 2. 代码开发与隔离规范（条件编译）

在任何涉及多端差异的场景，必须严格使用 uni-app 的**条件编译**来避免污染另一端的包体积和逻辑。

### 视图与逻辑层 (Vue / JS)
```vue
<template>
  <view>
    <!-- #ifdef H5 -->
    <!-- 这里的代码只会在 Web 官网中看到 -->
    <view class="web-only-footer">下载 App 体验完整功能</view>
    <!-- #endif -->
    
    <!-- #ifndef H5 -->
    <!-- 这里的代码在 除了 Web 之外的平台 (例如 Android) 会看到 -->
    <view class="app-version">当前版本 v1.0.0</view>
    <!-- #endif -->
  </view>
</template>

<script setup>
const shareAction = () => {
    // #ifdef H5
    console.log('H5 Web 端可以通过直接复制链接分享');
    // #endif
    
    // #ifdef APP-PLUS
    console.log('Android 端调用原生分享组件');
    uni.share({ /* ... */ });
    // #endif
}
</script>
```

### 样式层 (CSS / SCSS)
```scss
/* #ifdef H5 */
.web-header {
    height: 60px;
    background: #fff;
}
/* #endif */
```

## 3. 文档更新与维护逻辑

为了保证后续其他开发者能清晰理解项目架构，且文档与代码不脱节，项目施行以下**文档同步更新机制**：

1. **核心架构变动**：如果引入了新的跨端方案、修改了主入口配置或是更新了底层核心组件，必须同步更新 `docs/ARCHITECTURE.md`。
2. **新增双端共用的重大模块**：在 `README.md` 的核心功能模块区增加简述。
3. **新增某端独占功能**：必须在对应的需求或代码中明确加上平台注释（`// #ifdef`），并更新针对专门平台的构建指引或清单。
4. **依赖库升级**：如果增删了影响某平台的 `npm` 依赖或原生插件，必须同步在 `package.json` 注释或本工作流文档中记录原因。

**每次 Merge Request 或提交（Commit）涉及上述变更时，必须带上对应的文档修改**。
