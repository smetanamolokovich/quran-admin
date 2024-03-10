<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import {type ayatType, getSurahs} from '@/services/quranServices'

import {computed, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {versesCount} from '@/verseCount'

const route = useRoute()
const router = useRouter()

const limit = 10

const surahId = computed(() => +route.params.id || 1)
const total = computed(() => versesCount[surahId.value] || 1)
const length =  computed(() => Math.ceil(total.value / (limit || 10)))
const page = computed({
  get: () => +route.query.page || 1,
  set: (value) => {
    router.push({query: {page: value}})
  }
})

const ayats = ref<ayatType[]>([])

watch([page, surahId], () => {
  getSurahs({page: page.value, limit: limit, surahId: surahId.value}).then((res) => {
    ayats.value = res?.ayats || []
  })
}, {immediate: true})
</script>

<template>
  <DefaultLayout>
    <router-link v-for="ayat in ayats"
       :key="ayat.id"
        :to="`/surah/${surahId}/ayat/${ayat.id}`"
       class="cursor-pointer mb-6 block p-6 bg-white hover:bg-gray-3 dark:hover:bg-meta-4 border border-stroke rounded-sm shadow hover:bg-gray-100 dark:bg-boxdark dark:border-strokedark"
    >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">﴾ {{ ayat.text }} ﴿</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">{{ ayat.id }}. {{ ayat.translation }}</p>
    </router-link>

    <v-pagination v-if="total > limit" v-model="page" :length="length" :total-visible="5" next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"></v-pagination>
  </DefaultLayout>
</template>
