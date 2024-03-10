<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Editor, {type EditorTextChangeEvent} from 'primevue/editor'

import {ref} from 'vue'
import {getAyat} from '@/services/quranServices'
import {useRoute} from 'vue-router'

const route = useRoute()

const text = ref('')
const tafsirText = ref('')

getAyat(+route.params.id, +route.params.ayatId).then((res) => {
  const {translation, tafsir} = res.ayats[0]

  text.value = translation || ''
  tafsirText.value = tafsir || ''
})

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
  tafsirText.value = e.htmlValue
}

const textChange = (e: EditorTextChangeEvent) => {
  text.value = e.textValue
}
</script>

<template>
  <div>
    <DefaultLayout>
      <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-5 mb-6">
          <h1 class="text-2xl font-bold">Изменить перевод:</h1>
          <Editor v-model="text" style="height: 120px" @text-change="textChange">
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
          <Editor v-model="tafsirText" style="height: 320px" @text-change="textTafsirChange" placeholder="Нет тафсира для данного аята...">
            <template v-slot:toolbar>
              <span class="ql-formats">
                  <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                  <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                  <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
              </span>
            </template>
          </Editor>
        </div>
      </div>
    </DefaultLayout>
  </div>
</template>