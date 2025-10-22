<template>
  <Horizontal_items
    :title="'New Manga'"
    :fetchFunction="getNewManga"
  />
  <div class="list">
    <div class="list-container">
      <List_items ref="listComp" :key="route.path"/>
      <div class="leaderboard">
      <LeaderBoard/>
    </div>
    </div>
  </div>
</template>

<script setup>
import { getNewManga } from '@/js/services/api/mangaApi';
import Horizontal_items from '../main-items/Horizontal_items.vue';
import LeaderBoard from '../main-items/LeaderBoard.vue';
import List_items from '../main-items/List_items.vue';
import { useLoadingStore } from '@/js/composables/useLoadingStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const loading = useLoadingStore();
const route = useRoute();

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Giả lập fetch
  loading.hide();
});
</script>

<style scoped src="@/css/pages/home.css"></style>