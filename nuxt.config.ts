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
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  nitro: {
    preset: 'vercel-edge',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
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
