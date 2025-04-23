// Register components for use in markdown content
import { defineNuxtPlugin } from '#app'
import CloudflareStream from '~/components/CloudflareStream.vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Register CloudflareStream component globally
  nuxtApp.vueApp.component('CloudflareStream', CloudflareStream)
  
  // Create a shorter alias for convenience in markdown
  nuxtApp.vueApp.component('CFVideo', CloudflareStream)
}) 