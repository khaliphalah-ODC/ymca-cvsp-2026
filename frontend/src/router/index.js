import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/public/HomeView.vue'
import AboutView from '../views/public/AboutView.vue'
import ProgramsView from '../views/public/ProgramsView.vue'
import ServicesView from '../views/public/ServicesView.vue'
import GalleryView from '../views/public/GalleryView.vue'
import ContactView from '../views/public/ContactView.vue'
import SubmissionPortalView from '../views/portal/SubmissionPortalView.vue'
import SubmissionSuccessView from '../views/portal/SubmissionSuccessView.vue'
import StaffDashboardView from '../views/portal/StaffDashboardView.vue'
import QRGeneratorView from '../views/portal/QRGeneratorView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/programs', name: 'programs', component: ProgramsView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/gallery', name: 'gallery', component: GalleryView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/submit', name: 'submit', component: SubmissionPortalView },
  { path: '/success/:ticket', name: 'success', component: SubmissionSuccessView },
  { path: '/admin', redirect: '/admin/dashboard' },
  { path: '/admin/dashboard', name: 'admin-dashboard', component: StaffDashboardView },
  { path: '/admin/qr-codes', name: 'admin-qr-codes', component: QRGeneratorView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
