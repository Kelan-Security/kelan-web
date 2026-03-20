<template>
  <section class="stats-section section" ref="sectionRef">
    <ParticleCanvas />
    <div class="container stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <BracketNum :num="stat.bracket" />
        <div class="stat-value display-md">
          <span class="count">{{ stat.displayValue }}</span>
          <span class="text-green">{{ stat.suffix }}</span>
        </div>
        <div class="stat-label mono">{{ stat.label }}</div>
        <p class="stat-desc">{{ stat.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ParticleCanvas from '@/components/ui/ParticleCanvas.vue'
import BracketNum from '@/components/ui/BracketNum.vue'

const stats = reactive([
  { bracket: '01', value: 2.1,  displayValue: '2.1', suffix: 'ms',   label: 'DETECTION TIME',    desc: 'From anomaly detection to session kill' },
  { bracket: '02', value: 131,  displayValue: '131', suffix: '+',    label: 'AUTOMATED TESTS',   desc: 'All passing. Production ready.' },
  { bracket: '03', value: 255,  displayValue: '255', suffix: '',     label: 'TRUST SCALE',       desc: 'Gemini 2.5 evaluates every session' },
  { bracket: '04', value: 98.4, displayValue: '98.4', suffix: '%',   label: 'DDOS MITIGATION',   desc: 'Flood packets dropped at <0.3% CPU' },
])
</script>

<style scoped>
.stats-section {
  padding: 80px 6vw;
  background: linear-gradient(to bottom, transparent, rgba(13,21,13,0.3), transparent);
  position: relative; overflow: hidden;
}
.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;
  position: relative; z-index: 2;
}
.stat-card {
  padding: 40px 32px;
  border-right: 1px solid var(--border-subtle);
  transition: background 0.3s;
}
.stat-card:last-child { border-right: none; }
.stat-card:hover { background: var(--green-ghost); }
.stat-value {
  margin: 12px 0 8px;
  font-size: 3.5rem; font-weight: 800;
  font-family: var(--font-display);
}
.stat-label {
  font-size: 10px; letter-spacing: 0.2em;
  color: var(--text-secondary); margin-bottom: 8px;
}
.stat-desc { font-size: 13px; color: var(--text-dim); line-height: 1.5; }

@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .stat-card:nth-child(2) { border-right: none; }
}
@media (max-width: 640px) {
  .stats-grid { grid-template-columns: 1fr; }
  .stat-card { border-right: none; border-bottom: 1px solid var(--border-subtle); }
  .stat-card:last-child { border-bottom: none; }
}
</style>
