<template>
  <button class="glow-btn" :class="variant" @click="$emit('click')">
    <span>{{ label }}</span>
    <div v-if="variant === 'pill'" class="btn-dot"></div>
    <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
defineProps<{ label: string; variant?: 'pill' | 'outline' | 'solid' }>()
defineEmits(['click'])
</script>

<style scoped>
.glow-btn {
  display: inline-flex; align-items: center; gap: 10px;
  border-radius: 100px; cursor: pointer;
  font-family: var(--font-mono); font-size: 13px;
  transition: all 0.25s ease;
}
.glow-btn.pill, .glow-btn:not(.outline):not(.solid) {
  padding: 12px 24px 12px 28px;
  background: rgba(57,255,20,0.08);
  border: 1px solid var(--border-card);
  color: var(--text-primary);
}
.glow-btn.pill:hover, .glow-btn:not(.outline):not(.solid):hover {
  background: rgba(57,255,20,0.15);
  border-color: var(--border-active);
  box-shadow: var(--glow-sm);
}
.glow-btn.solid {
  padding: 14px 32px;
  background: var(--green-primary);
  border: none; color: #000; font-weight: 700;
}
.glow-btn.solid:hover { box-shadow: var(--glow-md); transform: translateY(-1px); }
.glow-btn.outline {
  padding: 12px 28px;
  background: transparent;
  border: 1px solid var(--border-card);
  color: var(--text-secondary);
}
.glow-btn.outline:hover {
  border-color: var(--border-active);
  color: var(--green-primary);
}
.btn-dot {
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--green-primary); box-shadow: var(--glow-sm);
}
</style>
