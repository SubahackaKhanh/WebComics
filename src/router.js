import { createRouter, createWebHistory } from 'vue-router'
import Genres from './components/pages/Genres.vue'
import Home from './components/pages/Home.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import SignUp from './components/pages/SignUp.vue'
import MainLayout from './layouts/MainLayout.vue'
import Login from './components/pages/Login.vue'
import ItemDetailsLayout from './layouts/ItemDetailsLayout.vue'
import ItemDetails from './components/common/ItemDetails.vue'
import Read from './components/pages/Read.vue'
import Favorite from './components/pages/Favorite.vue'

const routes = [
    { path: '/', component: MainLayout, children: [{ path: '', component: Home}, { path:'/genres', component: Genres }, { path: '/favorite', component: Favorite}]},
    { path: '/signup', component: AuthLayout, children: [{ path: '', component: SignUp}, { path: '/login', component:Login}]},
    { path: '/details', component: ItemDetailsLayout, children: [{ path: '', component: ItemDetails}]},
    { path: '/details/:idOrSlug', component: ItemDetailsLayout, children: [{ path: '', component: ItemDetails}]},
    { path: '/read/:idOrSlug/:chapter?', component: Read },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

