<script setup lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import { login } from '@/services/authServices'

import { ref } from 'vue'
import {useAuthStore} from '@/stores/auth'
import {useRouter} from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const loginForm = ref({
  username: '',
  password: '',
})


async function handleLogin(e: Event) {
  e.preventDefault()

  await login(loginForm.value.username, loginForm.value.password)
  authStore.loadToken()
  await router.push('/')
}

</script>

<template>
  <DefaultLayout>
    <DefaultAuthCard title="Войти в систему">
      <form @submit="handleLogin">
        <InputGroup v-model="loginForm.username" label="Логин" type="text" placeholder="Введи логин">
        </InputGroup>

        <InputGroup v-model="loginForm.password" label="Пароль" type="password" placeholder="Введи пароль">
        </InputGroup>

        <div class="mb-5 mt-6">
          <input
            type="submit"
            value="Войти"
            class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          />
        </div>

      </form>
    </DefaultAuthCard>
  </DefaultLayout>
</template>
