<template>
  <div class="search-container" :class="{ open: isSearchOpen }" ref="containerRef">
    <!-- search -->
    <input
      v-if="isSearchOpen || isLargeScreen"
      v-model="searchQuery"
      id="searchQuery"
      type="text"
      name="searchQuery"
      class="search-bar"
      placeholder="Search..."
      autocomplete="off"
      autocapitalize="none"
      spellcheck="false"
      @focus="open() && setHasResults(!!limited.length)"
      @keydown.down.prevent="move(1)"
      @keydown.up.prevent="move(-1)"
      @keydown.enter.prevent="selectActive()"
      @keydown.esc.prevent="close()"
      @input="onInput"
      ref="inputRef"
    />
    <!-- icon -->
    <svg class="search-icon" viewBox="0 0 24 24" @click="toggleSearch">
      <path
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16a6.471 6.471 0 004.23-1.57l.27.28v.79l5 5L20.49 19l-5-5zM10 14a4 4 0 110-8 4 4 0 010 8z"
      />
    </svg>

    <!-- suggestions -->
    <ul v-if="show" class="search-suggest">
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
  import { ref, computed, watch, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMangaSearch } from '@/js/composables/useMangaSearch'
  import { isSearchOpen, isLargeScreen, toggleSearch, searchQuery } from '@/js/composables/useOpenSearchIcon'
  import { useClickOutside } from '@/js/composables/useClickOutside'
  import { useSuggestList } from '@/js/composables/useSuggestList'
  import { debounce } from 'lodash'

  const router = useRouter()
  const containerRef = ref(null)
  const inputRef = ref(null)
  const { isOpen, show, open, close, setHasResults } = useSuggestList()

  const activeIndex = ref(-1)
  const { results, loading, searchManga } = useMangaSearch()
 // Tạo debounce chỉ một lần
  const debouncedSearch = debounce(async (query) => {
    await searchManga(query)
    setHasResults(results.value.length > 0)
  }, 800) 

  watch(searchQuery, (newVal) => {
    const trimmed = newVal.trim()

    if (!trimmed) {
      close()
      results.value = []
      setHasResults(false)
      return
    }

    open()
    debouncedSearch(trimmed)
  })


  const limited = computed(() => results.value.slice(0, 8))

  function onInput() {
    const hasText = !!searchQuery.value.trim()
    if (hasText) open()
    else close()
    setHasResults(limited.value.length > 0)
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
    close()
    searchQuery.value = item?.name || ''
    if (inputRef.value) inputRef.value.blur()
    router.push(`/details/${item.id}`)
  }

  useClickOutside(containerRef, () => close())

  onBeforeUnmount(() => {
    debouncedSearch.cancel && debouncedSearch.cancel()
  })
</script>

<style scoped src="@/css/main-items/searchbar.css"></style>