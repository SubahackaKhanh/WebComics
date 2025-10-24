<template>
  <div class="container">
    <!-- Sidebar -->
    <aside :class="['sidebar', { collapsed: !isOpen }]">
      <div class="top">
        <span v-if="isOpen" class="logo">DASH BOARD</span>
        <button class="toggle-btn" @click="toggleSidebar">☰</button>
      </div>

      <ul class="menu">
        <li v-for="item in menuItems" :key="item.name" class="menu-item">
          <span class="icon">{{ item.icon }}</span>
          <span v-if="isOpen" class="label">{{ item.name }}</span>
          <span v-else class="tooltip">{{ item.name }}</span>
        </li>
      </ul>

      <div class="footer">
        <span class="icon"></span>
        <span v-if="isOpen" class="label">Settings</span>
        <span v-else class="tooltip">Settings</span>
      </div>
    </aside>

    <div class="main-content">
      <Analytic/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Analytic from '../child/analytic.vue'

const isOpen = ref(true)
const menuItems = [
  { name: 'Details', icon:'D' },
  { name: 'History', icon:'H' },
  { name: 'Analytics', icon:'A' },
]

function toggleSidebar() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped src="@/css/common/sidebar.css"></style>