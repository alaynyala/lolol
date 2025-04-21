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
    preset: 'vercel',
    routeRules: {
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000' } }
    }
  },

  future: {
    compatibilityVersion: 4,
  },

  ssr: true,
  
  experimental: {
    payloadExtraction: false
  },

  compatibilityDate: '2024-04-03'
})
