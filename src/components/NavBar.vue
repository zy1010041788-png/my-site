<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link to="/" class="text-xl font-heading font-bold text-primary hover:text-accent transition-colors duration-200">
        {{ siteName }}
      </router-link>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-8">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="text-sm text-secondary hover:text-accent transition-colors duration-200"
          active-class="text-accent font-semibold"
        >
          {{ item.label }}
        </router-link>
        <LanguageToggle />
      </div>

      <!-- Mobile hamburger -->
      <button
        @click="menuOpen = !menuOpen"
        class="md:hidden p-2 text-secondary hover:text-primary transition-colors duration-200 cursor-pointer"
        aria-label="Toggle menu"
      >
        <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="menuOpen" class="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="text-sm text-secondary hover:text-accent transition-colors duration-200"
        active-class="text-accent font-semibold"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </router-link>
      <LanguageToggle />
    </div>
  </nav>

  <!-- Spacer to prevent content from hiding behind fixed navbar -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageToggle from './LanguageToggle.vue'

const { t, locale } = useI18n()
const menuOpen = ref(false)

const siteName = 'zhangyang'

const navItems = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/articles', label: t('nav.articles') },
  { path: '/projects', label: t('nav.projects') },
  { path: '/photography', label: t('nav.photography') },
])
</script>
