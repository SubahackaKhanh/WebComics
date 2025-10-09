import { createRouter, createWebHistory } from 'vue-router'
import Genres from './components/pages/Genres.vue'
import Home from './components/pages/Home.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import SignUp from './components/pages/SignUp.vue'


const routes = [
    { path: '/', component: Home},
    { path: '/genres', component: Genres },
    { path: '/signup', component: AuthLayout, children: [{ path: '', component: SignUp}]},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
