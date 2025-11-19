import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('./components/pages/Home.vue')
const Genres = () => import('./components/pages/Genres.vue')
const Favorite = () => import('./components/pages/Favorite.vue')

const SignUp = () => import('./components/pages/SignUp.vue')
const Login = () => import('./components/pages/Login.vue')

const ItemDetails = () => import('./components/common/ItemDetails.vue')
const Read = () => import('./components/pages/Read.vue')

const MainLayout = () => import('./layouts/MainLayout.vue')
const AuthLayout = () => import('./layouts/AuthLayout.vue')
const ItemDetailsLayout = () => import('./layouts/ItemDetailsLayout.vue')

const routes = [
    { path: '/', component: MainLayout, children: [
        { path: '', component: Home },
        { path:'/genres', component: Genres },
        { path: '/favorite', component: Favorite }
    ]},

    { path: '/signup', component: AuthLayout, children: [
        { path: '', component: SignUp },
        { path: '/login', component: Login }
    ]},

    { path: '/details', component: ItemDetailsLayout, children: [
        { path: '', component: ItemDetails }
    ]},

    { path: '/details/:idOrSlug', component: ItemDetailsLayout, children: [
        { path: '', component: ItemDetails }
    ]},

    { path: '/read/:idOrSlug/:chapter?', component: Read },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
