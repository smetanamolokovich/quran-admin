<script setup lang="ts">
import type {ayatType} from '@/services/quranServices'
import TableSorter from '@/components/Tables/TableSorter.vue'

defineProps({
  ayats: { type: Array as () => ayatType[] },
  surahId: { type: Number },
  sortBy: { type: String, required: true },
})
</script>

<template>
  <div
    class="max-h-[90vh] overflow-scroll rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th class="max-w-[50px] py-4 px-4 font-medium text-black dark:text-white">
              <TableSorter prop="id" v-model:sortString="sortBy">Номер</TableSorter>
            </th>
            <th class="max-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Перевод
            </th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              <TableSorter v-model:sortString="sortBy" prop="updated_at">Дата обновления</TableSorter>
            </th>
            <th class="py-4 px-4 font-medium text-black dark:text-white text-center">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ayat in ayats" :key="ayat.id">
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ ayat.id }}</p>
            </td>
            <td class="py-5 px-4 pl-9 xl:pl-11 max-w-[600px]">
              <p class="text-sm truncate">{{ ayat.translation }}</p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ ayat.updatedAt || '-' }}</p>
            </td>
            <td class="py-5 px-4">
              <div class="flex items-center justify-center space-x-3.5">
                <button class="hover:text-primary" @click="$router.push(`/surah/${surahId}/ayat/${ayat.id}`)">
                  <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
