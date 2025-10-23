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

    <!-- Main content -->
    <main class="main-content">
      <slot>
        <div class="main-content-container">
          <!-- Statistic Cards -->
          <div class="stats-cards">
            <div class="card" v-for="stat in stats" :key="stat.title">
              <h3>{{ stat.title }}</h3>
              <p>{{ stat.value }}</p>
            </div>
          </div>

          <!-- Chart area -->
          <div class="charts">
            <div class="chart" id="visitsChart">
              <h3>Visits Over Time</h3>
              <!-- Bạn có thể dùng chart library như Chart.js hoặc ApexCharts -->
              <p>Chart placeholder</p>
            </div>

            <div class="chart" id="usersChart">
              <h3>Active Users</h3>
              <p>Chart placeholder</p>
            </div>
          </div>
        </div>
      </slot>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(true)
const menuItems = [
  { name: 'Details', icon:'D' },
  { name: 'History', icon:'H' },
  { name: 'Analytics', icon:'A' },
]

const stats = ref([
  { title: 'Total Users', value: 1240 },
  { title: 'New Today', value: 34 },
  { title: 'Visits', value: 5320 },
  { title: 'Revenue', value: '$12,340' },
])

function toggleSidebar() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped src="@/css/common/sidebar.css"></style>