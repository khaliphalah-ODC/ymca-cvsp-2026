<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSubmissionStore } from '../../stores/submissionStore'
import AdminLayout from '../../components/stitch/AdminLayout.vue'
import { exportSubmissionExcel } from '../../utils/exportReports'

const route = useRoute()
const router = useRouter()
const store = useSubmissionStore()
const statuses = ['Submitted', 'Under Review', 'In Progress', 'Resolved', 'Closed']
const status = ref('Submitted')
const resolutionNotes = ref('')
const saved = ref(false)

const submission = computed(() => store.selectedSubmission)
const submitter = computed(() => submission.value?.parents || submission.value?.children || submission.value?.caregivers || {})

async function loadSubmission() {
  const data = await store.fetchSubmissionDetail(route.params.id)
  status.value = data?.status || 'Submitted'
  resolutionNotes.value = data?.resolution_notes || ''
}

async function saveChanges() {
  saved.value = false
  await store.updateSubmissionStatus(route.params.id, status.value, undefined, null, resolutionNotes.value)
  saved.value = true
}

async function deleteCurrentSubmission() {
  const label = submission.value?.tracking_id || submission.value?.ticket_ref || 'this submission'
  if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return
  await store.deleteSubmission(route.params.id)
  router.push('/admin/submissions')
}

onMounted(loadSubmission)
</script>

<template>
  <AdminLayout>
    <div class="max-w-5xl mx-auto">
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
              <p class="font-label-md text-label-md text-primary">{{ submission.tracking_id || submission.ticket_ref }}</p>
              <h1 class="font-headline-lg text-headline-lg text-on-surface capitalize">{{ submission.type }} from {{ submission.submitted_by_type }}</h1>
              <p class="font-body-md text-body-md text-on-surface-variant">{{ new Date(submission.created_at).toLocaleString() }} · {{ submission.location }}</p>
            </div>
            <span class="inline-flex px-md py-sm rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md">{{ submission.status }}</span>
          </div>
          <button class="inline-flex items-center gap-xs px-md py-sm bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md mt-md" type="button" @click="exportSubmissionExcel(submission)">
            <span class="material-symbols-outlined text-[18px]">dataset</span>
            Export Individual Excel
          </button>
          <button class="inline-flex items-center gap-xs px-md py-sm bg-error-container text-on-error-container rounded-lg font-label-md text-label-md mt-md ml-sm" type="button" :disabled="store.loading" @click="deleteCurrentSubmission">
            <span class="material-symbols-outlined text-[18px]">delete</span>
            Delete Case
          </button>
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
              <label class="space-y-sm block"><span class="font-label-md text-label-md">Status</span><select v-model="status" class="w-full h-11 px-md bg-white border border-outline rounded-lg"><option v-for="item in statuses" :key="item" :value="item">{{ item }}</option></select></label>
              <label class="space-y-sm block"><span class="font-label-md text-label-md">Update Note</span><textarea v-model.trim="resolutionNotes" class="w-full p-md bg-white border border-outline rounded-lg resize-none" placeholder="Write a short update participants can see when they track this case." rows="8"></textarea></label>
              <button class="w-full px-lg py-md bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 disabled:opacity-70" :disabled="store.loading" type="button" @click="saveChanges">Save Case</button>
              <p v-if="saved" class="text-primary font-label-md text-label-md">Saved.</p>
            </div>
          </aside>
        </div>
      </template>
    </div>
  </AdminLayout>
</template>
