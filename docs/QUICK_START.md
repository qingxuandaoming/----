# 辨体施膳 — 网页端快速启动指南

> 拿到压缩包后，按以下步骤操作即可在本地运行网页。

---

## 一、安装 Node.js

1. 打开 [https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)，下载 **LTS（长期支持）** 版本（下载20.18.0版本）
2. 双击安装包，一路 **Next** 即可（确保 **Add to PATH** 已勾选，默认就是勾选的）
3. 打开 **命令提示符 (CMD)** 或 **PowerShell**，验证安装：

```bash
node -v    # 应显示 v20.x.x
npm -v     # 应显示 10.x.x 或更高
```

---

## 二、解压项目

将收到的压缩包解压到任意位置，例如：

```
D:\health-management
```

---

## 三、安装依赖

打开终端，进入项目的 `uni-app` 目录并安装依赖：

```bash
cd D:\health-management\uni-app
npm install
```

> **安装慢/失败？** 先执行以下命令切换国内镜像，再重新 `npm install`：
>
> ```bash
> npm config set registry https://registry.npmmirror.com
> ```

---

## 四、启动网页

```bash
npm run dev:h5
```

看到类似输出即表示启动成功：

```
  ➜  Local:   http://localhost:5501/
```

用浏览器（推荐 Chrome / Edge）打开 **http://localhost:5501/** 即可查看网页。

---

## 常见问题

| 问题 | 解决办法 |
|------|----------|
| `npm install` 超时 | 切换镜像源（见上方），或执行 `npm cache clean --force` 后重试 |
| 页面空白 | 按 `F12` 查看控制台报错；确认用的是 Chrome/Edge 而非 IE |
| 端口 5501 被占用 | 编辑 `uni-app/vite.config.js`，把 `port: 5501` 改成其他数字（如 `3000`） |
| Sass 警告信息 | 正常现象，不影响使用，忽略即可 |
