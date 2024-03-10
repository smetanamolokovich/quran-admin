import { fetchApi } from '@/helpers/fetchApi'
import {useAuthStore} from '@/stores/auth'

export const login = async (username: string, password: string) => {
    const auth = useAuthStore()
    const response = await fetchApi('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    })

    if (response) {
        const data = await response.json()
        sessionStorage.setItem('token', data.token)
        auth.setToken(data.token)
        auth.setUser(data.data.user)

        return data
    }

    return null
}


export const logout = async () => {
    const response = await fetchApi('/logout', {
        method: 'GET',
    })

    if (response) {
        sessionStorage.removeItem('token')
        return true
    }

    return false
}