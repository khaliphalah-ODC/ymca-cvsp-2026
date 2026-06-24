<script setup>
import { computed, onMounted, reactive } from 'vue'
import AdminLayout from '../../components/stitch/AdminLayout.vue'
import { useSubmissionStore } from '../../stores/submissionStore'
import { exportSubmissionsCsv, exportSubmissionsDoc, exportSubmissionsExcel, exportSubmissionsPdf } from '../../utils/exportReports'

const store = useSubmissionStore()
const filters = reactive({
  type: '',
  status: '',
  category: '',
  urgency: '',
  dateFrom: '',
  dateTo: '',
  limit: 500,
})

const reportRows = computed(() => store.submissions)
const complaintRows = computed(() => reportRows.value.filter((row) => row.type === 'complaint'))
const suggestionRows = computed(() => reportRows.value.filter((row) => row.type === 'suggestion'))

const summary = computed(() => ({
  total: reportRows.value.length,
  complaints: complaintRows.value.length,
  suggestions: suggestionRows.value.length,
  critical: reportRows.value.filter((row) => row.urgency === 'critical').length,
}))

async function loadReport() {
  await store.fetchSubmissions(filters)
}

function resetFilters() {
  filters.type = ''
  filters.status = ''
  filters.category = ''
  filters.urgency = ''
  filters.dateFrom = ''
  filters.dateTo = ''
  filters.limit = 500
  loadReport()
}

onMounted(loadReport)
</script>

<template>
  <AdminLayout title="Reports" subtitle="Export general, complaint-only, suggestion-only, or date-filtered reports with submitter contact details.">
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mb-lg">
      <article v-for="card in [['Total', summary.total], ['Complaints', summary.complaints], ['Suggestions', summary.suggestions], ['Critical', summary.critical]]" :key="card[0]" class="bg-surface card-shadow rounded-xl border border-outline-variant p-lg">
        <p class="font-label-sm text-label-sm text-on-surface-variant uppercase">{{ card[0] }}</p>
        <p class="font-headline-md text-headline-md text-on-surface mt-xs">{{ card[1] }}</p>
      </article>
    </section>

    <section class="bg-surface card-shadow rounded-xl border border-outline-variant p-lg mb-lg">
      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-md">
        <select v-model="filters.type" class="h-11 px-md bg-white border border-outline rounded-lg"><option value="">All types</option><option value="complaint">Complaints</option><option value="suggestion">Suggestions</option></select>
        <select v-model="filters.status" class="h-11 px-md bg-white border border-outline rounded-lg"><option value="">All status</option><option value="Submitted">Submitted</option><option value="Under Review">Under Review</option><option value="In Progress">In Progress</option><option value="Resolved">Resolved</option><option value="Closed">Closed</option></select>
        <select v-model="filters.category" class="h-11 px-md bg-white border border-outline rounded-lg"><option value="">All categories</option><option value="safety">Safety</option><option value="staff">Staff</option><option value="facilities">Facilities</option><option value="program">Program</option><option value="other">Other</option></select>
        <select v-model="filters.urgency" class="h-11 px-md bg-white border border-outline rounded-lg"><option value="">All urgency</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option></select>
        <input v-model="filters.dateFrom" class="h-11 px-md bg-white border border-outline rounded-lg" type="date" />
        <input v-model="filters.dateTo" class="h-11 px-md bg-white border border-outline rounded-lg" type="date" />
      </div>
      <div class="flex flex-wrap gap-sm mt-md">
        <button class="px-lg py-sm bg-primary text-on-primary rounded-lg font-bold" type="button" @click="loadReport">Apply Filters</button>
        <button class="px-lg py-sm bg-surface-container-high text-on-surface rounded-lg font-bold" type="button" @click="resetFilters">Reset</button>
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">
      <article class="bg-surface card-shadow rounded-xl border border-outline-variant p-lg">
        <h2 class="font-headline-md text-headline-md mb-sm">General Report</h2>
        <p class="font-body-md text-body-md text-on-surface-variant mb-md">{{ reportRows.length }} loaded submissions.</p>
        <div class="grid gap-sm">
          <button class="px-lg py-sm bg-primary text-on-primary rounded-lg font-bold" type="button" @click="exportSubmissionsExcel(reportRows)">Export Excel</button>
          <button class="px-lg py-sm bg-surface-container-high text-on-surface rounded-lg font-bold" type="button" @click="exportSubmissionsCsv(reportRows)">Export CSV</button>
          <button class="px-lg py-sm bg-surface-container-high text-on-surface rounded-lg font-bold" type="button" @click="exportSubmissionsPdf(reportRows)">Print/PDF</button>
        </div>
      </article>
      <article class="bg-surface card-shadow rounded-xl border border-outline-variant p-lg">
        <h2 class="font-headline-md text-headline-md mb-sm">Complaint Report</h2>
        <p class="font-body-md text-body-md text-on-surface-variant mb-md">{{ complaintRows.length }} complaints.</p>
        <button class="w-full px-lg py-sm bg-primary text-on-primary rounded-lg font-bold" type="button" @click="exportSubmissionsExcel(complaintRows, `ymca-complaints-${Date.now()}.xls`)">Export Complaints Excel</button>
      </article>
      <article class="bg-surface card-shadow rounded-xl border border-outline-variant p-lg">
        <h2 class="font-headline-md text-headline-md mb-sm">Suggestion Report</h2>
        <p class="font-body-md text-body-md text-on-surface-variant mb-md">{{ suggestionRows.length }} suggestions.</p>
        <button class="w-full px-lg py-sm bg-primary text-on-primary rounded-lg font-bold" type="button" @click="exportSubmissionsExcel(suggestionRows, `ymca-suggestions-${Date.now()}.xls`)">Export Suggestions Excel</button>
      </article>
    </section>

    <section class="bg-surface card-shadow rounded-xl border border-outline-variant overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead><tr class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low/50"><th class="px-lg py-md">Ticket</th><th class="px-lg py-md">Type</th><th class="px-lg py-md">Submitter</th><th class="px-lg py-md">Contact</th><th class="px-lg py-md">Status</th><th class="px-lg py-md">Date</th></tr></thead>
          <tbody class="divide-y divide-outline-variant">
            <tr v-if="store.loading"><td class="px-lg py-lg" colspan="6">Loading report...</td></tr>
            <tr v-for="row in reportRows" v-else :key="row.id">
              <td class="px-lg py-md font-bold">{{ row.tracking_id || row.ticket_ref }}</td>
              <td class="px-lg py-md capitalize">{{ row.type }}</td>
              <td class="px-lg py-md">{{ row.submitter_name }}</td>
              <td class="px-lg py-md text-on-surface-variant">{{ row.parents?.phone || row.parents?.email || row.caregivers?.phone || row.caregivers?.email || 'No contact' }}</td>
              <td class="px-lg py-md">{{ row.status }}</td>
              <td class="px-lg py-md text-on-surface-variant">{{ new Date(row.created_at).toLocaleDateString() }}</td>
            </tr>
            <tr v-if="!store.loading && !reportRows.length"><td class="px-lg py-lg text-on-surface-variant" colspan="6">No submissions match this report.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </AdminLayout>
</template>
