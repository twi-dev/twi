import {defineNuxtConfig} from "nuxt/config"

import {serverAddress} from "./lib/utils/serverAddress.js"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: process.env.NODE_ENV !== "production"
  },
  experimental: {
    asyncContext: true,
    headNext: true
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "@vueuse/nuxt",
    "nuxt-svgo"
  ],
  tailwindcss: {
    exposeConfig: true
  },
  auth: {
    origin: new URL(serverAddress).origin
  },
  build: {
    transpile: ["trpc-nuxt", "next-auth/providers/credentials"]
  },

  // Enable desorators support thought nitro config, so we can use mikro-orm entity decorators
  // Note that esbuild does not support emitDecoratorMetadata option
  nitro: {
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true
          }
        }
      }
    }
  }
})
