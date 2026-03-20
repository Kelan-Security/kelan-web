<template>
  <section class="about-section section">
    <div class="container container-wide">
      <div class="about-grid">
        <div class="about-text reveal">
          <SectionBadge text="Inception" />
          <h2 class="display-md text-main">
            We built something that lives at a layer nobody else is watching.
          </h2>
          <p class="desc">
            Traditional firewalls are blind to intent. Kelan Security was born out of a realization that security needs to be proactive, evaluating transport logic before handshakes finalize. Native Rust. Deep in the kernel.
          </p>
          <div class="founder-sig mono mt-xl">
            — Tanush, Founder
          </div>
        </div>

        <div class="about-stats reveal" style="transition-delay: 0.2s;">
          <GlassCard v-for="item in stats" :key="item.label" class="stat-box" withGlow>
            <div class="stat-val display-md">{{ item.val }}</div>
            <div class="stat-label mono">{{ item.label }}</div>
          </GlassCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlassCard from '@/components/ui/GlassCard.vue'

const stats = [
  { val: '1', label: 'FOUNDER' },
  { val: '6', label: 'MONTHS OF R&D' },
  { val: 'IN', label: 'LOCATED IN INDIA' },
  { val: 'RS', label: 'BUILT IN RUST' },
  { val: '131+', label: 'TESTS PASSING' },
]
</script>

<style scoped>
.about-section {
  background: var(--bg-void); padding: 120px 6vw;
}
.container-wide { max-width: 1280px; }
.about-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
}
.text-main { margin-bottom: 24px; line-height: 1.2; }
.desc { color: var(--text-secondary); line-height: 1.7; font-size: 16px; max-width: 480px; }
.mt-xl { margin-top: 40px; color: var(--green-primary); font-size: 11px; opacity: 0.8; }

.about-stats {
  display: flex; flex-wrap: wrap; gap: 16px; justify-content: flex-end;
}
.stat-box {
  width: calc(50% - 8px); text-align: center; padding: 40px 20px;
}
.stat-val { color: var(--text-primary); margin-bottom: 8px; }
.stat-label { font-size: 10px; color: var(--text-dim); letter-spacing: 0.1em; }

@media (max-width: 1024px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-stats { justify-content: flex-start; }
}
@media (max-width: 640px) {
  .stat-box { width: 100%; }
}
</style>
