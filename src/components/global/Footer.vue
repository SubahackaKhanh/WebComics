<template>
  <footer class="main-footer">
    <div class="footer-grid">
      <!-- Contact -->
      <div class="footer-section">
        <h3>Contact</h3>
        <ul>
          <li><a href="tienle1924!@gmail.com">Email Us</a></li>
          <li><a href="https://www.facebook.com/le.tien.203990">Facebook</a></li>
        </ul>
      </div>

      <!-- Report -->
      <div class="footer-section">
        <h3>Report</h3>
        <ul>
          <li><button @click="openReportForm">Report a Problem</button></li>
        </ul>
      </div>

      <!-- Suggest -->
      <div class="footer-section">
        <h3>Suggest</h3>
        <ul>
          <li><button @click="openSuggestForm">Send Suggestion</button></li>
        </ul>
      </div>
    </div>

    <!-- Overlay Forms -->
    <div v-if="showReport" class="overlay">
      <div class="overlay-content">
        <h3>Report a Problem</h3>
        <textarea placeholder="Describe the issue..." v-model="reportText"></textarea>
        <div class="form-buttons">
          <button @click="submitReport">Submit</button>
          <button @click="closeForms">Cancel</button>
        </div>
      </div>
    </div>

    <div v-if="showSuggest" class="overlay">
      <div class="overlay-content">
        <h3>Suggest an Improvement</h3>
        <textarea placeholder="Your suggestion..." v-model="suggestText"></textarea>
        <div class="form-buttons">
          <button @click="submitSuggest">Submit</button>
          <button @click="closeForms">Cancel</button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { 
  showReport, showSuggest, reportText, suggestText,
  openReportForm, openSuggestForm, closeForms, submitReport, submitSuggest 
} from '@/js/footer.js'

defineExpose({
  showReport,
  showSuggest,
  reportText,
  suggestText,
  openReportForm,
  openSuggestForm,
  closeForms,
  submitReport,
  submitSuggest
})
</script>

<style scoped src="@/css/footer.css"></style>