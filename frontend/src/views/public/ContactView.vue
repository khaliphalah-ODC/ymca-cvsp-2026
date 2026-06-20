<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
</script>

<template>
  <div class="bg-background text-on-background font-body-md overflow-x-hidden">
    <SiteNavbar active="Contact" contact-icon contained />
    <main class="min-h-screen">
      <section class="relative w-full py-2xl bg-surface-container-low overflow-hidden">
        <div class="relative z-10 max-w-container-max-width mx-auto px-md lg:px-xl text-center">
          <h1 class="font-headline-xl text-headline-xl mb-md text-on-surface">Get in Touch</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Bridging the gap for the youth of Montserrado County. Have a question about our programs or want to volunteer? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section class="max-w-container-max-width mx-auto px-md lg:px-xl py-3xl grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <div class="lg:col-span-5 space-y-lg">
          <article v-for="info in [['location_on','Visit Us','Broad Street, Crown Hill\\nMonrovia, Liberia','bg-primary-container text-on-primary-container'],['call','Call Us','+231 777 000 000\\n+231 888 000 000','bg-tertiary-container text-on-tertiary-container'],['mail','Email Us','info@montserradoymca.org\\nprograms@montserradoymca.org','bg-secondary-container text-on-secondary-container']]" :key="info[1]" class="bg-white rounded-xl p-lg custom-shadow border border-outline-variant flex gap-md items-start transition-all hover:scale-[1.02]">
            <div :class="['p-sm rounded-lg', info[3]]"><span class="material-symbols-outlined text-2xl">{{ info[0] }}</span></div>
            <div><h3 class="font-headline-md text-headline-md mb-xs">{{ info[1] }}</h3><p class="text-on-surface-variant whitespace-pre-line">{{ info[2] }}</p></div>
          </article>
          <article class="bg-surface-container-highest rounded-xl p-lg border border-outline-variant">
            <h3 class="font-headline-md text-headline-md mb-md flex items-center gap-2"><span class="material-symbols-outlined">schedule</span>Operating Hours</h3>
            <ul class="space-y-sm">
              <li class="flex justify-between font-body-md py-1 border-b border-outline-variant"><span>Monday - Friday</span><span class="font-bold">8:00 AM - 5:00 PM</span></li>
              <li class="flex justify-between font-body-md py-1 border-b border-outline-variant"><span>Saturday</span><span class="font-bold">9:00 AM - 2:00 PM</span></li>
              <li class="flex justify-between font-body-md py-1 text-primary italic"><span>Sunday</span><span class="font-bold">Closed</span></li>
            </ul>
          </article>
        </div>
        <div class="lg:col-span-7">
          <div class="bg-white rounded-xl p-lg lg:p-2xl custom-shadow border border-outline-variant">
            <h2 class="font-headline-lg text-headline-lg mb-lg">Send us a message</h2>
            <form class="space-y-lg" aria-label="Contact form">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <label class="space-y-xs font-label-md text-label-md text-on-surface-variant">Full Name<input class="mt-xs w-full bg-white border border-outline-variant rounded-lg p-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="John Doe" required type="text"/></label>
                <label class="space-y-xs font-label-md text-label-md text-on-surface-variant">Email Address<input class="mt-xs w-full bg-white border border-outline-variant rounded-lg p-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="john@example.com" required type="email"/></label>
              </div>
              <label class="space-y-xs font-label-md text-label-md text-on-surface-variant">Subject<select class="mt-xs w-full bg-white border border-outline-variant rounded-lg p-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"><option>General Inquiry</option><option>Program Enrollment</option><option>Volunteer Opportunities</option><option>Donations & Support</option><option>Other</option></select></label>
              <label class="space-y-xs font-label-md text-label-md text-on-surface-variant">Message<textarea class="mt-xs w-full bg-white border border-outline-variant rounded-lg p-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" placeholder="How can we help you?" required rows="5"></textarea></label>
              <button class="w-full bg-primary text-on-primary py-lg rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container hover:scale-[0.98] transition-all group" type="submit">
                Send Message <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">send</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
