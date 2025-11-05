<template>
  <div class="grid-items-wrapper">
    
    <button class="scroll-btn left" @click="scrollLeft">❮</button>

    <div class="grid-items" ref="scrollContainer">
      <h1>{{ titleToRender }}</h1>
      <items-card
        v-for="(item, index) in itemsToRender"
        :key="index"
        :item="item"
      />
      <div v-if="!itemsToRender.length" class="empty-state">
        No Data 
      </div>
    </div>

    <button class="scroll-btn right" @click="scrollRight">❯</button>
  </div>
</template>

<script setup>
import itemsCard from '../child/items-card.vue'
import { useScroll } from '@/js/composables/use_Scroll_Horizontal_item'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { getNewManga } from '@/js/services/api/mangaApi'

const { scrollContainer, scrollLeft, scrollRight} = useScroll()

const props = defineProps({
  title: { type: String, required: true },
  fetchFunction: { type: Function, required: true }
})

const items = ref([])

let abortController
onMounted(async () => {
  abortController = new AbortController()
  try {
    items.value = await props.fetchFunction(undefined, abortController.signal)
  } catch (err) {
    if (err?.name !== 'AbortError') {
      console.error('Failed to load data:', err)
    }
  }
})

onBeforeUnmount(() => {
  if (abortController) abortController.abort()
})

const itemsToRender = computed(() => items.value)
const titleToRender = computed(() => props.title)
</script>

<style scoped src="@/css/main-items/horizontal_items.css"></style>