
<template>
  <div class="flex min-h-screen bg-gradient-to-br from-[#2196F3] to-[#E3F2FD] relative">
    <!-- Carousel Background -->
    <div class="hidden md:flex absolute inset-0 w-full h-full z-0">
      <img
        :src="images[currentImage]"
        :alt="`Carousel ${currentImage + 1}`"
        class="object-cover w-full h-full blur-md scale-105 transition duration-700"
        style="filter: brightness(0.7);"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-[#2196F3]/60 to-[#E3F2FD]/80"></div>
    </div>

    <!-- Login Card -->
    <div class="relative z-10 w-full md:w-1/3 flex items-center justify-center min-h-screen">
      <form
        @submit.prevent="handleSubmit"
        class="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-[#B3E5FC] flex flex-col gap-7 animate-fade-in"
      >
        <div class="flex flex-col items-center mb-2">
          <img
            src="/lanri_.png"
            alt="Logo LAN"
            width="96"
            height="96"
            class="mb-2 drop-shadow-lg rounded-full border-2 border-[#2196F3]"
          />
          <h2 class="text-3xl font-extrabold text-[#1976D2] text-center mb-1 tracking-wide drop-shadow">
            Login
          </h2>
          <p class="text-xs text-gray-500 text-center mb-2">
            Evaluasi Pasca Pelatihan Nasional
          </p>
        </div>
        <div>
          <label class="block text-sm font-semibold text-[#1976D2] mb-1">
            Username
          </label>
          <input
            type="text"
            class="w-full px-4 py-2 border border-[#90CAF9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2] bg-[#F8FAFB] shadow-sm transition-all duration-200"
            v-model="username"
            required
            autofocus
            placeholder="Masukkan username Anda"
            :disabled="loading"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-[#1976D2] mb-1">
            Password
          </label>
          <input
            type="password"
            class="w-full px-4 py-2 border border-[#90CAF9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2] bg-[#F8FAFB] shadow-sm transition-all duration-200"
            v-model="password"
            required
            placeholder="Masukkan password"
            :disabled="loading"
          />
        </div>
        <div class="flex justify-between items-center text-xs mb-2">
          <a href="#" class="text-[#1976D2] hover:underline">Lupa password?</a>
        </div>
        <button
          type="submit"
          class="w-full py-2 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:from-[#1976D2] hover:to-[#2196F3] transition-all duration-200 disabled:opacity-75"
          :disabled="loading"
        >
          {{ loading ? "Memproses..." : "Login" }}
        </button>
        <!-- Carousel Indicators -->
        <div class="flex justify-center gap-2 mt-6">
          <span
            v-for="(src, idx) in images"
            :key="idx"
            :class="['w-3 h-3 rounded-full transition-all duration-300', currentImage === idx ? 'bg-[#1976D2] scale-125 shadow-lg' : 'bg-gray-300']"
            style="display:inline-block"
          ></span>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore'
import { useToast } from 'vue-toastification'

// Carousel logic
const images = [
  '/DSC_0216.JPG',
  '/DSC_0308.JPG',
  '/DSC_0352.JPG',
]
const currentImage = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

function nextImage() {
  currentImage.value = (currentImage.value + 1) % images.length
}
function prevImage() {
  currentImage.value = (currentImage.value - 1 + images.length) % images.length
}

onMounted(() => {
  interval = setInterval(nextImage, 3500)
})
onUnmounted(() => {
  if (interval) clearInterval(interval)
})

// Login logic
interface User {
  nama: string
  // tambahkan properti lain sesuai API response
}
interface LoginResponse {
  user: User
  // atau properti lain dari response API
}

const username = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const profileStore = useProfileStore()
const toast = useToast()

const handleSubmit = async () => {
  if (!username.value || !password.value) {
    toast.error('Username dan password harus diisi.')
    return
  }
  loading.value = true
  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value,
      },
    }) as LoginResponse
    if (res && res.user) {
      profileStore.setProfile(res.user)
      toast.success(`Login berhasil. Selamat datang, ${res.user.nama}!`)
      router.push('/admin')
    } else {
      toast.error('Login gagal. Periksa username dan password Anda.')
    }
  } catch (error: any) {
    console.error('Login error:', error)
    if (error?.response?.status === 401) {
      toast.error('Username atau password salah.')
    } else {
      toast.error('Terjadi kesalahan. Silakan coba lagi.')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.7s ease;
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Override slick carousel styling jika perlu */
:deep(.slick-dots) {
  bottom: 20px;
}

:deep(.slick-dots li button:before) {
  color: #1976D2;
  opacity: 0.7;
}

:deep(.slick-dots li.slick-active button:before) {
  color: #1976D2;
  opacity: 1;
}
</style>