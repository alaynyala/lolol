// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui','@nuxt/content', '@nuxt/fonts', '@nuxt/image'],

  content: {
    experimental: {
      nativeSqlite: false
    },
    documentDriven: true,
    markdown: {
      anchorLinks: false
    }
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
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  nitro: {
    preset: 'vercel',
  },

  routeRules: {
    '/**': { ssr: true }
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: false
  },

  typescript: {
    strict: true
  },

  compatibilityDate: '2024-04-03'
})
