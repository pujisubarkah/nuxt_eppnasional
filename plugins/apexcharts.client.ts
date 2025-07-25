import VueApexCharts from "vue3-apexcharts";
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('apexchart', VueApexCharts);
});
