<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import MobileBottomNav from '../../components/stitch/MobileBottomNav.vue'
import ProgramCard from '../../components/stitch/ProgramCard.vue'
import YmcaImage from '../../components/stitch/YmcaImage.vue'
import { useSiteContentStore } from '../../stores/siteContent'
import { ymcaImages } from '../../utils/ymcaImages'

const store = useSiteContentStore()
</script>

<template>
  <div class="bg-background text-on-background min-h-screen">
    <SiteNavbar active="Activities" />
    <main class="max-w-container-max-width mx-auto px-md lg:px-xl py-2xl">
      <section class="grid lg:grid-cols-12 gap-xl items-center mb-2xl">
        <div class="lg:col-span-5">
          <p class="font-label-md text-label-md text-primary uppercase">Activities</p>
          <h1 class="font-headline-xl text-headline-xl mt-sm">Sports, creativity, strategy, and digital discovery</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant mt-md">CVSP 2026 activities are designed to keep children active, curious, and connected throughout the vacation program.</p>
        </div>
        <div class="lg:col-span-7 group rounded-xl overflow-hidden h-[360px]">
          <YmcaImage :src="ymcaImages.hero[3]" alt="CVSP activities" wrapper-class="h-full" />
        </div>
      </section>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        <ProgramCard v-for="program in store.programs" :key="program.title" :program="program" />
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav active="Activities" />
  </div>
</template>
