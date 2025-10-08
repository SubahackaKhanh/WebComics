import { createRouter, createWebHistory } from 'vue-router'
import Genres from './components/pages/Genres.vue'
import Home from './components/pages/Home.vue'

const routes = [
    { path: '/', component: Home},
    { path: '/genres', component: Genres },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
