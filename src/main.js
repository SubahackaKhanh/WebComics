import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useLoadingStore } from '@/js/composables/useLoadingStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const loading = useLoadingStore(pinia)

// Hiện loader khi đổi route
router.beforeEach((to, from, next) => {
  if (!to.meta.disableLoading) loading.show()
  next()
})

// Tắt loader khi component trong router-view đã render xong
router.afterEach(() => {
  requestAnimationFrame(() => {
    setTimeout(() => loading.hide(), 150)
  })
})

// Khi app vừa khởi động xong, tắt loader lần đầu
router.isReady().then(() => {
  loading.hide()
})

app.mount('#app')
