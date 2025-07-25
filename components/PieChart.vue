<!-- components/PieChart.vue -->
<template>
  <div class="w-full h-96">
    <Pie ref="pieChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

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