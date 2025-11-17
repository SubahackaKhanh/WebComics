// src/main.js
import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueLazyLoad from 'vue3-lazyload';
import { createPinia } from 'pinia';
import { useLoadingStore } from '@/js/composables/useLoadingStore';
import { useAuthStore } from '@/js/stores/authStore';
import { initCSRF } from './js/services/api/userApi';

const startApp = async() =>{

  await initCSRF();
  
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);
  app.use(VueLazyLoad);

  const loading = useLoadingStore(pinia);
  const auth = useAuthStore(pinia);
  auth.checkAuth();

  router.beforeEach((to, from, next) => {
    if (!to.meta.disableLoading) loading.show();
    next();
  });

  router.afterEach(() => {
    requestAnimationFrame(() => {
      setTimeout(() => loading.hide(), 150);
    });
  });

  router.isReady().then(() => {
    loading.hide();
  });

  app.mount('#app');
};

startApp();