<template>
  <div class="list-item-container" ref="listContainerRef">
    <div class="list-items">
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
import { computed, ref, onMounted, watch, nextTick } from "vue";
import { getListManga } from "@/js/services/api/mangaApi";

const pagination = usePaginationStore();
const listContainerRef = ref(null);
const listHeight = ref(0);
const items = ref([]); // Danh sách manga từ API

// Hàm cập nhật chiều cao container
const updateHeight = () => {
  if (listContainerRef.value) {
    listHeight.value = listContainerRef.value.offsetHeight;
  }
};

// Hàm gọi API để lấy danh sách manga
const fetchManga = async () => {
  try {
    const response = await getListManga(pagination.currentPage, pagination.pageSize);
    items.value = response.items; // Cập nhật danh sách manga
    pagination.setTotalItems(response.pagination.totalItems); // Cập nhật tổng số item
  } catch (err) {
    console.error("Error fetching manga:", err);
  }
};

// Gọi API khi component được mount
onMounted(async () => {
  await fetchManga();
  const imgs = listContainerRef.value.querySelectorAll("img");
  let loaded = 0;
  imgs.forEach(img => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener("load", () => {
        loaded++;
        if (loaded === imgs.length) updateHeight();
      });
    }
  });
  updateHeight();
});

// Theo dõi thay đổi trang và gọi lại API
watch(() => pagination.currentPage, async () => {
  await fetchManga();
  await nextTick();
  updateHeight();
});

// Dữ liệu cho trang hiện tại
const paginatedItems = computed(() => {
  return items.value;
});

defineExpose({
  listHeight,
  listContainerRef
});
</script>

<style scoped src="@/css/main-items/list_item.css"></style>