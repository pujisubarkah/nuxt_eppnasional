<template>
  <div class="max-w-3xl mx-auto bg-gradient-to-br from-[#E3F2FD] to-[#F8FAFB] rounded-2xl shadow-2xl p-4 md:p-10 space-y-8 md:space-y-10 border border-[#B3E5FC]">
    <h2 class="text-xl md:text-2xl font-extrabold text-[#1976D2] mb-2 text-center tracking-wide drop-shadow">
      Saran & Masukan
    </h2>
    <div class="space-y-6 md:space-y-8">
      <div>
        <label class="block font-semibold text-[#1976D2] mb-2 text-sm md:text-base">
          1. {{ pertanyaanLabels.materi }}
        </label>
        <textarea
          v-model="materi"
          placeholder="Tuliskan saran atau masukan terkait materi pelatihan..."
          class="w-full border border-[#90CAF9] rounded px-2 md:px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6] shadow-sm transition text-sm md:text-base"
          rows="4"
        />
      </div>
      <div>
        <label class="block font-semibold text-[#1976D2] mb-2 text-sm md:text-base">
          2. {{ pertanyaanLabels.metode }}
        </label>
        <textarea
          v-model="metode"
          placeholder="Tuliskan saran atau masukan terkait metode pelatihan..."
          class="w-full border border-[#90CAF9] rounded px-2 md:px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6] shadow-sm transition text-sm md:text-base"
          rows="4"
        />
      </div>
      <div>
        <label class="block font-semibold text-[#1976D2] mb-2 text-sm md:text-base">
          3. {{ pertanyaanLabels.waktu }}
        </label>
        <textarea
          v-model="waktu"
          placeholder="Tuliskan saran atau masukan terkait waktu pelatihan..."
          class="w-full border border-[#90CAF9] rounded px-2 md:px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6] shadow-sm transition text-sm md:text-base"
          rows="4"
        />
      </div>
      <div>
        <label class="block font-semibold text-[#1976D2] mb-2 text-sm md:text-base">
          4. {{ pertanyaanLabels.pengajar }}
        </label>
        <textarea
          v-model="pengajar"
          placeholder="Tuliskan saran atau masukan terkait pengajar pelatihan..."
          class="w-full border border-[#90CAF9] rounded px-2 md:px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6] shadow-sm transition text-sm md:text-base"
          rows="4"
        />
      </div>
      <div class="pt-4 flex flex-col md:flex-row justify-between gap-3 md:gap-6">
        <NuxtLink
          to="/alumni/sesuaiwaktu"
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
  </div>
</template>

<script setup lang="ts">



import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useProfileStore } from '@/stores/profileStore'
import { useSaranMasukanStore } from '@/stores/saranmasukanStore'

const router = useRouter()
const toast = useToast()
const profileStore = useProfileStore()
const saranMasukanStore = useSaranMasukanStore()

const user_id = profileStore.pelatihan_id
let materi = saranMasukanStore.materi
let metode = saranMasukanStore.metode
let waktu = saranMasukanStore.waktu
let pengajar = saranMasukanStore.pengajar

let pertanyaanLabels = {
  materi: 'Terkait Materi Pelatihan',
  metode: 'Terkait Metode Pelatihan',
  waktu: 'Terkait Waktu Pelatihan',
  pengajar: 'Terkait Pengajar Pelatihan',
}

// Fetch pertanyaan labels when needed (no onMounted)
async function fetchPertanyaanLabels() {
  try {
    const [materiRes, metodeRes, waktuRes, pengajarRes] = await Promise.all([
      fetch('/api/pertanyaan/21').then(r => r.json()),
      fetch('/api/pertanyaan/22').then(r => r.json()),
      fetch('/api/pertanyaan/23').then(r => r.json()),
      fetch('/api/pertanyaan/24').then(r => r.json()),
    ])
    pertanyaanLabels = {
      materi: materiRes.text,
      metode: metodeRes.text,
      waktu: waktuRes.text,
      pengajar: pengajarRes.text,
    }
  } catch {
    // handle error
  }
}

// Optionally call fetchPertanyaanLabels() at the top of the script or from a method if you want to load labels
fetchPertanyaanLabels()

const pertanyaanIds = {
  materi: 21,
  metode: 22,
  waktu: 23,
  pengajar: 24,
}

function handleSubmit() {
  Promise.all([
    fetch('/api/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: pertanyaanIds.materi, user_id, answer: materi || null }),
    }),
    fetch('/api/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: pertanyaanIds.metode, user_id, answer: metode || null }),
    }),
    fetch('/api/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: pertanyaanIds.waktu, user_id, answer: waktu || null }),
    }),
    fetch('/api/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: pertanyaanIds.pengajar, user_id, answer: pengajar || null }),
    }),
  ])
    .then(() => {
      toast.success('Saran & masukan berhasil disimpan!')
      router.push('/alumni/konfirmasi')
    })
    .catch(() => {
    toast.error('Gagal menyimpan saran & masukan!')
  })
}
</script>