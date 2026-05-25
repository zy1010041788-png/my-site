<template>
  <div class="max-w-3xl mx-auto px-6 py-20">
    <ScrollReveal>
      <h1 class="text-4xl font-heading text-primary mb-12 text-center">{{ $t('resume.title') }}</h1>
    </ScrollReveal>

    <ScrollReveal>
      <section class="mb-14">
        <h2 class="text-2xl font-heading text-primary mb-6">{{ $t('resume.education') }}</h2>
        <Timeline :items="resumeData.education" type="education" />
      </section>
    </ScrollReveal>

    <ScrollReveal>
      <section class="mb-14">
        <h2 class="text-2xl font-heading text-primary mb-6">{{ $t('resume.experience') }}</h2>
        <Timeline :items="resumeData.experience" type="experience" />
      </section>
    </ScrollReveal>

    <ScrollReveal>
      <section>
        <h2 class="text-2xl font-heading text-primary mb-6">{{ $t('resume.skills') }}</h2>
        <div class="space-y-4">
          <div v-for="skill in resumeData.skills" :key="skill.name">
            <div class="flex justify-between text-sm text-secondary mb-1">
              <span>{{ skill.name }}</span>
              <span>{{ skill.level }}%</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-accent rounded-full transition-all duration-1000"
                :style="{ width: skill.level + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  </div>
</template>

<script setup>
import ScrollReveal from '../components/ScrollReveal.vue'
import Timeline from '../components/Timeline.vue'
import resumeData from '../data/resume.json'
</script>
