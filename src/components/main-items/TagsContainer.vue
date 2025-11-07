<template>
  <div class="tags-container">
    <div class="tags-header">
      <span v-if="selectedTags.length">
        Selected ({{ selectedTags.length }})
      </span>
      <button 
        v-if="selectedTags.length"
        class="clear-btn"
        @click="clearTags">
        Clear All
      </button>
    </div>

    <div class="tags-grid">
      <Tags
        v-for="genre in genres"
        :key="genre.id"
        :name="genre.name"
        :active="selectedTags.includes(genre.name)"
        @toggle="toggleTag"
      />
    </div>
  </div>
</template>

<script setup>
import Tags from '../child/tags.vue';
import { ref, onMounted, computed } from 'vue';
import { getTagGenres } from '@/js/services/api/mangaApi';

const props = defineProps({
  genres: {
    type: Array,
    default: () => []
  },
  selectedTags: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:selectedTags']); // Sửa emit event name

const genres = ref([]);
const fetchGenres = async () => {
  try {
    genres.value = await getTagGenres();
  } catch (err) {
    console.error('Failed to fetch genres:', err);
  }
};

onMounted(fetchGenres);

const selectedTags = computed({
  get: () => props.selectedTags || [], // Sửa: Lấy từ props.selectedTags
  set: val => emit('update:selectedTags', val) // Sửa: Emit 'update:selectedTags'
});

function toggleTag(tagName) {
  const current = [...selectedTags.value];
  const index = current.indexOf(tagName);
  if (index === -1) current.push(tagName);
  else current.splice(index, 1);
  selectedTags.value = current; // Setter sẽ emit đúng event
}

function clearTags() {
  selectedTags.value = [];
}
</script>

<style scoped src="@/css/child/tags.css"></style>