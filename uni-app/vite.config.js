process.env.SASS_SILENCE_DEPRECATIONS = 'legacy-js-api,import'
import { defineConfig } from 'vite'
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

export default defineConfig({
  plugins: [
    wxsStubPlugin,
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
      'X-Content-Type-Options': 'nosniff'
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