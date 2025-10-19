<template>
  <div class="list-item-container" ref="listContainerRef">
    <!-- Error state -->
    <div v-if="animeStore.hasError" class="error-state">
      <p>Failed to load anime list</p>
      <button @click="retryLoad">Retry</button>
    </div>
    
    <!-- Empty state -->
    <div v-else-if="!storeItems.length" class="empty-state">
      <p>No anime available</p>
    </div>
    
    <!-- Anime list -->
    <div v-else class="list-items">
        <items-card
          v-for="(item, index) in paginatedItems"
          :key="index"
          :item="item"
        />
    </div>    
    
    <!-- Pagination -->
    <div v-if="storeItems.length > 0" class="list-items-pagination">
        <Pagination/>
    </div>
  </div>
</template>

<script setup>
import itemsCard from "../child/items-card.vue";
import Pagination from "@/components/common/Pagination.vue";
import { usePaginationStore } from "@/js/module/pagination";
import { useAnimeStore } from '@/js/composables/useAnimeStore'
import { useLoadingStore } from '@/js/composables/useLoadingStore'
import { computed, ref, onMounted, watch, nextTick } from "vue";

const pagination = usePaginationStore();
const animeStore = useAnimeStore();
const loadingStore = useLoadingStore();
const listContainerRef = ref(null);
const listHeight = ref(0);

const updateHeight = () => {
  if (listContainerRef.value) {
    listHeight.value = listContainerRef.value.offsetHeight;
  }
  console.log(listContainerRef.value.offsetHeight,"width");
};

// Computed để lấy dữ liệu từ store
const storeItems = computed(() => animeStore.getTransformedTopAnime)

// Computed để tính toán dữ liệu cho trang hiện tại
const paginatedItems = computed(() => {
  const items = storeItems.value;
  const start = (pagination.currentPage - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  return items.slice(start, end);
});

// Load data khi component mount
onMounted(async () => {
  try {
    // Load top anime data
    await animeStore.fetchTopAnime();
    
    // Set total items cho pagination
    pagination.setTotalItems(storeItems.value.length);
    
    // Update height sau khi images load
    await nextTick();
    const imgs = listContainerRef.value.querySelectorAll("img");
    let loaded = 0;
    
    if (imgs.length === 0) {
      updateHeight();
      return;
    }
    
    imgs.forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener("load", () => {
          loaded++;
          if (loaded === imgs.length) updateHeight();
        });
      }
    });
    
    if (loaded === imgs.length) {
      updateHeight();
    }
  } catch (error) {
    console.error('Failed to load anime data:', error);
    updateHeight();
  }
});

// Watch pagination changes
watch(() => pagination.currentPage, async () => {
  await nextTick();
  updateHeight();
});

// Watch store data changes để update pagination
watch(() => storeItems.value, (newItems) => {
  if (newItems.length > 0) {
    pagination.setTotalItems(newItems.length);
  }
}, { deep: true });

// Retry function
const retryLoad = async () => {
  try {
    await animeStore.fetchTopAnime();
    pagination.setTotalItems(storeItems.value.length);
  } catch (error) {
    console.error('Failed to retry load anime data:', error);
  }
};

defineExpose({
  listHeight,
  listContainerRef
});
</script>

<style scoped src="@/css/main-items/list_item.css"></style>