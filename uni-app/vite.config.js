import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

const uniPlugin = typeof uni === 'function' ? uni : (uni && typeof uni.default === 'function' ? uni.default : null)

export default defineConfig({
  plugins: [uniPlugin ? uniPlugin() : []].flat()
})