// store for jwt token from cookie
import {defineStore} from 'pinia'
import {ref} from 'vue'

export type UserType = {
    username: string
    role: string
}

export const useAuthStore = defineStore('auth', () => {
    const token = ref<null | string>(null)
    const isAuthenticated = ref(false)
    const user = ref<UserType | null>(null)

    function setToken(newToken: string) {
        token.value = newToken
        isAuthenticated.value = true
    }

    function removeToken() {
        token.value = ''
        isAuthenticated.value = false
    }

    function loadToken() {
        const jwt = token.value || sessionStorage.getItem('token') || null
        if (jwt) {
            // check if token is expired
            const payload = JSON.parse(atob(jwt.split('.')[1]))
            if (payload.exp < Date.now() / 1000) {
                return removeToken()
            }

            setToken(jwt)
        }
    }

    function setUser(newUser: { username: string, role: string}) {
        user.value = newUser
    }

    return { token, isAuthenticated, user, setToken, removeToken, loadToken, setUser }
})