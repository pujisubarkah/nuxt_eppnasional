<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <main class="container mx-auto py-8 flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>
