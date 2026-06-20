<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import MobileBottomNav from '../../components/stitch/MobileBottomNav.vue'
</script>

<template>
  <div class="bg-background text-on-background font-body-md overflow-x-hidden">
    <SiteNavbar active="Services" />
    <main class="w-full max-w-container-max-width mx-auto px-md lg:px-xl py-2xl">
      <section class="mb-3xl text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
        <div class="space-y-md">
          <span class="inline-block px-4 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm uppercase tracking-wider">Vocational Initiatives</span>
          <h1 class="font-headline-xl text-headline-xl leading-tight text-on-surface">Empowering the Next Generation of <span class="text-primary">Liberian Leaders</span></h1>
          <p class="font-body-lg text-body-lg text-secondary max-w-xl">We bridge the gap for youth in Montserrado County through specialized training, mentorship, and resources designed to turn potential into professional excellence.</p>
          <div class="pt-md flex flex-wrap gap-md justify-center md:justify-start">
            <RouterLink class="bg-primary text-on-primary px-xl py-md rounded-xl font-bold shadow-lg hover:shadow-xl transition-all" to="/programs">Explore Programs</RouterLink>
            <button class="bg-surface-container text-on-surface-variant px-xl py-md rounded-xl font-bold border border-outline-variant hover:bg-surface-container-high transition-all">Download Brochure</button>
          </div>
        </div>
        <div class="relative hidden md:block">
          <div class="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
            <img class="w-full h-full object-cover" alt="Youth collaborating in workshop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5gLBJx3NOuq1Szp6txnpOz0qkhvSOuZ5qaGVEX68hK6iROCRVArQ6yPCUEDelHztqPp9AyXhPFK7Lh7U9K08Sd3YH2gx2qFsgfY94oLI3JybqRQGXu_lvSOSEHK8rpESehyES7L_8GcRoyGs3p3Zjf2zviDB8bMmlSBh6LjR3qzgG7toQA3mAqYtGwL6ZkE29Y5gnZ5YdQTkDJxklXe8gtU2uxp1cpavHY0JFysD9G82my7llcmpS0ueVStnBzIh09J_9Mw0f_HM"/>
          </div>
          <div class="absolute -bottom-6 -left-6 w-48 h-48 bg-tertiary-container rounded-2xl opacity-20 blur-2xl"></div>
        </div>
      </section>

      <section class="space-y-xl">
        <div class="flex flex-col md:flex-row justify-between items-end gap-md">
          <div class="max-w-2xl">
            <h2 class="font-headline-lg text-headline-lg text-on-surface">Comprehensive Youth Services</h2>
            <p class="text-secondary font-body-md text-body-md mt-sm">Tailored solutions for social and economic mobility.</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-lg">
          <article class="md:col-span-8 bg-surface-container-lowest p-xl rounded-3xl border border-outline-variant shadow-sm hover:shadow-md transition-all group service-card-hover relative overflow-hidden">
            <div class="flex flex-col md:flex-row gap-xl h-full">
              <div class="flex-1 space-y-md">
                <div class="icon-container w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container transition-transform duration-300"><span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">construction</span></div>
                <h3 class="font-headline-md text-headline-md text-on-surface">Youth Skills Training</h3>
                <p class="text-secondary font-body-md text-body-md leading-relaxed">Our flagship vocational program provides hands-on mastery in high-demand trades. From carpentry and electrical engineering to sustainable fashion, we equip students with the technical expertise needed to thrive in Liberia's evolving job market.</p>
                <a class="inline-flex items-center text-primary font-bold hover:underline gap-1 pt-md group" href="#">Learn more about certification <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span></a>
              </div>
              <div class="flex-1 h-64 md:h-full min-h-[200px] rounded-2xl overflow-hidden shadow-inner">
                <img class="w-full h-full object-cover" alt="Electrical training" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdxOUZKziBlskwgtyIk77doiL1bua2BRwRNrg3ayRKxYpQwP3bRO3UjuFDLApPmLBnKOHUuMrv-K6Baqn89TPNb7rPO81NbiFYI0AJmV2LA5VsJYvA-NVZHngWTVsCGgG98sVWRvw-VkqwB4VQ2RQYmLeE0RjJMZogWZuOXklbBfPeQBlzZ4BZMq9kPZR3SWf0MQMSQwUSvnX294MqdyD8c0ErdD1YcQJHzbMd-_G_XaJl9wUyJp1wdlwfIWSMI2uLfv6Wt8GJeiM"/>
              </div>
            </div>
          </article>
          <article class="md:col-span-4 bg-tertiary-container p-xl rounded-3xl shadow-sm hover:shadow-lg transition-all text-on-tertiary-container flex flex-col justify-between group service-card-hover">
            <div class="space-y-md"><div class="icon-container w-14 h-14 rounded-xl bg-on-tertiary-container text-tertiary-container flex items-center justify-center transition-transform duration-300"><span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">computer</span></div><h3 class="font-headline-md text-headline-md">Digital Literacy</h3><p class="font-body-md text-body-md opacity-90">Closing the digital divide by providing access to computer labs and training in office productivity, basic coding, and internet safety for youth across Montserrado.</p></div>
            <div class="mt-lg p-md bg-white/10 rounded-2xl backdrop-blur-md"><div class="flex justify-between items-center text-sm font-bold uppercase tracking-widest mb-2"><span>Lab Status</span><span class="text-tertiary-fixed">Active Now</span></div><div class="w-full bg-white/20 h-2 rounded-full overflow-hidden"><div class="bg-white h-full w-[85%]"></div></div></div>
          </article>
          <article v-for="service in [['groups','Leadership Coaching','Cultivating the next generation of civic leaders through ethical decision-making workshops, public speaking mentorship, and community-led project management.'],['sports_soccer','Sports Development','Promoting discipline, teamwork, and physical health through organized leagues and youth sports academies that foster community spirit and mental resilience.'],['storefront','Entrepreneurship','Turn ideas into income. We provide seed funding mentorship, business plan assistance, and micro-loan access for promising young Liberian entrepreneurs.']]" :key="service[1]" class="md:col-span-4 bg-surface-container-low p-xl rounded-3xl border border-outline-variant hover:border-primary transition-all group service-card-hover flex flex-col gap-md">
            <div class="icon-container w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container transition-transform duration-300"><span class="material-symbols-outlined text-2xl">{{ service[0] }}</span></div>
            <h3 class="font-headline-md text-headline-md text-on-surface">{{ service[1] }}</h3>
            <p class="text-secondary font-body-md text-body-md">{{ service[2] }}</p>
          </article>
        </div>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav active="Services" />
  </div>
</template>
