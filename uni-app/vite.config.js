process.env.SASS_SILENCE_DEPRECATIONS = 'legacy-js-api,import'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

const uniPlugin = typeof uni === 'function' ? uni : (uni && typeof uni.default === 'function' ? uni.default : null)

export default defineConfig({
  plugins: [uniPlugin ? uniPlugin() : []].flat(),
  optimizeDeps: {
    exclude: ['uview-plus']
  },
  server: {
    port: 5501,
    host: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  }
})