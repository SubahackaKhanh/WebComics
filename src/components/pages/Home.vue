<template>
    <Horizontal_items />
    <div class="list">
        <div class = "list-container">
            <List_items/>
        </div>
        <div class ="leaderboard">
            <LeaderBoard/>
        </div>
    </div>
</template>

<script setup>
    import Horizontal_items from '../main-items/Horizontal_items.vue';
    import LeaderBoard from '../main-items/LeaderBoard.vue';
    import List_items from '../main-items/List_items.vue';
    import { useLoadingStore } from '@/js/composables/useLoadingStore'
    import { onMounted } from 'vue';
    const loading = useLoadingStore()

    onMounted(async () => {
    // Chờ dữ liệu về xong mới tắt loader
    await new Promise(resolve => setTimeout(resolve, 800)) // fetch API giả
    loading.hide()
    })
</script>

<style scoped src="@/css/home.css"></style>