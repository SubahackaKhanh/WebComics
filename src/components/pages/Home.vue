<template>
  <Horizontal_items
    :title="'Top New Manga'"
    :fetchFunction="getNewManga"
  />
  <div class="list">
    <div class="list-container">
      <List_items ref="listComp" :key="route.path"/>
    </div>
    <div class="leaderboard" :style="{ height: leaderboardHeight + 'px' }">
      <LeaderBoard/>
    </div>
  </div>
</template>

<script setup>
import { getNewManga } from '@/js/services/api/mangaApi';
import Horizontal_items from '../main-items/Horizontal_items.vue';
import LeaderBoard from '../main-items/LeaderBoard.vue';
import List_items from '../main-items/List_items.vue';
import { useLoadingStore } from '@/js/composables/useLoadingStore';
import { onMounted, ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const loading = useLoadingStore();
const route = useRoute();
const leaderboardHeight = ref(0);
const listComp = ref(null);

const updateLeaderboardHeight = () => {
  if (listComp.value) {
    leaderboardHeight.value = listComp.value.listHeight;
  }
};

onMounted(async () => {
  await nextTick();
  updateLeaderboardHeight();
});

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Giả lập fetch
  loading.hide();
});

window.addEventListener('resize', updateLeaderboardHeight);
</script>

<style scoped src="@/css/pages/home.css"></style>