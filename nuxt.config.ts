import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  css: ['./app/assets/css/main.css'],
  runtimeConfig: {
    public: {
      brandfetchApiKey: '',
      brandfetchApiUrl: 'https://api.brandfetch.io/v2/brands'
    }
  },
  vite: {
    plugins: [ tailwindcss()]
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
  }
})