<template>
  <div class="mt-4">
    <ul class="flex justify-center space-x-2">
      <li v-if="currentPage > 1" @click="changePage(currentPage - 1)" class="cursor-pointer px-4 py-2 border rounded hover:bg-gray-200">Previous</li>
      <li v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{ 'font-bold': currentPage === page, 'cursor-pointer': currentPage !== page }" class="px-4 py-2 border rounded hover:bg-gray-200">{{ page }}</li>
      <li v-if="currentPage < totalPages" @click="changePage(currentPage + 1)" class="cursor-pointer px-4 py-2 border rounded hover:bg-gray-200">Next</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps(['totalItems', 'itemsPerPage']);
const emit = defineEmits(['page-changed']);
const currentPage = ref(1);
const totalPages = ref(Math.ceil(props.totalItems / (props.itemsPerPage || 10)));

watch(currentPage, () => {
  totalPages.value = Math.ceil(props.totalItems / (props.itemsPerPage || 10));
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit('page-changed', page);
  }
};
</script>

<style scoped>
/* Additional Styles using Tailwind CSS classes */
.cursor-pointer {
  cursor: pointer;
}
</style>
