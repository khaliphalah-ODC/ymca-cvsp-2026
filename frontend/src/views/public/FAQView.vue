<script setup>
import { ref } from 'vue'
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'

const open = ref(0)
const faqs = [
  ['What is CVSP 2026?', 'The YMCA Children’s Vacation Sports Program 2026 is a two-month learning, sports, creativity, and skills development program for children and young people.'],
  ['Who can participate?', 'Children and young people connected to the CVSP program community can participate according to YMCA registration guidance.'],
  ['How do I submit a complaint?', 'Scan the official YMCA QR code provided during the program.'],
  ['How do I submit a suggestion?', 'Scan the official YMCA QR code and complete the suggestion form.'],
  ['Can I submit anonymously?', 'Yes, anonymous submissions are supported.'],
  ['How do I track my complaint or suggestion?', 'Use your private tracking code on the Track Submission page.'],
  ['What happens after I submit?', 'The YMCA team reviews submissions and updates their status until resolution.'],
  ['What statuses can my submission have?', 'Submitted, Under Review, In Progress, Resolved, or Closed.'],
]
</script>

<template>
  <div class="min-h-screen bg-background text-on-surface">
    <SiteNavbar active="FAQ" />
    <main class="max-w-container-max-width mx-auto px-md lg:px-xl py-2xl">
      <section class="mb-xl max-w-3xl">
        <p class="font-label-md text-label-md text-primary uppercase">Participant Support</p>
        <h1 class="font-headline-xl text-headline-xl mt-sm">Frequently Asked Questions</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant mt-md">Answers about CVSP 2026 and the QR-based complaint and suggestion platform.</p>
      </section>
      <section class="grid gap-md">
        <article v-for="(faq, index) in faqs" :key="faq[0]" class="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <button class="w-full px-lg py-md flex items-center justify-between text-left" type="button" @click="open = open === index ? -1 : index">
            <span class="font-headline-md text-headline-md">{{ faq[0] }}</span>
            <span class="material-symbols-outlined text-primary">{{ open === index ? 'expand_less' : 'expand_more' }}</span>
          </button>
          <p v-if="open === index" class="px-lg pb-lg font-body-md text-body-md text-on-surface-variant">{{ faq[1] }}</p>
        </article>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
