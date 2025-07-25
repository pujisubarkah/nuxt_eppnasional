<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
    <!-- Bar Chart Instansi -->
    <div class="bg-white/90 rounded-xl shadow flex flex-col items-center justify-center p-6 border-2 border-[#2196F3] outline-2 outline-[#2196F3]">
      <span class="text-gray-600 font-semibold mb-2">Distribusi Instansi</span>
      <div class="w-full h-96">
        <BarChart :data="instansiBarData" :options="barOptions" />
      </div>
    </div>
    
    <!-- Pie Chart Jenis Instansi -->
    <div class="bg-white/90 rounded-xl shadow flex flex-col items-center justify-center p-6 border-2 border-[#2196F3] outline-2 outline-[#2196F3]">
      <span class="text-gray-600 font-semibold mb-2">Distribusi Jenis Instansi</span>
      <div class="w-full h-96">
        <PieChart :data="jenisPieData" :options="pieOptions" />
      </div>
    </div>
    
    <!-- Bar Chart Nama Pelatihan -->
    <div class="bg-white/90 rounded-xl shadow flex flex-col items-center justify-center p-6 md:col-span-2 border-2 border-[#2196F3] outline-2 outline-[#2196F3]">
      <span class="text-gray-600 font-semibold mb-2">Distribusi Nama Pelatihan</span>
      <div class="w-full h-96">
        <BarChart :data="pelatihanBarData" :options="barOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue' // Buat komponen ini juga

const pelatihanData = ref([])
const instansiData = ref([])
const jenisInstansiData = ref([])

const barColors = [
  '#1976D2', '#2196F3', '#64B5F6', '#90CAF9', '#BBDEFB', '#0D47A1', '#1565C0', '#1E88E5', '#42A5F5', '#82B1FF'
]

// Data refs
const instansiBarData = ref({
  labels: [],
  datasets: []
})

const pelatihanBarData = ref({
  labels: [],
  datasets: []
})

const jenisPieData = ref({
  labels: [],
  datasets: []
})

const barOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  scales: {
    x: { beginAtZero: true },
    y: { beginAtZero: true }
  }
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: false }
  }
}

// Fetch data
const fetchData = async () => {
  try {
    // Pelatihan Data
    const pelatihanRes = await fetch('/api/alumni/summary')
    const pelatihanJson = await pelatihanRes.json()
    pelatihanData.value = pelatihanJson.map(item => ({
      name: item.pelatihan,
      jumlah: Number(item.total_alumni)
    }))
    
    pelatihanBarData.value = {
      labels: pelatihanData.value.map(d => d.name),
      datasets: [{
        label: 'Jumlah Alumni',
        data: pelatihanData.value.map(d => d.jumlah),
        backgroundColor: barColors
      }]
    }

    // Instansi Data
    const instansiRes = await fetch('/api/instansi/summary')
    const instansiJson = await instansiRes.json()
    
    const instansiAgg = {}
    instansiJson.forEach(item => {
      instansiAgg[item.instansiNama] = (instansiAgg[item.instansiNama] || 0) + item.jumlahAlumni
    })
    
    instansiData.value = Object.entries(instansiAgg)
      .map(([name, jumlah]) => ({ name, jumlah }))
      .sort((a, b) => b.jumlah - a.jumlah)
    
    instansiBarData.value = {
      labels: instansiData.value.map(d => d.name),
      datasets: [{
        label: 'Jumlah Alumni',
        data: instansiData.value.map(d => d.jumlah),
        backgroundColor: barColors
      }]
    }

    // Pie chart: kategoriNama
    const kategoriAgg = {}
    instansiJson.forEach(item => {
      kategoriAgg[item.kategoriNama] = (kategoriAgg[item.kategoriNama] || 0) + item.jumlahAlumni
    })
    
    jenisInstansiData.value = Object.entries(kategoriAgg).map(([name, value]) => ({ name, value }))
    
    jenisPieData.value = {
      labels: jenisInstansiData.value.map(d => d.name),
      datasets: [{
        data: jenisInstansiData.value.map(d => d.value),
        backgroundColor: barColors
      }]
    }
    
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>