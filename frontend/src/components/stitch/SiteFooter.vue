<template>
  <footer class="bg-surface-container-highest w-full py-2xl px-md border-t border-outline-variant">
    <div class="max-w-container-max-width mx-auto grid grid-cols-1 md:grid-cols-3 gap-lg">
      <div class="space-y-md">
        <div class="font-label-md text-label-md font-bold text-primary">YMCA CVSP 2026</div>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-xs">
          Children’s Vacation Sports Program at YMCA Crown Hill, Broad Street, Monrovia.
        </p>
        <div class="flex gap-md">
          <a class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="https://www.facebook.com/share/1E6Ti8zMaC/" target="_blank" rel="noopener noreferrer" aria-label="Facebook page">
            <span class="material-symbols-outlined text-xl">share</span>
          </a>
          <a class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="mailto:cvsp@montserradoymca.org" aria-label="Email CVSP">
            <span class="material-symbols-outlined text-xl">alternate_email</span>
          </a>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-md">
        <div class="flex flex-col gap-sm">
          <span class="font-label-md text-label-md font-bold text-on-surface mb-2">Quick Links</span>
          <RouterLink class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" to="/about">About CVSP</RouterLink>
          <RouterLink class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" to="/faq">FAQ</RouterLink>
          <RouterLink class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" to="/track">Track Submission</RouterLink>
          <RouterLink class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" to="/admin">Staff Login</RouterLink>
        </div>
        <div class="flex flex-col gap-sm">
          <span class="font-label-md text-label-md font-bold text-on-surface mb-2">CVSP</span>
          <RouterLink class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" to="/activities">Activities</RouterLink>
          <RouterLink class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" to="/skills">Skills Development</RouterLink>
          <RouterLink class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" to="/gallery">Gallery</RouterLink>
          <RouterLink class="text-on-surface-variant hover:text-primary transition-all font-label-sm text-label-sm" to="/contact">Contact</RouterLink>
        </div>
      </div>
      <div class="space-y-md">
        <span class="font-label-md text-label-md font-bold text-on-surface">Location</span>
        <p class="text-on-surface-variant font-body-md text-body-md">YMCA Crown Hill, Broad Street, Monrovia</p>
      </div>
    </div>
    <div class="max-w-container-max-width mx-auto mt-xl pt-lg border-t border-outline-variant text-center md:text-left">
      <p class="font-label-sm text-label-sm text-on-surface-variant opacity-70">
        © 2026 YMCA Children’s Vacation Sports Program.
      </p>
    </div>
  </footer>
</template>
