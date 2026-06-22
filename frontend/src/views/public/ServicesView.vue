<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import MobileBottomNav from '../../components/stitch/MobileBottomNav.vue'
import YmcaImage from '../../components/stitch/YmcaImage.vue'
import { ymcaImages } from '../../utils/ymcaImages'

const hardSkills = [
  ['Catering', 'Practical food preparation, hygiene, and presentation basics.'],
  ['Tailoring', 'Introductory stitching, measurement, fabric care, and creative repair.'],
  ['Cosmetology', 'Personal care, grooming, beauty basics, and presentation confidence.'],
]

const softSkills = [
  ['Peace Building', 'Respectful dialogue, conflict prevention, and community harmony.'],
  ['Entrepreneurship', 'Idea development, simple budgeting, and business confidence.'],
  ['Civic Education', 'Rights, responsibilities, leadership, and active citizenship.'],
]
</script>

<template>
  <div class="bg-background text-on-background min-h-screen">
    <SiteNavbar active="Skills" />
    <main>
      <section class="max-w-container-max-width mx-auto px-md lg:px-xl py-2xl grid lg:grid-cols-12 gap-xl items-center">
        <div class="lg:col-span-6">
          <p class="font-label-md text-label-md text-primary uppercase">Skills Development</p>
          <h1 class="font-headline-xl text-headline-xl mt-sm">Hard skills and soft skills for confident growth</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant mt-md">CVSP combines hands-on exposure with values-based learning so participants leave with practical confidence and stronger social awareness.</p>
        </div>
        <div class="lg:col-span-6 group rounded-xl overflow-hidden h-[360px]">
          <YmcaImage :src="ymcaImages.hero[4]" alt="Skills development" wrapper-class="h-full" />
        </div>
      </section>
      <section class="bg-surface-container-low py-2xl">
        <div class="max-w-container-max-width mx-auto px-md lg:px-xl grid lg:grid-cols-2 gap-xl">
          <div>
            <h2 class="font-headline-lg text-headline-lg mb-lg">Hard Skills</h2>
            <div class="grid gap-md">
              <article v-for="skill in hardSkills" :key="skill[0]" class="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden grid sm:grid-cols-[180px_1fr] hover:shadow-xl transition-all">
                <YmcaImage :src="ymcaImages.activities[skill[0]]" :alt="skill[0]" wrapper-class="h-44 sm:h-full" />
                <div class="p-lg"><h3 class="font-headline-md text-headline-md">{{ skill[0] }}</h3><p class="font-body-md text-body-md text-on-surface-variant mt-sm">{{ skill[1] }}</p></div>
              </article>
            </div>
          </div>
          <div>
            <h2 class="font-headline-lg text-headline-lg mb-lg">Soft Skills</h2>
            <div class="grid gap-md">
              <article v-for="skill in softSkills" :key="skill[0]" class="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden grid sm:grid-cols-[180px_1fr] hover:shadow-xl transition-all">
                <YmcaImage :src="ymcaImages.activities[skill[0]]" :alt="skill[0]" wrapper-class="h-44 sm:h-full" />
                <div class="p-lg"><h3 class="font-headline-md text-headline-md">{{ skill[0] }}</h3><p class="font-body-md text-body-md text-on-surface-variant mt-sm">{{ skill[1] }}</p></div>
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
