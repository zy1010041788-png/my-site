<template>
  <div class="max-w-3xl mx-auto px-6 py-20">
    <div v-if="article">
      <router-link
        to="/articles"
        class="inline-flex items-center gap-1 text-sm text-secondary hover:text-accent transition-colors duration-200 mb-8"
      >
        &larr; {{ $t('articles.back') }}
      </router-link>

      <ScrollReveal>
        <h1 class="text-3xl md:text-4xl font-heading text-primary mb-4">{{ articleTitle }}</h1>
      </ScrollReveal>

      <ScrollReveal>
        <div class="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-400">
          <time>{{ $t('articles.publishedOn') }} {{ article.date }}</time>
          <div class="flex gap-1.5">
            <span v-for="tag in article.tags" :key="tag" class="px-2 py-0.5 bg-gray-100 text-xs text-secondary rounded">
              {{ tag }}
            </span>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <article
          class="prose prose-gray max-w-none"
          v-html="renderedContent"
        ></article>
      </ScrollReveal>
    </div>

    <div v-else class="text-center text-secondary py-20">
      <p>Article not found.</p>
      <router-link to="/articles" class="text-accent hover:underline">{{ $t('articles.back') }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { marked } from 'marked'
import ScrollReveal from '../components/ScrollReveal.vue'
import articles from '../data/articles.json'

const route = useRoute()
const { locale } = useI18n()

const article = computed(() => {
  return articles.find(a => a.id === Number(route.params.id)) || null
})

const articleTitle = computed(() => {
  if (!article.value) return ''
  return locale.value === 'zh' ? article.value.title : (article.value.titleEn || article.value.title)
})

const renderedContent = computed(() => {
  if (!article.value) return ''
  const content = locale.value === 'zh' ? article.value.content : (article.value.contentEn || article.value.content)
  return marked(content)
})
</script>
