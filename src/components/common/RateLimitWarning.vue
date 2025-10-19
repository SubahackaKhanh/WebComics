<template>
  <div v-if="showRateLimitWarning" class="rate-limit-warning">
    <div class="warning-content">
      <div class="warning-icon">⚠️</div>
      <div class="warning-text">
        <h4>Rate Limit Warning</h4>
        <p>We're experiencing high API usage. Data may load slower than usual.</p>
        <p class="small-text">Jikan API allows 3 requests/second and 60 requests/minute.</p>
      </div>
      <button @click="dismissWarning" class="dismiss-btn">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showRateLimitWarning = ref(false)

// Show warning if there are rate limit issues
onMounted(() => {
  // Check if we've had rate limit issues recently
  const hasRateLimitIssues = localStorage.getItem('jikan-rate-limit-issues')
  if (hasRateLimitIssues) {
    showRateLimitWarning.value = true
  }
})

const dismissWarning = () => {
  showRateLimitWarning.value = false
  localStorage.removeItem('jikan-rate-limit-issues')
}

// Listen for rate limit errors
window.addEventListener('jikan-rate-limit', () => {
  showRateLimitWarning.value = true
  localStorage.setItem('jikan-rate-limit-issues', 'true')
})
</script>

<style scoped>
.rate-limit-warning {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

.warning-content {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.warning-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.warning-text {
  flex: 1;
}

.warning-text h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.warning-text p {
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.small-text {
  font-size: 0.8rem !important;
  opacity: 0.9;
}

.dismiss-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.dismiss-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .rate-limit-warning {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .warning-content {
    padding: 0.75rem;
  }
  
  .warning-text h4 {
    font-size: 1rem;
  }
  
  .warning-text p {
    font-size: 0.85rem;
  }
}
</style>
