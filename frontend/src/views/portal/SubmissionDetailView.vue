<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSubmissionStore } from '../../stores/submissionStore'
import AdminMobileNav from '../../components/stitch/AdminMobileNav.vue'

const route = useRoute()
const store = useSubmissionStore()
const status = ref('open')
const adminNote = ref('')
const saved = ref(false)

const submission = computed(() => store.selectedSubmission)
const submitter = computed(() => submission.value?.parents || submission.value?.children || submission.value?.caregivers || {})

async function loadSubmission() {
  const data = await store.fetchSubmissionDetail(route.params.id)
  status.value = data?.status || 'open'
  adminNote.value = data?.admin_note || ''
}

async function saveChanges() {
  saved.value = false
  await store.updateSubmissionStatus(route.params.id, status.value, adminNote.value)
  saved.value = true
}

onMounted(loadSubmission)
</script>

<template>
  <div class="text-on-background bg-background min-h-screen">
    <AdminMobileNav />
    <main class="max-w-5xl mx-auto px-margin-mobile py-2xl">
      <RouterLink class="inline-flex items-center gap-xs text-primary font-label-md text-label-md mb-lg" to="/admin/submissions">
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to submissions
      </RouterLink>

      <p v-if="store.error" class="bg-error-container text-on-error-container px-md py-sm rounded-xl mb-md">{{ store.error }}</p>
      <section v-if="store.loading || !submission" class="bg-surface card-shadow rounded-xl border border-outline-variant p-xl">Loading submission...</section>

      <template v-else>
        <header class="bg-surface card-shadow rounded-xl border border-outline-variant p-xl mb-lg">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-md">
            <div>
              <p class="font-label-md text-label-md text-primary">{{ submission.ticket_ref }}</p>
              <h1 class="font-headline-lg text-headline-lg text-on-surface capitalize">{{ submission.type }} from {{ submission.submitted_by_type }}</h1>
              <p class="font-body-md text-body-md text-on-surface-variant">{{ new Date(submission.created_at).toLocaleString() }} · {{ submission.location }}</p>
            </div>
            <span class="inline-flex px-md py-sm rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md capitalize">{{ submission.status.replace('_', ' ') }}</span>
          </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          <section class="lg:col-span-2 bg-surface card-shadow rounded-xl border border-outline-variant p-xl">
            <h2 class="font-headline-md text-headline-md mb-md">Message</h2>
            <p class="font-body-lg text-body-lg text-on-surface mb-xl whitespace-pre-wrap">{{ submission.message }}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div><p class="font-label-sm text-label-sm text-on-surface-variant">Category</p><p class="capitalize">{{ submission.category }}</p></div>
              <div><p class="font-label-sm text-label-sm text-on-surface-variant">Urgency</p><p class="capitalize">{{ submission.urgency }}</p></div>
              <div><p class="font-label-sm text-label-sm text-on-surface-variant">Submitter</p><p>{{ submitter.full_name || 'Anonymous' }}</p></div>
              <div><p class="font-label-sm text-label-sm text-on-surface-variant">Program</p><p>{{ submitter.program_name || 'Unknown Program' }}</p></div>
              <div v-if="submitter.phone"><p class="font-label-sm text-label-sm text-on-surface-variant">Phone</p><p>{{ submitter.phone }}</p></div>
              <div v-if="submitter.email"><p class="font-label-sm text-label-sm text-on-surface-variant">Email</p><p>{{ submitter.email }}</p></div>
            </div>
          </section>

          <aside class="bg-surface card-shadow rounded-xl border border-outline-variant p-xl">
            <h2 class="font-headline-md text-headline-md mb-md">Case Update</h2>
            <div class="space-y-md">
              <label class="space-y-sm block"><span class="font-label-md text-label-md">Status</span><select v-model="status" class="w-full h-11 px-md bg-white border border-outline rounded-lg"><option value="open">Open</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option></select></label>
              <label class="space-y-sm block"><span class="font-label-md text-label-md">Internal Note</span><textarea v-model.trim="adminNote" class="w-full p-md bg-white border border-outline rounded-lg resize-none" rows="6"></textarea></label>
              <button class="w-full px-lg py-md bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 disabled:opacity-70" :disabled="store.loading" type="button" @click="saveChanges">Save Case</button>
              <p v-if="saved" class="text-primary font-label-md text-label-md">Saved.</p>
            </div>
          </aside>
        </div>
      </template>
    </main>
  </div>
</template>
