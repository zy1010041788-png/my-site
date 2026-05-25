<template>
  <div class="max-w-3xl mx-auto px-6 py-20">
    <ScrollReveal>
      <div class="flex flex-col items-center text-center mb-12">
        <div class="w-32 h-32 rounded-full bg-gray-200 mb-6 overflow-hidden">
          <!-- Replace src with your avatar image -->
          <img v-if="avatarSrc" :src="avatarSrc" alt="Avatar" class="w-full h-full object-cover" />
        </div>
        <h1 class="text-4xl md:text-5xl font-heading text-primary mb-3">
          <span v-if="$t('home.greeting')">{{ $t('home.greeting') }} </span><span class="text-accent">{{ name }}</span>
        </h1>
        <p class="text-lg text-secondary mb-6">{{ $t('home.role') }}</p>
        <p class="text-secondary leading-relaxed max-w-xl">{{ $t('home.bio') }}</p>
      </div>
    </ScrollReveal>

    <ScrollReveal>
      <section class="mb-12">
        <h2 class="text-2xl font-heading text-primary mb-4">{{ $t('home.skills') }}</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in skills"
            :key="skill"
            class="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-secondary hover:border-accent hover:text-accent transition-colors duration-200"
          >
            {{ skill }}
          </span>
        </div>
      </section>
    </ScrollReveal>

    <ScrollReveal>
      <section>
        <h2 class="text-2xl font-heading text-primary mb-4">{{ $t('home.interests') }}</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="interest in interests"
            :key="interest"
            class="px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm"
          >
            {{ interest }}
          </span>
        </div>
      </section>
    </ScrollReveal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ScrollReveal from '../components/ScrollReveal.vue'

const name = ref('张扬')
const avatarSrc = ref('')
const skills = ref(['ArcGIS', 'Tableau', 'SPSS', 'Python', 'Photoshop', 'Illustrator', 'InDesign', 'SketchUp', 'AutoCAD'])
const interests = ref(['摄影', '网球 (3.0)', '马拉松 (4:31:16)', '开源', '设计'])
</script>
