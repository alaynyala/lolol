export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide('nuxt-ui.locale-context', {
    locale: 'en',
    messages: {
      en: {
        // Add any translations you need here
        next: 'Next',
        previous: 'Previous'
      }
    }
  })
}) 