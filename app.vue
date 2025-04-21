<template>
  <div class="app-wrapper">
    <TheNavigation />
    <NuxtPage class="page" />
    <TheFooter />
  </div>
</template>

<script setup>
import TheNavigation from './components/global/TheNavigation.vue';
import TheFooter from './components/global/TheFooter.vue';
import { gsap } from 'gsap'
import { onMounted } from 'vue'

onMounted(() => {
  // Initial page fade in
  gsap.from('.page', {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.inOut'
  })
})
</script>

<style>
body {
  font-family: 'Neue Haas Grotesk Text Pro', sans-serif;
  letter-spacing: -0.02em;
  margin:0;
  padding:0;
}

.app-wrapper {
  opacity: 1;
}

.page {
  min-height: 100vh;
  will-change: opacity;
}

/* Page Transition Classes */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
