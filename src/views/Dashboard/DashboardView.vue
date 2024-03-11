<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import {type ayatType, getSurahs} from '@/services/quranServices'

import {computed, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {versesCount} from '@/verseCount'
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue'

const route = useRoute()
const router = useRouter()

const limit = 6

const surahId = computed(() => +route.params.id || 1)
const total = computed(() => versesCount[surahId.value] || 1)
const length =  computed(() => Math.ceil(total.value / (limit || 10)))
const page = computed({
  get: () => route.query.page ? +route.query.page : 1,
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
  <DefaultLayout show-sidebar>
    <div v-for="ayat in ayats" :key="ayat.id"
       class="w-full flex items-center justify-between overflow-hidden block p-4 bg-white hover:bg-gray-3 dark:hover:bg-meta-4 border border-stroke hover:bg-gray-100 dark:bg-boxdark dark:border-strokedark"
    >
      <div class="p-6">
        <h5 class="mb-2 text-xl font-bold leading-tight">﴾ {{ ayat.text }} ﴿</h5>
        <p class="mt-6 text-xl font-bold leading-relaxed">{{ ayat.id }}. {{ ayat.translation }}</p>
      </div>
      <ButtonDefault @click="$router.push(`/surah/${surahId}/ayat/${ayat.id}`)" route="/" label="Редактировать" customClasses="bg-meta-3 text-white rounded-full font-bold" />
    </div>

    <v-pagination class="mt-4" v-if="total > limit" v-model="page" :length="length" :total-visible="5" next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"></v-pagination>
  </DefaultLayout>
</template>
