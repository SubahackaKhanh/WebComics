import { createRouter, createWebHistory } from 'vue-router'
import Analytic from './components/child/analytic.vue'

const routes = [
    { path: '/', redirect: '/analytics' },
    { path: '/analytics', component: Analytic},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router