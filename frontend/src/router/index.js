import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/public/HomeView.vue'
import AboutView from '../views/public/AboutView.vue'
import ProgramsView from '../views/public/ProgramsView.vue'
import ServicesView from '../views/public/ServicesView.vue'
import GalleryView from '../views/public/GalleryView.vue'
import ContactView from '../views/public/ContactView.vue'
import FAQView from '../views/public/FAQView.vue'
import TrackSubmissionView from '../views/public/TrackSubmissionView.vue'
import SubmissionPortalView from '../views/portal/SubmissionPortalView.vue'
import SubmissionSuccessView from '../views/portal/SubmissionSuccessView.vue'
import StaffLoginView from '../views/portal/StaffLoginView.vue'
import StaffDashboardView from '../views/portal/StaffDashboardView.vue'
import QRGeneratorView from '../views/portal/QRGeneratorView.vue'
import SubmissionsListView from '../views/portal/SubmissionsListView.vue'
import SubmissionDetailView from '../views/portal/SubmissionDetailView.vue'
import CaseManagementView from '../views/portal/CaseManagementView.vue'
import SettingsView from '../views/portal/SettingsView.vue'
import { useAuth } from '../utils/useAuth'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/programs', name: 'programs', component: ProgramsView },
  { path: '/activities', name: 'activities', component: ProgramsView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/skills', name: 'skills', component: ServicesView },
  { path: '/gallery', name: 'gallery', component: GalleryView },
  { path: '/faq', name: 'faq', component: FAQView },
  { path: '/track', name: 'track-submission', component: TrackSubmissionView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/submit', name: 'submit', component: SubmissionPortalView },
  { path: '/success/:ticket', name: 'success', component: SubmissionSuccessView },
  { path: '/admin/login', name: 'admin-login', component: StaffLoginView },
  { path: '/admin', redirect: '/admin/dashboard' },
  { path: '/admin/dashboard', name: 'admin-dashboard', component: StaffDashboardView, meta: { requiresAuth: true } },
  { path: '/admin/qr-codes', name: 'admin-qr-codes', component: QRGeneratorView, meta: { requiresAuth: true } },
  { path: '/admin/submissions', name: 'admin-submissions', component: SubmissionsListView, meta: { requiresAuth: true } },
  { path: '/admin/submissions/:id', name: 'admin-submission-detail', component: SubmissionDetailView, meta: { requiresAuth: true } },
  { path: '/admin/cases', name: 'admin-cases', component: CaseManagementView, meta: { requiresAuth: true } },
  { path: '/admin/settings', name: 'admin-settings', component: SettingsView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  const { getUser } = useAuth()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (!requiresAuth) return true

  const user = await getUser()
  if (!user) {
    return {
      path: '/admin/login',
      query: { redirect: to.fullPath },
    }
  }

  return true
})

export default router
