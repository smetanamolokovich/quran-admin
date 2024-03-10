import {fetchApi} from '@/helpers/fetchApi'

type payloadSurahs = {
    page: number,
    limit: number,
    surahId: number,
}

type responseSurahs = {
    ayats: ayatType[],
    surahId: number,
    title: string,
}

export type ayatType = {
    id: number,
    text: string,
    translation: string,
    tafsir: string,
}

export const getSurahs = async ({ page, limit, surahId }: payloadSurahs): Promise<responseSurahs | null> => {
    const query = new URLSearchParams({ start: page.toString(), end: limit.toString() })
    const response = await fetchApi(`/surah/${surahId}?${query.toString()}`, {
        method: 'GET',
    })

    if (response) {
        const data = await response.json()
        return data
    }

    return null
}

export const getSurahNames = async () => {
    const response = await fetchApi('/surahNames', {
        method: 'GET',
    })

    if (response) {
        const data = await response.json()
        return data
    }

    return null
}

export const getAyat = async (surahId: number, ayatId: number) => {
    const response = await fetchApi(`/surah/${surahId}/ayat/${ayatId}`, {
        method: 'GET',
    })

    if (response) {
        const data = await response.json()
        return data
    }

    return null
}