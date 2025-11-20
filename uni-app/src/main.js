import { createSSRApp, createApp as createVueApp } from 'vue'
import App from './App.vue'
import uviewPlus from 'uview-plus'

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  return {
    app
  }
}

function createH5App() {
  const app = createVueApp(App)
  app.use(uviewPlus)
  return app
}

if (typeof document !== 'undefined') {
  const app = createH5App()
  app.mount('#app')
}