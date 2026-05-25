<template>
  <footer class="border-t border-gray-200 bg-white mt-20">
    <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <!-- GitHub -->
        <a
          v-if="links.github"
          :href="links.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-secondary hover:text-primary transition-colors duration-200"
          aria-label="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        </a>

        <!-- Email -->
        <a
          v-if="links.email"
          :href="'mailto:' + links.email"
          class="text-secondary hover:text-primary transition-colors duration-200"
          aria-label="Email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>

      <p class="text-xs text-gray-400">
        &copy; {{ year }} {{ name }}. {{ $t('footer.builtWith') }}.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const year = new Date().getFullYear()
const name = ref('Your Name')
const links = ref({
  github: 'https://github.com/your-username',
  email: 'your-email@example.com',
})
</script>
