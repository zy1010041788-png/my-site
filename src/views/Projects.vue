<template>
  <div class="max-w-6xl mx-auto px-6 py-20">
    <ScrollReveal>
      <h1 class="text-4xl font-heading text-primary mb-10 text-center">{{ $t('projects.title') }}</h1>
    </ScrollReveal>

    <section class="mb-14">
      <h2 class="text-2xl text-primary mb-6">{{ $t('projects.urbanResearch') }}</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal v-for="project in researchProjects" :key="project.id">
          <ProjectCard :project="project" />
        </ScrollReveal>
      </div>
    </section>

    <section>
      <h2 class="text-2xl text-primary mb-6">{{ $t('projects.toolsDev') }}</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal v-for="project in devProjects" :key="project.id">
          <ProjectCard :project="project" />
        </ScrollReveal>
      </div>
    </section>

    <div v-if="projects.length === 0" class="text-center text-secondary py-20">
      <p>No projects yet.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ScrollReveal from '../components/ScrollReveal.vue'
import ProjectCard from '../components/ProjectCard.vue'
import projects from '../data/projects.json'

const researchProjects = computed(() => projects.filter(p => p.category === 'research'))
const devProjects = computed(() => projects.filter(p => p.category === 'dev'))
</script>
