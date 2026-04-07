<template>
  <button class="glass-btn" :class="variant" @click="$emit('click')">
    <span class="btn-text">{{ label }}</span>
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
.glass-btn {
  display: inline-flex; align-items: center; gap: 10px;
  border-radius: 100px; cursor: pointer;
  font-family: var(--font-mono); font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  /* Default: frosted glass */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

.glass-btn.pill, .glass-btn:not(.outline):not(.solid) {
  padding: 14px 28px 14px 32px;
}

.glass-btn.solid {
  padding: 16px 36px;
  background: var(--text-primary);
  color: #000;
  border: none;
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.1);
}
.glass-btn.solid:hover {
  background: #FFF;
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2);
}

.glass-btn.outline {
  padding: 14px 32px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
  box-shadow: none;
}
.glass-btn.outline:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-dot {
  width: 16px; height: 16px; border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s;
}
.glass-btn:hover .btn-dot {
  background: #FFF;
  transform: scale(1.1);
}
</style>
