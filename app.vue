<template>
  <div class="app-wrapper">
    <TheNavigation />
    <NuxtErrorBoundary>
      <div class="page-container">
        <NuxtPage />
      </div>
      <template #error="{ error }">
        <div class="error-container">
          <p>An error occurred: {{ error }}</p>
          <button @click="error.value = null">Try again</button>
        </div>
      </template>
    </NuxtErrorBoundary>
    <TheFooter />
  </div>
</template>

<script setup>
import TheNavigation from './components/global/TheNavigation.vue';
import TheFooter from './components/global/TheFooter.vue';
import { gsap } from 'gsap'
import { onMounted } from 'vue'

// Set HTML language attribute
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'stylesheet',
      href: 'https://use.typekit.net/poc4zee.css' 
    }
  ]
})

onMounted(() => {
  console.log('App mounted')
  // Initial page fade in
  gsap.from('.page-container', {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.inOut'
  })
})
</script>

<style>
body {
  font-family: 'neue-haas-grotesk-display', sans-serif;
  letter-spacing:0em;
  margin:0;
  padding:0;
}



.app-wrapper {
  opacity: 1;
  width: 100%;
  margin: 0;
  padding: 0;
}

.page-container {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  will-change: opacity;
}

.error-container {
  padding: 2rem;
  text-align: center;
}

.error-container button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid currentColor;
  background: transparent;
  cursor: pointer;
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
