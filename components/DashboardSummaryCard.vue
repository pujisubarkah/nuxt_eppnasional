
<template>
  <div class="grid grid-cols-1 md:grid-cols-6 gap-6 mb-10">
    <!-- Tahun Pelatihan Card -->
    <div v-for="tahun in tahunList" :key="tahun" class="bg-white rounded-xl shadow flex flex-col items-center justify-center p-6 border-2 border-[#2196F3]/40 outline-2 outline-[#2196F3] hover:border-[#1976D2] transition">
      <CalendarDays class="w-8 h-8 text-[#1976D2] mb-2" />
      <div class="text-2xl font-bold text-[#1976D2]">
        {{ summary?.tahunPelatihan?.[tahun] ?? 0 }}
      </div>
      <div class="text-gray-700 text-sm text-center font-semibold mt-2">
        Total Responden<br />Pelatihan Tahun {{ tahun }}
      </div>
    </div>
    <!-- Total Responden Keseluruhan -->
    <div class="bg-white rounded-xl shadow flex flex-col items-center justify-center p-6 border-2 border-[#2196F3]/40 outline-2 outline-[#2196F3] hover:border-[#1976D2] transition">
      <Users class="w-8 h-8 text-[#1976D2] mb-2" />
      <div class="text-2xl font-bold text-[#1976D2]">
        {{ summary?.totalResponden ?? 0 }}
      </div>
      <div class="text-gray-700 text-sm text-center font-semibold mt-2">
        Total Responden<br />Keseluruhan
      </div>
    </div>
    <!-- Total Instansi -->
    <div class="bg-white rounded-xl shadow flex flex-col items-center justify-center p-6 border-2 border-[#2196F3]/40 outline-2 outline-[#2196F3] hover:border-[#1976D2] transition">
      <Building2 class="w-8 h-8 text-[#1976D2] mb-2" />
      <div class="text-2xl font-bold text-[#1976D2]">
        {{ summary?.totalInstansi ?? 0 }}
      </div>
      <div class="text-gray-700 text-sm text-center font-semibold mt-2">
        Total Instansi
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CalendarDays, Users, Building2 } from 'lucide-vue-next'

const summary = ref(null)
const tahunList = ['2021', '2022', '2023', '2024']

onMounted(async () => {
  const res = await fetch('/api/summarycard')
  const data = await res.json()
  summary.value = data.summary
})
</script>
