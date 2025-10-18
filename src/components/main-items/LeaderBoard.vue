<template>
  <div class="leaderboard-container">
    <div class="leaderboard-form">
        <h1>LeaderBoard</h1>
      <ItemRow
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
import { ref } from 'vue';

const items = ref(
  Array.from({ length: 10 }, (_, i) => ({
    name:
      i % 3 === 0
        ? "One Punch Man"
        : i % 3 === 1
        ? "Finger Man"
        : "Figger Man",
    image: "https://picfiles.alphacoders.com/178/178909.jpg",
    status:
      i % 3 === 0 ? "Ongoing" : i % 3 === 1 ? "Completed" : "HOT",
  }))
);
</script>

<style scoped src="@/css/main-items/leaderboard.css"></style>