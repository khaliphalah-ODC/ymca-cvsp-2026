<script setup>
import { computed, onMounted } from 'vue'
import { useSubmissionStore } from '../../stores/submissionStore'
import AdminLayout from '../../components/stitch/AdminLayout.vue'

const store = useSubmissionStore()

const cards = computed(() => [
  ['description', 'Total Submissions', store.stats.total_submissions || 0, 'All time'],
  ['pending_actions', 'Open Cases', store.stats.open_cases || 0, 'Active'],
  ['autofps_select', 'In Progress', store.stats.in_progress || 0, 'Working'],
  ['check_circle', 'Resolved', store.stats.resolved || 0, 'Closed'],
])

function submitterName(row) {
  return row.submitter_name || 'Anonymous'
}

onMounted(async () => {
  await Promise.all([
    store.fetchStats(),
    store.fetchRecentSubmissions(8),
  ])
})
</script>

<template>
  <AdminLayout title="Staff Dashboard" subtitle="Overview of CVSP complaints, suggestions, and follow-up work.">
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-md mb-2xl">
      <article v-for="card in cards" :key="card[1]" class="bg-surface card-shadow p-lg rounded-xl flex flex-col gap-sm border border-outline-variant hover:border-primary transition-all group">
        <div class="flex justify-between items-center text-on-surface-variant"><span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">{{ card[0] }}</span><span class="text-xs font-bold text-green-600 bg-green-50 px-sm py-0.5 rounded-full">{{ card[3] }}</span></div>
        <h3 class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{{ card[1] }}</h3>
        <p class="font-headline-md text-headline-md font-extrabold text-on-surface">{{ card[2] }}</p>
      </article>
      <article class="bg-primary text-on-primary card-shadow p-lg rounded-xl flex flex-col gap-sm">
        <div class="flex justify-between items-center"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">warning</span><span class="text-xs font-bold bg-white/20 px-sm py-0.5 rounded-full">High Urgency</span></div>
        <h3 class="font-label-sm text-label-sm text-on-primary/70 uppercase tracking-wider">Critical Issues</h3>
        <p class="font-headline-md text-headline-md font-extrabold">{{ store.stats.critical_issues || 0 }}</p>
      </article>
    </section>

    <p v-if="store.error" class="bg-error-container text-on-error-container px-md py-sm rounded-xl mb-md">{{ store.error }}</p>

    <div class="bento-grid-home">
      <section class="col-span-12 lg:col-span-4 bg-surface card-shadow rounded-xl p-lg border border-outline-variant overflow-hidden relative">
        <div class="flex justify-between items-center mb-lg"><h3 class="font-headline-md text-headline-md text-on-surface text-[18px]">Category Breakdown</h3></div>
        <div class="flex flex-col items-center justify-center py-xl">
          <div class="relative w-48 h-48 rounded-full border-[16px] border-secondary-container flex items-center justify-center" style="border-top-color: #b20112; border-right-color: #005d83;"><div class="text-center"><p class="font-headline-md text-headline-md text-on-surface">{{ store.stats.total_submissions || 0 }}</p><p class="font-label-sm text-label-sm text-on-surface-variant">Reports</p></div></div>
        </div>
      </section>
      <section class="col-span-12 lg:col-span-8 bg-surface card-shadow rounded-xl p-lg border border-outline-variant">
        <div class="flex justify-between items-center mb-lg"><h3 class="font-headline-md text-headline-md text-on-surface text-[18px]">Submission Trends</h3></div>
        <div class="h-64 flex items-end gap-md justify-between pt-lg">
          <div v-for="bar in [['Mon','40%','60%'],['Tue','60%','80%'],['Wed','80%','40%'],['Thu','100%','90%'],['Fri','50%','30%'],['Sat','30%','20%'],['Sun','20%','10%']]" :key="bar[0]" class="flex-1 group flex flex-col items-center gap-sm">
            <div class="w-full bg-primary/10 rounded-t-lg group-hover:bg-primary/20 transition-all relative" :style="{ height: bar[1] }"><div class="absolute bottom-0 w-full bg-primary rounded-t-lg" :style="{ height: bar[2] }"></div></div>
            <span class="font-label-sm text-label-sm text-on-surface-variant">{{ bar[0] }}</span>
          </div>
        </div>
      </section>
      <section class="col-span-12 bg-surface card-shadow rounded-xl border border-outline-variant overflow-hidden">
        <div class="px-lg py-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low"><h3 class="font-headline-md text-headline-md text-on-surface text-[18px]">Recent Submissions</h3><RouterLink class="font-label-md text-label-md text-primary hover:underline" to="/admin/submissions">View All</RouterLink></div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead><tr class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low/50"><th class="px-lg py-md">ID</th><th class="px-lg py-md">Submitter</th><th class="px-lg py-md">Program</th><th class="px-lg py-md">Priority</th><th class="px-lg py-md">Status</th><th class="px-lg py-md text-right">Actions</th></tr></thead>
            <tbody class="font-body-md text-body-md divide-y divide-outline-variant">
              <tr v-if="store.loading"><td class="px-lg py-lg" colspan="6">Loading submissions...</td></tr>
              <tr v-for="row in store.recentSubmissions" v-else :key="row.id" class="hover:bg-surface-container-low transition-colors group">
                <td class="px-lg py-md font-bold text-on-surface">{{ row.tracking_id || row.ticket_ref }}</td>
                <td class="px-lg py-md">{{ submitterName(row) }}</td>
                <td class="px-lg py-md text-on-surface-variant">{{ row.program_name || 'Unknown Program' }}</td>
                <td class="px-lg py-md"><span class="inline-flex items-center gap-1 px-sm py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[12px] font-bold capitalize">{{ row.urgency }}</span></td>
                <td class="px-lg py-md"><span class="font-label-sm text-label-sm bg-surface-container-highest px-md py-1 rounded-full text-on-surface">{{ row.status }}</span></td>
                <td class="px-lg py-md text-right"><RouterLink class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" :to="`/admin/submissions/${row.id}`">visibility</RouterLink></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>
