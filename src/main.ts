import './assets/css/satoshi.css'
import './assets/css/style.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import VueApexCharts from 'vue3-apexcharts'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css';

const vuetify = createVuetify({ components, directives })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(PrimeVue)
app.use(ToastService)

app.mount('#app')
