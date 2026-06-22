<script setup>
import { computed, ref } from 'vue'
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import { useSiteContentStore } from '../../stores/siteContent'

const store = useSiteContentStore()
const active = ref('all')
const selected = ref(null)
const filters = ['all', 'sports', 'learning', 'arts', 'skills', 'community', 'leadership']
const filtered = computed(() => active.value === 'all' ? store.galleryItems : store.galleryItems.filter((item) => item[0] === active.value))
</script>

<template>
  <div class="bg-background text-on-surface">
    <SiteNavbar active="Gallery" />
    <main class="min-h-screen pb-2xl">
      <section class="py-2xl px-md bg-surface-container-low">
        <div class="max-w-container-max-width mx-auto text-center">
          <p class="text-primary font-bold tracking-widest text-label-sm uppercase mb-sm">CVSP Gallery</p>
          <h1 class="font-headline-xl text-headline-xl mb-md">Moments from YMCA programs</h1>
          <p class="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">A responsive gallery ready for future image uploads and category expansion.</p>
          <div class="flex flex-wrap justify-center gap-sm mt-lg">
            <button
              v-for="filter in filters"
              :key="filter"
              :class="active === filter ? 'active-filter px-lg py-sm rounded-full font-label-md text-label-md border border-outline-variant transition-all capitalize' : 'px-lg py-sm rounded-full font-label-md text-label-md border border-outline-variant bg-surface hover:bg-surface-container-high transition-all capitalize'"
              type="button"
              @click="active = filter"
            >
              {{ filter === 'all' ? 'All Images' : filter }}
            </button>
          </div>
        </div>
      </section>
      <section class="max-w-container-max-width mx-auto px-md py-xl">
        <div class="masonry-grid">
          <article v-for="item in filtered" :key="item[2]" :class="['gallery-card group relative overflow-hidden rounded-xl bg-surface-container shadow-sm cursor-zoom-in', item[3]]" @click="selected = item">
            <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" :alt="item[2]" :src="item[4]" loading="lazy" />
            <div class="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 flex flex-col justify-end p-lg">
              <span class="text-primary-fixed font-bold text-label-sm uppercase">{{ item[1] }}</span>
              <h3 class="text-white font-headline-md text-headline-md">{{ item[2] }}</h3>
            </div>
          </article>
        </div>
        <div v-if="!filtered.length" class="rounded-xl border border-outline-variant p-xl text-center text-on-surface-variant">No images in this category yet.</div>
      </section>
    </main>
    <div v-if="selected" class="fixed inset-0 z-[80] bg-black/85 p-md flex items-center justify-center" @click="selected = null">
      <div class="max-w-5xl w-full" @click.stop>
        <button class="ml-auto mb-md w-11 h-11 rounded-full bg-white text-primary grid place-items-center" type="button" aria-label="Close preview" @click="selected = null">
          <span class="material-symbols-outlined">close</span>
        </button>
        <img class="w-full max-h-[78vh] object-contain rounded-xl" :src="selected[4]" :alt="selected[2]" />
        <p class="text-white font-headline-md text-headline-md mt-md">{{ selected[2] }}</p>
      </div>
    </div>
    <SiteFooter />
  </div>
</template>
