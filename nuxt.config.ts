// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: process.env.NODE_ENV !== "production"
  },
  imports: {
    autoImport: false
  },
  modules: [
    "@nuxtjs/tailwindcss"
  ],
  tailwindcss: {
    exposeConfig: true
  },
  build: {
    transpile: ["trpc-nuxt"]
  }
})
