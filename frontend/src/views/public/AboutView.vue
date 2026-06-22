<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import YmcaImage from '../../components/stitch/YmcaImage.vue'
import { ymcaImages } from '../../utils/ymcaImages'

const benefits = ['Safe vacation engagement', 'Sportsmanship and teamwork', 'Digital and creative exposure', 'Practical hard skills', 'Confidence, leadership, and civic responsibility']
</script>

<template>
  <div class="bg-background text-on-background">
    <SiteNavbar active="About" />
    <main>
      <section class="relative h-[520px] flex items-end overflow-hidden">
        <YmcaImage :src="ymcaImages.hero[2]" alt="About CVSP 2026" wrapper-class="absolute inset-0" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10"></div>
        <div class="relative z-10 max-w-container-max-width mx-auto px-md lg:px-xl pb-2xl w-full text-white">
          <p class="font-label-md text-label-md text-primary-fixed uppercase">About CVSP</p>
          <h1 class="font-headline-xl text-headline-xl mt-sm">Two months of learning, play, and growth</h1>
        </div>
      </section>
      <section class="max-w-container-max-width mx-auto px-md lg:px-xl py-3xl grid lg:grid-cols-12 gap-xl">
        <div class="lg:col-span-7 space-y-lg">
          <h2 class="font-headline-lg text-headline-lg">Program overview</h2>
          <p class="font-body-lg text-body-lg text-on-surface-variant">YMCA Children's Vacation Sports Program 2026 is an informational, recreational, and developmental program hosted at YMCA Crown Hill, Broad Street, Monrovia. It gives participants a structured space to build skills, friendships, confidence, and community values during vacation.</p>
          <div class="grid sm:grid-cols-2 gap-md">
            <div class="rounded-xl bg-surface-container-low p-lg border border-outline-variant"><p class="font-label-sm text-label-sm text-primary uppercase">Duration</p><p class="font-headline-md text-headline-md">2 Months</p></div>
            <div class="rounded-xl bg-surface-container-low p-lg border border-outline-variant"><p class="font-label-sm text-label-sm text-primary uppercase">Venue</p><p class="font-headline-md text-headline-md">YMCA Crown Hill, Broad Street, Monrovia</p></div>
          </div>
        </div>
        <aside class="lg:col-span-5 bg-primary-container text-on-primary-container rounded-xl p-xl">
          <h2 class="font-headline-lg text-headline-lg">Mission and objectives</h2>
          <p class="font-body-md text-body-md mt-md opacity-90">To create a safe, active, and inspiring program where children and young people learn useful skills, enjoy sports, express creativity, and develop strong civic values.</p>
        </aside>
      </section>
      <section class="bg-surface-container-low py-2xl">
        <div class="max-w-container-max-width mx-auto px-md lg:px-xl">
          <h2 class="font-headline-lg text-headline-lg mb-lg">Benefits for participants</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-md">
            <article v-for="benefit in benefits" :key="benefit" class="bg-surface-container-lowest rounded-xl border border-outline-variant p-md hover:-translate-y-1 hover:shadow-lg transition-all">
              <span class="material-symbols-outlined text-primary">check_circle</span>
              <p class="font-label-md text-label-md mt-sm">{{ benefit }}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
