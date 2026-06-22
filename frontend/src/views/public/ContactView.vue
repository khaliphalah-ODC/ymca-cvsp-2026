<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
</script>

<template>
  <div class="bg-background text-on-background">
    <SiteNavbar active="Contact" contained />
    <main>
      <section class="py-2xl bg-surface-container-low">
        <div class="max-w-container-max-width mx-auto px-md lg:px-xl">
          <p class="font-label-md text-label-md text-primary uppercase">Contact</p>
          <h1 class="font-headline-xl text-headline-xl mt-sm">YMCA Children’s Vacation Sports Program 2026</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant mt-md max-w-2xl">For registration details, program schedules, venue information, and participant support, contact YMCA Crown Hill.</p>
        </div>
      </section>
      <section class="max-w-container-max-width mx-auto px-md lg:px-xl py-3xl grid lg:grid-cols-3 gap-lg">
        <article v-for="info in [['call','Phone','+231 777 000 000\\n+231 888 000 000'],['mail','Email','info@montserradoymca.org\\nprograms@montserradoymca.org'],['location_on','Location','YMCA Crown Hill\\nBroad Street, Monrovia']]" :key="info[1]" class="bg-surface-container-lowest rounded-xl p-lg custom-shadow border border-outline-variant flex gap-md items-start transition-all hover:-translate-y-1">
          <div class="p-sm rounded-lg bg-primary-container text-on-primary-container"><span class="material-symbols-outlined text-2xl">{{ info[0] }}</span></div>
          <div><h2 class="font-headline-md text-headline-md mb-xs">{{ info[1] }}</h2><p class="text-on-surface-variant whitespace-pre-line">{{ info[2] }}</p></div>
        </article>
      </section>
      <section class="max-w-container-max-width mx-auto px-md lg:px-xl pb-3xl">
        <article class="rounded-xl bg-primary text-on-primary p-xl">
          <h2 class="font-headline-lg text-headline-lg">Organization information</h2>
          <p class="font-body-lg text-body-lg mt-md text-white/90">Montserrado County YMCA supports children and young people through sports, skills development, leadership, creativity, and safe community programming.</p>
        </article>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
