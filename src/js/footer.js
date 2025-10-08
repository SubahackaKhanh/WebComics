import { ref } from 'vue'

export const showReport = ref(false)
export const showSuggest = ref(false)
export const reportText = ref('')
export const suggestText = ref('')

export function openReportForm() {
  closeForms()
  showReport.value = true
}

export function openSuggestForm() {
  closeForms()
  showSuggest.value = true
}

export function closeForms() {
  showReport.value = false
  showSuggest.value = false
  reportText.value = ''
  suggestText.value = ''
}

export function submitReport() {
  if (!reportText.value.trim()) {
    alert('Please describe the issue.')
    return
  }
  alert('Report submitted successfully!')
  closeForms()
}

export function submitSuggest() {
  if (!suggestText.value.trim()) {
    alert('Please enter your suggestion.')
    return
  }
  alert('Thank you for your suggestion!')
  closeForms()
}
