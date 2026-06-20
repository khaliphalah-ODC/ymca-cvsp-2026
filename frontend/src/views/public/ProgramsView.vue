<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import MobileBottomNav from '../../components/stitch/MobileBottomNav.vue'
import ProgramCard from '../../components/stitch/ProgramCard.vue'
import { useSiteContentStore } from '../../stores/siteContent'

const store = useSiteContentStore()
</script>

<template>
  <div class="bg-background text-on-background min-h-screen flex flex-col">
    <SiteNavbar active="Programs" cta-container />
    <main class="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <section class="mb-3xl">
        <div class="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] flex items-center justify-center text-center p-lg bg-secondary">
          <div class="relative z-10 max-w-2xl">
            <h1 class="font-headline-xl text-headline-xl text-white mb-md drop-shadow-lg hidden md:block">Empowering the Next Generation</h1>
            <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-white mb-md drop-shadow-lg md:hidden">Empowering Youth</h1>
            <p class="font-body-lg text-body-lg text-white/90 drop-shadow-md">Discover a world of opportunities at Montserrado YMCA. From leadership training to creative arts, we bridge the gap for youth development.</p>
          </div>
        </div>
      </section>

      <section class="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-md max-w-2xl">
          <label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Age Group
            <select class="mt-xs w-full bg-white border border-outline-variant rounded-xl px-md py-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md">
              <option>All Ages</option><option>Children (6-12)</option><option>Teens (13-19)</option><option>Young Adults (20-30)</option>
            </select>
          </label>
          <label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Program Type
            <select class="mt-xs w-full bg-white border border-outline-variant rounded-xl px-md py-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md">
              <option>All Programs</option><option>Vocational</option><option>Sports</option><option>Leadership</option><option>Arts</option>
            </select>
          </label>
        </div>
        <button class="flex items-center gap-xs px-lg py-sm bg-white border border-outline-variant rounded-full text-on-surface hover:bg-surface-container transition-all">
          <span class="material-symbols-outlined">filter_list</span><span class="font-label-md text-label-md">Sort By</span>
        </button>
      </section>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
        <ProgramCard v-for="program in store.programs" :key="program.title" :program="program" />
      </div>

      <section class="mt-3xl mb-xl">
        <div class="bg-secondary-container rounded-3xl p-xl flex flex-col md:flex-row items-center gap-xl">
          <div class="flex-1">
            <h2 class="font-headline-lg text-headline-lg text-on-secondary-fixed mb-sm">Not sure which program to choose?</h2>
            <p class="font-body-md text-body-md text-on-secondary-fixed-variant">Our counselors are here to help you find the best fit for your goals and interests.</p>
          </div>
          <button class="bg-primary text-on-primary px-2xl py-md rounded-full font-bold shadow-lg hover:scale-105 transition-all">Talk to a Counselor</button>
        </div>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav active="Programs" />
  </div>
</template>
