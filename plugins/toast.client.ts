import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    timeout: 3000,
    position: POSITION.TOP_RIGHT,
  }

  nuxtApp.vueApp.use(Toast, options)
})
