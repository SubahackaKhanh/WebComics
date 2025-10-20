<template>
    <div class="home-container">
        <!-- Top Anime Section -->
        <Horizontal_items 
            title="Top Anime" 
            type="top"
        />
        
        <!-- Airing Anime Section -->
        <Horizontal_items 
            title="Currently Airing" 
            type="airing"
        />
        
        <!-- Upcoming Anime Section -->
        <Horizontal_items 
            title="Upcoming Anime" 
            type="upcoming"
        />
        
        <div class="list">
            <div class = "list-container">
                <List_items ref="listComp"/>
            </div>
            <div class ="leaderboard" :style="{ height: leaderboardHeight + 'px' }">
                <LeaderBoard/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Horizontal_items from '../main-items/Horizontal_items.vue';
    import LeaderBoard from '../main-items/LeaderBoard.vue';
    import List_items from '../main-items/List_items.vue';
    import { useLoadingStore } from '@/js/composables/useLoadingStore'
    import { onMounted, ref, nextTick } from 'vue';
    const loading = useLoadingStore()

    const leaderboardHeight = ref(0);
    const listComp = ref(null);
    
    const updateLeaderboardHeight = () => {
        if(listComp.value){
            leaderboardHeight.value =listComp.value.listHeight;
        }
    };

    onMounted(async () => {
        await nextTick();
        updateLeaderboardHeight();

        await new Promise(resolve => setTimeout(resolve, 800)) // fetch API giả
        loading.hide();
    });

    window.addEventListener('resize', updateLeaderboardHeight);
</script>

<style scoped src="@/css/pages/home.css"></style>