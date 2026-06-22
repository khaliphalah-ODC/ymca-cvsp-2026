<script setup>
defineProps({
  active: { type: String, default: 'Home' },
})
</script>

<template>
  <nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface shadow-lg rounded-t-xl border-t border-outline-variant" aria-label="Mobile navigation">
    <RouterLink :class="active === 'Home' ? 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-2' : 'flex flex-col items-center justify-center text-on-surface-variant'" to="/">
      <span class="material-symbols-outlined">home</span>
      <span class="font-label-sm text-label-sm">Home</span>
    </RouterLink>
    <RouterLink :class="active === 'Activities' ? 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-2' : 'flex flex-col items-center justify-center text-on-surface-variant'" to="/activities">
      <span class="material-symbols-outlined">history</span>
      <span class="font-label-sm text-label-sm">Activities</span>
    </RouterLink>
    <RouterLink :class="active === 'Skills' ? 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-2' : 'flex flex-col items-center justify-center text-on-surface-variant'" to="/skills">
      <span class="material-symbols-outlined">info</span>
      <span class="font-label-sm text-label-sm">Skills</span>
    </RouterLink>
    <RouterLink :class="active === 'Track' ? 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-2' : 'flex flex-col items-center justify-center text-on-surface-variant'" to="/track">
      <span class="material-symbols-outlined">search</span>
      <span class="font-label-sm text-label-sm">Track</span>
    </RouterLink>
  </nav>
</template>
