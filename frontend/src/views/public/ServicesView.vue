<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import MobileBottomNav from '../../components/stitch/MobileBottomNav.vue'
import YmcaImage from '../../components/stitch/YmcaImage.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { useSiteContentStore } from '../../stores/siteContent'
import 'swiper/css'
import 'swiper/css/pagination'

const store = useSiteContentStore()
const swiperModules = [Autoplay, Pagination]
const skillSlides = [
  ...store.hardSkills,
  ...store.softSkills,
]
</script>

<template>
  <div class="bg-background text-on-background min-h-screen">
    <SiteNavbar active="Skills" />
    <main>
      <section class="relative bg-primary text-on-primary overflow-hidden h-[calc(100vh-80px)] w-full">
        <Swiper
          class="absolute inset-0 h-full w-full skill-hero-swiper"
          :modules="swiperModules"
          :slides-per-view="1"
          :loop="true"
          :speed="900"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 2800, disableOnInteraction: false }"
        >
          <SwiperSlide v-for="slide in skillSlides" :key="slide.title">
            <div class="relative h-full w-full">
              <YmcaImage :src="slide.image" :alt="slide.title" wrapper-class="absolute inset-0 h-full w-full" image-class="object-center" />
              <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/15"></div>
              <div class="absolute bottom-xl right-md lg:right-xl max-w-md text-white hidden md:block">
                <p class="font-label-md text-label-md text-primary-fixed uppercase">{{ slide.title }}</p>
                <p class="font-body-md text-body-md text-white/90 mt-xs">{{ slide.description }}</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div class="relative z-10 h-full flex items-center pointer-events-none">
          <div class="max-w-container-max-width mx-auto px-md lg:px-xl py-2xl w-full">
            <div class="max-w-3xl">
              <p class="font-label-md text-label-md text-primary-fixed uppercase">Skills Development</p>
              <h1 class="font-headline-xl text-headline-xl mt-sm">Hard skills and soft skills for confident growth</h1>
              <p class="font-body-lg text-body-lg text-white/90 mt-md max-w-2xl">CVSP combines hands-on exposure with values-based learning so participants leave with practical confidence and stronger social awareness.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-surface-container-low py-2xl">
        <div class="max-w-container-max-width mx-auto px-md lg:px-xl grid lg:grid-cols-2 gap-xl">
          <div>
            <h2 class="font-headline-lg text-headline-lg mb-lg">Hard Skills</h2>
            <div class="grid gap-md">
              <article v-for="skill in store.hardSkills" :key="skill.title" class="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden grid sm:grid-cols-[180px_1fr] hover:shadow-xl transition-all">
                <YmcaImage :src="skill.image" :alt="skill.title" wrapper-class="h-44 sm:h-full" />
                <div class="p-lg"><h3 class="font-headline-md text-headline-md">{{ skill.title }}</h3><p class="font-body-md text-body-md text-on-surface-variant mt-sm">{{ skill.description }}</p></div>
              </article>
            </div>
          </div>
          <div>
            <h2 class="font-headline-lg text-headline-lg mb-lg">Soft Skills</h2>
            <div class="grid gap-md">
              <article v-for="skill in store.softSkills" :key="skill.title" class="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden grid sm:grid-cols-[180px_1fr] hover:shadow-xl transition-all">
                <YmcaImage :src="skill.image" :alt="skill.title" wrapper-class="h-44 sm:h-full" />
                <div class="p-lg"><h3 class="font-headline-md text-headline-md">{{ skill.title }}</h3><p class="font-body-md text-body-md text-on-surface-variant mt-sm">{{ skill.description }}</p></div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav active="Skills" />
  </div>
</template>
