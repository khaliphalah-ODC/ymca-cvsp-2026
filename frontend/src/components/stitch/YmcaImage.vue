<script setup>
import { ymcaImages } from '../../utils/ymcaImages'

defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: 'YMCA CVSP 2026 program image' },
  imageClass: { type: String, default: '' },
  wrapperClass: { type: String, default: '' },
})
</script>

<template>
  <div :class="['relative overflow-hidden bg-surface-container-low', wrapperClass]">
    <img
      :alt="alt"
      :class="['h-full w-full object-cover transition-transform duration-700 group-hover:scale-105', imageClass]"
      :src="src || ymcaImages.logo"
      loading="lazy"
    />
  </div>
</template>
