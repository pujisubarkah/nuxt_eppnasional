<template>
  <div>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-[#B3E5FC]">
        <h3 class="text-2xl font-bold text-[#1976D2] mb-4">Terima Kasih!</h3>
        <p class="mb-6 text-gray-700">
          Terima kasih atas partisipasi Anda.<br />
          Pendapat <span class="font-semibold">{{ form.namaAnda }}</span> sangat berarti dan akan menjadi bagian penting dari upaya perubahan yang berkelanjutan.
        </p>
        <button
          class="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-3 rounded-xl shadow-lg font-bold text-lg tracking-wide transition flex items-center justify-center gap-2"
          @click="showModal = false; router.push('/')"
        >
          Selesai
        </button>
      </div>
    </div>
    <form
      class="max-w-4xl mx-auto bg-gradient-to-br from-[#E3F2FD] to-[#F8FAFB] rounded-2xl shadow-2xl p-10 space-y-10 border border-[#B3E5FC]"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-3xl font-extrabold text-[#1976D2] mb-2 text-center tracking-wide drop-shadow">
        Evaluasi Alumni oleh Atasan/Rekan/Bawahan
      </h2>
      <div class="mb-8 p-5 bg-blue-100/70 border-l-8 border-[#2196F3] rounded-lg text-[#1976D2] text-base shadow">
        <span class="font-bold">Petunjuk:</span> Beri penilaian pada
        pernyataan berikut dengan menggunakan skala <b>1 hingga 4</b>, di mana
        <b>1</b> berarti <b>Sangat Tidak Setuju</b> dan <b>4</b> berarti
        <b>Sangat Setuju</b>.
      </div>
      <div class="space-y-8">
        <div
          v-for="(q, idx) in likertQuestions"
          :key="q.id"
          class="bg-white/90 rounded-xl border border-[#B3E5FC] shadow p-6 flex flex-col gap-3 hover:shadow-lg transition"
        >
          <label class="block font-semibold text-[#1976D2] text-base mb-2">
            {{ idx + 1 }}. {{ q.text }}
          </label>
          <div class="flex justify-between gap-4 mt-2">
            <label
              v-for="opt in q.options"
              :key="opt.id"
              class="flex flex-col items-center text-xs font-medium"
            >
              <input
                type="radio"
                :name="`likert-${q.id}`"
                :value="opt.option_text"
                :checked="likertAnswers[idx] === opt.option_text"
                @change="() => handleLikertChange(idx, opt.option_text)"
                required
                class="accent-[#2196F3] scale-125 mb-1"
              />
              <span class="text-[#1976D2] font-bold">
                {{ opt.option_text.split(' ')[0] }}
              </span>
            </label>
          </div>
          <div class="flex justify-between gap-2 mt-1 text-xs text-gray-500">
            <span v-for="opt in q.options" :key="opt.id">{{ opt.option_text }}</span>
          </div>
        </div>
      </div>
      <div v-if="openQuestion" class="bg-white/90 rounded-xl border border-[#B3E5FC] shadow p-6 flex flex-col gap-3 hover:shadow-lg transition">
        <label class="block font-semibold text-[#1976D2] mb-2">
          {{ openQuestion.text }} <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="saran"
          required
          class="w-full border border-[#90CAF9] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C2E7F6] bg-white shadow-sm transition"
          rows="3"
          placeholder="Tulis saran, masukan, atau harapan Anda..."
        />
      </div>
      <div class="text-center pt-2">
        <button
          type="submit"
          class="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-10 py-3 rounded-xl shadow-lg hover:from-[#1976D2] hover:to-[#2196F3] font-bold text-lg tracking-wide transition"
        >
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProfileFormStore } from '@/stores/alumni_profile'

interface Option { id: number; option_text: string }
interface Question { id: number; text: string; options: Option[] }

const router = useRouter()
const { form } = useProfileFormStore()
let showModal = false
let likertQuestions: Question[] = []
let likertAnswers: string[] = []
let openQuestion: Question | null = null
let saran = ''
const user_id = form.id

// Fetch Likert questions and open question at script setup
async function fetchQuestions() {
  const ids = [16, 17, 18, 19]
  const results = await Promise.all(
    ids.map(id => fetch(`/api/pertanyaan/${id}`).then(r => r.json()))
  )
  likertQuestions = results
  likertAnswers = Array(results.length).fill('')

  // Fetch open question
  const openRes = await fetch('/api/pertanyaan/20')
  openQuestion = await openRes.json()
}

fetchQuestions()

function handleLikertChange(idx: number, value: string) {
  const updated = [...likertAnswers]
  updated[idx] = value
  likertAnswers = updated
}

async function handleSubmit() {
  // Gabungkan semua pertanyaan dan jawaban
  const pertanyaanList = openQuestion
    ? [...likertQuestions, openQuestion]
    : [...likertQuestions]
  const answers = openQuestion
    ? [...likertAnswers, saran]
    : [...likertAnswers]
  if (answers.some(ans => !ans)) {
    (globalThis as any).alert('Mohon isi semua pertanyaan terlebih dahulu!')
    return
  }
  try {
    for (let i = 0; i < pertanyaanList.length; i++) {
      await fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: pertanyaanList[i].id,
          user_id,
          answer: answers[i],
        })
      })
    }
    (globalThis as any).alert('Jawaban berhasil disimpan! Terima kasih atas partisipasi Anda.')
    showModal = true
  } catch {
    (globalThis as any).alert('Gagal menyimpan jawaban!')
  }
}
</script>
