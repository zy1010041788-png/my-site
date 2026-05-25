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
        <div class="flex items-center gap-3 mb-4">
          <span class="px-2.5 py-0.5 text-xs rounded-full font-medium" :class="statusClass">{{ statusLabel }}</span>
          <span class="text-sm text-gray-400">{{ $t('articles.publishedOn') }} {{ article.date }}</span>
        </div>

        <h1 class="text-3xl md:text-4xl font-heading text-primary mb-6">{{ articleTitle }}</h1>
      </ScrollReveal>

      <ScrollReveal>
        <div class="mb-4">
          <h3 class="text-sm text-gray-400 mb-1">{{ $t('articles.authors') }}</h3>
          <p class="text-secondary">
            <template v-for="(author, i) in article.authors" :key="i">
              <span :class="author.first ? 'text-accent font-semibold' : ''">{{ author.name }}</span
              ><span v-if="i < article.authors.length - 1">, </span>
            </template>
          </p>
        </div>

        <div class="mb-4">
          <h3 class="text-sm text-gray-400 mb-1">Journal</h3>
          <p class="text-secondary">{{ article.journal }}</p>
        </div>

        <div v-if="article.doiUrl" class="mb-4">
          <a
            :href="article.doiUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-accent hover:underline"
          >
            {{ $t('articles.doi') }} &rarr;
          </a>
        </div>

        <div class="mb-4">
          <div class="flex flex-wrap gap-1.5">
            <span v-for="kw in article.keywords" :key="kw" class="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">
              {{ kw }}
            </span>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-8">
          <span class="px-2.5 py-0.5 text-xs rounded text-white font-medium" :class="jcrColorClass(article.jcr)">{{ article.jcr }}</span>
          <span class="px-2.5 py-0.5 text-xs rounded text-white bg-blue-500">IF={{ article.jcrIf }}</span>
          <span v-if="locale === 'zh' && article.cas" class="px-2.5 py-0.5 text-xs rounded text-white" :class="casColorClass(article.cas)">中科院{{ article.cas }}</span>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div class="prose prose-gray max-w-none">
          <h2 class="text-xl text-primary mb-3">Abstract</h2>
          <p class="text-secondary leading-relaxed whitespace-pre-line">{{ abstractText }}</p>
        </div>
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

const abstractText = computed(() => {
  if (!article.value) return ''
  return locale.value === 'zh' ? article.value.abstract : (article.value.abstractEn || article.value.abstract)
})

const statusLabel = computed(() => {
  if (!article.value) return ''
  if (article.value.status === 'published') return locale.value === 'zh' ? '已发表' : 'Published'
  if (article.value.status === 'accepted') return locale.value === 'zh' ? '已接收' : 'Accepted'
  if (article.value.status === 'review') return locale.value === 'zh' ? '审稿中' : 'Under Review'
  return article.value.status
})

const statusClass = computed(() => {
  const map = {
    published: 'bg-green-100 text-green-700',
    accepted: 'bg-amber-100 text-amber-700',
    review: 'bg-blue-100 text-blue-700',
  }
  return map[article.value?.status] || 'bg-gray-100 text-gray-600'
})

function jcrColorClass(jcr) {
  const map = { Q1: 'bg-blue-600', Q2: 'bg-blue-400', Q3: 'bg-blue-300', Q4: 'bg-blue-200' }
  return map[jcr] || 'bg-blue-400'
}

function casColorClass(cas) {
  if (!cas) return 'bg-blue-400'
  if (cas.startsWith('1')) return 'bg-blue-600'
  if (cas.startsWith('2')) return 'bg-blue-400'
  if (cas.startsWith('3')) return 'bg-blue-300'
  return 'bg-blue-200'
}
</script>
