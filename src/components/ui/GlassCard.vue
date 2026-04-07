<template>
  <div class="glass-card glass-panel" :class="{ 'card-elevate': withGlow }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ withGlow?: boolean }>()
</script>

<style scoped>
.glass-card {
  padding: 32px;
}

.glass-card::before {
  content: '';
  position: absolute; 
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  opacity: 0.2;
  transition: opacity 0.4s;
  pointer-events: none;
}

.glass-card:hover::before {
  opacity: 0.6;
}

.glass-card.card-elevate:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
}
</style>
