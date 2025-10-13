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

router.beforeEach((to, from, next) => {
  const loading = useLoadingStore(pinia)
  if (!to.meta.disableLoading) loading.show()
  next()
})

router.afterEach(() => {
  const loading = useLoadingStore(pinia)
  setTimeout(() => loading.hide(), 200)
})

app.mount('#app')
