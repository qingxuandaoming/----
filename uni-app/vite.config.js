process.env.SASS_SILENCE_DEPRECATIONS = 'legacy-js-api,import'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'

const uniPlugin = typeof uni === 'function' ? uni : (uni && typeof uni.default === 'function' ? uni.default : null)

const wxsStubPlugin = {
  name: 'wxs-stub',
  enforce: 'pre',
  load(id) {
    if (id.includes('.wxs')) {
      return 'export default {}'
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
        } catch (e) {}
      }
      next()
    })
  }
}

export default defineConfig({
  plugins: [
    wxsStubPlugin,
    faviconPlugin,
    uniPlugin
      ? uniPlugin({
        vueOptions: {
          template: {
            compilerOptions: {
              isCustomElement: (tag) => ['view', 'text', 'image', 'scroll-view', 'swiper', 'swiper-item'].includes(tag)
            }
          }
        }
      })
      : []
  ].flat(),
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
        additionalData: '@import "uview-plus/theme.scss";'
      }
    }
  }
})