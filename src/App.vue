<template>
  <NavBar />
  <main class="min-h-screen">
    <router-view />
  </main>
  <Footer />
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>
