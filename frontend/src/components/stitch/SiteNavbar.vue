<script setup>
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSiteContentStore } from '../../stores/siteContent'

const props = defineProps({
  active: { type: String, default: '' },
  contactIcon: { type: Boolean, default: false },
  contained: { type: Boolean, default: false },
  ctaContainer: { type: Boolean, default: false },
})


const route = useRoute()
const store = useSiteContentStore()
const open = ref(false)
const activeLabel = computed(() => props.active || store.navItems.find((item) => item.to === route.path)?.label || 'Home')
</script>

<template>
  <header :class="['bg-background shadow-sm sticky top-0 z-50 w-full', contained ? 'h-20 flex justify-between items-center px-md lg:px-xl max-w-container-max-width mx-auto' : '']">
    <nav v-if="!contained" class="flex justify-between items-center px-md lg:px-xl h-20 w-full max-w-container-max-width mx-auto" aria-label="Primary navigation">
      <RouterLink to="/" class="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
        <span v-if="contactIcon" class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">account_balance</span>
        <span>Montserrado YMCA</span>
      </RouterLink>
      <div class="hidden md:flex items-center gap-xl">
        <RouterLink
          v-for="item in store.navItems"
          :key="item.to"
          :to="item.to"
          :class="item.label === activeLabel ? 'text-primary border-b-2 border-primary font-bold pb-1 font-label-md text-label-md' : 'text-secondary hover:text-primary transition-colors font-label-md text-label-md'"
        >
          {{ item.label }}
        </RouterLink>
      </div>
      <RouterLink :class="ctaContainer ? 'bg-primary-container text-on-primary-container px-lg py-sm rounded-full font-bold hover:opacity-90 transition-all scale-95 duration-150 ease-in-out' : 'bg-primary text-on-primary px-lg py-sm rounded-full font-label-md text-label-md hover:opacity-90 transition-all scale-95 duration-150 ease-in-out'" to="/programs">
        Get Involved
      </RouterLink>
      <button class="md:hidden text-primary" type="button" aria-label="Open navigation menu" @click="open = !open">
        <span class="material-symbols-outlined text-3xl">menu</span>
      </button>
    </nav>

    <template v-else>
      <RouterLink to="/" class="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
        <span v-if="contactIcon" class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">account_balance</span>
        <span>Montserrado YMCA</span>
      </RouterLink>
      <nav class="hidden md:flex items-center gap-xl" aria-label="Primary navigation">
        <RouterLink
          v-for="item in store.navItems"
          :key="item.to"
          :to="item.to"
          :class="item.label === activeLabel ? 'text-primary border-b-2 border-primary font-bold pb-1 font-label-md text-label-md' : 'text-secondary hover:text-primary transition-colors font-label-md text-label-md'"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="hidden lg:block">
        <RouterLink class="bg-primary text-on-primary px-xl py-sm rounded-lg font-bold hover:scale-95 transition-transform duration-150 ease-in-out font-label-md text-label-md" to="/programs">Get Involved</RouterLink>
      </div>
      <button class="md:hidden text-primary" type="button" aria-label="Open navigation menu" @click="open = !open">
        <span class="material-symbols-outlined text-3xl">menu</span>
      </button>
    </template>

    <div v-if="open" class="md:hidden bg-background border-t border-outline-variant px-md py-md space-y-sm">
      <RouterLink v-for="item in store.navItems" :key="item.to" :to="item.to" class="block py-sm text-secondary font-label-md" @click="open = false">
        {{ item.label }}
      </RouterLink>
    </div>
  </header>
</template>
