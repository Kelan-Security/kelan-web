<template>
  <section class="how-section section">
    <div class="container">
      <SectionBadge text="Protocol" />
      <h2 class="display-lg">
        5 phases.<br>
        <span class="text-green">0 blind spots.</span>
      </h2>

      <div class="phases-grid">
        <div
          v-for="(phase, i) in phases"
          :key="phase.title"
          class="phase-card reveal"
          :style="{ transitionDelay: (i * 0.1) + 's' }"
        >
          <GlassCard withGlow>
            <div class="phase-header">
              <span class="phase-num mono">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="phase-time mono">{{ phase.time }}</span>
            </div>
            <div class="phase-icon">{{ phase.icon }}</div>
            <h3 class="phase-title">{{ phase.title }}</h3>
            <p class="phase-desc">{{ phase.desc }}</p>
            <div class="phase-detail mono">{{ phase.detail }}</div>
          </GlassCard>
          <div v-if="i < phases.length - 1" class="phase-connector">→</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlassCard from '@/components/ui/GlassCard.vue'

const phases = [
  { icon: '🔐', title: 'AITP Hello',         time: '<0.1ms', detail: 'EntityID = SHA-256(pubkey)', desc: 'Device announces cryptographic identity. Anonymous = rejected.' },
  { icon: '🔑', title: 'Identity Exchange',   time: '<0.2ms', detail: 'Ed25519 challenge-response',  desc: 'Challenge issued. Private key proves ownership without exposure.' },
  { icon: '📋', title: 'Intent Declare',       time: '<0.3ms', detail: 'IntentCode signed + logged',  desc: 'Why are you connecting? Declared, signed, irrevocable.' },
  { icon: '🤖', title: 'AI Evaluation',        time: '<5ms',   detail: 'Gemini 2.5 Flash trust eval', desc: 'Behavioral history. Peer reputation. Context. Score 0-255.' },
  { icon: '⚡', title: 'eBPF Enforcement',     time: '<1μs',   detail: 'XDP kernel permit map',       desc: 'Allow or kill. At wire speed. Before any application sees it.' },
]
</script>

<style scoped>
.how-section { background: var(--bg-deep); }
.phases-grid {
  display: flex; align-items: stretch; gap: 0;
  margin-top: 60px; overflow-x: auto;
  padding-bottom: 16px;
}
.phase-card {
  flex: 1; min-width: 200px; position: relative;
  display: flex; align-items: stretch;
}
.phase-connector {
  display: flex; align-items: center; justify-content: center; width: 40px;
  color: var(--green-dim); font-size: 20px;
  flex-shrink: 0;
}
.phase-header {
  display: flex; justify-content: space-between;
  margin-bottom: 20px;
}
.phase-num { font-size: 11px; color: var(--green-primary); }
.phase-time { font-size: 10px; color: var(--text-dim); }
.phase-icon { font-size: 28px; margin-bottom: 16px; }
.phase-title {
  font-family: var(--font-display); font-size: 14px;
  font-weight: 700; letter-spacing: 0.05em;
  margin-bottom: 10px;
}
.phase-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; }
.phase-detail { font-size: 10px; color: var(--green-dim); letter-spacing: 0.05em; }

@media (max-width: 1024px) {
  .phases-grid { flex-direction: column; gap: 20px; }
  .phase-connector { display: none; }
}
</style>
