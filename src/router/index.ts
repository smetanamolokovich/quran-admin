import { createRouter, createWebHistory } from 'vue-router'
import {publicRoutes} from '@/router/publicRoutes'
import {protectedRoutes} from '@/router/protectedRoutes'
import {useAuthStore} from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      ...publicRoutes,
      ...protectedRoutes
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `Quran - admin`

  const authStore = useAuthStore()
  authStore.loadToken()

  if (authStore.isAuthenticated) {
    if (to.name === 'login') {
      return next({ name: 'main' })
    } else {
        return next()
    }
  } else {
    if (to.name !== 'login') {
      return next({ name: 'login' })
    } else {
      return next()
    }
  }
})

export default router
