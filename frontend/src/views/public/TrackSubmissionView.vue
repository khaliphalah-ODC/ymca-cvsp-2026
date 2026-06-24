<script setup>
import { ref } from 'vue'
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import { supabase } from '../../utils/supabase'
import { ymcaImages } from '../../utils/ymcaImages'

const trackingId = ref('')
const loading = ref(false)
const error = ref('')
const result = ref(null)
const searched = ref(false)

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : 'Not available'
}

function normalizeStatus(status) {
  const map = {
    open: 'Submitted',
    in_progress: 'In Progress',
    resolved: 'Resolved',
  }
  return map[String(status || '').toLowerCase()] || status || 'Submitted'
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function resolutionHtml() {
  if (!result.value) return ''
  return `
    <html>
      <head><meta charset="utf-8"><title>YMCA Resolution ${escapeHtml(result.value.tracking_id)}</title></head>
      <body style="font-family: Arial, sans-serif; color: #281716; padding: 24px;">
        <h1 style="color:#b20112;">YMCA CVSP Submission Resolution</h1>
        <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
          <tr><th align="left">Tracking ID</th><td>${escapeHtml(result.value.tracking_id)}</td></tr>
          <tr><th align="left">Submission Type</th><td>${escapeHtml(result.value.submission_type)}</td></tr>
          <tr><th align="left">Current Status</th><td>${escapeHtml(result.value.status)}</td></tr>
          <tr><th align="left">Date Submitted</th><td>${escapeHtml(formatDate(result.value.created_at))}</td></tr>
          <tr><th align="left">Last Updated</th><td>${escapeHtml(formatDate(result.value.updated_at))}</td></tr>
          <tr><th align="left">Resolution Notes</th><td>${escapeHtml(result.value.resolution_notes || 'No resolution notes yet.')}</td></tr>
        </table>
      </body>
    </html>
  `
}

function downloadResolutionDoc() {
  const blob = new Blob([resolutionHtml()], { type: 'application/msword;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `ymca-resolution-${result.value?.tracking_id || Date.now()}.doc`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function exportResolutionPdf() {
  const printWindow = window.open('', '_blank', 'noopener,noreferrer')
  if (!printWindow) return
  printWindow.document.write(`${resolutionHtml()}<script>window.onload = () => window.print();<\/script>`)
  printWindow.document.close()
}

async function trackSubmission() {
  searched.value = true
  result.value = null
  error.value = ''

  if (!trackingId.value.trim()) {
    error.value = 'Enter a tracking ID to continue.'
    return
  }

  loading.value = true
  try {
    const { data, error: trackError } = await supabase.rpc('track_submission', {
      lookup_tracking_id: trackingId.value.trim(),
    })
    if (trackError) throw trackError
    result.value = data?.[0] ? { ...data[0], status: normalizeStatus(data[0].status) } : null
    if (!result.value) error.value = 'No submission was found for that tracking ID.'
  } catch (err) {
    console.error('[TrackSubmission] lookup failed', err)
    error.value = err.message || 'Unable to check this tracking ID right now.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-background text-on-surface">
    <SiteNavbar active="Track" />
    <main class="relative overflow-hidden">
      <img class="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full object-cover opacity-[0.06] md:h-[620px] md:w-[620px]" :src="ymcaImages.logo" alt="" aria-hidden="true" />
      <section class="relative z-10 max-w-container-max-width mx-auto px-md lg:px-xl py-2xl grid lg:grid-cols-12 gap-xl items-start">
        <div class="lg:col-span-5">
          <p class="font-label-md text-label-md text-primary uppercase">Track Submission</p>
          <h1 class="font-headline-xl text-headline-xl mt-sm">Check a complaint or suggestion</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant mt-md">Enter the tracking ID received after submitting through an official YMCA QR code.</p>
        </div>
        <section class="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg card-shadow">
          <form class="flex flex-col sm:flex-row gap-sm" @submit.prevent="trackSubmission">
            <input v-model.trim="trackingId" class="flex-1 h-12 px-md rounded-lg border border-outline bg-white" placeholder="Example: YMCA-00012" type="text" />
            <button class="h-12 px-lg rounded-lg bg-primary text-on-primary font-bold disabled:opacity-70" :disabled="loading" type="submit">
              {{ loading ? 'Checking...' : 'Search' }}
            </button>
          </form>

          <div v-if="!searched" class="mt-lg rounded-xl bg-surface-container-low p-lg text-on-surface-variant">
            Enter your tracking ID to view the current status.
          </div>
          <div v-else-if="error" class="mt-lg rounded-xl bg-error-container text-on-error-container p-lg">
            {{ error }}
          </div>
          <article v-else-if="result" class="mt-lg grid gap-md">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sm rounded-xl bg-primary-container text-on-primary-container p-lg">
              <div>
                <p class="font-label-sm text-label-sm uppercase">Current Status</p>
                <h2 class="font-headline-lg text-headline-lg">{{ result.status }}</h2>
              </div>
              <span class="font-label-md text-label-md">{{ result.tracking_id }}</span>
            </div>
            <div class="grid sm:grid-cols-2 gap-md">
              <div class="rounded-xl border border-outline-variant p-md"><p class="font-label-sm text-label-sm text-on-surface-variant">Submission Type</p><p class="capitalize">{{ result.submission_type }}</p></div>
              <div class="rounded-xl border border-outline-variant p-md"><p class="font-label-sm text-label-sm text-on-surface-variant">Date Submitted</p><p>{{ formatDate(result.created_at) }}</p></div>
              <div class="rounded-xl border border-outline-variant p-md"><p class="font-label-sm text-label-sm text-on-surface-variant">Last Updated</p><p>{{ formatDate(result.updated_at) }}</p></div>
              <div class="rounded-xl border border-outline-variant p-md"><p class="font-label-sm text-label-sm text-on-surface-variant">Resolution Notes</p><p>{{ result.resolution_notes || 'No resolution notes yet.' }}</p></div>
            </div>
            <div class="flex flex-col sm:flex-row gap-sm">
              <button class="inline-flex items-center justify-center gap-xs px-lg py-sm bg-primary text-on-primary rounded-lg font-bold" type="button" @click="exportResolutionPdf">
                <span class="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                Export PDF
              </button>
              <button class="inline-flex items-center justify-center gap-xs px-lg py-sm bg-surface-container-high text-on-surface rounded-lg font-bold" type="button" @click="downloadResolutionDoc">
                <span class="material-symbols-outlined text-[18px]">description</span>
                Export DOC
              </button>
            </div>
          </article>
        </section>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
