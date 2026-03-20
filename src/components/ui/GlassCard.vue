<template>
  <div class="glass-card" :class="{ glow: withGlow }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ withGlow?: boolean }>()
</script>

<style scoped>
.glass-card {
  background: var(--bg-glass);
  border: 1px solid var(--border-subtle);
  border-radius: var(--card-radius);
  padding: 28px;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.glass-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(57,255,20,0.3), transparent);
}
.glass-card:hover {
  border-color: var(--border-card);
  background: var(--bg-card-hover);
}
.glass-card.glow:hover {
  box-shadow: var(--glow-md);
}
</style>
