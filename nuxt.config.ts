// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image'
  ],

  content: {
    experimental: {
      nativeSqlite: false
    },
    // Just enable rehype-raw to allow HTML in markdown
    markdown: {
      rehypePlugins: [
        'rehype-raw'
      ]
    }
  },

  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons'],
    notifications: {
      position: 'top-right'
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  nitro: {
    preset: 'vercel'
  },

  compatibilityDate: '2025-04-21'
})