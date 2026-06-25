<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import MobileBottomNav from '../../components/stitch/MobileBottomNav.vue'
import YmcaImage from '../../components/stitch/YmcaImage.vue'
import { useSiteContentStore } from '../../stores/siteContent'
import { ymcaImages } from '../../utils/ymcaImages'

const store = useSiteContentStore()

const highlights = [
  ['sports_basketball', 'Sports and Games', 'Basketball and guided recreation build teamwork, discipline, and confidence.'],
  ['computer', 'Digital Learning', 'Computer basics and digital literacy help participants navigate modern tools.'],
  ['construction', 'Skills Training', 'Catering, tailoring, cosmetology, entrepreneurship, civic education, and peace building support whole-child growth.'],
]

const quickInfo = [
  ['Duration', store.registration.duration],
  ['Venue', store.registration.venue],
  ['Contact', `${store.registration.phone} / ${store.registration.email}`],
]
</script>

<template>
  <div class="bg-background text-on-background overflow-x-hidden">
    <SiteNavbar active="Home" />
    <main>
      <section class="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        <div class="absolute inset-0">
          <YmcaImage :src="ymcaImages.showcase.match" alt="CVSP match recognition" wrapper-class="h-full w-full" image-class="object-[35%_center]" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20"></div>
        </div>
        <div class="relative z-10 max-w-container-max-width mx-auto px-md lg:px-xl py-3xl w-full">
          <div class="max-w-3xl text-white">
            <p class="font-label-md text-label-md uppercase tracking-wider text-primary-fixed">YMCA Crown Hill</p>
            <h1 class="font-headline-xl text-headline-xl mt-sm">Montserrado County YMCA Children's Vacation Sports Program 2026</h1>
            <p class="font-headline-lg text-headline-lg mt-md text-primary-fixed">Learn, Play, Grow!</p>
            <p class="font-body-lg text-body-lg mt-lg max-w-2xl text-white/90">A two-month vacation program combining sports, digital learning, creative arts, hard skills, soft skills, and participant support.</p>
            <div class="flex flex-wrap gap-md mt-xl">
              <RouterLink class="bg-primary text-on-primary px-xl py-md rounded-xl font-bold hover:translate-y-[-2px] transition-all" to="/activities">Explore Activities</RouterLink>
              <RouterLink class="bg-white text-primary px-xl py-md rounded-xl font-bold hover:translate-y-[-2px] transition-all" to="/contact">Register Now</RouterLink>
            </div>
          </div>
        </div>
      </section>

      <section class="py-2xl bg-surface-container-low border-y border-outline-variant">
        <div class="max-w-container-max-width mx-auto px-md lg:px-xl grid md:grid-cols-3 gap-lg">
          <article v-for="item in quickInfo" :key="item[0]" class="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg card-shadow">
            <p class="font-label-sm text-label-sm text-primary uppercase">{{ item[0] }}</p>
            <h2 class="font-headline-md text-headline-md mt-xs">{{ item[1] }}</h2>
          </article>
        </div>
      </section>

      <section class="py-3xl max-w-container-max-width mx-auto px-md lg:px-xl">
        <div class="max-w-2xl mb-xl">
          <p class="font-label-md text-label-md text-primary uppercase">Program Highlights</p>
          <h2 class="font-headline-lg text-headline-lg mt-sm">A balanced vacation experience</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-lg">
          <article v-for="item in highlights" :key="item[1]" class="group bg-surface-container-lowest border border-outline-variant rounded-xl p-lg transition-all hover:-translate-y-1 hover:shadow-xl">
            <span class="material-symbols-outlined text-primary text-4xl">{{ item[0] }}</span>
            <h3 class="font-headline-md text-headline-md mt-md">{{ item[1] }}</h3>
            <p class="font-body-md text-body-md text-on-surface-variant mt-sm">{{ item[2] }}</p>
          </article>
        </div>
      </section>

      <section class="pb-3xl max-w-container-max-width mx-auto px-md lg:px-xl grid lg:grid-cols-2 gap-lg items-stretch">
        <article class="group rounded-xl overflow-hidden min-h-[360px]">
          <YmcaImage :src="ymcaImages.showcase.flyer" alt="YMCA CVSP 2026 flyer" wrapper-class="h-full" image-class="object-center" />
        </article>
        <article class="bg-primary text-on-primary rounded-xl p-xl flex flex-col justify-center">
          <p class="font-label-md text-label-md uppercase">Why Join?</p>
          <h2 class="font-headline-lg text-headline-lg mt-sm">Build skills, confidence, friendships, and leadership.</h2>
          <ul class="grid sm:grid-cols-2 gap-sm mt-lg">
            <li v-for="reason in store.whyJoin" :key="reason" class="flex items-start gap-sm text-white/95">
              <span class="material-symbols-outlined text-primary-fixed text-[20px] mt-0.5">check_circle</span>
              <span class="font-body-md text-body-md">{{ reason }}</span>
            </li>
          </ul>
          <RouterLink class="inline-flex items-center gap-xs mt-lg font-bold text-white" to="/contact">
            Contact YMCA
            <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>
        </article>
      </section>

      <section class="pb-3xl max-w-container-max-width mx-auto px-md lg:px-xl">
        <div class="grid lg:grid-cols-[1fr_1.2fr] gap-lg items-stretch">
          <article class="rounded-xl border border-outline-variant bg-surface-container-lowest p-xl card-shadow">
            <p class="font-label-md text-label-md text-primary uppercase">Register Now</p>
            <h2 class="font-headline-lg text-headline-lg mt-sm">CVSP 2026 begins July 2026</h2>
            <div class="grid gap-md mt-lg">
              <p class="flex gap-sm"><span class="material-symbols-outlined text-primary">call</span><span>{{ store.registration.phone }}</span></p>
              <p class="flex gap-sm"><span class="material-symbols-outlined text-primary">mail</span><span>{{ store.registration.email }}</span></p>
              <p class="flex gap-sm"><span class="material-symbols-outlined text-primary">language</span><span>{{ store.registration.website }}</span></p>
              <p class="flex gap-sm"><span class="material-symbols-outlined text-primary">location_on</span><span>{{ store.registration.venue }}</span></p>
            </div>
          </article>

          <section class="rounded-xl border border-outline-variant bg-surface-container-low p-xl">
            <p class="font-label-md text-label-md text-primary uppercase">Partners</p>
            <h2 class="font-headline-lg text-headline-lg mt-sm">Working together for stronger communities</h2>
            <div class="grid sm:grid-cols-2 gap-md mt-lg">
              <article v-for="partner in store.partners" :key="partner.name" class="bg-white rounded-xl border border-outline-variant p-lg hover:-translate-y-1 hover:shadow-xl transition-all">
                <div class="h-24 flex items-center justify-center rounded-lg bg-surface-container overflow-hidden">
                  <img class="max-h-full max-w-full object-contain" :src="partner.image" :alt="partner.name" />
                </div>
                <h3 class="font-headline-md text-headline-md mt-md">{{ partner.name }}</h3>
                <p class="font-body-md text-body-md text-on-surface-variant mt-sm">{{ partner.role }}</p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav active="Home" />
  </div>
</template>
