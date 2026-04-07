<template>
  <div class="section-badge mono">
    <div class="badge-dot"></div>
    <span class="badge-text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<style scoped>
.section-badge {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 11px; letter-spacing: 0.15em;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 24px;
  
  /* Glassmorphism Pill */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 16px;
  border-radius: 100px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.badge-dot {
  width: 6px; 
  height: 6px; 
  border-radius: 50%;
  background: var(--text-dim);
  animation: pulse-soft 3s ease-in-out infinite;
}

@keyframes pulse-soft {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
</style>
