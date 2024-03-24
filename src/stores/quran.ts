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
        surahNames.value = names
    }

    function setSurahTitleById(surahId: number, title: string) {
        const surah = surahNames.value.find((surah) => surah.surahId === surahId)
        if (surah) {
            surah.title = title
        }

        surahNames.value = [...surahNames.value]
    }

    function setSurahsLoading(loading: boolean) {
        surahsLoading.value = loading
    }

    return { surahNames, setSurahNames, setSurahsLoading, surahsLoading, setSurahTitleById }
})