<template>
  <span class="bracket-num mono">[ {{ num }} ]</span>
</template>

<script setup lang="ts">
defineProps<{ num: string }>()
</script>

<style scoped>
.bracket-num {
  font-size: 10px; color: var(--text-dim);
  letter-spacing: 0.1em;
}
</style>
