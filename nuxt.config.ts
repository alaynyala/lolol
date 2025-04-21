// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui','@nuxt/content', '@nuxt/fonts', '@nuxt/image'],

  content: {
    experimental: {
      nativeSqlite: true
    },
  },

  ui: {
    global: true,
    icons: ['heroicons'],
    notifications: {
      position: 'top-right'
    },
    primary: 'black',
    colors: {
      primary: 'black'
    }
  },

  app: {
    defaultLocale: 'en'
  },

  compatibilityDate: '2025-04-11'
})