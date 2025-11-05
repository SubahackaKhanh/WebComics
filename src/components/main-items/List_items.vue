<template>
  <div class="list-item-container" ref="listContainerRef">
    <Loading v-if="isLoading"/>
    <div class="list-items">
      <div v-if="!paginatedItems.length" class="no-results">
         There is no comic with selected tags
      </div>
      <items-card
        v-for="(item, index) in paginatedItems"
        :key="index"
        :item="item"
      />
    </div>    
    <div class="list-items-pagination">
      <Pagination/>
    </div>
  </div>
</template>

<script setup>
import itemsCard from "../child/items-card.vue";
import Pagination from "@/components/common/Pagination.vue";
import { usePaginationStore } from "@/js/module/pagination";
import { computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { getListManga } from "@/js/services/api/mangaApi";
import { debounce } from 'lodash'; // Import lodash debounce
import Loading from "../common/Loading.vue";

const props = defineProps({
  selectedTags: {
    type: Array,
    default: () => [] 
  }
});

const pagination = usePaginationStore();
const listContainerRef = ref(null);
const listHeight = ref(0);
const items = ref([]);
const isLoading = ref(false);

// Hàm cập nhật chiều cao container
const updateHeight = () => {
  if (listContainerRef.value) {
    listHeight.value = listContainerRef.value.offsetHeight;
  }
};

const paginatedItems = computed(() => {
  console.log('Items:', items.value);
  console.log('Selected tags:', props.selectedTags);
  return items.value;
});

// Hàm gọi API với debounce
let abortController
const fetchManga = debounce(async () => {
  try {
    isLoading.value= true;
    items.value = []; // Reset trước khi fetch
    console.log('Fetching manga with:', { page: pagination.currentPage, tags: props.selectedTags });
    // Hủy request cũ nếu có
    if (abortController) abortController.abort()
    abortController = new AbortController()
    const response = await getListManga(pagination.currentPage, pagination.pageSize, props.selectedTags, abortController.signal);
    items.value = response.items;
    pagination.setTotalItems(response.pagination.totalItems);
    await nextTick();
    updateHeight();
  } catch (err) {
    if (err?.name !== 'AbortError') {
      console.error("Error fetching manga:", err);
    }
  } finally{
    isLoading.value = false;
  }
}, 500); // Debounce 500ms to respect Jikan rate limits

// Gọi API khi component được mount
onMounted(async () => {
  await fetchManga();
  const imgs = listContainerRef.value.querySelectorAll("img");
  let loaded = 0;
  imgs.forEach(img => {
    if (img.complete) {
      loaded++;
    } else {
      const onLoad = () => {
        loaded++;
        if (loaded === imgs.length) updateHeight();
      };
      img.addEventListener("load", onLoad, { once: true });
    }
  });
  updateHeight();
});

// Theo dõi thay đổi trang và selectedTags
watch(() => props.selectedTags, async (newTags, oldTags) => {
  if (JSON.stringify(newTags) !== JSON.stringify(oldTags)) {
    console.log('Tags changed:', newTags);
    pagination.setPage(1); // Reset về trang 1
    await fetchManga();
  }
}, { deep: true });

watch(() => pagination.currentPage, async (newPage, oldPage) => {
  if (newPage !== oldPage) {
    console.log('Page changed:', newPage);
    await fetchManga();
  }
});

onBeforeUnmount(() => {
  // Hủy debounce và request đang chạy
  fetchManga.cancel && fetchManga.cancel()
  if (abortController) abortController.abort()
});

defineExpose({
  listHeight,
  listContainerRef
});
</script>

<style scoped src="@/css/main-items/list_item.css"></style>