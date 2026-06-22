<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import MobileBottomNav from '../../components/stitch/MobileBottomNav.vue'
import YmcaImage from '../../components/stitch/YmcaImage.vue'
import { ymcaImages } from '../../utils/ymcaImages'

const highlights = [
  ['sports_basketball', 'Sports and Games', 'Basketball and guided recreation build teamwork, discipline, and confidence.'],
  ['computer', 'Digital Learning', 'Computer basics and digital literacy help participants navigate modern tools.'],
  ['palette', 'Creative Expression', 'Music, arts, and hands-on projects make learning active and joyful.'],
]

const quickInfo = [
  ['Duration', '2 Months'],
  ['Venue', 'YMCA Crown Hill, Broad Street, Monrovia'],
  ['Theme', 'Learn, Play, Grow!'],
]
</script>

<template>
  <div class="bg-background text-on-background overflow-x-hidden">
    <SiteNavbar active="Home" />
    <main>
      <section class="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        <div class="absolute inset-0">
          <YmcaImage :src="ymcaImages.hero[0]" alt="CVSP youth program" wrapper-class="h-full w-full" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent"></div>
        </div>
        <div class="relative z-10 max-w-container-max-width mx-auto px-md lg:px-xl py-3xl w-full">
          <div class="max-w-3xl text-white">
            <p class="font-label-md text-label-md uppercase tracking-wider text-primary-fixed">YMCA Crown Hill</p>
            <h1 class="font-headline-xl text-headline-xl mt-sm">YMCA Children's Vacation Sports Program 2026</h1>
            <p class="font-headline-lg text-headline-lg mt-md text-primary-fixed">Learn, Play, Grow!</p>
            <p class="font-body-lg text-body-lg mt-lg max-w-2xl text-white/90">A two-month vacation program combining sports, digital learning, creative arts, hard skills, soft skills, and participant support.</p>
            <div class="flex flex-wrap gap-md mt-xl">
              <RouterLink class="bg-primary text-on-primary px-xl py-md rounded-xl font-bold hover:translate-y-[-2px] transition-all" to="/activities">Explore Activities</RouterLink>
              <RouterLink class="bg-white text-primary px-xl py-md rounded-xl font-bold hover:translate-y-[-2px] transition-all" to="/about">Program Info</RouterLink>
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
          <YmcaImage :src="ymcaImages.hero[1]" alt="CVSP featured activity" wrapper-class="h-full" />
        </article>
        <article class="bg-primary text-on-primary rounded-xl p-xl flex flex-col justify-center">
          <p class="font-label-md text-label-md uppercase">Registration Information</p>
          <h2 class="font-headline-lg text-headline-lg mt-sm">Registration details are shared through YMCA program channels.</h2>
          <p class="font-body-lg text-body-lg mt-md text-white/90">Participants and families should contact YMCA Crown Hill for enrollment guidance, schedules, and program requirements.</p>
          <RouterLink class="inline-flex items-center gap-xs mt-lg font-bold text-white" to="/contact">
            Contact YMCA
            <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>
        </article>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav active="Home" />
  </div>
</template>
