<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
</script>

<template>
  <div class="bg-background text-on-background font-body-md overflow-x-hidden">
    <SiteNavbar active="About" cta-container />
    <main class="relative">
      <section class="relative w-full h-[614px] flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <div class="w-full h-full bg-cover bg-center opacity-40" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6W3ZmmX9ohs55JrQJh9CctVCGfbNyHcwbdBK8uNgc2PyLK3CHxlrRHeme-MMrGAffxiUAVEwWtg-DVhqRc615z3LQ8MrkDmyktQcHa5Pr1HGfrDLHYd9SrvN-l1XchxR1MoTz65682nxFnkNorvBA23_uDQXpql40iLUwFcnxpWwERaKSy1VYKMqGht1DZiOitE6WczlRQ2Zy4KxGcaPR6H7C-GIEWvIGTeKQPh_kZc-eBuUbb8QQJDXsjJVAEuJbnOSDKs93SMU')"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        </div>
        <div class="relative z-10 text-center px-margin-mobile">
          <h1 class="font-headline-xl text-headline-xl mb-md text-on-surface">Our Legacy of <span class="text-primary">Impact</span></h1>
          <p class=" text-body-lg max-w-1xl mx-auto text-on-surface-variant">
            Bridging the gap for youth in Montserrado County since our founding, fostering a community of leaders, creators, and change-makers.
          </p>
        </div>
      </section>

      <section class="max-w-container-max-width mx-auto px-margin-mobile lg:px-margin-desktop py-2xl">
        <div class="bento-grid-about">
          <article class="bento-item-large bg-surface-container-low p-xl rounded-3xl shadow-sm border border-outline-variant group hover:shadow-lg transition-all duration-300">
            <div class="mb-lg"><span class="material-symbols-outlined text-primary text-5xl" style="font-variation-settings: 'FILL' 1;">rocket_launch</span></div>
            <h2 class="font-headline-lg text-headline-lg mb-md">Our Mission</h2>
            <p class="font-body-lg text-body-lg text-on-surface-variant">
              Empowering youth through education, leadership, sports, and vocational skills. we believe in providing the tools necessary for every young person to carve their own path to success.
            </p>
            <div class="mt-xl grid grid-cols-2 gap-md">
              <div class="bg-white p-md rounded-2xl border border-outline-variant flex items-center gap-3"><span class="material-symbols-outlined text-primary">school</span><span class="font-label-md">Education</span></div>
              <div class="bg-white p-md rounded-2xl border border-outline-variant flex items-center gap-3"><span class="material-symbols-outlined text-primary">groups</span><span class="font-label-md">Leadership</span></div>
            </div>
          </article>
          <article class="bento-item-med bg-primary-container text-on-primary-container p-xl rounded-3xl flex flex-col justify-between overflow-hidden relative">
            <div class="relative z-10">
              <h2 class="font-headline-lg text-headline-lg mb-md">Our Vision</h2>
              <p class="font-body-md text-body-md opacity-90">Building stronger communities through empowered young people. A future where every youth in Montserrado is a catalyst for positive change.</p>
            </div>
            <div class="absolute -right-10 -bottom-10 opacity-20 transform rotate-12"><span class="material-symbols-outlined text-[180px]">visibility</span></div>
          </article>
          <article class="bento-item-med bg-secondary-container p-xl rounded-3xl border border-outline-variant">
            <h2 class="font-headline-md text-headline-md mb-md text-on-secondary-container">Rooted in Purpose</h2>
            <p class="font-body-md text-body-md text-on-surface-variant">Our work is guided by four fundamental pillars that define how we interact with our students, partners, and the community.</p>
          </article>
        </div>
      </section>

      <section class="bg-surface-container-lowest py-2xl">
        <div class="max-w-container-max-width mx-auto px-margin-mobile lg:px-margin-desktop">
          <div class="text-center mb-2xl">
            <h2 class="font-headline-lg text-headline-lg text-primary mb-sm">Core Values</h2>
            <p class="font-body-md text-body-md text-on-surface-variant">The principles that drive every action we take.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
            <article v-for="value in ['Caring', 'Honesty', 'Respect', 'Responsibility']" :key="value" class="bg-white p-lg rounded-3xl border border-outline-variant shadow-sm">
              <span class="material-symbols-outlined text-primary text-4xl mb-md">favorite</span>
              <h3 class="font-headline-md text-headline-md mb-sm">{{ value }}</h3>
              <p class="font-body-md text-body-md text-on-surface-variant">A practical value shaping every program, mentorship moment, and community partnership.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
