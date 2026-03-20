<template>
  <section class="features-section section">
    <div class="container">
      <p class="features-label mono text-dim">— security solutions</p>
      <h2 class="display-lg features-title">
        Automated Threat<br>
        Detection and Response.<br>
        <span class="text-green">10x Faster.</span>
      </h2>

      <div class="bento-grid">
        <!-- Card 1.0 — Network Monitoring -->
        <GlassCard withGlow class="bento-card card-lg reveal">
          <BracketNum num="1.0" />
          <div class="card-visual network-viz">
            <div class="viz-node" v-for="n in 8" :key="n"
                 :style="{ '--n': n }"></div>
          </div>
          <h3>Real-time Network<br>Intelligence</h3>
          <p>Every session evaluated by Gemini 2.5 in under 5ms. Zero latency overhead. Always on.</p>
        </GlassCard>

        <!-- Card 2.0 — eBPF -->
        <GlassCard withGlow class="bento-card card-tall reveal" style="transition-delay: 0.1s;">
          <BracketNum num="2.0" />
          <div class="card-visual ebpf-viz">
            <div class="kernel-ring"></div>
            <div class="kernel-label mono">eBPF XDP</div>
            <div class="kernel-time mono">&lt; 1μs</div>
          </div>
          <h3>Kernel-level<br>Enforcement</h3>
          <p>eBPF XDP kills sessions at the driver. Not filtered. Dead.</p>
        </GlassCard>

        <!-- Card 3.0 — Sentinel -->
        <GlassCard withGlow class="bento-card reveal" style="transition-delay: 0.2s;">
          <BracketNum num="3.0" />
          <div class="sentinel-badge mono">8+ years of experience</div>
          <h3>Sentinel AI</h3>
          <p>Learns your network's baseline. Detects deviations in real time.</p>
        </GlassCard>

        <!-- Card 4.0 — Trust Engine -->
        <GlassCard withGlow class="bento-card card-wide reveal" style="transition-delay: 0.3s;">
          <BracketNum num="4.0" />
          <p class="card-eyebrow mono">HOW WE CAN HELP</p>
          <div class="trust-icons">
            <span class="trust-icon">🔒</span>
            <span class="trust-icon">👁</span>
            <span class="trust-icon">⚡</span>
            <span class="trust-icon">🛡</span>
          </div>
          <h3>We're here to assist you in safeguarding your digital assets</h3>
        </GlassCard>

        <!-- Card 5.0 — Customised -->
        <GlassCard withGlow class="bento-card reveal" style="transition-delay: 0.4s;">
          <BracketNum num="5.0" />
          <p class="card-eyebrow mono">CUSTOMISED SOLUTIONS</p>
          <h3>Tailored to your organisation's threat model</h3>
          <p>4 deployment modes. Air-gap capable. Enterprise, startup, or defense.</p>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GlassCard from '@/components/ui/GlassCard.vue'
import BracketNum from '@/components/ui/BracketNum.vue'
</script>

<style scoped>
.features-section { padding: 80px 6vw 120px; }
.features-label { font-size: 11px; letter-spacing: 0.15em; margin-bottom: 16px; }
.features-title { margin-bottom: 60px; }
.bento-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 12px;
}
.card-lg  { grid-column: 1; grid-row: 1; }
.card-tall{ grid-column: 2; grid-row: 1 / 3; }
.card-wide{ grid-column: 1; grid-row: 2; }
.bento-card h3 {
  font-family: var(--font-display); font-size: 1.2rem;
  font-weight: 600; margin: 16px 0 10px;
}
.bento-card p { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }

/* Visualizations */
.network-viz {
  height: 120px; position: relative; margin: 16px 0;
}
.viz-node {
  position: absolute; width: 8px; height: 8px;
  border-radius: 50%; background: var(--green-primary);
  box-shadow: var(--glow-sm);
  animation: particle-drift 3s ease-in-out infinite;
  animation-delay: calc(var(--n) * 0.4s);
  top: calc(sin(var(--n)) * 40px + 50px);
  left: calc(var(--n) * 11%);
}
.ebpf-viz {
  display: flex; flex-direction: column; align-items: center;
  padding: 20px 0;
}
.kernel-ring {
  width: 80px; height: 80px; border-radius: 50%;
  border: 2px solid var(--green-primary);
  box-shadow: var(--glow-md), inset 0 0 20px rgba(57,255,20,0.1);
  animation: spin-slow 10s linear infinite;
  margin-bottom: 12px;
}
.kernel-label { font-size: 11px; color: var(--green-primary); }
.kernel-time  { font-size: 10px; color: var(--text-dim); margin-top: 4px; }
.sentinel-badge {
  display: inline-block; padding: 6px 16px;
  background: rgba(57,255,20,0.1);
  border: 1px solid var(--border-card);
  border-radius: 100px; font-size: 11px;
  color: var(--green-primary); margin-bottom: 16px;
}
.card-eyebrow { font-size: 10px; letter-spacing: 0.15em; color: var(--text-dim); margin-bottom: 16px; }
.trust-icons { display: flex; gap: 12px; margin: 16px 0; font-size: 24px; }

@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
  }
  .card-lg { grid-column: 1 / -1; }
  .card-tall { grid-column: 1; grid-row: 2; height: 100%; }
  .card-wide { grid-column: 1 / -1; grid-row: 3; }
}
@media (max-width: 640px) {
  .bento-grid { grid-template-columns: 1fr; }
  .card-lg, .card-tall, .card-wide, .bento-card { grid-column: 1; grid-row: auto; }
}
</style>
