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

    const items = [
        { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing'},
        { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Completed'},
        { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing'},
        { name: 'figger Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'HOT'},
        { name: 'Finger Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing'},
        { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing'},
        { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing'},
        { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing'},
        { name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing'}
    ]
</script>

<style scoped src="@/css/list_item.css"></style>