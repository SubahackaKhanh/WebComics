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

const pagination = usePaginationStore();
const listContainerRef = ref(null);
const listHeight = ref(0);

const updateHeight = () => {
  if (listContainerRef.value) {
    listHeight.value = listContainerRef.value.offsetHeight;
  }
  console.log(listContainerRef.value.offsetHeight,"width");
  
};



// Dữ liệu mẫu 500 item
const items = ref(
  Array.from({ length: 500 }, (_, i) => ({
    name:
      i % 3 === 0
        ? "One Punch Man"
        : i % 3 === 1
        ? "Finger Man"
        : "Figger Man",
    image: "https://picfiles.alphacoders.com/178/178909.jpg",
    status:
      i % 3 === 0 ? "Ongoing" : i % 3 === 1 ? "Completed" : "HOT",
  }))
);

// Gán tổng số item cho pagination
onMounted(() => {
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
  pagination.setTotalItems(items.value.length);
});

watch(() => pagination.currentPage, async () => {
  await nextTick();
  updateHeight();
});

// Tính toán dữ liệu cho trang hiện tại
const paginatedItems = computed(() => {
  const start = (pagination.currentPage - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  return items.value.slice(start, end);
});

defineExpose({
  listHeight,
  listContainerRef
});
</script>

<style scoped src="@/css/list_item.css"></style>