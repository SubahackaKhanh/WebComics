<template>
  <div class="list-item-container" ref="listContainerRef">
    <Loading v-if="isLoading" />
    <div class="list-items">
      <div v-if="!paginatedItems.length" class="no-results">
        There is no comic with selected tags
      </div>
      <items-card
        v-for="item in paginatedItems"
        :key="item.id || item.mal_id"  
        :item="item"
      />
    </div>
    <div class="list-items-pagination">
      <Pagination />
    </div>
  </div>
</template>

<script setup>
import itemsCard from "../child/items-card.vue";
import Pagination from "@/components/common/Pagination.vue";
import { usePaginationStore } from "@/js/module/pagination";
import { computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { getListManga } from "@/js/services/api/mangaApi";
import { debounce, isEqual } from "lodash"; 
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

const updateHeight = () => {
  if (listContainerRef.value) {
    listHeight.value = listContainerRef.value.offsetHeight;
  }
};

const paginatedItems = computed(() => items.value);

let abortController;

const fetchManga = debounce(async () => {
  try {
    isLoading.value = true;
    items.value = [];
    if (abortController) abortController.abort();
    abortController = new AbortController();

    const response = await getListManga(
      pagination.currentPage,
      pagination.pageSize,
      props.selectedTags,
      abortController.signal
    );

    items.value = response.items || [];
    pagination.setTotalItems(response.pagination?.totalItems || 0);

    await nextTick();
    updateHeight();
  } catch (err) {
    if (err?.name !== "AbortError") {
      console.error("Error fetching manga:", err);
    }
  } finally {
    isLoading.value = false;
  }
}, 500);

// Khi component mount
onMounted(async () => {
  await fetchManga();
  const imgs = listContainerRef.value.querySelectorAll("img");
  let loaded = 0;
  imgs.forEach((img) => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener(
        "load",
        () => {
          loaded++;
          if (loaded === imgs.length) updateHeight();
        },
        { once: true }
      );
    }
  });
  updateHeight();
});

watch(
  () => props.selectedTags,
  async (newTags, oldTags) => {
    if (!isEqual(newTags, oldTags)) {
      pagination.setPage(1);
      await fetchManga();
    }
  },
  { deep: true }
);

watch(
  () => pagination.currentPage,
  async (newPage, oldPage) => {
    if (newPage !== oldPage) {
      await fetchManga();
    }
  }
);

onBeforeUnmount(() => {
  fetchManga.cancel && fetchManga.cancel();
  if (abortController) abortController.abort();
});

defineExpose({
  listHeight,
  listContainerRef
});
</script>

<style scoped src="@/css/main-items/list_item.css"></style>
