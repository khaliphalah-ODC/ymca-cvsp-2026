<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useSubmissionStore } from '../../stores/submissionStore'
import AdminLayout from '../../components/stitch/AdminLayout.vue'
import { exportSubmissionsCsv, exportSubmissionsDoc, exportSubmissionsExcel, exportSubmissionsPdf } from '../../utils/exportReports'

const store = useSubmissionStore()
const filters = reactive({
  search: '',
  status: '',
  category: '',
  urgency: '',
  dateFrom: '',
  dateTo: '',
  limit: 100,
})

const filteredSubmissions = computed(() => {
  if (!filters.search) return store.submissions
  const needle = filters.search.toLowerCase()
  return store.submissions.filter((item) => {
    const name = item.submitter_name || item.parents?.full_name || item.children?.full_name || item.caregivers?.full_name || ''
    return item.ticket_ref?.toLowerCase().includes(needle) || item.tracking_id?.toLowerCase().includes(needle) || name.toLowerCase().includes(needle)
  })
})

function submitterName(item) {
  return item.submitter_name || item.parents?.full_name || item.children?.full_name || item.caregivers?.full_name || 'Anonymous'
}

function programName(item) {
  return item.program_name || item.parents?.program_name || item.children?.program_name || item.caregivers?.program_name || 'Unknown Program'
}

async function applyFilters() {
  await store.fetchSubmissions(filters)
}

async function deleteSubmission(row) {
  const label = row.tracking_id || row.ticket_ref || 'this submission'
  if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return
  await store.deleteSubmission(row.id)
}

onMounted(applyFilters)
</script>

<template>
  <AdminLayout title="Submissions" subtitle="Review, filter, export, and update complaint or suggestion cases.">
    <section class="bg-surface card-shadow rounded-xl border border-outline-variant p-lg mb-lg">
      <div class="flex flex-wrap gap-sm justify-end mb-md">
        <button class="inline-flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md" type="button" @click="exportSubmissionsExcel(filteredSubmissions)">
          <span class="material-symbols-outlined text-[18px]">dataset</span>
          Excel
        </button>
        <button class="inline-flex items-center gap-xs px-md py-sm bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md" type="button" @click="exportSubmissionsCsv(filteredSubmissions)">
          <span class="material-symbols-outlined text-[18px]">table_view</span>
          CSV
        </button>
        <button class="inline-flex items-center gap-xs px-md py-sm bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md" type="button" @click="exportSubmissionsPdf(filteredSubmissions)">
          <span class="material-symbols-outlined text-[18px]">picture_as_pdf</span>
          PDF
        </button>
        <button class="inline-flex items-center gap-xs px-md py-sm bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md" type="button" @click="exportSubmissionsDoc(filteredSubmissions)">
          <span class="material-symbols-outlined text-[18px]">description</span>
          DOC
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-md">
        <input v-model.trim="filters.search" class="h-11 px-md bg-white border border-outline rounded-lg" placeholder="Ticket or name" type="search" />
        <select v-model="filters.status" class="h-11 px-md bg-white border border-outline rounded-lg"><option value="">All status</option><option value="Submitted">Submitted</option><option value="Under Review">Under Review</option><option value="In Progress">In Progress</option><option value="Resolved">Resolved</option><option value="Closed">Closed</option></select>
        <select v-model="filters.category" class="h-11 px-md bg-white border border-outline rounded-lg"><option value="">All categories</option><option value="safety">Safety</option><option value="staff">Staff</option><option value="facilities">Facilities</option><option value="program">Program</option><option value="other">Other</option></select>
        <select v-model="filters.urgency" class="h-11 px-md bg-white border border-outline rounded-lg"><option value="">All urgency</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option></select>
        <input v-model="filters.dateFrom" class="h-11 px-md bg-white border border-outline rounded-lg" type="date" />
        <button class="h-11 px-md bg-primary text-on-primary rounded-lg font-bold" type="button" @click="applyFilters">Apply</button>
      </div>
    </section>

    <p v-if="store.error" class="bg-error-container text-on-error-container px-md py-sm rounded-xl mb-md">{{ store.error }}</p>

    <section class="bg-surface card-shadow rounded-xl border border-outline-variant overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead><tr class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low/50"><th class="px-lg py-md">Ticket</th><th class="px-lg py-md">Submitter</th><th class="px-lg py-md">Program</th><th class="px-lg py-md">Urgency</th><th class="px-lg py-md">Status</th><th class="px-lg py-md">Date</th><th class="px-lg py-md text-right">Actions</th></tr></thead>
          <tbody class="font-body-md text-body-md divide-y divide-outline-variant">
            <tr v-if="store.loading"><td class="px-lg py-lg" colspan="7">Loading submissions...</td></tr>
            <tr v-for="row in filteredSubmissions" v-else :key="row.id" class="hover:bg-surface-container-low transition-colors">
              <td class="px-lg py-md font-bold text-on-surface">{{ row.tracking_id || row.ticket_ref }}</td>
              <td class="px-lg py-md">{{ submitterName(row) }}</td>
              <td class="px-lg py-md text-on-surface-variant">{{ programName(row) }}</td>
              <td class="px-lg py-md capitalize">{{ row.urgency }}</td>
              <td class="px-lg py-md"><span class="font-label-sm text-label-sm bg-surface-container-highest px-md py-1 rounded-full text-on-surface">{{ row.status }}</span></td>
              <td class="px-lg py-md text-on-surface-variant">{{ new Date(row.created_at).toLocaleDateString() }}</td>
              <td class="px-lg py-md text-right">
                <div class="inline-flex items-center justify-end gap-sm">
                  <RouterLink class="material-symbols-outlined text-on-surface-variant hover:text-primary" :to="`/admin/submissions/${row.id}`" aria-label="View submission">visibility</RouterLink>
                  <button class="material-symbols-outlined text-on-surface-variant hover:text-error" type="button" aria-label="Delete submission" @click="deleteSubmission(row)">delete</button>
                </div>
              </td>
            </tr>
            <tr v-if="!store.loading && !filteredSubmissions.length"><td class="px-lg py-lg text-on-surface-variant" colspan="7">No submissions found.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </AdminLayout>
</template>
