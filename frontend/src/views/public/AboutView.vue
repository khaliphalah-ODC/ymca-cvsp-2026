<script setup>
import { onMounted } from 'vue'
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import YmcaImage from '../../components/stitch/YmcaImage.vue'
import { ymcaImages } from '../../utils/ymcaImages'

const benefits = ['Safe vacation engagement', 'Sportsmanship and teamwork', 'Digital and creative exposure', 'Practical hard skills', 'Confidence, leadership, and civic responsibility']

const coreValues = [
  ['Integrity', 'Operating with transparency and financial stewardship.'],
  ['Trustworthiness', 'Being reliable and accountable in all community actions.'],
  ['Respect', 'Treating every individual with dignity and honor.'],
  ['Inclusiveness', 'Welcoming individuals regardless of sex, age, religion, or background.'],
  ['Initiative', 'Driving creative solutions and proactive leadership.'],
  ['Tolerance', 'Fostering community dialogue, peacebuilding, and mutual understanding.'],
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    })
  }, { threshold: 0.18 })

  document.querySelectorAll('.scroll-slide').forEach((card) => observer.observe(card))
})
</script>

<template>
  <div class="bg-background text-on-background">
    <SiteNavbar active="About" />
    <main>
      <section class="relative min-h-[560px] flex items-end overflow-hidden">
        <YmcaImage :src="ymcaImages.hero[2]" alt="About CVSP 2026" wrapper-class="absolute inset-0" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"></div>
        <div class="relative z-10 max-w-container-max-width mx-auto px-md lg:px-xl pb-2xl w-full text-white">
          <p class="font-label-md text-label-md text-primary-fixed uppercase">About CVSP 2026</p>
          <h1 class="font-headline-xl text-headline-xl mt-sm max-w-3xl">Two months of learning, play, service, and growth</h1>
          <p class="font-body-lg text-body-lg text-white/90 mt-md max-w-2xl">Hosted at YMCA Crown Hill, Broad Street, Monrovia.</p>
        </div>
      </section>

      <section class="max-w-container-max-width mx-auto px-md lg:px-xl py-3xl grid lg:grid-cols-12 gap-xl">
        <div class="lg:col-span-7 space-y-lg">
          <article class="scroll-slide bg-surface-container-lowest rounded-xl border border-outline-variant p-xl card-shadow">
            <p class="font-label-md text-label-md text-primary uppercase">Program Overview</p>
            <h2 class="font-headline-lg text-headline-lg mt-sm">YMCA Children's Vacation Sports Program 2026</h2>
            <p class="font-body-lg text-body-lg text-on-surface-variant mt-md">CVSP 2026 is an informational, recreational, and developmental program that gives participants a structured space to build skills, friendships, confidence, and community values during vacation.</p>
          </article>

          <article class="scroll-slide bg-primary text-on-primary rounded-xl p-xl card-shadow">
            <p class="font-label-md text-label-md uppercase text-white/80">National Mission Statement</p>
            <blockquote class="font-headline-md text-headline-md mt-sm">“To unite and empower young people through self-development and service to their community as an extension of the Kingdom of our Lord and Savior, Jesus Christ.”</blockquote>
            <p class="font-body-lg text-body-lg mt-md text-white/90">This mission is centered around the vision of empowering young people for the African Renaissance.</p>
          </article>
        </div>

        <aside class="lg:col-span-5 space-y-md">
          <div class="scroll-slide rounded-xl bg-surface-container-low p-lg border border-outline-variant">
            <p class="font-label-sm text-label-sm text-primary uppercase">Duration</p>
            <p class="font-headline-md text-headline-md">2 Months</p>
          </div>
          <div class="scroll-slide rounded-xl bg-surface-container-low p-lg border border-outline-variant">
            <p class="font-label-sm text-label-sm text-primary uppercase">Venue</p>
            <p class="font-headline-md text-headline-md">YMCA Crown Hill, Broad Street, Monrovia</p>
          </div>
          <div class="scroll-slide rounded-xl overflow-hidden h-72 group">
            <YmcaImage :src="ymcaImages.hero[1]" alt="CVSP poster" wrapper-class="h-full" />
          </div>
        </aside>
      </section>

      <section class="bg-surface-container-low py-2xl">
        <div class="max-w-container-max-width mx-auto px-md lg:px-xl">
          <div class="max-w-2xl mb-lg">
            <p class="font-label-md text-label-md text-primary uppercase">Core Values</p>
            <h2 class="font-headline-lg text-headline-lg mt-sm">Values guiding YMCA leadership, staff, and members</h2>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-md">
            <article v-for="(value, index) in coreValues" :key="value[0]" class="scroll-slide bg-surface-container-lowest rounded-xl border border-outline-variant p-lg hover:-translate-y-1 hover:shadow-xl transition-all" :style="{ transitionDelay: `${index * 70}ms` }">
              <span class="w-11 h-11 rounded-full bg-primary-container text-on-primary-container grid place-items-center font-bold">{{ index + 1 }}</span>
              <h3 class="font-headline-md text-headline-md mt-md">{{ value[0] }}</h3>
              <p class="font-body-md text-body-md text-on-surface-variant mt-sm">{{ value[1] }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="max-w-container-max-width mx-auto px-md lg:px-xl py-3xl">
        <h2 class="font-headline-lg text-headline-lg mb-lg">Benefits for participants</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-md">
          <article v-for="benefit in benefits" :key="benefit" class="scroll-slide bg-surface-container-lowest rounded-xl border border-outline-variant p-md hover:-translate-y-1 hover:shadow-lg transition-all">
            <span class="material-symbols-outlined text-primary">check_circle</span>
            <p class="font-label-md text-label-md mt-sm">{{ benefit }}</p>
          </article>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
