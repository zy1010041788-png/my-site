<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center cursor-pointer"
      @click="$emit('close')"
      @keydown.escape="$emit('close')"
    >
      <button
        class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        @click="$emit('close')"
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <button
        v-if="hasPrev"
        class="absolute left-4 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        @click.stop="$emit('prev')"
        aria-label="Previous photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      <button
        v-if="hasNext"
        class="absolute right-4 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        @click.stop="$emit('next')"
        aria-label="Next photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <img
        :src="src"
        :alt="alt"
        class="max-h-[90vh] max-w-[90vw] object-contain"
        @click.stop
      />
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, required: true },
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  hasPrev: { type: Boolean, default: false },
  hasNext: { type: Boolean, default: false },
})

defineEmits(['close', 'prev', 'next'])
</script>
