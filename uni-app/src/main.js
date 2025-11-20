import { createSSRApp } from 'vue'
import App from './App.vue'
import uviewPlus from 'uview-plus'
import '@dcloudio/uni-components/style/view.css'
import '@dcloudio/uni-components/style/text.css'
import '@dcloudio/uni-components/style/scroll-view.css'
import '@dcloudio/uni-components/style/swiper.css'
import '@dcloudio/uni-components/style/swiper-item.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  if (typeof uni !== 'undefined' && typeof window !== 'undefined') {
    if (!uni.onWindowResize) uni.onWindowResize = (cb) => window.addEventListener('resize', cb)
    if (!uni.offWindowResize) uni.offWindowResize = (cb) => window.removeEventListener('resize', cb)
  }
  app.mount('#app')
  return { app }
}

createApp()