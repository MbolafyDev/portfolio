// nuxt.config.ts
import { fileURLToPath } from "node:url"
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // ✅ force Nuxt à considérer la racine du projet comme source
  srcDir: '.',

  pages: true,

  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    adminBypassPassword: process.env.ADMIN_BYPASS_PASSWORD || "",
    // public: {} // rien à exposer ici
  },
  alias: {
    "~": fileURLToPath(new URL("./", import.meta.url)),
    "@": fileURLToPath(new URL("./", import.meta.url)),
  },
})