<script setup>
defineProps({
  program: { type: Object, required: true },
})
</script>

<template>
  <article class="group bg-white rounded-xl overflow-hidden program-card-shadow flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl">
    <div class="h-48 w-full relative">
      <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" :alt="program.title" :src="program.image" loading="lazy" />
      <span :class="['absolute top-4 right-4 font-label-sm text-label-sm px-sm py-xs rounded-lg', program.tagClass]">{{ program.tag }}</span>
    </div>
    <div class="p-lg flex flex-col flex-grow">
      <h3 class="font-headline-md text-headline-md text-primary mb-xs">{{ program.title }}</h3>
      <p class="font-body-md text-body-md text-secondary flex-grow mb-md">{{ program.description }}</p>
      <div class="space-y-sm">
        <div class="flex items-center gap-xs text-on-surface-variant">
          <span class="material-symbols-outlined text-[20px]">schedule</span>
          <span class="font-label-md text-label-md">{{ program.duration }}</span>
        </div>
        <div class="flex items-center gap-xs text-on-surface-variant">
          <span class="material-symbols-outlined text-[20px]">group</span>
          <span class="font-label-md text-label-md">{{ program.ages }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
