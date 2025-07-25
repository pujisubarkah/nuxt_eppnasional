<template>
  <div class="max-w-4xl mx-auto mt-24 bg-gradient-to-br from-[#E3F2FD] to-[#F8FAFB] rounded-2xl shadow-2xl p-10 space-y-10 border border-[#B3E5FC]">
    <!-- Motivasi sebelum petunjuk -->
    <div class="mb-4">
      <span class="block text-[#1976D2] text-base">
        <template v-if="nama">
          <template v-if="pelatihan_id && namaPelatihan">
            Halo <b>{{ nama }}</b>! Kami ingin meminta waktu Anda terkait pelatihan yang pernah Anda ikuti yaitu <b>{{ namaPelatihan }}</b>. Cuma 3–5 menit, tapi dampaknya besar banget buat perbaikan pelatihan ke depan!
          </template>
          <template v-else-if="pelatihan_id">
            Halo <b>{{ nama }}</b>! Kami ingin meminta waktu Anda terkait pelatihan yang pernah Anda ikuti yaitu <b>ID {{ pelatihan_id }}</b>. Cuma 3–5 menit, tapi dampaknya besar banget buat perbaikan pelatihan ke depan!
          </template>
          <template v-else>
            Halo <b>{{ nama }}</b>! Kami ingin meminta waktu Anda terkait pelatihan yang pernah Anda ikuti. Cuma 3–5 menit, tapi dampaknya besar banget buat perbaikan pelatihan ke depan!
          </template>
        </template>
        <template v-else>
          Kami ingin meminta waktu Anda terkait pelatihan yang pernah Anda ikuti. Cuma 3–5 menit, tapi dampaknya besar banget buat perbaikan pelatihan ke depan!
        </template>
      </span>
    </div>
    <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-[#1976D2] text-base font-medium">
      <span>
        <span class="font-bold">Petunjuk:</span> Pada bagian ini, kami akan menyajikan daftar materi yang diajarkan pada
        <span class="font-bold">{{ namaPelatihan }}</span>. Silahkan pilih 3 materi yang menurut Anda paling relevan dan paling tidak relevan dalam mendukung kinerja.
      </span>
    </div>
    <!-- Daftar Materi -->
    <div class="bg-white/90 rounded-xl border border-[#B3E5FC] shadow p-6 mb-6">
      <h3 class="font-bold text-lg mb-4 text-[#1976D2]">Daftar Materi Pelatihan</h3>
      <table class="w-full border rounded shadow text-sm bg-white">
        <thead>
          <tr class="bg-[#C2E7F6] text-[#1976D2]">
            <th class="py-2 px-3 text-left">Agenda</th>
            <th class="py-2 px-3 text-left">Sub Agenda</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="agenda in materiList" :key="agenda.id">
            <template v-for="(sub, idx) in agenda.sub_agendas" :key="sub.id">
              <tr>
                <td class="py-1 px-3 font-semibold align-top">{{ idx === 0 ? agenda.name : '' }}</td>
                <td class="py-1 px-3">{{ String.fromCharCode(97 + idx) + ') ' + sub.name }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
    <!-- Relevan -->
    <div class="bg-white/90 rounded-xl border border-[#B3E5FC] shadow p-6 mb-6">
      <label class="block font-semibold mb-4 text-[#1976D2]">Pilih 3 materi paling relevan dalam mendukung kinerja Anda</label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <template v-if="relevanOptions.length > 0">
          <template v-for="opt in relevanOptions" :key="opt.id">
            <label
              :class="['flex items-center gap-3 rounded-lg px-3 py-2 shadow-sm transition cursor-pointer',
                tidakRelevan.includes(opt.option_text) ? 'bg-gray-100 opacity-50 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100']"
            >
              <input
                type="checkbox"
                :value="opt.option_text"
                :checked="relevan.includes(opt.option_text)"
                @change="() => handleCheckbox(relevan, setRelevan, opt.option_text)"
                class="accent-[#2196F3] scale-125"
                :disabled="tidakRelevan.includes(opt.option_text)"
              />
              <span :class="['font-medium', tidakRelevan.includes(opt.option_text) ? 'text-gray-500' : 'text-[#1976D2]']">
                {{ opt.option_text }}
              </span>
            </label>
          </template>
        </template>
        <template v-else>
          <p class="text-center text-gray-500 py-4">Tidak ada opsi materi tersedia.</p>
        </template>
      </div>
    </div>
    <!-- Tidak Relevan -->
    <div class="bg-white/90 rounded-xl border border-[#B3E5FC] shadow p-6 mb-6">
      <label class="block font-semibold mb-4 text-[#1976D2]">Pilih 3 materi paling tidak relevan dalam mendukung kinerja Anda</label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <template v-if="tidakRelevanOptions.length > 0">
          <template v-for="opt in tidakRelevanOptions" :key="opt.id">
            <label
              :class="['flex items-center gap-3 rounded-lg px-3 py-2 shadow-sm transition',
                relevan.includes(opt.option_text) ? 'bg-gray-100 opacity-50 cursor-not-allowed' : 'bg-red-50 hover:bg-red-100 cursor-pointer']"
            >
              <input
                type="checkbox"
                :value="opt.option_text"
                :checked="tidakRelevan.includes(opt.option_text)"
                @change="() => handleCheckbox(tidakRelevan, setTidakRelevan, opt.option_text)"
                class="accent-red-400 scale-125"
                :disabled="relevan.includes(opt.option_text)"
              />
              <span :class="['font-medium', relevan.includes(opt.option_text) ? 'text-gray-500' : 'text-[#D32F2F]']">
                {{ opt.option_text }}
              </span>
            </label>
          </template>
        </template>
        <template v-else>
          <p class="text-center text-gray-500 py-4">Tidak ada opsi materi tersedia.</p>
        </template>
      </div>
    </div>
    <div class="pt-6 md:pt-8 flex flex-col md:flex-row justify-between gap-4">
      <NuxtLink
        to="/alumni/profile"
        class="flex items-center gap-2 bg-white border border-[#B3E5FC] text-[#1976D2] px-6 md:px-8 py-2 md:py-3 rounded-xl shadow font-bold text-base md:text-lg tracking-wide hover:bg-[#E3F2FD] transition w-full md:w-auto justify-center"
      >
        <span class="i-lucide-arrow-left" style="font-size:20px"></span>
        Kembali
      </NuxtLink>
      <button
        @click="handleNext"
        class="flex items-center gap-2 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-10 py-3 rounded-xl shadow-lg hover:from-[#1976D2] hover:to-[#2196F3] font-bold text-lg tracking-wide transition w-full md:w-auto justify-center"
      >
        Lanjut <span class="i-lucide-arrow-right" style="font-size:20px"></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">





import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useProfileStore } from '@/stores/profileStore'
import { useEvaluasiStore } from '@/stores/evaluasiStore'

interface SubAgenda {
  id: number
  name: string
}
interface Agenda {
  id: number
  name: string
  sub_agendas: SubAgenda[]
}
interface Option {
  id: number
  option_text: string
  option_value?: number
}

const profileStore = useProfileStore()
const evaluasiStore = useEvaluasiStore()
const router = useRouter()
const toast = useToast()

const nama = profileStore.nama
const pelatihan_id = profileStore.pelatihan_id
const relevan = evaluasiStore.relevan
const setRelevan = evaluasiStore.setRelevan
const tidakRelevan = evaluasiStore.tidakRelevan
const setTidakRelevan = evaluasiStore.setTidakRelevan
const reset = evaluasiStore.reset

let materiList: Agenda[] = []
let namaPelatihan: string = 'Memuat...'
let relevanOptions: Option[] = []
let tidakRelevanOptions: Option[] = []

async function fetchData(id: number) {
  try {
    const res = await fetch(`/api/pertanyaan/pelatihan/${id}`)
    const data = await res.json()
    materiList = data?.result || []
    const pel = await fetch(`/api/pelatihan/${id}`)
    const pelData = await pel.json()
    namaPelatihan = pelData?.nama || ''
  } catch {
    materiList = []
    namaPelatihan = ''
  }
}

async function fetchRelevanOptions() {
  try {
    const res = await fetch(`/api/pertanyaan/1/${pelatihan_id}`)
    const data = await res.json()
    relevanOptions = data.option || []
  } catch {
    relevanOptions = []
  }
}

async function fetchTidakRelevanOptions() {
  try {
    const res = await fetch(`/api/pertanyaan/2/${pelatihan_id}`)
    const data = await res.json()
    const sortedOptions = (data.option || []).slice().sort((a: Option, b: Option) => (a.option_value ?? 0) - (b.option_value ?? 0))
    tidakRelevanOptions = sortedOptions
  } catch {
    tidakRelevanOptions = []
  }
}

// onMounted lifecycle removed as requested

function handleCheckbox(list: string[], setList: (v: string[]) => void, value: string) {
  if (list.includes(value)) {
    setList(list.filter((v: string) => v !== value))
  } else {
    if (list.length >= 3) {
      toast.info('Hapus salah satu pilihan terlebih dahulu.')
      return
    }
    if (setList === setRelevan && tidakRelevan.includes(value)) {
      setTidakRelevan(tidakRelevan.filter((v: string) => v !== value))
    }
    if (setList === setTidakRelevan && relevan.includes(value)) {
      setRelevan(relevan.filter((v: string) => v !== value))
    }
    setList([...list, value])
  }
}

function handleNext() {
  router.push('/alumni/dukunganlingkungan')
}
</script>