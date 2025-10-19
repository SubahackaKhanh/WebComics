<template>
  <div class="leaderboard-container">
    <div class="leaderboard-form">
        <h1>LeaderBoard</h1>
        
        <!-- Error state -->
        <div v-if="animeStore.hasError" class="error-state">
          <p>Failed to load leaderboard</p>
          <button @click="retryLoad">Retry</button>
        </div>
        
        <!-- Empty state -->
        <div v-else-if="!items.length" class="empty-state">
          <p>No anime available for leaderboard</p>
        </div>
        
        <!-- Leaderboard items -->
        <ItemRow
          v-else
          v-for="(item, index) in items"
          :key="index"
          :item="item"
          :rank="index + 1"
        />
    </div>
  </div>
</template>


<script setup>
import ItemRow from '../child/item-row.vue';
import { useAnimeStore } from '@/js/composables/useAnimeStore'
import { useLoadingStore } from '@/js/composables/useLoadingStore'
import { ref, onMounted, computed } from 'vue';

const animeStore = useAnimeStore();
const loadingStore = useLoadingStore();

// Computed để lấy dữ liệu từ store (chỉ lấy top 10)
const items = computed(() => {
  const storeItems = animeStore.getTransformedTopAnime;
  if (storeItems.length > 0) {
    return storeItems.slice(0, 10); // Chỉ lấy top 10 cho leaderboard
  }
  return []; // Không có fallback data
});

// Load data khi component mount
onMounted(async () => {
  try {
    await animeStore.fetchTopAnime();
  } catch (error) {
    console.error('Failed to load anime data for leaderboard:', error);
  }
});

// Retry function
const retryLoad = async () => {
  try {
    await animeStore.fetchTopAnime();
  } catch (error) {
    console.error('Failed to retry load anime data for leaderboard:', error);
  }
};
</script>

<style scoped src="@/css/main-items/leaderboard.css"></style>