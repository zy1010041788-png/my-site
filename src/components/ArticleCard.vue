<template>
  <div
    class="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
    @click="router.push(`/articles/${article.id}`)"
    role="link"
    tabindex="0"
    @keydown.enter="router.push(`/articles/${article.id}`)"
  >
    <span class="absolute top-3 right-3 px-2.5 py-0.5 text-xs rounded-full font-medium" :class="statusClass">
      {{ statusLabel }}
    </span>

    <h3 class="text-xl text-primary mb-2 pr-24">{{ articleTitle }}</h3>

    <p v-if="article.authors && article.authors.length" class="text-sm text-secondary mb-3">
      <template v-for="(author, i) in article.authors" :key="i">
        <span :class="author.first ? 'text-accent font-semibold' : ''">{{ author.name }}</span
        ><span v-if="i < article.authors.length - 1">, </span>
      </template>
    </p>

    <div v-if="article.keywords && article.keywords.length" class="flex flex-wrap gap-1.5 mb-3">
      <span v-for="kw in article.keywords" :key="kw" class="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">
        {{ kw }}
      </span>
    </div>

    <div v-if="article.jcr" class="flex flex-wrap items-center gap-1.5 mb-3">
      <span class="px-2 py-0.5 text-xs rounded text-white font-medium" :class="jcrColorClass(article.jcr)">{{ article.jcr }}</span>
      <span v-if="article.jcrIf" class="px-2 py-0.5 text-xs rounded text-white font-medium" :class="jcrColorClass(article.jcr)">IF={{ article.jcrIf }}</span>
      <span v-if="locale === 'zh' && article.cas" class="px-2 py-0.5 text-xs rounded text-white font-medium" :class="casColorClass(article.cas)">中科院{{ article.cas }}</span>
      <span v-if="article.journalAbbr" class="text-xs text-gray-400 ml-1">{{ article.journalAbbr }}</span>
    </div>

    <div class="flex items-center gap-3 text-xs text-gray-400">
      <time v-if="article.date">{{ article.date }}</time>
      <a
        v-if="article.doiUrl"
        :href="article.doiUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-accent hover:underline"
        @click.stop
      >DOI</a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  article: { type: Object, required: true },
})

const router = useRouter()
const { locale } = useI18n()

const articleTitle = computed(() => locale.value === 'zh' ? props.article.title : (props.article.titleEn || props.article.title))

const statusLabel = computed(() => {
  if (props.article.status === 'published') return locale.value === 'zh' ? '已发表' : 'Published'
  if (props.article.status === 'accepted') return locale.value === 'zh' ? '已接收' : 'Accepted'
  if (props.article.status === 'ongoing') return locale.value === 'zh' ? '进行中' : 'Ongoing'
  if (props.article.status === 'review') return locale.value === 'zh' ? '审稿中' : 'Under Review'
  return props.article.status
})

const statusClass = computed(() => {
  const map = {
    published: 'bg-green-100 text-green-700',
    accepted: 'bg-amber-100 text-amber-700',
    ongoing: 'bg-purple-100 text-purple-700',
    review: 'bg-blue-100 text-blue-700',
  }
  return map[props.article.status] || 'bg-gray-100 text-gray-600'
})

function jcrColorClass(jcr) {
  const map = { Q1: 'bg-blue-700', Q2: 'bg-blue-500', Q3: 'bg-blue-400', Q4: 'bg-blue-300' }
  return map[jcr] || 'bg-blue-500'
}

function casColorClass(cas) {
  if (!cas) return 'bg-blue-500'
  if (cas.startsWith('1')) return 'bg-blue-700'
  if (cas.startsWith('2')) return 'bg-blue-500'
  if (cas.startsWith('3')) return 'bg-blue-400'
  return 'bg-blue-300'
}
</script>
