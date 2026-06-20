<script setup>
import { computed, ref } from 'vue'
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import { useSiteContentStore } from '../../stores/siteContent'

const store = useSiteContentStore()
const active = ref('all')
const filters = ['all', 'basketball', 'computer', 'leadership', 'entrepreneurship', 'art', 'community']
const filtered = computed(() => active.value === 'all' ? store.galleryItems : store.galleryItems.filter((item) => item[0] === active.value))
</script>

<template>
  <div class="bg-background text-on-surface">
    <SiteNavbar active="Gallery" />
    <main class="min-h-screen pb-2xl">
      <section class="relative py-2xl px-md overflow-hidden bg-surface-container-low">
        <div class="max-w-container-max-width mx-auto relative z-10 text-center">
          <span class="text-primary font-bold tracking-widest text-label-sm uppercase mb-sm block">Our Journey In Frames</span>
          <h1 class="font-headline-xl text-headline-xl md:text-headline-xl mb-md text-on-surface">Community & Youth Impact</h1>
          <p class="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto mb-xl">
            Witness the vibrant spirit of Montserrado County youth as they learn, lead, and grow through our diverse community initiatives.
          </p>
          <div class="flex flex-wrap justify-center gap-sm mt-lg">
            <button
              v-for="filter in filters"
              :key="filter"
              :class="active === filter ? 'filter-btn active-filter px-lg py-sm rounded-full font-label-md text-label-md border border-outline-variant transition-all capitalize' : 'filter-btn px-lg py-sm rounded-full font-label-md text-label-md border border-outline-variant bg-surface hover:bg-surface-container-high transition-all capitalize'"
              type="button"
              @click="active = filter"
            >
              {{ filter === 'all' ? 'All Moments' : filter.replace('-', ' ') }}
            </button>
          </div>
        </div>
      </section>

      <section class="max-w-container-max-width mx-auto px-md py-xl">
        <div class="masonry-grid">
          <article v-for="item in filtered" :key="item[2]" :class="['gallery-card group relative overflow-hidden rounded-xl bg-surface-container shadow-sm cursor-zoom-in', item[3]]">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" :alt="item[2]" :src="item[4]"/>
            <div class="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 flex flex-col justify-end p-lg">
              <span class="text-primary-fixed font-bold text-label-sm uppercase">{{ item[1] }}</span>
              <h3 class="text-white font-headline-md text-headline-md">{{ item[2] }}</h3>
            </div>
          </article>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
