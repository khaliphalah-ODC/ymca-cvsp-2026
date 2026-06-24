<script setup>
import { ref } from 'vue'
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import YmcaImage from '../../components/stitch/YmcaImage.vue'
import { ymcaImages } from '../../utils/ymcaImages'

const form = ref({ name: '', email: '', phone: '', subject: 'Program Information', message: '' })
const status = ref('')

function submitContact() {
  status.value = ''
  if (!form.value.name || !form.value.email || !form.value.message) {
    status.value = 'Please enter your name, email, and message.'
    return
  }

  const body = [
    `Name: ${form.value.name}`,
    `Email: ${form.value.email}`,
    `Phone: ${form.value.phone || 'Not provided'}`,
    '',
    form.value.message,
  ].join('\n')

  window.location.href = `mailto:cvsp@montserradoymca.org?subject=${encodeURIComponent(form.value.subject)}&body=${encodeURIComponent(body)}`
  status.value = 'Your email app has been opened with the message ready to send.'
}
</script>

<template>
  <div class="bg-background text-on-background">
    <SiteNavbar active="Contact" />
    <main>
      <section class="relative min-h-[520px] flex items-end overflow-hidden">
        <YmcaImage :src="ymcaImages.hero[0]" alt="Contact YMCA CVSP" wrapper-class="absolute inset-0" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div class="relative z-10 max-w-container-max-width mx-auto px-md lg:px-xl pb-2xl w-full text-white">
          <p class="font-label-md text-label-md text-primary-fixed uppercase">Contact YMCA</p>
          <h1 class="font-headline-xl text-headline-xl mt-sm max-w-3xl">Connect with the CVSP 2026 team</h1>
          <p class="font-body-lg text-body-lg text-white/90 mt-md max-w-2xl">Ask about registration, schedules, venue information, and participant support.</p>
        </div>
      </section>

      <section class="max-w-container-max-width mx-auto px-md lg:px-xl py-3xl grid lg:grid-cols-12 gap-xl">
        <div class="lg:col-span-5 space-y-md">
          <article v-for="info in [['call','Phone','+231 771 907 585'],['mail','Email','cvsp@montserradoymca.org'],['location_on','Location','YMCA Crown Hill\\nBroad Street, Monrovia']]" :key="info[1]" class="bg-surface-container-lowest rounded-xl p-lg custom-shadow border border-outline-variant flex gap-md items-start transition-all hover:-translate-y-1">
            <div class="p-sm rounded-lg bg-primary-container text-on-primary-container"><span class="material-symbols-outlined text-2xl">{{ info[0] }}</span></div>
            <div><h2 class="font-headline-md text-headline-md mb-xs">{{ info[1] }}</h2><p class="text-on-surface-variant whitespace-pre-line">{{ info[2] }}</p></div>
          </article>
          <article class="rounded-xl bg-primary text-on-primary p-xl">
            <h2 class="font-headline-md text-headline-md">Organization information</h2>
            <p class="font-body-md text-body-md mt-md text-white/90">Montserrado County YMCA supports children and young people through sports, skills development, leadership, creativity, service, and safe community programming.</p>
          </article>
        </div>

        <section class="lg:col-span-7 bg-surface-container-lowest rounded-xl border border-outline-variant p-lg lg:p-xl card-shadow">
          <h2 class="font-headline-lg text-headline-lg mb-sm">Send a message</h2>
          <p class="font-body-md text-body-md text-on-surface-variant mb-lg">This form opens your email app with the message prepared for the CVSP team.</p>
          <form class="space-y-md" @submit.prevent="submitContact">
            <div class="grid sm:grid-cols-2 gap-md">
              <label class="block space-y-xs font-label-md text-label-md">Full Name<input v-model.trim="form.name" class="mt-xs w-full h-12 px-md bg-white border border-outline rounded-lg" type="text" required /></label>
              <label class="block space-y-xs font-label-md text-label-md">Email<input v-model.trim="form.email" class="mt-xs w-full h-12 px-md bg-white border border-outline rounded-lg" type="email" required /></label>
            </div>
            <div class="grid sm:grid-cols-2 gap-md">
              <label class="block space-y-xs font-label-md text-label-md">Phone<input v-model.trim="form.phone" class="mt-xs w-full h-12 px-md bg-white border border-outline rounded-lg" type="tel" /></label>
              <label class="block space-y-xs font-label-md text-label-md">Subject<select v-model="form.subject" class="mt-xs w-full h-12 px-md bg-white border border-outline rounded-lg"><option>Program Information</option><option>Registration</option><option>Volunteer Support</option><option>Partnership</option><option>Other</option></select></label>
            </div>
            <label class="block space-y-xs font-label-md text-label-md">Message<textarea v-model.trim="form.message" class="mt-xs w-full p-md bg-white border border-outline rounded-lg resize-none" rows="6" required></textarea></label>
            <button class="w-full sm:w-auto inline-flex items-center justify-center gap-xs px-xl py-md bg-primary text-on-primary rounded-xl font-bold hover:-translate-y-1 transition-all" type="submit">
              <span class="material-symbols-outlined">send</span>
              Send Message
            </button>
            <p v-if="status" class="font-body-md text-body-md text-on-surface-variant">{{ status }}</p>
          </form>
        </section>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
