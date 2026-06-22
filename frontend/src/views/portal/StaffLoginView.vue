<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../utils/useAuth'

const route = useRoute()
const router = useRouter()
const { login, loading } = useAuth()
const email = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)

async function submitLogin() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Enter your email and password.'
    return
  }
  try {
    await login(email.value, password.value)
    router.push(String(route.query.redirect || '/admin/dashboard'))
  } catch (err) {
    error.value = err.message || 'Sign in failed. Check your email and password.'
  }
}
</script>

<template>
  <div class="min-h-screen bg-background text-on-surface flex items-center justify-center px-margin-mobile py-2xl">
    <section class="w-full max-w-md bg-white rounded-xl card-shadow border border-outline-variant/40 p-xl">
      <RouterLink class="inline-flex items-center gap-sm mb-xl" to="/">
        <span class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">diversity_1</span>
        <span class="font-headline-md text-headline-md text-primary font-bold">Montserrado YMCA</span>
      </RouterLink>

      <div class="mb-lg">
        <h1 class="font-headline-lg text-headline-lg">Staff Login</h1>
        <p class="font-body-md text-body-md text-on-surface-variant">Sign in to review submissions, manage cases, and generate QR codes.</p>
      </div>

      <form class="space-y-lg" @submit.prevent="submitLogin">
        <label class="space-y-sm block">
          <span class="font-label-md text-label-md">Email Address</span>
          <input v-model.trim="email" class="w-full h-12 px-md bg-white border border-outline rounded-xl focus:ring-0" autocomplete="email" placeholder="admin@example.com" required type="email" />
        </label>

        <label class="space-y-sm block">
          <span class="font-label-md text-label-md">Password</span>
          <span class="relative block">
            <input v-model="password" class="w-full h-12 pl-md pr-12 bg-white border border-outline rounded-xl focus:ring-0" autocomplete="current-password" placeholder="Enter password" required :type="showPassword ? 'text' : 'password'" />
            <button class="absolute right-sm top-1/2 -translate-y-1/2 text-primary" type="button" :aria-label="showPassword ? 'Hide password' : 'Show password'" @click="showPassword = !showPassword">
              <span class="material-symbols-outlined text-[22px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </span>
        </label>

        <p v-if="error" class="bg-error-container text-on-error-container px-md py-sm rounded-xl font-body-md text-body-md">{{ error }}</p>

        <button class="w-full px-lg py-md bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-xs" :disabled="loading" type="submit">
          <span class="material-symbols-outlined text-[20px]">{{ loading ? 'sync' : 'lock_open' }}</span>
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>

        <a class="inline-flex text-primary font-label-md text-label-md hover:underline" href="mailto:admin@ymca.local?subject=YMCA%20Portal%20Password%20Reset">
          Forgot password?
        </a>
      </form>
    </section>
  </div>
</template>
