<template>
  <div class="max-w-4xl mx-auto mt-8 bg-gradient-to-br from-[#E3F2FD] to-[#F8FAFB] rounded-2xl shadow-2xl p-4 md:p-10 space-y-8 md:space-y-10 border border-[#B3E5FC]">
    <h2 class="text-2xl md:text-3xl font-extrabold text-[#1976D2] mb-2 text-center tracking-wide drop-shadow">
      Dukungan Lingkungan Kerja
    </h2>
    <div class="mb-6 md:mb-8 p-3 md:p-5 bg-blue-100/70 border-l-8 border-[#2196F3] rounded-lg text-[#1976D2] text-sm md:text-base shadow">
      <span class="font-bold">Petunjuk:</span> Beri penilaian pada
      pernyataan berikut dengan menggunakan skala <b>1</b> hingga <b>4</b> di mana <b>1</b> berarti <b>Sangat Tidak Setuju</b> dan <b>4</b> berarti <b>Sangat Setuju</b>.
    </div>
    <div class="space-y-6 md:space-y-8">
      <div v-for="(q, i) in pertanyaanList" :key="q.id" class="bg-white rounded-xl border border-[#B3E5FC] shadow p-4 md:p-6 flex flex-col gap-3 hover:shadow-lg transition">
        <label class="block font-semibold text-[#1976D2] text-base mb-2">
          {{ i + 1 }}. {{ q.text }}
        </label>
        <div class="flex flex-row justify-between gap-4 mt-2">
          <label v-for="(opt, idx) in q.options" :key="opt.id" class="flex flex-col items-center text-xs font-medium cursor-pointer gap-2 px-2">
            <input
              type="radio"
              :name="`dukungan-${i}`"
              :value="opt.option_text"
              :checked="answers[i] === opt.option_text"
              @change="handleAnswer(i, opt.option_text)"
              class="accent-[#2196F3] scale-110 md:scale-125 mb-0 sm:mb-1"
            />
            <span class="text-[#1976D2] font-bold text-xs md:text-sm">
              {{ opt.option_text.split(' ')[0] }}
            </span>
            <span class="text-gray-500 text-[10px] md:text-xs mt-1 text-center font-normal">
              {{ idx === 0 ? 'Sangat Tidak Setuju' : idx === 1 ? 'Tidak Setuju' : idx === 2 ? 'Setuju' : idx === 3 ? 'Sangat Setuju' : opt.option_text }}
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="pt-6 md:pt-8 flex flex-col md:flex-row justify-between gap-4">
      <button
        type="button"
        @click="navigate('/alumni/evaluasi')"
        class="flex items-center gap-2 bg-white border border-[#B3E5FC] text-[#1976D2] px-6 md:px-8 py-2 md:py-3 rounded-xl shadow font-bold text-base md:text-lg tracking-wide hover:bg-[#E3F2FD] transition w-full md:w-auto justify-center"
      >
        <!-- Icon ArrowLeft -->
        Sebelumnya
      </button>
      <button
        type="button"
        @click="submitAnswers"
        class="flex items-center gap-2 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-6 md:px-10 py-2 md:py-3 rounded-xl shadow-lg font-bold text-base md:text-lg tracking-wide transition w-full md:w-auto justify-center"
      >
        Lanjut
        <!-- Icon ArrowRight -->
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const pertanyaanList = ref([])
const answers = ref([])
const router = useRouter()

function navigate(path) {
  router.push(path)
}

function setAnswers(arr) {
  answers.value = arr
}
function setAnswer(idx, value) {
  answers.value[idx] = value
}
function clear() {
  answers.value = []
}

async function fetchQuestions() {
  try {
    const ids = [3, 4, 5, 6, 7]
    const responses = await Promise.all(
      ids.map(id => $fetch(`/api/pertanyaan/${id}`))
    )
    pertanyaanList.value = responses
    if (!answers.value.length) setAnswers(Array(responses.length).fill(null))
  } catch (e) {
    // handle error
  }
}

onMounted(fetchQuestions)

function handleAnswer(idx, value) {
  setAnswer(idx, value)
}

async function submitAnswers() {
  if (answers.value.some(ans => !ans)) {
    alert('Mohon isi semua pertanyaan terlebih dahulu!')
    return
  }
  try {
    for (let i = 0; i < pertanyaanList.value.length; i++) {
      await $fetch('/api/answers', {
        method: 'POST',
        body: {
          question_id: pertanyaanList.value[i].id,
          user_id: 1, // ganti dengan user id dari store jika ada
          answer: answers.value[i],
        }
      })
    }
    alert('Jawaban berhasil disimpan!')
    clear()
    navigate('/alumni/sikapprilaku')
  } catch {
    alert('Gagal menyimpan jawaban!')
  }
}
</script>
