<template>
    <Header/>
    <div class="main-container">
        <ListItemSelect/>
        <ItemDetails/>
        <!-- <LeaderBoard/> -->
    </div>
    <Footer/>
</template>

<script setup>
import Footer from '@/components/global/Footer.vue';
import Header from '@/components/global/Header.vue';
import LeaderBoard from '@/components/main-items/LeaderBoard.vue';
import ItemDetails from '@/components/common/ItemDetails.vue';
import ListItemSelect from '@/components/main-items/ListItemSelect.vue';

</script>

<style scoped src="@/css/layout/ItemDetailsLayout.css"></style>