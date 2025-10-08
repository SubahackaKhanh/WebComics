<template>
  <header>
    <div class="header-items">
      <nav>
        <div>
          <a href="/">
            <img src="/favicon-32x32.png">
          </a>
        </div>
        <ul class="nav-list">
          <li><a href="/">Home</a></li>
          <li><a href="/genres">Genres</a></li>
          <li><a href="/signup">Sign Up</a></li>
        </ul>
      </nav>
      <div>
        <SearchBar />
      </div>
    </div>
  </header>
</template>

<script setup>
  import './main-items/SearchBar.vue';
  import SearchBar from './main-items/SearchBar.vue';
  import '@/css/header.css'
</script>
