<template>
  <button
    @click="toggleLocale"
    class="px-3 py-1 text-sm border border-gray-300 rounded-full hover:border-accent hover:text-accent transition-colors duration-200 cursor-pointer"
  >
    {{ locale === 'zh' ? 'EN' : '中文' }}
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggleLocale() {
  const next = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = next
  localStorage.setItem('locale', next)
}
</script>
