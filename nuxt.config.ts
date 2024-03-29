// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  css: ["@/assets/global.css"],
  nitro: {
    preset: 'vercel-edge',
  },
});
