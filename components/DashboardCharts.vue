<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
    <!-- Bar Chart Instansi -->
    <div class="bg-white/90 rounded-xl shadow flex flex-col items-center justify-center p-6 border-2 border-[#2196F3] outline-2 outline-[#2196F3]">
      <span class="text-gray-600 font-semibold mb-2">Distribusi Instansi</span>
      <BarChart :chartData="instansiChartData" :options="barOptions" />
    </div>
    <!-- Pie Chart Jenis Instansi -->
    <div class="bg-white/90 rounded-xl shadow flex flex-col items-center justify-center p-6 border-2 border-[#2196F3] outline-2 outline-[#2196F3]">
      <span class="text-gray-600 font-semibold mb-2">Distribusi Jenis Instansi</span>
      <PieChart :chartData="jenisInstansiChartData" :options="pieOptions" />
    </div>
    <!-- Bar Chart Nama Pelatihan -->
    <div class="bg-white/90 rounded-xl shadow flex flex-col items-center justify-center p-6 md:col-span-2 border-2 border-[#2196F3] outline-2 outline-[#2196F3]">
      <span class="text-gray-600 font-semibold mb-2">Distribusi Nama Pelatihan</span>
      <BarChart :chartData="pelatihanChartData" :options="barOptions" />
    </div>
  </div>
</template>

<script setup>
import BarChart from '@/components/BarChart.vue'
import PieChart from '@/components/PieChart.vue'
import { ref, onMounted, computed } from 'vue'
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  SubTitle,
  DoughnutController,
} from 'chart.js'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, ArcElement, PointElement, LineElement, Filler, SubTitle, DoughnutController)

const pieColors = ['#1976D2', '#2196F3', '#90CAF9']

const pelatihanData = ref([])
const instansiData = ref([])
const jenisInstansiData = ref([])

onMounted(async () => {
  // Pelatihan
  const pelatihanRes = await fetch('/api/alumni/summary')
  const pelatihanJson = await pelatihanRes.json()
  pelatihanData.value = pelatihanJson.map(item => ({
    name: item.pelatihan,
    jumlah: Number(item.total_alumni),
  }))

  // Instansi
  const instansiRes = await fetch('/api/instansi/summary')
  const instansiJson = await instansiRes.json()
  // Bar chart: instansiNama
  const instansiAgg = {}
  instansiJson.forEach(item => {
    instansiAgg[item.instansiNama] = (instansiAgg[item.instansiNama] || 0) + item.jumlahAlumni
  })
  instansiData.value = Object.entries(instansiAgg)
    .map(([name, jumlah]) => ({ name, jumlah }))
    .sort((a, b) => b.jumlah - a.jumlah)
  // Pie chart: kategoriNama
  const kategoriAgg = {}
  instansiJson.forEach(item => {
    kategoriAgg[item.kategoriNama] = (kategoriAgg[item.kategoriNama] || 0) + item.jumlahAlumni
  })
  jenisInstansiData.value = Object.entries(kategoriAgg).map(([name, value]) => ({ name, value }))
})

const instansiChartData = computed(() => ({
  labels: instansiData.value.map(d => d.name),
  datasets: [
    {
      label: 'Jumlah',
      data: instansiData.value.map(d => d.jumlah),
      backgroundColor: '#1976D2',
    },
  ],
}))

const jenisInstansiChartData = computed(() => ({
  labels: jenisInstansiData.value.map(d => d.name),
  datasets: [
    {
      label: 'Jenis Instansi',
      data: jenisInstansiData.value.map(d => d.value),
      backgroundColor: pieColors,
    },
  ],
}))

const pelatihanChartData = computed(() => ({
  labels: pelatihanData.value.map(d => d.name),
  datasets: [
    {
      label: 'Jumlah',
      data: pelatihanData.value.map(d => d.jumlah),
      backgroundColor: '#1976D2',
    },
  ],
}))

const barOptions = {
  responsive: true,
  indexAxis: 'y',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: { beginAtZero: true },
    y: { beginAtZero: true },
  },
}

const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: { enabled: true },
  },
}
</script>
