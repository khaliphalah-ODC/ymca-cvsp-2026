<script setup>
import { computed, ref } from 'vue'

const copied = ref('')
const appUrl = computed(() => {
  const configured = import.meta.env.VITE_PUBLIC_APP_URL
  return String(configured || window.location.origin).replace(/\/$/, '')
})

const locations = [
  { name: 'Main Entrance', key: 'Main Entrance', note: 'Primary QR for general program arrival.' },
  { name: 'Front Desk', key: 'Front Desk', note: 'Use where parents and caregivers check in.' },
  { name: 'Basketball Center', key: 'Basketball Center', note: 'Sports and youth activity feedback.' },
  { name: 'Computer Lab', key: 'Computer Lab', note: 'Computer literacy and technology program feedback.' },
  { name: 'Youth Program Room', key: 'Youth Program Room', note: 'Youth leadership and mentoring program feedback.' },
  { name: 'Notice Board', key: 'Notice Board', note: 'Publicly posted internal program QR.' },
]

function submissionLink(location) {
  return `${appUrl.value}/submit?location=${encodeURIComponent(location)}`
}

function qrImage(location) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(submissionLink(location))}`
}

async function copyLink(location) {
  const link = submissionLink(location)
  await navigator.clipboard.writeText(link)
  copied.value = location
  window.setTimeout(() => {
    if (copied.value === location) copied.value = ''
  }, 1600)
}
</script>

<template>
  <div class="text-on-background bg-background min-h-screen">
    <aside class="hidden md:flex flex-col h-screen py-lg px-md w-64 fixed left-0 top-0 z-40 bg-surface-container-low border-r border-outline-variant">
      <div class="mb-xl px-sm">
        <h1 class="font-headline-md text-headline-md font-black text-primary">Montserrado YMCA</h1>
        <p class="font-label-sm text-label-sm text-on-surface-variant opacity-70">Staff Portal</p>
      </div>
      <nav class="flex-1 space-y-2" aria-label="Staff navigation">
        <RouterLink class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" to="/admin/dashboard">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="font-label-md text-label-md">Overview</span>
        </RouterLink>
        <RouterLink class="flex items-center gap-md px-md py-sm bg-primary-container text-on-primary-container rounded-lg font-bold translate-x-1 transition-transform group" to="/admin/qr-codes">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">qr_code_2</span>
          <span class="font-label-md text-label-md">QR Codes</span>
        </RouterLink>
      </nav>
    </aside>

    <main class="md:ml-64 min-h-screen p-xl lg:p-2xl">
      <header class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-md mb-xl">
        <div>
          <h2 class="font-headline-lg text-headline-lg text-on-surface">QR Code Access</h2>
          <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Generate location-specific QR codes for parents, children, and caregivers to access the private complaint and suggestion form.
          </p>
        </div>
        <RouterLink class="inline-flex items-center justify-center gap-xs px-lg py-sm bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity" :to="submissionLink('Front Desk')">
          <span class="material-symbols-outlined text-[20px]">open_in_new</span>
          Preview Form
        </RouterLink>
      </header>

      <section class="grid grid-cols-1 xl:grid-cols-2 gap-lg">
        <article v-for="location in locations" :key="location.key" class="bg-surface card-shadow rounded-xl border border-outline-variant p-lg flex flex-col md:flex-row gap-lg">
          <div class="bg-white border border-outline-variant rounded-xl p-md shrink-0 flex items-center justify-center">
            <img class="w-48 h-48 object-contain" :alt="`${location.name} QR code`" :src="qrImage(location.key)" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-md mb-sm">
              <div>
                <h3 class="font-headline-md text-headline-md text-on-surface">{{ location.name }}</h3>
                <p class="font-body-md text-body-md text-on-surface-variant">{{ location.note }}</p>
              </div>
              <span class="material-symbols-outlined text-primary">location_on</span>
            </div>
            <p class="font-label-sm text-label-sm text-on-surface-variant break-all bg-surface-container-low rounded-lg p-sm mb-md">
              {{ submissionLink(location.key) }}
            </p>
            <div class="flex flex-wrap gap-sm">
              <button class="inline-flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md" type="button" @click="copyLink(location.key)">
                <span class="material-symbols-outlined text-[18px]">{{ copied === location.key ? 'check' : 'content_copy' }}</span>
                {{ copied === location.key ? 'Copied' : 'Copy Link' }}
              </button>
              <a class="inline-flex items-center gap-xs px-md py-sm bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md" :href="qrImage(location.key)" :download="`${location.key}-ymca-qr.png`">
                <span class="material-symbols-outlined text-[18px]">download</span>
                QR Image
              </a>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>
