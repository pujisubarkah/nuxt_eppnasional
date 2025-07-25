<template>
  <nav
    class="navbar flex items-center justify-between px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 shadow-md backdrop-blur-sm filter brightness-105 contrast-125 border-b border-blue-500 z-50 fixed top-0 left-0 right-0"
  >
    <!-- Logo / Judul -->
    <div class="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
      <img
        src="/lanri.png"
        alt="Logo LAN RI"
        class="h-9 w-9 sm:h-12 sm:w-12 aspect-square object-contain drop-shadow-md flex-shrink-0"
      />
      <span
        class="navbar-logo-text font-black text-white tracking-wide drop-shadow-md truncate text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl"
      >
        <span class="hidden sm:inline">Evaluasi Pasca Pelatihan Nasional</span>
        <span class="sm:hidden">EPP Nasional</span>
      </span>
    </div>

    <!-- Desktop Menu -->
    <div class="hidden lg:flex items-center gap-6 xl:gap-8">
      <div class="flex gap-4 xl:gap-8 items-center">
        <RouterLink
          to="/"
          class="nav-link text-white font-semibold px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 nav-item-hover hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105"
          :class="{ 'bg-white/20': route.path === '/' }"
        >
          Beranda
        </RouterLink>
        <RouterLink
          to="/tentang"
          class="nav-link text-white font-semibold px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 nav-item-hover hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105"
          :class="{ 'bg-white/20': route.path === '/tentang' }"
        >
          Tentang
        </RouterLink>
        <RouterLink
          to="/faq"
          class="nav-link text-white font-semibold px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 nav-item-hover hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105"
          :class="{ 'bg-white/20': route.path.toLowerCase() === '/faq' }"
        >
          FaQ
        </RouterLink>
        <RouterLink
          to="/kontak"
          class="nav-link text-white font-semibold px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 nav-item-hover hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105"
          :class="{ 'bg-white/20': route.path === '/kontak' }"
        >
          Kontak
        </RouterLink>
      </div>
      <div class="pl-2 xl:pl-4">
        <RouterLink
          to="/login"
          class="flex items-center gap-2 px-4 py-2.5 rounded-full glass-effect text-white font-bold shadow-xl hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-[#1565C0] hover:scale-105 transition-all duration-300 nav-item-hover"
        >
          <LogIn class="w-4 h-4" />
          <span class="hidden xl:inline">Login</span>
        </RouterLink>
      </div>
    </div>

    <!-- Mobile Button -->
    <div class="lg:hidden flex items-center">
      <button
        class="p-2.5 rounded-xl glass-effect shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
        @click="dropdownOpen = !dropdownOpen"
      >
        <div class="w-6 h-6 flex flex-col justify-center items-center">
          <span
            class="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
            :class="dropdownOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'"
          ></span>
          <span
            class="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
            :class="dropdownOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span
            class="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
            :class="dropdownOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'"
          ></span>
        </div>
      </button>

      <!-- Mobile Menu -->
      <div v-if="dropdownOpen" class="fixed inset-0 z-50 lg:hidden">
        <div
          class="absolute inset-0 bg-black/70 backdrop-blur-sm"
          @click="dropdownOpen = false"
        />

        <div
          class="absolute top-0 right-0 h-full bg-white shadow-2xl animate-slide-in-right"
          :class="isMobile ? 'w-full' : 'w-72 sm:w-80'"
          style="z-index: 60"
        >
          <div class="bg-gradient-to-r from-[#1565C0] to-[#1976D2] p-4 pb-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="/lanri.png"
                  alt="Logo LAN RI"
                  class="h-auto w-auto drop-shadow-md"
                  width="24"
                  height="24"
                />
                <span class="text-white font-bold text-base">Menu</span>
              </div>
              <button
                @click="dropdownOpen = false"
                class="p-1.5 rounded-full bg-white/10 hover:bg-white/20"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-4 space-y-1 overflow-y-auto bg-white" style="max-height: calc(100vh - 80px)">
            <RouterLink
              to="/"
              class="flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-sm"
              :class="route.path === '/' ? 'bg-[#1565C0] text-white shadow-md' : 'text-[#1565C0] hover:bg-[#F3F4F6]'"
              @click="dropdownOpen = false"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="route.path === '/' ? 'bg-white' : 'bg-[#1565C0]'" />
              Beranda
            </RouterLink>
            <RouterLink
              to="/tentang"
              class="flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-sm"
              :class="route.path === '/tentang' ? 'bg-[#1565C0] text-white shadow-md' : 'text-[#1565C0] hover:bg-[#F3F4F6]'"
              @click="dropdownOpen = false"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="route.path === '/tentang' ? 'bg-white' : 'bg-[#1565C0]'" />
              Tentang
            </RouterLink>
            <RouterLink
              to="/faq"
              class="flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-sm"
              :class="route.path.toLowerCase() === '/faq' ? 'bg-[#1565C0] text-white shadow-md' : 'text-[#1565C0] hover:bg-[#F3F4F6]'"
              @click="dropdownOpen = false"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="route.path.toLowerCase() === '/faq' ? 'bg-white' : 'bg-[#1565C0]'" />
              FaQ
            </RouterLink>
            <RouterLink
              to="/kontak"
              class="flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-sm"
              :class="route.path === '/kontak' ? 'bg-[#1565C0] text-white shadow-md' : 'text-[#1565C0] hover:bg-[#F3F4F6]'"
              @click="dropdownOpen = false"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="route.path === '/kontak' ? 'bg-white' : 'bg-[#1565C0]'" />
              Kontak
            </RouterLink>

            <div class="my-4 border-t border-gray-200" />

            <RouterLink
              to="/login"
              class="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1565C0] text-white font-medium shadow-md hover:bg-[#1976D2] hover:shadow-lg transition-all duration-200"
              @click="dropdownOpen = false"
            >
              <LogIn class="w-4 h-4" />
              Login
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { LogIn } from 'lucide-vue-next'
// NuxtIcon digunakan untuk ikon login

const dropdownOpen = ref(false);
const isMobile = ref(false);
const route = useRoute();

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 640;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
/* Optional: animations */
</style>
