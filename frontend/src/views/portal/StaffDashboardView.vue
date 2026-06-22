<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSubmissionStore } from '../../stores/submissionStore'
import { useAuth } from '../../utils/useAuth'
import AdminMobileNav from '../../components/stitch/AdminMobileNav.vue'
import { ymcaImages } from '../../utils/ymcaImages'

const router = useRouter()
const store = useSubmissionStore()
const { logout, user } = useAuth()

const cards = computed(() => [
  ['description', 'Total Submissions', store.stats.total_submissions || 0, 'All time'],
  ['pending_actions', 'Open Cases', store.stats.open_cases || 0, 'Active'],
  ['autofps_select', 'In Progress', store.stats.in_progress || 0, 'Working'],
  ['check_circle', 'Resolved', store.stats.resolved || 0, 'Closed'],
])

function submitterName(row) {
  return row.submitter_name || 'Anonymous'
}

async function signOut() {
  await logout()
  router.push('/admin/login')
}

onMounted(async () => {
  await Promise.all([
    store.fetchStats(),
    store.fetchRecentSubmissions(8),
  ])
})
</script>

<template>
  <div class="text-on-background bg-background min-h-screen">
    <AdminMobileNav />
    <aside class="hidden md:flex flex-col h-screen py-lg px-md w-64 fixed left-0 top-0 z-40 bg-surface-container-low border-r border-outline-variant">
      <div class="mb-xl px-sm">
        <h1 class="font-headline-md text-headline-md font-black text-primary">Montserrado YMCA</h1>
        <p class="font-label-sm text-label-sm text-on-surface-variant opacity-70">Staff Portal</p>
      </div>
      <nav class="flex-1 space-y-2" aria-label="Staff navigation">
        <RouterLink class="flex items-center gap-md px-md py-sm bg-primary-container text-on-primary-container rounded-lg font-bold translate-x-1 transition-transform group" to="/admin/dashboard"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">dashboard</span><span class="font-label-md text-label-md">Overview</span></RouterLink>
        <RouterLink class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" to="/admin/submissions"><span class="material-symbols-outlined">folder_shared</span><span class="font-label-md text-label-md">Submissions</span></RouterLink>
        <RouterLink class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" to="/admin/qr-codes"><span class="material-symbols-outlined">qr_code_2</span><span class="font-label-md text-label-md">QR Codes</span></RouterLink>
        <RouterLink class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" to="/admin/cases"><span class="material-symbols-outlined">assignment_ind</span><span class="font-label-md text-label-md">Case Management</span></RouterLink>
        <RouterLink class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" to="/admin/settings"><span class="material-symbols-outlined">settings</span><span class="font-label-md text-label-md">Settings</span></RouterLink>
      </nav>
      <div class="mt-auto space-y-2 border-t border-outline-variant pt-lg">
        <RouterLink class="w-full mb-lg py-sm px-md bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-xs" to="/admin/qr-codes"><span class="material-symbols-outlined text-[20px]">qr_code_2</span>Generate QR</RouterLink>
        <button class="w-full flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" type="button" @click="signOut"><span class="material-symbols-outlined">logout</span><span class="font-label-md text-label-md">Sign Out</span></button>
      </div>
    </aside>

    <main class="md:ml-64 min-h-screen p-xl lg:p-2xl">
      <header class="flex justify-between items-center mb-xl">
        <div>
          <h2 class="font-headline-lg text-headline-lg text-on-surface">Staff Dashboard</h2>
          <p class="font-body-md text-body-md text-on-surface-variant">Welcome back, Admin. Here is the latest activity.</p>
        </div>
        <div class="flex items-center gap-lg">
          <button class="relative p-sm rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant" type="button" aria-label="Notifications">
            <span class="material-symbols-outlined text-headline-md">notifications</span>
            <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-primary border-2 border-background rounded-full"></span>
          </button>
          <div class="flex items-center gap-md pl-lg border-l border-outline-variant">
            <div class="text-right hidden md:block"><p class="font-label-md text-label-md text-on-surface">{{ user?.email || 'Staff User' }}</p><p class="font-label-sm text-label-sm text-on-surface-variant opacity-70">Case Coordinator</p></div>
            <div class="w-10 h-10 rounded-full overflow-hidden bg-primary-container border-2 border-primary">
              <img class="w-full h-full object-cover" alt="Staff avatar" :src="ymcaImages.logo" />
            </div>
          </div>
        </div>
      </header>

      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-md mb-2xl">
        <article v-for="card in cards" :key="card[1]" class="bg-surface card-shadow p-lg rounded-xl flex flex-col gap-sm border border-outline-variant hover:border-primary transition-all group">
          <div class="flex justify-between items-center text-on-surface-variant"><span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">{{ card[0] }}</span><span class="text-xs font-bold text-green-600 bg-green-50 px-sm py-0.5 rounded-full">{{ card[3] }}</span></div>
          <h3 class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{{ card[1] }}</h3>
          <p class="font-headline-md text-headline-md font-extrabold text-on-surface">{{ card[2] }}</p>
        </article>
        <article class="bg-primary text-on-primary card-shadow p-lg rounded-xl flex flex-col gap-sm hover:opacity-90 transition-all cursor-pointer">
          <div class="flex justify-between items-center"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">warning</span><span class="text-xs font-bold bg-white/20 px-sm py-0.5 rounded-full">High Urgency</span></div>
          <h3 class="font-label-sm text-label-sm text-on-primary/70 uppercase tracking-wider">Critical Issues</h3>
          <p class="font-headline-md text-headline-md font-extrabold">{{ store.stats.critical_issues || 0 }}</p>
        </article>
      </section>

      <p v-if="store.error" class="bg-error-container text-on-error-container px-md py-sm rounded-xl mb-md">{{ store.error }}</p>

      <div class="bento-grid-home">
        <section class="col-span-12 lg:col-span-4 bg-surface card-shadow rounded-xl p-lg border border-outline-variant overflow-hidden relative">
          <div class="flex justify-between items-center mb-lg"><h3 class="font-headline-md text-headline-md text-on-surface text-[18px]">Category Breakdown</h3><button class="material-symbols-outlined text-on-surface-variant">more_vert</button></div>
          <div class="flex flex-col items-center justify-center py-xl">
            <div class="relative w-48 h-48 rounded-full border-[16px] border-secondary-container flex items-center justify-center" style="border-top-color: #b20112; border-right-color: #005d83;"><div class="text-center"><p class="font-headline-md text-headline-md text-on-surface">{{ store.stats.total_submissions || 0 }}</p><p class="font-label-sm text-label-sm text-on-surface-variant">Reports</p></div></div>
          </div>
        </section>
        <section class="col-span-12 lg:col-span-8 bg-surface card-shadow rounded-xl p-lg border border-outline-variant">
          <div class="flex justify-between items-center mb-lg"><h3 class="font-headline-md text-headline-md text-on-surface text-[18px]">Submission Trends</h3><div class="flex gap-sm"><button class="px-sm py-1 font-label-sm text-label-sm bg-surface-container-high rounded-lg text-on-surface">Weekly</button><button class="px-sm py-1 font-label-sm text-label-sm hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors">Monthly</button></div></div>
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
                  <td class="px-lg py-md font-bold text-on-surface">{{ row.ticket_ref }}</td>
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
    </main>
  </div>
</template>
