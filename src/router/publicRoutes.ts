import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'

export const publicRoutes = [
    {
        path: '/login',
        name: 'login',
        component: SigninView,
    },
]