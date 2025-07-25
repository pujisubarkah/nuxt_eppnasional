<!-- components/BarChart.vue -->
<template>
  <div class="w-full h-96">
    <Bar ref="barChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const chartData = computed(() => props.data)
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  ...props.options
}))
</script>