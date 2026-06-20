<template>
  <footer class="bg-surface-container-highest w-full py-2xl px-md border-t border-outline-variant">
    <div class="max-w-container-max-width mx-auto grid grid-cols-1 md:grid-cols-3 gap-lg">
      <div class="space-y-md">
        <div class="font-label-md text-label-md font-bold text-primary">Montserrado County YMCA</div>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-xs">
          Empowering youth through vocational training, leadership, and community development since 1920.
        </p>
        <div class="flex gap-md">
          <a class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#" aria-label="Social profile">
            <span class="material-symbols-outlined text-xl">share</span>
          </a>
          <a class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#" aria-label="Email">
            <span class="material-symbols-outlined text-xl">alternate_email</span>
          </a>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-md">
        <div class="flex flex-col gap-sm">
          <span class="font-label-md text-label-md font-bold text-on-surface mb-2">Quick Links</span>
          <a class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" href="#">Privacy Policy</a>
          <a class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" href="#">Terms of Service</a>
          <a class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" href="#">FAQ</a>
          <RouterLink class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" to="/admin">Staff Login</RouterLink>
        </div>
        <div class="flex flex-col gap-sm">
          <span class="font-label-md text-label-md font-bold text-on-surface mb-2">Programs</span>
          <a class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" href="#">Skill Centers</a>
          <a class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" href="#">Workshops</a>
          <a class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" href="#">Internships</a>
          <a class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" href="#">Mentorship</a>
        </div>
      </div>
      <div class="space-y-md">
        <span class="font-label-md text-label-md font-bold text-on-surface">Stay Updated</span>
        <p class="text-on-surface-variant font-body-md text-body-md">Get the latest news on program openings and events.</p>
        <form class="flex gap-sm" aria-label="Newsletter signup">
          <input class="flex-1 bg-white border border-outline-variant rounded-lg px-md py-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Email address" type="email" aria-label="Email address"/>
          <button class="bg-primary text-white p-sm rounded-lg hover:opacity-90" type="submit" aria-label="Subscribe">
            <span class="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
    <div class="max-w-container-max-width mx-auto mt-xl pt-lg border-t border-outline-variant text-center md:text-left">
      <p class="font-label-sm text-label-sm text-on-surface-variant opacity-70">
        © 2024 Montserrado County YMCA. Bridging the gap for youth.
      </p>
    </div>
  </footer>
</template>
