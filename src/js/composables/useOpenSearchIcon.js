import { ref, computed, onMounted, onUnmounted } from 'vue'

export const isSearchOpen = ref(false)
export const isLargeScreen = ref(window.innerWidth >= 768)
export const searchQuery = ref('') 

// shared registry of searchable items (fallback if component not passing items)
const registry = ref([
  { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing' },
  { name: 'Naruto', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Completed' },
  { name: 'Bleach', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing' },
  { name: 'Ninja GO', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing' },
  { name: 'Robo Trái cây', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing' },
  { name: 'Kamen Rider zezt', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing' },
  { name: 'NÊ Ga man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing' },
])

export function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
}

export function registerSearchItems(items = []){
  if (Array.isArray(items) && items.length){
    registry.value = items
  }
}

export function useSearchBar(items) {
  const source = computed(() => Array.isArray(items) ? items : registry.value)

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

  return { filteredItems, registerSearchItems }
}
