<template>
    <Header/>
    <div class="item-details-layout">
        <section class="hero">
            <div class="items-scroller">
                <items-card
                    v-for="(item, index) in items"
                    :key="index"
                    :item="item"
                />
            </div>
            <aside class="author-sidebar">
                <AuthorDetails/>
            </aside>
        </section>
        <main class="content">
            <section class="details">
                <ItemDetails/>
            </section>
            <aside class="sidebar">
                <ListItemSelect/>
                <LeaderBoard/>
            </aside>
        </main>
    </div>
    <Footer/>

</template>

<script setup>
import Footer from '@/components/global/Footer.vue';
import Header from '@/components/global/Header.vue';
import LeaderBoard from '@/components/main-items/LeaderBoard.vue';
import ItemDetails from '@/components/common/ItemDetails.vue';
import ListItemSelect from '@/components/main-items/ListItemSelect.vue';
import AuthorDetails from '@/components/common/AuthorDetails.vue';
import itemsCard from '@/components/child/items-card.vue';

const items = [{
    name: 'One Punch Man', image: 'https://picfiles.alphacoders.com/178/178909.jpg', status: 'Ongoing',
}]
</script>

<style scoped src="@/css/layout/ItemDetailsLayout.css"></style>