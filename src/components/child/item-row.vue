<template>
  <div class="item-row" v-if="item">
    <div class="rank-badge" v-if="rank">
      {{ rank }}
    </div>
    <div class="item-pic">
      <img :src="item.image" :alt="item.name" />
    </div>
    <div class="item-name">
      {{ item.name }}
      <div class="item-chapter" :class="item.status?.toLowerCase()">
        {{ item.status }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  rank: Number 
})
</script>

<style scoped src="@/css/itemrow.css"></style>
