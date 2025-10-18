<template>
  <div class="genres-container">
    <TagsContainer
      :genres="tags"
      v-model:selectedTags="selectedTags"
    />
    <div class="genres-list-items">
      <List_items/>
    </div>
  </div>
</template>

<script setup>
import TagsContainer from '../main-items/TagsContainer.vue'
import { tags } from '@/js/module/list-tags.js'
import { ref } from 'vue'
import List_items from '../main-items/List_items.vue'

const selectedTags = ref([])
</script>

<style scoped src="@/css/pages/genres.css"></style>