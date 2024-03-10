import {defineStore} from 'pinia'
import {ref} from 'vue'

type SurahNames = {
    title: string,
    surahId: number,
}

export const useQuranStore = defineStore('quran', () => {
    const surahNames = ref<SurahNames[]>([])
    const surahsLoading = ref(false)

    function setSurahNames(names: SurahNames[]) {
        console.log('setSurahNames', names)
        surahNames.value = names
    }

    function setSurahsLoading(loading: boolean) {
        surahsLoading.value = loading
    }

    return { surahNames, setSurahNames, setSurahsLoading, surahsLoading }
})