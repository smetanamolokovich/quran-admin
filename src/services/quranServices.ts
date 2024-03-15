import {fetchApi} from '@/helpers/fetchApi'

type payloadSurahs = {
    page: number,
    limit: number,
    surahId: number,
    filter: string,
    sort: string,
}

export type responseSurahs = {
    ayats: ayatType[],
    surahId: number,
    title: string,
}

export type ayatType = {
    id: number,
    text: string,
    translation: string,
    tafsir: string,
    updatedAt?: string,
}

export const getSurahs = async ({ page, limit, surahId, filter, sort }: payloadSurahs): Promise<responseSurahs | null> => {
    const query = `start=${page}&end=${limit}&filter=${decodeURIComponent(filter)}&sort=${sort}`
    const response = await fetchApi(`/surah/${surahId}?${query}`, {
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

export const updateAyat = async (surahId: number, ayatId: number, payload: ayatType) => {
    const response = await fetchApi(`/surah/${surahId}/ayat/${ayatId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    })

    if (response) {
        const data = await response.json()
        return data
    }

    return null
}