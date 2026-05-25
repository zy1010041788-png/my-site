<template>
  <div class="relative pl-8 border-l-2 border-gray-200">
    <div v-for="(item, index) in items" :key="index" class="mb-10 last:mb-0 relative">
      <div class="absolute -left-[2.15rem] top-1 w-3 h-3 rounded-full bg-accent border-2 border-white"></div>
      <span class="text-xs text-accent font-semibold tracking-wide">{{ item.period }}</span>
      <h3 class="text-lg font-heading text-primary mt-1">{{ itemHeading(item) }}</h3>
      <p class="text-sm text-secondary mt-1">{{ itemSubheading(item) }}</p>
      <p v-if="itemDescription(item)" class="text-sm text-gray-400 mt-2">{{ itemDescription(item) }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  items: { type: Array, required: true },
  type: { type: String, default: 'education' },
})

const { locale } = useI18n()

function itemHeading(item) {
  if (props.type === 'education') return locale.value === 'zh' ? item.school : (item.schoolEn || item.school)
  return locale.value === 'zh' ? item.company : (item.companyEn || item.company)
}

function itemSubheading(item) {
  if (props.type === 'education') return locale.value === 'zh' ? item.degree : (item.degreeEn || item.degree)
  return locale.value === 'zh' ? item.role : (item.roleEn || item.role)
}

function itemDescription(item) {
  return locale.value === 'zh' ? item.description : (item.descriptionEn || item.description)
}
</script>
