import { ref, computed, onMounted, onUnmounted } from 'vue'

export const isSearchOpen = ref(false)
export const isLargeScreen = ref(window.innerWidth >= 768)
export const searchQuery = ref('') 

export function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
}

export function useSearchBar(items) {
  const filteredItems = computed(() => {
    if (!searchQuery.value) return items
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  function handleResize() {
    isLargeScreen.value = window.innerWidth >= 768
  }

  onMounted(() => window.addEventListener('resize', handleResize))
  onUnmounted(() => window.removeEventListener('resize', handleResize))

  return { filteredItems }
}
