<template>
    <Header />
    <router-view/>
    <Footer />
</template>

<script setup>
    import Header from '@/components/global/Header.vue';
    import './assets/main.css';
    import Footer from '@/components/global/Footer.vue';
</script>   

