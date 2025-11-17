import { ref, computed, onMounted, onUnmounted } from 'vue'

export const isSearchOpen = ref(false)
export const isLargeScreen = ref(window.innerWidth >= 768)
export const searchQuery = ref('') 

export function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
}

export function useSearchBar(items = []) {
  const source = computed(() => Array.isArray(items) ? items : [])

  const filteredItems = computed(() => {
    const q = searchQuery.value.toLowerCase().trim()
    if (!q) return []
    return source.value.filter(item => item?.name?.toLowerCase().includes(q))
  })

  function handleResize() {
    isLargeScreen.value = window.innerWidth >= 768
  }

  onMounted(() => window.addEventListener('resize', handleResize))
  onUnmounted(() => window.removeEventListener('resize', handleResize))

  return { filteredItems }
}
