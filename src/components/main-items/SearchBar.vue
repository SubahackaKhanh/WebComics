<template>
  <div class="search-container" :class="{ open: isSearchOpen }">
    <!-- search -->
    <input
      v-if="isSearchOpen || isLargeScreen"
      v-model="searchQuery"
      id="searchQuery"
      type="text"
      name="searchQuery"
      class="search-bar"
      placeholder="Search..."
    />
    <!-- icon -->
    <svg class="search-icon" viewBox="0 0 24 24" @click="toggleSearch">
      <path
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16a6.471 6.471 0 004.23-1.57l.27.28v.79l5 5L20.49 19l-5-5zM10 14a4 4 0 110-8 4 4 0 010 8z"
      />
    </svg>

  </div>
</template>

<script setup>
  import '@/css/searchbar.css'
  import { isSearchOpen, isLargeScreen, toggleSearch, useSearchBar, searchQuery } from '@/js/composables/useOpenSearchIcon'
  console.log(isSearchOpen);
</script>
