<template>
  <div class="genres-container">
    <TagsContainer
      :genres="genres"
      v-model:selectedTags="selectedTags"
    />
    <div class="genres-list-items">
      <List_items :selectedTags="selectedTags"/>
    </div>
  </div>
</template>

<script setup>
import TagsContainer from '../main-items/TagsContainer.vue'
import { ref, onMounted } from 'vue'
import List_items from '../main-items/List_items.vue'
import { getTagGenres } from '@/js/services/api/mangaApi'

const genres = ref([])
const selectedTags = ref([])

const fetchGenres = async () => {
  try {
    genres.value = await getTagGenres()
  } catch (err){
    console.error(err);
  }
}

onMounted(fetchGenres)
</script>

<style scoped src="@/css/pages/genres.css"></style>