<template>
  <div class="max-w-4xl mx-auto mt-24 bg-gradient-to-br from-[#E3F2FD] to-[#F8FAFB] rounded-2xl shadow-2xl p-4 md:p-10 space-y-8 md:space-y-10 border border-[#B3E5FC]">
    <h2 class="text-xl md:text-3xl font-extrabold text-[#1976D2] mb-2 text-center tracking-wide drop-shadow">
      Sikap & Perilaku Pasca Pelatihan
    </h2>
    <div class="mb-6 md:mb-8 p-3 md:p-5 bg-blue-100/70 border-l-8 border-[#2196F3] rounded-lg text-[#1976D2] text-sm md:text-base shadow">
      <span class="font-bold">Petunjuk:</span> Silahkan centang pada poin yang sesuai dengan pernyataan berikut.
    </div>
    <!-- ...existing code for all question blocks, see previous answer for details... -->
    <!-- Tombol navigasi -->
    <div class="pt-6 md:pt-8 flex flex-col md:flex-row justify-between gap-3 md:gap-6">
      <NuxtLink
        to="/alumni/dukunganlingkungan"
        class="flex items-center gap-2 bg-white border border-[#B3E5FC] text-[#1976D2] px-6 md:px-8 py-2 md:py-3 rounded-xl shadow font-bold text-base md:text-lg tracking-wide hover:bg-[#E3F2FD] transition w-full md:w-auto justify-center"
      >
        <span class="i-lucide-arrow-left" style="font-size:20px"></span>
        Sebelumnya
      </NuxtLink>
      <button
        type="button"
        @click="handleLanjut"
        class="flex items-center gap-2 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-6 md:px-10 py-2 md:py-3 rounded-xl shadow-lg font-bold text-base md:text-lg tracking-wide transition w-full md:w-auto justify-center"
      >
        Lanjut <span class="i-lucide-arrow-right" style="font-size:20px"></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useProfileStore } from '@/stores/profileStore'
import { useSikapPrilakuStore } from '@/stores/sikapprilakuStore'

export default {
  setup() {

    const router = useRouter()
    const toast = useToast()
    const profile = useProfileStore()
    const sikapPrilakuStore = useSikapPrilakuStore()

    const user_id = profile.pelatihan_id // or profile.nama, or add 'id' to the store if needed
    const isPelatihanKhusus = profile.pelatihan_id === 1 || profile.pelatihan_id === 2 || profile.pelatihan_id === 5

    let pertanyaanSikap: { id: any; text: any; options: any[] } | null = null
    let pertanyaanKinerja: any | null = null
    let pertanyaanEkonomi: any | null = null
    let pertanyaanDampak: any | null = null
    let pertanyaanTransformasi: any | null = null
    let selectedTransformasi: number | null = null
    let selectedSubTransformasi: number | null = null

    let sikap: string[] = []
    let kinerja: string[] = []
    let ekonomi: string = ''
    let dampak: string[] = []
    let dampakLain: string = ''

    async function fetchQuestions() {
      try {
        const pelId = profile.pelatihan_id
        const [
          sikapRes,
          resKinerja,
          resEkonomi,
          resDampak,
          resTransformasi
        ] = await Promise.all([
          fetch(`/api/pertanyaan/8/${pelId}`).then(r => r.json()),
          fetch('/api/pertanyaan/11').then(r => r.json()),
          fetch('/api/pertanyaan/9').then(r => r.json()),
          fetch('/api/pertanyaan/10').then(r => r.json()),
          fetch('/api/pertanyaan/26').then(r => r.json()),
        ])
        pertanyaanSikap = { id: sikapRes.question?.id, text: sikapRes.question?.text, options: sikapRes.option || [] }
        pertanyaanKinerja = resKinerja
        pertanyaanEkonomi = resEkonomi
        pertanyaanDampak = resDampak
        pertanyaanTransformasi = resTransformasi
        selectedTransformasi = null
        selectedSubTransformasi = null
      } catch (err) {
        toast.error('Gagal memuat pertanyaan!')
      }
    }

    function handleCheckbox(arr: string[], setArr: (v: string[]) => void, value: string, max: number) {
      if (arr.includes(value)) {
        setArr(arr.filter((v: string) => v !== value))
      } else if (arr.length < max) {
        setArr([...arr, value])
      }
    }

    async function saveAnswersAndNavigate() {
      if (isPelatihanKhusus) {
        if (!sikap.length || kinerja.length !== 3) {
          toast.error('Mohon isi pertanyaan 1 dan 2 dengan lengkap!')
          return false
        }
      } else {
        if (!sikap.length || kinerja.length !== 3 || !ekonomi || !dampak.length) {
          toast.error('Mohon isi semua pertanyaan dengan lengkap!')
          return false
        }
        if (selectedTransformasi === null || selectedSubTransformasi === null) {
          toast.error('Mohon pilih bidang dan sub bidang pada pertanyaan 5!')
          return false
        }
      }
      try {
        if (pertanyaanSikap?.id) {
          for (const ans of sikap) {
            await fetch('/api/answers', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question_id: pertanyaanSikap.id, user_id, answer: ans }),
            })
          }
        }
        if (pertanyaanKinerja?.id) {
          for (const ans of kinerja) {
            await fetch('/api/answers', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question_id: pertanyaanKinerja.id, user_id, answer: ans }),
            })
          }
        }
        if (!isPelatihanKhusus) {
          if (pertanyaanEkonomi?.id) {
            await fetch('/api/answers', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question_id: pertanyaanEkonomi.id, user_id, answer: ekonomi }),
            })
          }
          if (pertanyaanDampak?.id) {
            for (const ans of dampak) {
              await fetch('/api/answers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question_id: pertanyaanDampak.id, user_id, answer: ans === 'Yang lain:' ? dampakLain : ans }),
              })
            }
          }
          if (pertanyaanTransformasi?.id && selectedTransformasi !== null) {
            await fetch('/api/answers', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question_id: pertanyaanTransformasi.id, user_id, answer: selectedTransformasi.toString() }),
            })
          }
        }
        toast.success('Jawaban berhasil disimpan!')
        return true
      } catch {
        toast.error('Gagal menyimpan jawaban!')
        return false
      }
    }

    async function handleLanjut() {
      const isSaved = await saveAnswersAndNavigate()
      if (isSaved) {
        router.push('/alumni/sesuaiwaktu')
      }
    }

    return {
      pertanyaanSikap,
      pertanyaanKinerja,
      pertanyaanEkonomi,
      pertanyaanDampak,
      pertanyaanTransformasi,
      selectedTransformasi,
      selectedSubTransformasi,
      sikap,
      kinerja,
      ekonomi,
      dampak,
      dampakLain,
      handleCheckbox,
      saveAnswersAndNavigate,
      handleLanjut,
      fetchQuestions
    }
  },
  mounted() {
    this.fetchQuestions()
  }
}
</script>