<template>
  <div class="max-w-3xl mx-auto px-6 py-20">
    <!-- Profile -->
    <ScrollReveal>
      <div class="flex flex-col items-center text-center mb-16">
        <div class="w-32 h-32 rounded-full bg-gray-200 mb-6 overflow-hidden">
          <img v-if="avatarSrc" :src="avatarSrc" alt="Avatar" class="w-full h-full object-cover" />
        </div>
        <h1 class="text-4xl md:text-5xl font-heading text-primary mb-3">
          {{ displayName }}
        </h1>
        <p class="text-lg text-secondary mb-2">{{ $t('home.subtitle') }}</p>
        <a :href="'mailto:' + email" class="text-sm text-accent hover:underline transition-colors duration-200">{{ email }}</a>
      </div>
    </ScrollReveal>

    <!-- Education -->
    <ScrollReveal>
      <section class="mb-14">
        <h2 class="text-2xl text-primary mb-6">{{ $t('home.education') }}</h2>
        <Timeline :items="resumeData.education" type="education" />
      </section>
    </ScrollReveal>

    <!-- Skills -->
    <ScrollReveal>
      <section class="mb-14">
        <h2 class="text-2xl text-primary mb-4">{{ $t('home.skills') }}</h2>
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

    <!-- Interests -->
    <ScrollReveal>
      <section>
        <h2 class="text-2xl text-primary mb-4">{{ $t('home.interests') }}</h2>
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ScrollReveal from '../components/ScrollReveal.vue'
import Timeline from '../components/Timeline.vue'
import resumeData from '../data/resume.json'

const { locale } = useI18n()

const displayName = computed(() => locale.value === 'zh' ? '张扬' : 'Zhang Yang')
const email = '23s035039@stu.hit.edu.cn'
const avatarSrc = ref('')
const skills = ref(['ArcGIS', 'Tableau', 'SPSS', 'Python', 'Photoshop', 'Illustrator', 'InDesign', 'SketchUp', 'AutoCAD'])
const interests = computed(() => locale.value === 'zh'
  ? ['摄影', '网球 (3.0)', '马拉松 (4:31:16)']
  : ['Photography', 'Tennis (3.0)', 'Marathon (4:31:16)']
)
</script>
