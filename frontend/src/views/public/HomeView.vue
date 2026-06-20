<script setup>
import SiteNavbar from '../../components/stitch/SiteNavbar.vue'
import SiteFooter from '../../components/stitch/SiteFooter.vue'
import MobileBottomNav from '../../components/stitch/MobileBottomNav.vue'
</script>

<template>
  <div class="bg-background text-on-background font-body-md overflow-x-hidden">
    <SiteNavbar active="Home" />
    <main class="pt-20">
      <section class="relative min-h-[870px] flex items-center overflow-hidden">
        <div class="max-w-container-max-width mx-auto px-md lg:px-xl relative z-10 grid lg:grid-cols-2 gap-xl items-center">
          <div class="space-y-lg">
            <span class="inline-block px-4 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">Vocational & Sports Excellence</span>
            <h1 class="font-headline-xl text-headline-xl text-on-background leading-tight">
              Empowering Young Minds Through <span class="text-primary">Skills</span>, Leadership, and <span class="text-tertiary">Opportunity</span>
            </h1>
            <p class="text-body-lg font-body-lg text-on-surface-variant max-w-lg">
              We bridge the gap for the youth of Montserrado County by providing world-class vocational training and sports programs that foster professional growth and community resilience.
            </p>
            <div class="flex flex-wrap gap-md">
              <RouterLink class="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-md text-label-md font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2" to="/programs">
                Explore Programs
                <span class="material-symbols-outlined">arrow_forward</span>
              </RouterLink>
              <RouterLink class="bg-secondary text-on-secondary px-8 py-4 rounded-xl font-label-md text-label-md font-bold shadow-lg hover:shadow-xl transition-all" to="/contact">
                Contact Us
              </RouterLink>
            </div>
          </div>
          <div class="relative hidden lg:block">
            <div class="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img class="w-full h-full object-cover" alt="Youth vocational and sports programs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEQfiGsYND6w65sSiVyRfyq5HqXlprxf2GjTgkHu1BvzhSAMIMs2QwNlOClYiMVDFE19dBpXW9PikOBM_0ULI2_lzOYxQPgOP8RsBYFUtOcY7fa25p0i0RIjdpeAACAiQer7DMxuKc8MuZu4cscKYAOVD663wbHtQTIhXvSS8SmauiRb5RcnKBZTDjGTnHdEy6Kc8YrLUlHOFOOntUZHwdWrll1kegPCDpz9cKz5wzkqPZ2mxreKL281kEp7rGG1nyrePWQVDw-5Q"/>
            </div>
            <div class="absolute -bottom-8 -left-8 glass-card p-6 rounded-2xl shadow-xl max-w-[200px]">
              <div class="text-primary font-bold text-headline-md font-headline-md">50+ Years</div>
              <div class="text-on-surface-variant font-label-sm text-label-sm">Of Community Excellence in Liberia</div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-2xl bg-surface-container-low border-y border-outline-variant">
        <div class="max-w-container-max-width mx-auto px-md lg:px-xl">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-xl text-center">
            <div class="space-y-sm"><div class="text-primary font-black text-headline-xl font-headline-xl tabular-nums">2500+</div><div class="text-secondary font-label-md text-label-md uppercase tracking-widest">Youth Trained Yearly</div></div>
            <div class="space-y-sm"><div class="text-primary font-black text-headline-xl font-headline-xl tabular-nums">15</div><div class="text-secondary font-label-md text-label-md uppercase tracking-widest">Active Programs</div></div>
            <div class="space-y-sm"><div class="text-primary font-black text-headline-xl font-headline-xl tabular-nums">120</div><div class="text-secondary font-label-md text-label-md uppercase tracking-widest">Volunteer Mentors</div></div>
          </div>
        </div>
      </section>

      <section class="py-3xl max-w-container-max-width mx-auto px-md lg:px-xl">
        <div class="text-center mb-2xl space-y-md">
          <h2 class="font-headline-lg text-headline-lg text-on-background">Our Vocational Pathways</h2>
          <p class="text-body-md font-body-md text-on-surface-variant max-w-2xl mx-auto">Discover the specialized skills and sports development programs designed to ignite your future.</p>
        </div>
        <div class="bento-grid-home">
          <div class="col-span-1 md:col-span-8 group relative rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all h-[400px]">
            <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Computer training lab" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2-ImuWyC-GzfH5C6GIEF915bgUYNJbvz8IMYWBKrakUsXAhX67LzmtjcxIbNT0q3YWDD-LoSxmG7tuLM_WahnVJQS6H4RrUUV-Wy-U48nzQRdw3vkAVK4klEmNHhxkRUMQZ2aErOuGasSa0uzrxpkCSe5dk5c_Z25rPji0wK7X6CBdXc3UyjO3VDJeDwjwe2Kv-1dOdMqi292xDzN6g4AZ67LMp7-q4lGoCEeBVD_4GdNqIJw9MC2x8CLeQ6xdosWHdYY39qoSYI"/>
            <div class="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
            <div class="absolute bottom-0 p-lg text-on-primary">
              <span class="material-symbols-outlined text-4xl mb-4">computer</span>
              <h3 class="font-headline-md text-headline-md mb-2">Computer Training</h3>
              <p class="font-body-md text-body-md max-w-md opacity-90">Master coding, digital literacy, and IT support to excel in the global digital economy.</p>
            </div>
          </div>
          <div class="col-span-1 md:col-span-4 group relative rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all h-[400px]">
            <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Basketball program" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8P7Hf0ifsfVjA_7Q0fS8qqhpRyyBQDFgwXPjc_oaaq0SUlEZcrHCV21reBkv6SIqx5vlDEdRRr6KDGPOZONMoHayN-06J0-aj6cka2HoAZQ2XDTbInPc7WP68532JsGjp6AJ-JwUX0Eb-B6S46tDqVbjv8Xs6biXg36UsRxQ2ykdPRgslvdHnE9M9T4HYiIY4F4xTMbxhDrZGXshR41PH1QjFucMBJZ36IgJidq2cwESgGLoBIrTHUF9U-AyizFGZDn6Kcm8rcHg"/>
            <div class="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent"></div>
            <div class="absolute bottom-0 p-lg text-on-secondary">
              <span class="material-symbols-outlined text-4xl mb-4">sports_basketball</span>
              <h3 class="font-headline-md text-headline-md mb-2">Basketball</h3>
              <p class="font-body-md text-body-md opacity-90">Building character and teamwork on and off the court.</p>
            </div>
          </div>
          <div class="col-span-1 md:col-span-4 rounded-3xl overflow-hidden bg-tertiary-container/10 p-lg h-[300px] flex flex-col justify-end">
            <span class="material-symbols-outlined text-primary text-4xl mb-auto" style="font-variation-settings: 'FILL' 1;">groups</span>
            <h3 class="font-headline-md text-headline-md text-on-background mb-2">Leadership</h3>
            <p class="font-body-md text-body-md text-on-surface-variant">Youth leadership circles and civic engagement training.</p>
          </div>
          <div class="col-span-1 md:col-span-4 group relative rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all h-[300px]">
            <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Entrepreneurship session" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOxmEzMpcgdDsB7tDwa4WWol009dzokYlkFr4Gtw69PUC9S5IOwJOH4EHZluVBmX1IEdlEtrRc5GEgc_0B5Yf7E8SIZuS39ghTXGjdsF5C1c8iMOShmfbe6gZYTJvkGuheEr9NKyP8-2-AEGTH4Plko8Zj9epfMKR9j36d5w-cIAEPx_8hSbLJxeDXzC76YLiVfdBLt11EmlrufCj4Y8iksq7s8hIP4_-pePax_JRzkI6w22pPFSbSX6KLbY1XaqiuQxhFviYHH6s"/>
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div class="absolute inset-0 p-lg flex flex-col justify-end text-white"><h3 class="font-headline-md text-headline-md">Entrepreneurship</h3></div>
          </div>
          <div class="col-span-1 md:col-span-4 rounded-3xl overflow-hidden bg-primary-fixed p-lg h-[300px] flex flex-col justify-end">
            <span class="material-symbols-outlined text-on-primary-fixed-variant text-4xl mb-2">palette</span>
            <h3 class="font-headline-md text-headline-md text-on-primary-fixed">Creative Arts</h3>
            <p class="font-body-md text-body-md text-on-primary-fixed-variant opacity-80">Expression through traditional and modern media.</p>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
    <MobileBottomNav active="Home" />
  </div>
</template>
