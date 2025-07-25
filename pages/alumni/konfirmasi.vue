<template>
  <div>
    <div v-if="showPopup" class="fixed inset-0 z-50 flex items-center justify-center" style="background: transparent">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center border-2 border-[#B3E5FC] animate-fadeIn" style="box-shadow: 0 8px 32px 0 rgba(33,150,243,0.15)">
        <div class="flex gap-2 mb-4">
          <!-- SVG icons -->
          <span class="text-[#1976D2]">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#E3F2FD"/><path d="M8 12l2 2 4-4" stroke="#1976D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <span class="text-[#2196F3]">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#C2E7F6"/><path d="M12 8v4l3 3" stroke="#2196F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <span class="text-[#43A047]">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#C8E6C9"/><path d="M9 12l2 2 4-4" stroke="#43A047" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <h3 class="text-xl font-bold text-[#1976D2] mb-2 text-center">Terima Kasih {{ nama }}</h3>
        <p class="text-[#1976D2] text-center mb-4">Telah mengisi survei yang telah kami lakukan.<br/>Masukan Anda sangat berarti bagi perbaikan pelatihan ke depan.</p>
        <button class="mt-2 px-6 py-2 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white rounded-xl font-bold shadow hover:scale-105 transition" @click="showPopup = false">Tutup</button>
      </div>
    </div>
    <div class="max-w-xl mx-auto mt-24 bg-gradient-to-br from-[#E3F2FD] to-[#F8FAFB] rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 md:space-y-8 border border-[#B3E5FC]">
      <h2 class="text-xl md:text-2xl font-extrabold text-[#1976D2] mb-2 text-center tracking-wide drop-shadow">Pernyataan Konfirmasi</h2>
      <div class="bg-white rounded-xl border border-[#B3E5FC] shadow p-4 md:p-6 mb-4 md:mb-6">
        <p class="text-[#1976D2] font-medium text-sm md:text-base mb-2 md:mb-4">
          Dengan ini, saya menyatakan bahwa seluruh jawaban yang saya berikan dalam formulir ini benar berdasarkan pengalaman dan penilaian saya secara jujur.
        </p>
        <label class="flex items-center gap-2 md:gap-3 mt-2">
          <input type="checkbox" v-model="setuju" @change="handleSetujuChange" class="accent-[#2196F3] scale-110 md:scale-125" />
          <span class="text-[#1976D2] font-semibold text-xs md:text-base">Saya setuju dan menyatakan kebenaran jawaban di atas.</span>
        </label>
      </div>
      <div class="flex flex-col md:flex-row justify-between gap-3 md:gap-6">
        <button type="button" @click="goBack" class="flex items-center gap-2 bg-white border border-[#B3E5FC] text-[#1976D2] px-6 md:px-8 py-2 md:py-3 rounded-xl shadow font-bold text-base md:text-lg tracking-wide hover:bg-[#E3F2FD] transition w-full md:w-auto justify-center">
          Kembali
        </button>
        <button type="button" :disabled="!setuju || loading" @click="handleSubmit" :class="['bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-6 md:px-8 py-2 md:py-3 rounded-xl shadow-lg font-bold text-base md:text-lg tracking-wide transition w-full md:w-auto justify-center flex items-center gap-2', (!setuju || loading) ? 'opacity-60 cursor-not-allowed' : '']">
          {{ loading ? 'Menyimpan...' : 'Kirim' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const setuju = ref(false)
const showPopup = ref(false)
const loading = ref(false)
const nama = ref('') // Ganti dengan store jika ada
const router = useRouter()

function handleSetujuChange() {
  if (setuju.value) {
    showPopup.value = true
  }
}

function goBack() {
  window.history.back()
}

async function handleSubmit() {
  loading.value = true
  // Reset semua store, tambahkan logic sesuai kebutuhan
  // ...
  setTimeout(() => {
    showPopup.value = true
    router.push('/')
    loading.value = false
  }, 1800)
}
</script>
