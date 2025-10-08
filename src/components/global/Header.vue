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

        <nav :class="{ open: isMenuOpen }">
          <ul class="nav-list">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/genres">Genres</router-link></li>
            <li><router-link to="/signup">Sign Up</router-link></li>
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
import '@/css/header.css';
import { isMenuOpen, toggleMenu } from '@/js/MenuIcon';

defineExpose({ isMenuOpen, toggleMenu })
</script>
