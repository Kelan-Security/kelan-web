<template>
  <div class="section-badge mono">
    <span class="bracket">[</span>
    <span>{{ text }}</span>
    <span class="bracket">]</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<style scoped>
.section-badge {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; letter-spacing: 0.15em;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 24px;
}
.bracket { color: var(--green-primary); opacity: 0.7; }
</style>
