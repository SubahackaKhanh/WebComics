<template>
    <div class="list-items">
        <items-card
          v-for="(item, index) in items"
          :key="index"
          :item="item"
        />
    </div>
</template>

<script setup>
    import itemsCard from '../child/items-card.vue';

    const items = Array.from({ length: 500 }, (_, i) => ({
    name: i % 3 === 0 ? 'One Punch Man' : i % 3 === 1 ? 'Finger Man' : 'Figger Man',
    image: 'https://picfiles.alphacoders.com/178/178909.jpg',
    status: i % 3 === 0 ? 'Ongoing' : i % 3 === 1 ? 'Completed' : 'HOT'
    }))
</script>

<style scoped src="@/css/list_item.css"></style>