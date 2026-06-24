<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ymcaImages } from '../../utils/ymcaImages'

const route = useRoute()
const copied = ref(false)
const ticket = computed(() => route.params.ticket || 'YMCA-00001')
const submissionType = computed(() => String(route.query.type || 'feedback'))
const submitAnotherLink = computed(() => ({
  path: '/submit',
  query: route.query.location ? { location: String(route.query.location) } : {},
}))
const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const confetti = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}vw`,
  delay: `${Math.random() * 2}s`,
  color: ['#b20112', '#005d83', '#d62828', '#bdc7d9'][index % 4],
  size: `${Math.random() * 8 + 5}px`,
}))

async function copyReference() {
  await navigator.clipboard.writeText(ticket.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="flex flex-col min-h-screen text-on-surface bg-background">
    <main class="flex-grow flex flex-col items-center justify-center px-margin-mobile py-xl relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div v-for="piece in confetti" :key="piece.id" class="confetti" :style="{ left: piece.left, animationDelay: piece.delay, backgroundColor: piece.color, width: piece.size, height: piece.size }"></div>
      </div>
      <div class="z-10 text-center mb-xl">
        <div class="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-md shadow-lg success-checkmark">
          <span class="material-symbols-outlined text-on-primary-container text-[48px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
        </div>
        <h1 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-sm">Submission Successful</h1>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-[400px] mx-auto px-4">
          Thank you for your valuable feedback. Your tracking code has been securely logged with Montserrado County YMCA.
        </p>
      </div>

      <div class="w-full max-w-md z-10">
        <div class="ticket-shape p-xl border border-outline-variant/30 flex flex-col relative overflow-hidden">
          <div class="flex justify-between items-center mb-lg pb-lg border-b border-dashed border-outline-variant">
            <div class="flex items-center gap-sm">
              <img class="w-12 h-12 rounded-full object-cover border border-outline-variant/40" :src="ymcaImages.logo" alt="YMCA logo" />
              <div class="flex flex-col">
              <span class="font-label-md text-label-md text-primary font-bold tracking-tight">Montserrado County YMCA</span>
              <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">QR Portal System</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline">qr_code_2</span>
          </div>
          <div class="text-center py-sm">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-xs block">Tracking Code</span>
            <div class="flex items-center justify-center gap-sm bg-surface-container-low py-4 px-6 rounded-xl border border-primary/10">
              <span class="font-headline-md text-headline-md text-primary tracking-tighter">{{ ticket }}</span>
            </div>
          </div>
          <div class="h-16"></div>
          <div class="pt-lg flex flex-col gap-md">
            <div class="flex justify-between text-label-sm font-label-sm text-on-surface-variant"><span>Date Submitted:</span><span class="font-bold">{{ date }}</span></div>
            <div class="flex justify-between text-label-sm font-label-sm text-on-surface-variant"><span>Type:</span><span class="font-bold capitalize">{{ submissionType }}</span></div>
            <button class="w-full flex items-center justify-center gap-sm bg-secondary text-on-secondary font-label-md text-label-md py-4 rounded-xl hover:bg-on-secondary-fixed-variant transition-all active:scale-[0.98]" type="button" @click="copyReference">
              <span class="material-symbols-outlined text-[20px]">{{ copied ? 'check' : 'content_copy' }}</span>
              {{ copied ? 'Copied!' : 'Copy Tracking Code' }}
            </button>
          </div>
        </div>
      </div>

      <div class="z-10 mt-xl flex flex-col gap-sm w-full max-w-md">
        <RouterLink class="w-full bg-primary text-on-primary font-label-md text-label-md py-5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] text-center" :to="submitAnotherLink">Submit Another Complaint or Suggestion</RouterLink>
        <RouterLink class="w-full bg-transparent text-secondary font-label-md text-label-md py-4 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all text-center" to="/">Visit Site</RouterLink>
      </div>
    </main>
  </div>
</template>
