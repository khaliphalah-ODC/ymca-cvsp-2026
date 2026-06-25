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
    <main>
      <section class="bg-primary text-on-primary overflow-hidden">
        <div class="max-w-container-max-width mx-auto grid lg:grid-cols-2">
          <div class="px-md lg:px-xl py-2xl md:py-3xl flex flex-col justify-center">
            <p class="font-label-md text-label-md text-white/85 uppercase">Activities</p>
            <h1 class="text-[2.35rem] leading-[1.08] md:font-headline-xl md:text-headline-xl font-bold mt-sm max-w-3xl">Sports, creativity, and digital discovery</h1>
            <p class="font-body-lg text-body-lg text-white/90 mt-md max-w-xl">CVSP 2026 activities are designed to keep children active, curious, and connected throughout the vacation program.</p>
          </div>
          <div class="min-h-[320px] md:min-h-[460px] lg:min-h-[calc(100vh-80px)] group">
            <YmcaImage :src="ymcaImages.showcase.basketball" alt="CVSP activities" wrapper-class="h-full" image-class="object-center" />
          </div>
        </div>
      </section>
      <section class="max-w-container-max-width mx-auto px-md lg:px-xl py-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        <ProgramCard v-for="program in store.programs" :key="program.title" :program="program" />
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav active="Activities" />
  </div>
</template>
