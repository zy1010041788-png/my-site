<template>
  <div class="max-w-6xl mx-auto px-6 py-20">
    <ScrollReveal>
      <h1 class="text-4xl font-heading text-primary mb-10 text-center">{{ $t('photography.title') }}</h1>
    </ScrollReveal>

    <!-- Category filter tabs -->
    <ScrollReveal>
      <div class="flex justify-center gap-3 mb-10 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          :class="[
            'px-4 py-1.5 rounded-full text-sm transition-colors duration-200 cursor-pointer',
            activeCategory === cat
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-200 text-secondary hover:border-accent hover:text-accent'
          ]"
        >
          {{ cat === 'all' ? $t('photography.all') : cat }}
        </button>
      </div>
    </ScrollReveal>

    <!-- Photo grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <ScrollReveal v-for="(photo, index) in filteredPhotos" :key="index">
        <div
          class="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
          @click="openLightbox(index)"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </ScrollReveal>
    </div>

    <div v-if="filteredPhotos.length === 0" class="text-center text-secondary py-20">
      <p>Add your photos to <code class="bg-gray-100 px-1 rounded">public/photos/</code></p>
    </div>

    <!-- Lightbox -->
    <Lightbox
      :visible="lightboxVisible"
      :src="currentPhoto?.src || ''"
      :alt="currentPhoto?.alt || ''"
      :hasPrev="lightboxIndex > 0"
      :hasNext="lightboxIndex < filteredPhotos.length - 1"
      @close="lightboxVisible = false"
      @prev="lightboxIndex--"
      @next="lightboxIndex++"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ScrollReveal from '../components/ScrollReveal.vue'
import Lightbox from '../components/Lightbox.vue'

const activeCategory = ref('all')
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

const photos = ref([])

const categories = computed(() => {
  const cats = new Set(photos.value.map(p => p.category))
  return ['all', ...Array.from(cats)]
})

const filteredPhotos = computed(() => {
  if (activeCategory.value === 'all') return photos.value
  return photos.value.filter(p => p.category === activeCategory.value)
})

const currentPhoto = computed(() => filteredPhotos.value[lightboxIndex] || null)

function openLightbox(index) {
  lightboxIndex.value = index
  lightboxVisible.value = true
}
</script>
