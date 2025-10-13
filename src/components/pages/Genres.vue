<template>
  <TagsContainer
    :genres="tags"
    v-model:selectedTags="selectedTags"
  />
</template>

<script setup>
import TagsContainer from '../main-items/TagsContainer.vue'
import { tags } from '@/js/module/list-tags.js'
import { ref } from 'vue'

const selectedTags = ref([])
</script>
