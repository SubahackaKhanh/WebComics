<template>
  <div class="grid-items-wrapper">
    
    <button class="scroll-btn left" @click="scrollLeft">❮</button>

    <div class="grid-items" ref="scrollContainer">
      <h1>{{ titleToRender }}</h1>
      
      <!-- Error state -->
      <div v-if="animeStore.hasError" class="error-state">
        <p>Failed to load {{ titleToRender.toLowerCase() }}</p>
        <button @click="retryLoad">Retry</button>
      </div>
      
      <!-- Empty state -->
      <div v-else-if="!itemsToRender.length" class="empty-state">
        <p>No {{ titleToRender.toLowerCase() }} available</p>
      </div>
      
      <!-- Anime items -->
      <items-card
        v-else
        v-for="(item, index) in itemsToRender"
        :key="index"
        :item="item"
      />
    </div>

    <button class="scroll-btn right" @click="scrollRight">❯</button>
  </div>
</template>

<script setup>
import itemsCard from '../child/items-card.vue'
import { useScroll } from '@/js/composables/use_Scroll_Horizontal_item'
import { useAnimeStore } from '@/js/composables/useAnimeStore'
import { useLoadingStore } from '@/js/composables/useLoadingStore'
import { computed, onMounted, watch } from 'vue'

const { scrollContainer, scrollLeft, scrollRight} = useScroll()
const animeStore = useAnimeStore()
const loadingStore = useLoadingStore()

const props = defineProps({
  title: { type: String, default: 'Top Favorite' },
  items: { type: Array, default: () => [] },
  type: { type: String, default: 'top' } // top, airing, upcoming
})

// Computed để lấy dữ liệu từ store dựa trên type
const storeItems = computed(() => {
  switch (props.type) {
    case 'airing':
      return animeStore.getTransformedAiringAnime
    case 'upcoming':
      return animeStore.getTransformedUpcomingAnime
    default:
      return animeStore.getTransformedTopAnime
  }
})

const itemsToRender = computed(() => {
  // Ưu tiên props.items, sau đó store data
  if (props.items && props.items.length > 0) {
    return props.items
  }
  if (storeItems.value && storeItems.value.length > 0) {
    return storeItems.value.slice(0, 10) // Chỉ lấy 10 item đầu cho horizontal scroll
  }
  return [] // Không có fallback data
})

const titleToRender = computed(() => props.title || 'Top Favorite')

// Load data khi component mount
onMounted(async () => {
  try {
    switch (props.type) {
      case 'airing':
        await animeStore.fetchAiringAnime()
        break
      case 'upcoming':
        await animeStore.fetchUpcomingAnime()
        break
      default:
        await animeStore.fetchTopAnime()
        break
    }
  } catch (error) {
    console.error('Failed to load anime data:', error)
  }
})

// Watch để reload data khi type thay đổi
watch(() => props.type, async (newType) => {
  try {
    switch (newType) {
      case 'airing':
        await animeStore.fetchAiringAnime()
        break
      case 'upcoming':
        await animeStore.fetchUpcomingAnime()
        break
      default:
        await animeStore.fetchTopAnime()
        break
    }
  } catch (error) {
    console.error('Failed to load anime data:', error)
  }
})

// Retry function
const retryLoad = async () => {
  try {
    switch (props.type) {
      case 'airing':
        await animeStore.fetchAiringAnime()
        break
      case 'upcoming':
        await animeStore.fetchUpcomingAnime()
        break
      default:
        await animeStore.fetchTopAnime()
        break
    }
  } catch (error) {
    console.error('Failed to retry load anime data:', error)
  }
}
</script>

<style scoped src="@/css/main-items/horizontal_items.css"></style>