<template>
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
            <Bar :data="visitsData" :options="chartOptions" />
          </div>

          <div class="chart" id="usersChart">
            <h3>Active Users</h3>
            <Line :data="usersData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </slot>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import { Bar, Line } from 'vue-chartjs'

Chart.register(...registerables)

const stats = ref([
  { title: 'Total Users', value: 1240 },
  { title: 'New Today', value: 34 },
  { title: 'Visits', value: 5320 },
  { title: 'Revenue', value: '$12,340' },
])

const visitsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Visits',
      data: [800, 1200, 1100, 1800, 2000, 2500, 3000],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    },
  ],
}

const usersData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Active Users',
      data: [200, 400, 350, 600, 700, 800],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false,
      tension: 0.3,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, labels: { color: '#fff' } },
  },
  scales: {
    x: { ticks: { color: '#ccc' } },
    y: { ticks: { color: '#ccc' } },
  },
}
</script>

<style scoped src="@/css/common/sidebar.css"></style>
