<template>
  <TagsContainer
    :genres="tags"
    v-model:selectedTags="selectedTags"
  />
  <List_items/>
</template>

<script setup>
import TagsContainer from '../main-items/TagsContainer.vue'
import { tags } from '@/js/module/list-tags.js'
import { ref } from 'vue'
import List_items from '../main-items/List_items.vue'

const selectedTags = ref([])
</script>
