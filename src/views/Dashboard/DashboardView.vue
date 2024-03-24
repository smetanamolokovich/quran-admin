<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TableSorter from '@/components/Tables/TableSorter.vue'

import {type ayatType, getSurahs, updateSurahTitle} from '@/services/quranServices'

import {computed, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {versesCount} from '@/verseCount'
import {watchDebounced} from '@vueuse/core'
import {useToast} from 'primevue/usetoast'
import Spinner from '@/components/Images/Spinner.vue'
import {useQuranStore} from '@/stores/quran'
import Timestamp from '@/components/Timestamp.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const {setSurahTitleById} = useQuranStore()

const limit = 286

const surahId = computed(() => +route.params.id || 1)
const total = computed(() => versesCount[surahId.value] || 1)
const length = computed(() => Math.ceil(total.value / (limit || 10)))
const page = computed({
  get: () => route.query.page ? +route.query.page : 1,
  set: (value) => {
    router.push({query: {page: value}})
  }
})

const ayats = ref<ayatType[]>([])
const filterText = ref('')
const sortBy = ref('id:asc')
const surahTitle = ref('')
const loading = ref(false)

const readSurahs = async ({page, limit, surahId, filter, sort}: {
  page: number,
  limit: number,
  surahId: number,
  filter: string,
  sort: string,
}): Promise<void> => {
  const res = await getSurahs({page, limit, surahId, filter, sort})
  ayats.value = res ? res.ayats : []
  surahTitle.value = res ? res.title : ''
}

const updateTitle = async () => {
  loading.value = true
  await updateSurahTitle(surahId.value, surahTitle.value).then((res) => {
    readSurahs({page: page.value, limit: limit, surahId: surahId.value, filter: filterText.value, sort: sortBy.value})
    surahTitle.value = res.title
    setSurahTitleById(surahId.value, res.title)
    loading.value = false
    toast.add({severity: 'success', summary: 'Успешно', detail: 'Название суры обновлено'})
  }).catch(() => {
    loading.value = false
    toast.add({severity: 'error', summary: 'Ошибка', detail: 'Не удалось обновить название суры'})
  })
}

watch([page, surahId, sortBy], async () => {
  await readSurahs({page: page.value, limit: limit, surahId: surahId.value, filter: filterText.value, sort: sortBy.value})
}, {immediate: true})

watchDebounced(
  filterText,
  (newText) => {
    readSurahs({page: page.value, limit: limit, surahId: surahId.value, filter: newText, sort: sortBy.value})
  },
  {debounce: 1000},
)
</script>

<template>
  <DefaultLayout show-sidebar>
    <div class="flex gap-4">
      <input v-model="surahTitle" :disabled="loading" type="text" id="title" class="block w-[350px] p-4 ps-10 rounded-md text-sm text-gray-900 border border-stroke outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
      <div class="flex items-center justify-center space-x-3.5">
        <button v-if="!loading" class="hover:text-primary" @click="updateTitle">
          <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <Spinner v-else />
      </div>
    </div>

    <div class="relative my-4">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input v-model="filterText" type="search" id="default-search"
             class="block w-full p-4 ps-10 rounded-md text-sm text-gray-900 border border-stroke outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
             placeholder="Поиск по тексту..." required/>
    </div>

    <div
        class="max-h-[70vh] overflow-y-scroll rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th class="max-w-[70px] py-4 px-4 font-medium text-black dark:text-white text-center">
              <TableSorter prop="id" v-model:sortString="sortBy">Номер</TableSorter>
            </th>
            <th class="max-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Перевод
            </th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              <TableSorter v-model:sortString="sortBy" prop="updatedAt">Дата обновления</TableSorter>
            </th>
            <th class="py-4 px-4 font-medium text-black dark:text-white text-center">Действия</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="ayat in ayats" :key="ayat.id">
            <td class="py-5 px-4">
              <p class="text-black dark:text-white text-center">{{ ayat.id }}</p>
            </td>
            <td class="py-5 px-4 pl-9 xl:pl-11 max-w-[600px]">
              <p class="text-md truncate">{{ ayat.translation }}</p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">
                <Timestamp :timestamp="ayat.updatedDate" is-today />
              </p>
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

    <v-pagination class="mt-4" v-if="total > limit" v-model="page" :length="length" :total-visible="5"
                  next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"></v-pagination>
  </DefaultLayout>
</template>
