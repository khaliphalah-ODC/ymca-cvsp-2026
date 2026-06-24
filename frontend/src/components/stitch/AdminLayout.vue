<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../utils/useAuth'
import AdminMobileNav from './AdminMobileNav.vue'

defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})

const route = useRoute()
const router = useRouter()
const { logout } = useAuth()

const links = [
  ['dashboard', 'Dashboard', '/admin/dashboard'],
  ['folder_shared', 'Submissions', '/admin/submissions'],
  ['analytics', 'Reports', '/admin/reports'],
  ['qr_code_2', 'QR Codes', '/admin/qr-codes'],
  ['assignment_ind', 'Staff', '/admin/staff'],
  ['settings', 'Settings', '/admin/settings'],
]

function isActive(path) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

async function signOut() {
  await logout()
  router.push('/admin/login')
}
</script>

<template>
  <div class="text-on-background bg-background min-h-screen">
    <AdminMobileNav />
    <aside class="hidden md:flex flex-col h-screen py-lg px-md w-64 fixed left-0 top-0 z-40 bg-surface-container-low border-r border-outline-variant">
      <div class="mb-xl px-sm">
        <h1 class="font-headline-md text-headline-md font-black text-primary">YMCA CVSP</h1>
        <p class="font-label-sm text-label-sm text-on-surface-variant opacity-70">Staff Portal</p>
      </div>
      <nav class="flex-1 space-y-2" aria-label="Staff navigation">
        <RouterLink
          v-for="link in links"
          :key="link[2]"
          :class="isActive(link[2]) ? 'flex items-center gap-md px-md py-sm bg-primary-container text-on-primary-container rounded-lg font-bold translate-x-1 transition-transform' : 'flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg'"
          :to="link[2]"
        >
          <span class="material-symbols-outlined" :style="isActive(link[2]) ? `font-variation-settings: 'FILL' 1;` : ''">{{ link[0] }}</span>
          <span class="font-label-md text-label-md">{{ link[1] }}</span>
        </RouterLink>
      </nav>
      <div class="mt-auto space-y-2 border-t border-outline-variant pt-lg">
        <RouterLink class="w-full py-sm px-md bg-surface-container-high text-on-surface rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-xs" to="/"><span class="material-symbols-outlined text-[20px]">public</span>Public Site</RouterLink>
        <RouterLink class="w-full mb-lg py-sm px-md bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-xs" to="/admin/qr-codes"><span class="material-symbols-outlined text-[20px]">qr_code_2</span>Generate QR</RouterLink>
        <button class="w-full flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" type="button" @click="signOut"><span class="material-symbols-outlined">logout</span><span class="font-label-md text-label-md">Sign Out</span></button>
      </div>
    </aside>

    <main class="md:ml-64 min-h-screen p-xl lg:p-2xl">
      <header v-if="title || subtitle" class="mb-xl">
        <h1 v-if="title" class="font-headline-lg text-headline-lg text-on-surface">{{ title }}</h1>
        <p v-if="subtitle" class="font-body-md text-body-md text-on-surface-variant max-w-3xl">{{ subtitle }}</p>
      </header>
      <slot />
    </main>
  </div>
</template>
