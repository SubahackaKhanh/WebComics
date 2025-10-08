<template>
  <Header />
  <router-view/>
  <!-- <Horizontal_items/>
  <List_items/> -->
  <Footer />
</template>

<script setup>
  import './assets/main.css';
  import Header from './components/global/Header.vue';
  import Footer from './components/global/Footer.vue';
</script>

