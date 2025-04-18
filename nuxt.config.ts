// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  plugins: ['~/plugins/pocketbase.ts'],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@nuxt/image'
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  runtimeConfig: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    public: {
      TMDB_API_KEY: process.env.TMDB_API_KEY // Client-side access
    }
  }
})