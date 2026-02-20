process.env.SASS_SILENCE_DEPRECATIONS = 'legacy-js-api,import'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

// Pure Vite config for H5 dev without uni-app compiler
// Uses the polyfills in index.html instead

const wxsStubPlugin = {
    name: 'wxs-stub',
    enforce: 'pre',
    load(id) {
        if (id.includes('.wxs')) {
            return 'export default {}'
        }
    }
}

// Stub uview-plus .vue components so the Vue compiler doesn't choke on
// uni-app-specific template elements inside them. Each component becomes
// a simple <div> that renders its slot content.
const uviewStubPlugin = {
    name: 'uview-stub',
    enforce: 'pre',
    load(id) {
        const normalised = id.replace(/\\/g, '/')
        if (normalised.includes('node_modules/uview-plus/components/') && normalised.endsWith('.vue')) {
            return `<template><div class="u-stub"><slot /></div></template>
<script>export default { name: 'UViewStub', inheritAttrs: false }</script>`
        }
    }
}

const faviconPlugin = {
    name: 'serve-favicon-svg',
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            if (req.url === '/favicon.svg') {
                try {
                    const filePath = path.resolve(process.cwd(), 'public', 'favicon.svg')
                    const content = fs.readFileSync(filePath)
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'image/svg+xml')
                    res.setHeader('x-content-type-options', 'nosniff')
                    res.setHeader('Cache-Control', 'no-cache')
                    res.end(content)
                    return
                } catch (e) { }
            }
            next()
        })
    }
}

export default defineConfig({
    plugins: [
        wxsStubPlugin,
        uviewStubPlugin,
        faviconPlugin,
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('u-') || ['view', 'text', 'image', 'scroll-view', 'swiper', 'swiper-item', 'navigator', 'button', 'input', 'textarea', 'picker', 'slider', 'switch', 'label', 'form', 'icon', 'progress', 'rich-text', 'web-view', 'cover-view', 'cover-image', 'map', 'canvas', 'camera', 'live-player', 'live-pusher', 'movable-area', 'movable-view'].includes(tag)
                }
            }
        })
    ],
    resolve: {
        alias: {
            '@dcloudio/uni-components/style/view.css': path.resolve('src/polyfills/empty.css'),
            '@dcloudio/uni-components/style/text.css': path.resolve('src/polyfills/empty.css'),
            '@dcloudio/uni-components/style/scroll-view.css': path.resolve('src/polyfills/empty.css'),
            '@dcloudio/uni-components/style/swiper.css': path.resolve('src/polyfills/empty.css'),
            '@dcloudio/uni-components/style/swiper-item.css': path.resolve('src/polyfills/empty.css'),
        }
    },
    optimizeDeps: {
        exclude: ['uview-plus']
    },
    server: {
        port: 5501,
        host: true,
        headers: {
            'x-content-type-options': 'nosniff'
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
                silenceDeprecations: ['import', 'legacy-js-api'],
                additionalData: '@import "uview-plus/theme.scss"; @import "./src/uni.scss";'
            }
        }
    }
})
