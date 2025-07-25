<template>
  <section class="w-full max-w-7xl mx-auto px-2 md:px-6 py-6 md:py-12">
    <div class="bg-gradient-to-br from-[#E3F2FD] via-white to-[#BBDEFB] rounded-2xl md:rounded-3xl shadow-xl border-2 border-[#2196F3] outline-2 outline-[#2196F3] p-3 md:p-10 flex flex-col lg:flex-row gap-4 md:gap-8 items-stretch backdrop-blur-sm">
      <!-- Bagian Utama Peta -->
      <div class="flex-1 flex flex-col items-center justify-center">
        <h1 class="text-2xl md:text-5xl font-extrabold mb-2 md:mb-4 tracking-wide text-center drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-[#1976D2] via-[#2196F3] to-[#29B6F6]">
          PETA SEBARAN RESPONDEN
        </h1>
        <p class="text-center mb-4 md:mb-6 text-base md:text-xl font-medium text-[#1976D2] bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl shadow px-3 md:px-6 py-2 md:py-3 mx-auto max-w-full md:max-w-3xl transition-all duration-300 hover:shadow-md">
          Temukan sebaran responden alumni ASN dari seluruh Indonesia!
          <br class="hidden md:block" />
          <span class="text-[#2196F3] font-bold">Semakin banyak responden, semakin biru provinsinya.</span>
          <br />
          <span class="text-[#29B6F6]">Peta interaktif ini menunjukkan partisipasi alumni secara nasional.</span>
        </p>
        <div class="w-full flex flex-col justify-center items-center relative">
          <div v-if="hovered" class="absolute z-10 left-1/2 -translate-x-1/2 -top-2 text-sm md:text-base font-semibold text-[#1976D2] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-2 md:px-4 py-1 border border-[#B3E5FC] animate-fadeIn transition-all duration-300 pointer-events-none whitespace-nowrap">
            <span class="font-bold drop-shadow">{{ hovered.provinsiNama }}</span>
            <span class="text-gray-700 font-normal">({{ hovered.jumlahAlumni }} alumni)</span>
          </div>
          <svg
            viewBox="0 0 1000 600"
            class="w-full h-[18rem] sm:h-[28rem] md:h-[48rem] lg:h-[60rem] object-contain transition-all duration-300"
          >
            <template v-for="prov in provinsi" :key="prov.provinsiId">
              <path
                :d="cleanPath(prov.svgPath)"
                :fill="getColor(prov.jumlahAlumni)"
                :fill-opacity="0.85"
                stroke="#FFD700"
                :stroke-width="0.4"
                @mouseenter="hovered = prov"
                @mouseleave="hovered = null"
                :style="{
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease-in-out',
                  opacity: hovered?.provinsiId === prov.provinsiId ? 1 : 0.85,
                }"
              />
            </template>
          </svg>
        </div>
      </div>
      <!-- Legend Card -->
      <div class="w-full lg:w-64 flex flex-col items-start justify-start bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border-2 border-[#2196F3] outline-2 outline-[#2196F3] p-3 md:p-5 gap-2 md:gap-4 h-fit self-start mt-4 md:mt-0 transition-all duration-300 hover:shadow-xl">
        <h2 class="font-bold text-[#1976D2] text-lg md:text-xl tracking-wide">Legenda</h2>
        <template v-for="c in colorScale" :key="c.label">
          <div class="flex items-center gap-2 md:gap-3 w-full">
            <span
              class="inline-block w-6 h-6 md:w-7 md:h-7 rounded-md border border-[#FFD700] shadow-sm"
              :style="{ backgroundColor: c.color }"
            ></span>
            <span class="text-sm md:text-base text-gray-700 font-medium">{{ c.label }} responden</span>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const provinsi = ref([])
const hovered = ref(null)

const colorScale = [
  { max: 10, color: '#E3F2FD', label: '0–10' },
  { max: 50, color: '#90CAF9', label: '11–50' },
  { max: 100, color: '#42A5F5', label: '51–100' },
  { max: 200, color: '#2196F3', label: '101–200' },
  { max: 1000, color: '#1976D2', label: '201+' },
]

function getColor(count) {
  for (const c of colorScale) {
    if (count <= c.max) return c.color
  }
  return colorScale[colorScale.length - 1].color
}

function cleanPath(path) {
  return path.replace(/^"|"$/g, '')
}

onMounted(async () => {
  try {
    const res = await fetch('/api/provinsi/summary')
    let data = await res.json()
    if (Array.isArray(data)) {
      provinsi.value = data
    } else if (Array.isArray(data?.result)) {
      provinsi.value = data.result
    } else {
      provinsi.value = []
    }
  } catch {
    provinsi.value = []
  }
})
</script>
