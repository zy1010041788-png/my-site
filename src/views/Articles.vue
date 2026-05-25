<template>
  <div class="max-w-3xl mx-auto px-6 py-20">
    <ScrollReveal>
      <h1 class="text-4xl font-heading text-primary mb-10 text-center">{{ $t('articles.title') }}</h1>
    </ScrollReveal>

    <div class="flex flex-col gap-4">
      <ScrollReveal v-for="article in articles" :key="article.id">
        <ArticleCard :article="article" />
      </ScrollReveal>
    </div>

    <div v-if="articles.length === 0" class="text-center text-secondary py-20">
      <p>No articles yet.</p>
    </div>
  </div>
</template>

<script setup>
import ScrollReveal from '../components/ScrollReveal.vue'
import ArticleCard from '../components/ArticleCard.vue'
import articles from '../data/articles.json'
</script>
