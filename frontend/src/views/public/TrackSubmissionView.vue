<script setup>
import { ref } from 'vue'
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import { supabase } from '../../utils/supabase'

const trackingId = ref('')
const loading = ref(false)
const error = ref('')
const result = ref(null)
const searched = ref(false)

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : 'Not available'
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
    result.value = data?.[0] || null
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
    <main class="max-w-container-max-width mx-auto px-md lg:px-xl py-2xl">
      <section class="grid lg:grid-cols-12 gap-xl items-start">
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
          </article>
        </section>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
