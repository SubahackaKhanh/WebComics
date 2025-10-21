import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

export function useSuggestList(options = {}){
  const router = useRouter()
  const isOpen = ref(false)
  const hasResults = ref(false)

  function open(){ isOpen.value = true }
  function close(){ isOpen.value = false }
  function setHasResults(v){ hasResults.value = !!v }
  const show = computed(() => isOpen.value && hasResults.value)

  let removeAfterEach
  onMounted(() => {
    if (options.closeOnRouteChange !== false){
      removeAfterEach = router.afterEach(() => { isOpen.value = false })
    }
  })
  onBeforeUnmount(() => { if (removeAfterEach) removeAfterEach() })

  return { isOpen, show, open, close, setHasResults }
}
