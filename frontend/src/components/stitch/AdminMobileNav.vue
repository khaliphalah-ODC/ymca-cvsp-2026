<script setup>
import { ref } from 'vue'
import { useAuth } from '../../utils/useAuth'

const open = ref(false)
const { logout } = useAuth()

async function signOut() {
  await logout()
  open.value = false
}

const links = [
  ['dashboard', 'Overview', '/admin/dashboard'],
  ['folder_shared', 'Submissions', '/admin/submissions'],
  ['qr_code_2', 'QR Codes', '/admin/qr-codes'],
  ['assignment_ind', 'Cases', '/admin/cases'],
  ['settings', 'Settings', '/admin/settings'],
]
</script>

<template>
  <header class="md:hidden sticky top-0 z-50 bg-surface border-b border-outline-variant card-shadow">
    <div class="h-16 px-md flex items-center justify-between">
      <RouterLink class="font-headline-md text-headline-md font-black text-primary" to="/admin/dashboard">YMCA Staff</RouterLink>
      <button class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center" type="button" aria-label="Open staff navigation" @click="open = !open">
        <span class="material-symbols-outlined">{{ open ? 'close' : 'menu' }}</span>
      </button>
    </div>
    <nav v-if="open" class="px-md pb-md space-y-2" aria-label="Mobile staff navigation">
      <RouterLink v-for="link in links" :key="link[2]" class="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high" :to="link[2]" @click="open = false">
        <span class="material-symbols-outlined">{{ link[0] }}</span>
        <span class="font-label-md text-label-md">{{ link[1] }}</span>
      </RouterLink>
      <button class="w-full flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high" type="button" @click="signOut">
        <span class="material-symbols-outlined">logout</span>
        <span class="font-label-md text-label-md">Sign Out</span>
      </button>
    </nav>
  </header>
</template>
