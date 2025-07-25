<template>
  <div class="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 mt-24">
    <!-- Hero Section -->
    <section class="w-full max-w-5xl mx-auto mt-12 mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Card Alumni -->
      <div class="bg-white/90 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center border-2 border-[#2196F3] outline-2 outline-[#2196F3] hover:shadow-2xl transition-all duration-300">
        <img src="/alumni.png" alt="Alumni" width="100" height="100" class="mb-4 drop-shadow-lg" />
        <h2 class="text-2xl font-bold text-[#1976D2] mb-2">Survei Alumni</h2>
        <p class="text-gray-700 mb-4">Survei ini khusus untuk alumni pelatihan LAN RI tahun 2021–2024. Silakan isi jika Anda adalah alumni pelatihan tersebut.</p>
        <NuxtLink to="/alumni/profile" class="inline-block bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-3 rounded-xl shadow-lg hover:from-[#1976D2] hover:to-[#2196F3] font-bold text-lg tracking-wide transition">
          Isi Survei Alumni
        </NuxtLink>
      </div>
      <!-- Card Atasan/Rekan/Bawahan -->
      <div class="bg-white/90 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center border-2 border-[#2196F3] outline-2 outline-[#2196F3] hover:shadow-2xl transition-all duration-300">
        <img src="/atasan.png" alt="Atasan/Rekan/Bawahan" width="100" height="100" class="mb-4 drop-shadow-lg" />
        <h2 class="text-2xl font-bold text-[#1976D2] mb-2">Survei Atasan/Rekan/Bawahan</h2>
        <p class="text-gray-700 mb-4">Survei ini untuk atasan, rekan kerja, atau bawahan alumni pelatihan LAN RI tahun 2021–2024. Silakan isi jika Anda ingin menilai alumni.</p>
        <NuxtLink to="/review/profile" class="inline-block bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-3 rounded-xl shadow-lg hover:from-[#1976D2] hover:to-[#2196F3] font-bold text-lg tracking-wide transition">
          Isi Survei Atasan/Rekan/Bawahan
        </NuxtLink>
      </div>
    </section>

    <!-- Info Cards Section -->
    <section class="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div class="bg-white/90 rounded-2xl shadow-lg border-2 border-[#2196F3] outline-2 outline-[#2196F3] p-8 flex flex-col items-center text-center">
        <img src="/file.svg" alt="File" width="48" height="48" class="mb-4" />
        <h3 class="text-xl font-bold text-[#1976D2] mb-2">Mudah & Cepat</h3>
        <p class="text-gray-600">Pengisian survei hanya membutuhkan waktu 3-5 menit. Prosesnya praktis dan responsif di semua perangkat.</p>
      </div>
      <div class="bg-white/90 rounded-2xl shadow-lg border-2 border-[#2196F3] outline-2 outline-[#2196F3] p-8 flex flex-col items-center text-center">
        <img src="/globe.svg" alt="Globe" width="48" height="48" class="mb-4" />
        <h3 class="text-xl font-bold text-[#1976D2] mb-2">Nasional & Terintegrasi</h3>
        <p class="text-gray-600">Survei ini diikuti oleh alumni ASN dari seluruh Indonesia, terintegrasi dengan sistem LAN RI.</p>
      </div>
      <div class="bg-white/90 rounded-2xl shadow-lg border-2 border-[#2196F3] outline-2 outline-[#2196F3] p-8 flex flex-col items-center text-center">
        <img src="/window.svg" alt="Window" width="48" height="48" class="mb-4" />
        <h3 class="text-xl font-bold text-[#1976D2] mb-2">Privasi Terjaga</h3>
        <p class="text-gray-600">Data dan jawaban Anda dijamin kerahasiaannya, hanya digunakan untuk keperluan evaluasi dan pengembangan pelatihan.</p>
      </div>
    </section>

    <!-- Dashboard Section -->
    <section class="w-full max-w-6xl mx-auto mb-16">
      <DashboardSummaryCard />
      <DashboardMap />
      <DashboardCharts />
    </section>
  </div>
</template>

<script setup>
import DashboardSummaryCard from '@/components/DashboardSummaryCard.vue'
import DashboardMap from '@/components/DashboardMap.vue'
import DashboardCharts from '@/components/DashboardCharts.vue'
</script>
