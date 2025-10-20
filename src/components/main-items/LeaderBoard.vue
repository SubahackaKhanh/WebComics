<template>
  <div class="leaderboard-container">
    <div class="leaderboard-form">
        <h1>LeaderBoard</h1>
      <ItemRow
        v-for="(item, index) in items"
        :key="item.mal_id"
        :item="item"
        :rank="index + 1"
      />
    </div>
  </div>
</template>


<script setup>
import ItemRow from '../child/item-row.vue';
import { ref, onMounted } from 'vue';
import { getTopManga } from '@/js/services/api/mangaApi';

const loading = ref(false);
const items = ref([]);
const error = ref(null)

onMounted(async () =>{
  loading.value = true
  error.value = null

  try {
    const data = await getTopManga(1,10)
    items.value = data
    console.log('Top Manga: ', data);
  } catch (err){
    error.value = 'Không thể tải leaderboard'
    console.error(err);
  } finally {
    loading.value = false
  }
})
</script>

<style scoped src="@/css/main-items/leaderboard.css"></style>