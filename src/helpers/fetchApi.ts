// fetch helper with error handling and token management from cookie and store in src/helpers/fetchApi.ts:
import { useAuthStore } from '@/stores/auth'

export const fetchApi = async (url: string, options: RequestInit = {}) => {
    const { token } = useAuthStore()

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        return null
    }

    return response
}