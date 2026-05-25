<template>
  <router-link
    :to="`/articles/${article.id}`"
    class="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <div class="flex flex-wrap gap-2 mb-3">
      <span
        v-for="tag in article.tags"
        :key="tag"
        class="px-2 py-0.5 bg-gray-100 text-xs text-secondary rounded"
      >
        {{ tag }}
      </span>
    </div>
    <h3 class="font-heading text-xl text-primary mb-2">{{ articleTitle }}</h3>
    <p class="text-sm text-secondary mb-4 line-clamp-2">{{ articleSummary }}</p>
    <time class="text-xs text-gray-400">{{ article.date }}</time>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  article: { type: Object, required: true },
})

const { locale } = useI18n()

const articleTitle = computed(() => locale.value === 'zh' ? props.article.title : (props.article.titleEn || props.article.title))
const articleSummary = computed(() => locale.value === 'zh' ? props.article.summary : (props.article.summaryEn || props.article.summary))
</script>
