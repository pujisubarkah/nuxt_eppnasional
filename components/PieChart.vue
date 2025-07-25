<template>
  <div>
    <Chart :type="'pie'" :data="chartData" :options="options" />
  </div>
</template>

<script setup>
import { Chart } from 'vue-chartjs'
defineProps({
  chartData: { type: Object, required: true },
  options: { type: Object, required: true },
})
</script>
