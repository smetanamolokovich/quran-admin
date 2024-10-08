<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Editor, {type EditorTextChangeEvent} from 'primevue/editor'

import {computed, reactive, ref, watch} from 'vue'
import {getAyat, updateAyat} from '@/services/quranServices'
import {useRoute} from 'vue-router'
import {useToast} from 'primevue/usetoast'
import {versesCount} from '@/verseCount'

const route = useRoute()
const toast = useToast()

const ayat = reactive({
  text: '',
  translation: '',
  tafsir: '',
  id: 0,
})
const loading = ref(false)
const limit = computed(() => versesCount[+route.params.id] || 1)
const page = computed(() => +route.params.ayatId)

const getAyatData = async () => {
  const res = await getAyat(+route.params.id, +route.params.ayatId)
  const {translation, tafsir, text, id} = res.ayats[0]

  ayat.translation = translation
  ayat.tafsir = tafsir
  ayat.text = text
  ayat.id = id
}

watch(page, async () => await getAyatData(), { immediate: true })

function replaceTags(html: string) {
  // Replace <p> or </p> with ''
  html = html.replace(/<\/?p>/g, '')

  // Replace <strong> or </strong> with *
  html = html.replace(/<\/?strong>/g, '*')

  // Replace <em> or </em> with _
  html = html.replace(/<\/?em>/g, '_')

  // Replace <u> or </u> with __
  html = html.replace(/<\/?u>/g, '__')

  return html
}


const textTafsirChange = (e: EditorTextChangeEvent) => {
  ayat.tafsir = e.htmlValue
}

const textChange = (e: EditorTextChangeEvent) => {
  ayat.translation = e.textValue
}

const handleSubmit = () => {
  if (loading.value) return
  loading.value = true
  updateAyat(+route.params.id, +route.params.ayatId, {
    translation: ayat.translation,
    tafsir: ayat.tafsir,
    text: ayat.text,
    id: ayat.id,
  }).then((res) => {
    const {translation, tafsir} = res.ayats[0]

    ayat.translation = translation
    ayat.tafsir = tafsir
    loading.value = false

    toast.add({
      severity: 'success',
      summary: 'Изменения сохранены успешно',
      detail: `Сура ${+route.params.id}, аят ${route.params.ayatId} редактировано.`,
      life: 3000,
    });
  }).catch((err) => {
    loading.value = false
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Что-то пошло не так, попробуйте еще раз.',
      life: 3000
    });
  })
}
</script>

<template>
  <DefaultLayout>
    <div class="w-full h-8 relative">
      <a v-if="+route.params.ayatId > 1"
         @click="$router.push(`/surah/${+route.params.id}/ayat/${+route.params.ayatId - 1}`)"
         class="absolute left-0 cursor-pointer font-bold text-black-600 dark:text-blue-500 hover:underline"
      >← Аят номер {{ +route.params.ayatId - 1 }}</a>

      <a v-if="limit > +route.params.ayatId"
         @click="$router.push(`/surah/${+route.params.id}/ayat/${+route.params.ayatId + 1}`)"
         class="absolute right-0 cursor-pointer font-bold text-black-600 dark:text-blue-500 hover:underline"
      > Аят номер {{ +route.params.ayatId + 1 }} →</a>
    </div>
    <div class="flex flex-col gap-5 mb-6">
      <h1 class="text-2xl font-bold">Перевод:</h1>
      <Editor v-model="ayat.translation" editorStyle="height: 120px; fontSize: 16px;" @text-change="textChange">
        <template v-slot:toolbar>
            <span class="ql-formats">
                <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
            </span>
        </template>
      </Editor>
    </div>
    <div class="flex flex-col gap-5">
      <h1 class="text-2xl font-bold">Тафсир:</h1>
      <Editor v-model="ayat.tafsir" editorStyle="height: 280px; fontSize: 16px;" @text-change="textTafsirChange" placeholder="Нет тафсира для данного аята...">
        <template v-slot:toolbar>
            <span class="ql-formats">
                <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
            </span>
        </template>
      </Editor>
    </div>
    <div class="flex justify-between">
      <button
          type="button"
          class="self-start max-w-[180px] mt-4 focus:outline-none text-white bg-red hover:bg-danger focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          @click="$router.push(`/surah/${+route.params.id}`)"
      >
        Назад
      </button>
      <button
          v-if="!loading"
          type="button"
          class="self-end max-w-[180px] mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          @click="handleSubmit"
      >
        Сохранить изменени
      </button>
      <button v-else disabled type="button" class="self-end max-w-[180px] mt-4 py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
        <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
        </svg>
        Сохранение...
      </button>
    </div>
  </DefaultLayout>
</template>
<style scoped>
:deep(.ql-editor p) {
  font-size: 16px;
  line-height: 1.6;
}
</style>