<template>
  <div class="max-w-3xl mx-auto mt-24 bg-gradient-to-br from-[#E3F2FD] to-[#F8FAFB] rounded-2xl shadow-2xl p-4 md:p-10 space-y-8 md:space-y-10 border border-[#B3E5FC]">
    <h2 class="text-xl md:text-2xl font-extrabold text-[#1976D2] mb-2 text-center tracking-wide drop-shadow">
      Penilaian Investasi Waktu
    </h2>
    <div class="mb-6 md:mb-8 p-3 md:p-5 bg-blue-100/70 border-l-8 border-[#2196F3] rounded-lg text-[#1976D2] text-sm md:text-base shadow">
      <span class="font-bold">Petunjuk:</span> Beri penilaian pada pernyataan berikut dengan menggunakan skala <b>1</b> hingga <b>4</b>, di mana <b>1</b> berarti <b>Sangat Tidak Setuju</b> dan <b>4</b> berarti <b>Sangat Setuju</b>.
    </div>
    <div class="bg-white rounded-xl border border-[#B3E5FC] shadow p-4 md:p-6 flex flex-col gap-2 md:gap-3 hover:shadow-lg transition">
      <label class="block font-semibold text-[#1976D2] text-sm md:text-base mb-2 md:mb-4">
        {{ pertanyaan?.text || 'Memuat pertanyaan...' }}
      </label>
      <div class="flex flex-row justify-between gap-4 mt-2">
        <template v-for="(opt, idx) in pertanyaan?.options || []" :key="opt.id">
          <label class="flex flex-col items-center text-xs font-medium cursor-pointer gap-2 px-2">
            <input
              type="radio"
              :value="opt.option_text"
              :checked="jawaban === opt.option_text"
              @change="() => setJawaban(opt.option_text)"
              class="accent-[#2196F3] scale-110 md:scale-125 mb-0 sm:mb-1"
            />
            <span class="text-[#1976D2] font-bold text-xs md:text-sm">
              {{ opt.option_text.split(' ')[0] }}
            </span>
            <span class="text-gray-500 text-[10px] md:text-xs mt-1 text-center font-normal">
              {{ idx === 0 ? 'Sangat Tidak Setuju' : idx === 1 ? 'Tidak Setuju' : idx === 2 ? 'Setuju' : idx === 3 ? 'Sangat Setuju' : opt.option_text }}
            </span>
          </label>
        </template>
      </div>
    </div>
    <div class="pt-6 md:pt-8 flex flex-col md:flex-row justify-between gap-3 md:gap-6">
      <NuxtLink
        to="/alumni/sikapprilaku"
        class="flex items-center gap-2 bg-white border border-[#B3E5FC] text-[#1976D2] px-6 md:px-8 py-2 md:py-3 rounded-xl shadow font-bold text-base md:text-lg tracking-wide hover:bg-[#E3F2FD] transition w-full md:w-auto justify-center"
      >
        <span class="i-lucide-arrow-left" style="font-size:20px"></span>
        Sebelumnya
      </NuxtLink>
      <button
        type="button"
        @click="handleSubmit"
        class="flex items-center gap-2 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-6 md:px-10 py-2 md:py-3 rounded-xl shadow-lg font-bold text-base md:text-lg tracking-wide transition w-full md:w-auto justify-center"
      >
        Lanjut <span class="i-lucide-arrow-right" style="font-size:20px"></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useProfileStore } from '~/stores/profileStore'
import { useSesuaiWaktuStore } from '~/stores/sesuaiwaktuStore'

const router = useRouter()
const toast = useToast()
const profileStore = useProfileStore()
const sesuaiWaktuStore = useSesuaiWaktuStore()

const nama = profileStore.nama
const user_id = profileStore.pelatihan_id
let jawaban = sesuaiWaktuStore.jawaban
const setJawaban = sesuaiWaktuStore.setJawaban

let pertanyaan: { id: number; text: string; options: { id: number; option_text: string }[] } | null = null

if (process.client) {
  (async () => {
    try {
      const res = await fetch('/api/pertanyaan/13')
      const data = await res.json()
      pertanyaan = data
    } catch {
      pertanyaan = null
    }
  })()
}

function handleSubmit() {
  if (!jawaban) {
    toast.error('Mohon pilih salah satu jawaban terlebih dahulu!')
    return
  }
  fetch('/api/answers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question_id: pertanyaan?.id,
      user_id,
      answer: jawaban,
    }),
  })
    .then(() => {
      toast.success(`Jawaban berhasil disimpan! Terima kasih ${nama ? nama : ''}, tinggal satu tahap lagi terkait saran dan masukan pelatihan!`)
      router.push('/alumni/saranmasukan')
    })
    .catch(() => {
      toast.error('Gagal menyimpan jawaban!')
    })
}
</script>