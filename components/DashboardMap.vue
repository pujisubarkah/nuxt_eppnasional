<template>
  <section class="w-full max-w-7xl mx-auto px-2 md:px-6 py-6 md:py-12">
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl border-2 border-[#2196F3] p-4 md:p-6 md:p-10 flex flex-col lg:flex-row gap-4 md:gap-8 items-stretch">
      
      <!-- Bagian Utama Peta -->
      <div class="flex-1 flex flex-col">
        
        <!-- Header dengan gaya mirip file referensi -->
        <div class="mb-4 md:mb-6 text-center">
          <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#1976D2] mb-2 md:mb-3">
            PETA SEBARAN RESPONDEN
          </h1>
          <p class="text-center text-gray-700 max-w-4xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2 mb-2">
             Temukan sebaran responden alumni ASN dari seluruh Indonesia!
          </p>
          <p class="text-center text-gray-700 max-w-4xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2">
            <span class="text-[#1976D2] font-semibold">Semakin banyak responden, semakin biru provinsinya.</span>
            Peta interaktif ini menunjukkan partisipasi alumni secara nasional.
          </p>
           <!-- Garis dekoratif mirip referensi -->
          <hr class="w-1/4 h-1 bg-gradient-to-r from-blue-700 via-blue-400 to-cyan-400 mx-auto my-3 sm:my-4" />
        </div>

        <!-- Kontainer Peta -->
        <div class="relative overflow-hidden rounded-lg shadow-md border border-[#2196F3]/30 flex-1">
          <svg
            viewBox="0 0 1000 600"
            class="w-full h-auto max-h-[70vh]" 
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <!-- Gradien untuk hover state -->
              <radialGradient id="prov-hover-gradient" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stop-color="#BBDEFB" />
                <stop offset="100%" stop-color="#1976D2" />
              </radialGradient>
              <!-- Gradien untuk area tanpa data -->
              <linearGradient id="no-data-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f8fafc" />
                <stop offset="100%" stop-color="#e2e8f0" />
              </linearGradient>
            </defs>
            
            <template v-for="prov in provinsi" :key="prov.provinsiId">
              <path
                :d="cleanPath(prov.svgPath)"
                :fill="hovered?.provinsiId === prov.provinsiId ? 'url(#prov-hover-gradient)' : (prov.jumlahAlumni > 0 ? getColor(prov.jumlahAlumni) : 'url(#no-data-gradient)')"
                stroke="#1E3A8A" 
                stroke-width="0.5"
                stroke-opacity="0.3"
                @mouseenter="handleMouseEnter(prov, $event)"
                @mouseleave="handleMouseLeave"
                class="cursor-pointer transition-all duration-200 ease-in-out"
              >
                <title>{{ prov.provinsiNama }} ({{ prov.jumlahAlumni }} alumni)</title>
              </path>
            </template>
            
            <!-- Tooltip Hover - Posisi dinamis atau tetap di pojok -->
            <foreignObject 
              v-if="tooltip.visible" 
              :x="tooltip.x" 
              :y="tooltip.y" 
              width="220" 
              height="60"
              class="pointer-events-none"
            >
              <div class="bg-white/95 border border-blue-300 rounded-lg p-2 shadow-lg text-xs sm:text-sm font-semibold text-blue-800 backdrop-blur-sm">
                <div class="font-bold">{{ tooltip.text.provinsiNama }}</div>
                <div>Jumlah Alumni: {{ tooltip.text.jumlahAlumni }}</div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>

      <!-- Legend Card dengan gaya mirip -->
      <div class="w-full lg:w-64 flex flex-col bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border-2 border-[#2196F3] p-4 md:p-5 gap-3 md:gap-4 h-fit self-start transition-all duration-300 hover:shadow-xl mt-4 lg:mt-0">
        <h2 class="font-bold text-[#1976D2] text-lg md:text-xl tracking-wide text-center">LEGENDA</h2>
        <div class="space-y-2 md:space-y-3">
          <template v-for="c in colorScale" :key="c.label">
            <div class="flex items-center gap-2 md:gap-3 w-full">
              <span
                class="inline-block w-5 h-5 md:w-6 md:h-6 rounded border border-blue-200 shadow-sm flex-shrink-0"
                :style="{ backgroundColor: c.color }"
              ></span>
              <span class="text-xs sm:text-sm md:text-base text-gray-700 font-medium">{{ c.label }} responden</span>
            </div>
          </template>
          <!-- Entry khusus untuk "Tidak ada data" -->
          <div class="flex items-center gap-2 md:gap-3 w-full pt-2 border-t border-gray-200">
            <span
              class="inline-block w-5 h-5 md:w-6 md:h-6 rounded border border-gray-300 shadow-sm flex-shrink-0"
              style="background: url('#no-data-gradient');"
            ></span>
            <span class="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Tidak ada data</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const provinsi = ref([])
const hovered = ref(null)

// State untuk tooltip dinamis
const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  text: { provinsiNama: '', jumlahAlumni: 0 }
})

const colorScale = [
  { max: 10, color: '#E3F2FD', label: '0–10' },
  { max: 50, color: '#90CAF9', label: '11–50' },
  { max: 100, color: '#42A5F5', label: '51–100' },
  { max: 200, color: '#2196F3', label: '101–200' },
  { max: Infinity, color: '#1976D2', label: '201+' },
]

function getColor(count) {
  // Menangani kasus khusus 0
  if (count === 0) return 'url(#no-data-gradient)';
  
  for (const c of colorScale) {
    if (count <= c.max) return c.color
  }
  return colorScale[colorScale.length - 1].color
}

function cleanPath(path) {
  return path ? path.replace(/^"|"$/g, '') : ''
}

// Handler mouse untuk tooltip dinamis
function handleMouseEnter(provinsiItem, event) {
  hovered.value = provinsiItem;
  // Opsi 1: Tooltip mengikuti mouse
  /*
  const svg = event.currentTarget.ownerSVGElement;
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
  tooltip.value = {
    visible: true,
    x: svgP.x + 10, // Offset sedikit dari kursor
    y: svgP.y - 30,
    text: { provinsiNama: provinsiItem.provinsiNama, jumlahAlumni: provinsiItem.jumlahAlumni }
  };
  */

  // Opsi 2: Tooltip di pojok kanan atas (mirip referensi)
  tooltip.value = {
    visible: true,
    x: 770, // Sesuaikan dengan viewBox Anda
    y: 10,
    text: { provinsiNama: provinsiItem.provinsiNama, jumlahAlumni: provinsiItem.jumlahAlumni }
  };
}

function handleMouseLeave() {
  hovered.value = null;
  tooltip.value.visible = false;
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
      console.error("Unexpected data format from /api/provinsi/summary:", data);
      provinsi.value = []
    }
  } catch (error) {
    console.error("Error fetching province data:", error);
    provinsi.value = []
  }
})
</script>

<style scoped>
/* Tambahkan jika diperlukan untuk animasi atau styling tambahan */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>