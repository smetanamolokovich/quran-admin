import DashboardView from '@/views/Dashboard/DashboardView.vue'
import UpdateVerseView from '@/views/UpdateVerseView.vue'

export const protectedRoutes = [
    {
        path: '/',
        name: 'main',
        component: DashboardView,
    },
    {
        path: '/surah/:id',
        name: 'surah',
        component: DashboardView,
    },
    {
        path: '/surah/:id/ayat/:ayatId',
        name: 'ayat',
        component: UpdateVerseView,
    },
]