<template>
  <div class="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <div class="aspect-video bg-gray-100 overflow-hidden">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="projectTitle"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      </div>
    </div>
    <div class="p-5">
      <h3 class="text-xl text-primary mb-2">{{ projectTitle }}</h3>
      <p class="text-sm text-secondary mb-3 line-clamp-2">{{ projectSummary }}</p>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in projectTags"
          :key="tag"
          class="px-2 py-0.5 text-xs rounded border"
          :class="project.tagClass || 'bg-gray-100 text-secondary border-gray-200'"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <a
      v-if="project.link"
      :href="project.link"
      target="_blank"
      rel="noopener noreferrer"
      class="block px-5 pb-5"
    >
      <span class="text-sm text-accent hover:underline">{{ $t('projects.viewProject') }} &rarr;</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  project: { type: Object, required: true },
})

const { locale } = useI18n()

const projectTitle = computed(() => locale.value === 'zh' ? props.project.title : (props.project.titleEn || props.project.title))
const projectSummary = computed(() => locale.value === 'zh' ? props.project.summary : (props.project.summaryEn || props.project.summary))
const projectTags = computed(() => locale.value === 'zh' ? props.project.tags : (props.project.tagsEn || props.project.tags))
</script>
