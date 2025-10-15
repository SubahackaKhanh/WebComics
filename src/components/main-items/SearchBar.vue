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
      @focus="openDropdown = true"
      @keydown.down.prevent="move(1)"
      @keydown.up.prevent="move(-1)"
      @keydown.enter.prevent="selectActive()"
      @input="onInput"
    />
    <!-- icon -->
    <svg class="search-icon" viewBox="0 0 24 24" @click="toggleSearch">
      <path
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16a6.471 6.471 0 004.23-1.57l.27.28v.79l5 5L20.49 19l-5-5zM10 14a4 4 0 110-8 4 4 0 010 8z"
      />
    </svg>

    <!-- suggestions -->
    <ul v-if="showList" class="search-suggest">
      <li
        v-for="(item, idx) in limited"
        :key="idx"
        :class="{ active: idx === activeIndex }"
        @mousedown.prevent="goTo(item)"
        @mouseenter="activeIndex = idx"
      >
        <img :src="item.image" :alt="item.name" class="thumb" />
        <span class="name">{{ item.name }}</span>
        <span class="badge" :class="item.status?.toLowerCase()">{{ item.status }}</span>
      </li>
      <li v-if="!limited.length" class="empty">Không có kết quả</li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import router from '@/router'
  import { isSearchOpen, isLargeScreen, toggleSearch, useSearchBar, searchQuery } from '@/js/composables/useOpenSearchIcon'
  const { filteredItems } = useSearchBar()

  const openDropdown = ref(false)
  const activeIndex = ref(-1)
  const limited = computed(() => filteredItems.value.slice(0, 8))
  const showList = computed(() => (isSearchOpen || isLargeScreen) && openDropdown && limited.value.length > 0)

  function onInput(){
    openDropdown.value = !!searchQuery.value.trim()
    activeIndex.value = -1
  }

  function move(step){
    if (!limited.value.length){ activeIndex.value = -1; return }
    const next = activeIndex.value + step
    if (next < 0) activeIndex.value = limited.value.length - 1
    else if (next >= limited.value.length) activeIndex.value = 0
    else activeIndex.value = next
  }
  function selectActive(){
    if (activeIndex.value >= 0) goTo(limited.value[activeIndex.value])
  }
  function goTo(item){
    openDropdown.value = false
    searchQuery.value = item?.name || ''
    router.push('/details')
  }

  function handleClickOutside(e){
    const el = e.target.closest('.search-container')
    if (!el) openDropdown.value = false
  }

  onMounted(() => document.addEventListener('click', handleClickOutside))
  onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped src="@/css/searchbar.css"></style>