<template>
  <header>
    <div class="header-items">
      <!-- Logo -->
      <div class="logo">
        <a href="/">
          <img src="/favicon-32x32.svg" alt="Logo" />
        </a>
      </div>

      <!-- Hamburger + Nav -->
      <div class="header-menu">
        <button class="hamburger" @click="toggleMenu">&#9776;</button>

        <nav :class="{ open: isMenuOpen }" v-if="auth.isAuthenticated">
          <ul class="nav-list">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/genres">Genres</router-link></li>
            <li><router-link to="/favorite">Favorite</router-link></li>
            <li>
              <button @click="logout" class="logout-btn">Logout</button>
            </li>
          </ul>
        </nav>

        <!-- Khi chưa đăng nhập -->
        <nav :class="{ open: isMenuOpen }" v-else>
          <ul class="nav-list">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/genres">Genres</router-link></li>
            <li><router-link to="/signup">Sign Up</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
          </ul>
        </nav>
      </div>

      <!-- Search -->
      <div class="search-wrapper">
        <SearchBar />
      </div>
    </div>
  </header>
</template>

<script setup>
import SearchBar from '../main-items/SearchBar.vue';
import { isMenuOpen, toggleMenu } from '@/js/MenuIcon';
import { useAuthStore } from '@/js/stores/authStore';
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  router.push('/login')
}
defineExpose({ isMenuOpen, toggleMenu })
</script>

<style scoped src="@/css/global/header.css"></style>