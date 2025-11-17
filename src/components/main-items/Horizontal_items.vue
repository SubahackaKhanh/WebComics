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

const props = defineProps({
  title: { type: String, required: true},
  fetchFunction: { type: Function, required: true }
})

const items = ref([])
const page = ref(1)
const limit = 25
const loading = ref(false)
const hasNextPage = ref(true)

let abortController = null 

async function loadMore() {
  if (loading.value || !hasNextPage.value) return;
  loading.value = true;
  abortController = new AbortController();

  try {
    const result = await props.fetchFunction(
      page.value,
      limit,
      abortController.signal
    );

    // Bảo vệ mạnh: kiểm tra result trước khi dùng
    if (!result || typeof result !== 'object') {
      console.error('Invalid fetch result:', result);
      hasNextPage.value = false;
      return;
    }

    const newItems = Array.isArray(result.items) ? result.items : [];
    items.value.push(...newItems);

    hasNextPage.value = Boolean(result.pagination?.hasNextPage);
    if (newItems.length > 0) {
      page.value++; 
    } else {
      hasNextPage.value = false;  
    }

  } catch (err) {
    if (err?.name !== 'AbortError') {
      console.error('Failed:', err);
      hasNextPage.value = false;  
    }
  } finally {
    loading.value = false;
    abortController = null;  // Reset
  }
}
const { scrollContainer, scrollLeft, scrollRight } = 
  useScroll(() => {
    if (hasNextPage.value && !loading.value) {
      loadMore()
    }
  })

onMounted(async () =>{
  await loadMore()
})

onBeforeUnmount(() =>{
  if (abortController) abortController.abort()
})

const itemsToRender = computed(() => items.value)
const titleToRender = computed(() => props.title)
</script>

<style scoped src="@/css/main-items/horizontal_items.css"></style>