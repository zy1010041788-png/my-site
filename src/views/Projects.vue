<template>
  <div class="max-w-6xl mx-auto px-6 py-20">
    <ScrollReveal>
      <h1 class="text-4xl font-heading text-primary mb-10 text-center">{{ $t('projects.title') }}</h1>
    </ScrollReveal>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ScrollReveal v-for="project in projects" :key="project.id">
        <ProjectCard :project="project" />
      </ScrollReveal>
    </div>

    <div v-if="projects.length === 0" class="text-center text-secondary py-20">
      <p>No projects yet.</p>
    </div>
  </div>
</template>

<script setup>
import ScrollReveal from '../components/ScrollReveal.vue'
import ProjectCard from '../components/ProjectCard.vue'
import projects from '../data/projects.json'
</script>
