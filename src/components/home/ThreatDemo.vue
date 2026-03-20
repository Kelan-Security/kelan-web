<template>
  <section class="threat-demo section">
    <div class="container container-wide">
      <SectionBadge text="Live Comparison" class="reveal" />
      <h2 class="display-md mb-xl reveal" style="transition-delay: 0.1s;">Split-second mitigation.</h2>

      <div class="demo-split">
        <!-- Without Kelan Security -->
        <GlassCard class="demo-pane demo-bad reveal" style="transition-delay: 0.2s;">
          <div class="pane-header">
            <span class="mono">WITHOUT KELAN</span>
            <div class="status-dot bad"></div>
          </div>
          <div class="demo-stage">
            <div class="hacker-node">HACKER</div>
            <div class="connection-line bad-line animated"></div>
            <div class="server-node breached">SERVER</div>
          </div>
          <div class="demo-logs mono">
            <p>[0ms] TCP SYN received</p>
            <p>[2ms] TCP SYN-ACK sent</p>
            <p>[5ms] Handshake complete</p>
            <p style="color: #ff3333;">[12ms] Payload executed. Breach.</p>
          </div>
        </GlassCard>

        <!-- With Kelan Security -->
        <GlassCard class="demo-pane demo-good reveal" style="transition-delay: 0.3s;" withGlow>
          <div class="pane-header">
            <span class="mono text-green">WITH KELAN</span>
            <div class="status-dot good"></div>
          </div>
          <div class="demo-stage">
            <div class="hacker-node">HACKER</div>
            <div class="connection-line good-line blocked"></div>
            <div class="server-node protected">SERVER</div>
          </div>
          <div class="demo-logs mono">
            <p>[0.0ms] AITP Hello intercepted</p>
            <p>[0.8ms] Trust Eval: <span class="score-counter">{{ score }}</span>/255</p>
            <p class="text-green">[2.1ms] Intent declared malicious</p>
            <p class="text-green">[2.1ms] XDP KILL SIGNED.</p>
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlassCard from '@/components/ui/GlassCard.vue'

const score = ref(255)

onMounted(() => {
  // Simulate score dropping
  setInterval(() => {
    score.value = 255
    setTimeout(() => {
      let current = 255
      const drop = setInterval(() => {
        current -= 15
        if(current <= 18) {
          current = 18
          clearInterval(drop)
        }
        score.value = current
      }, 50)
    }, 1000)
  }, 4000)
})
</script>

<style scoped>
.threat-demo { background: var(--bg-deep); padding-bottom: 140px; }
.mb-xl { margin-bottom: 60px; }
.demo-split {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}
.demo-pane { padding: 40px; display: flex; flex-direction: column; }
.pane-header {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 12px; letter-spacing: 0.1em; margin-bottom: 40px;
}
.status-dot { width: 8px; height: 8px; border-radius: 50%; }
.status-dot.bad { background: #ff3333; box-shadow: 0 0 8px #ff3333; }
.status-dot.good { background: var(--green-primary); box-shadow: var(--glow-sm); }

.demo-stage {
  height: 140px; position: relative; display: flex;
  align-items: center; justify-content: space-between;
  margin-bottom: 40px; border-bottom: 1px solid var(--border-subtle);
}
.hacker-node, .server-node {
  font-family: var(--font-mono); font-size: 11px;
  padding: 12px 20px; border: 1px solid var(--border-card);
  background: var(--bg-void); border-radius: 4px;
  position: relative; z-index: 2;
}
.server-node.breached { border-color: #ff3333; color: #ff3333; }
.server-node.protected { border-color: var(--green-primary); box-shadow: var(--glow-sm); }
.connection-line {
  position: absolute; top: 50%; left: 100px; right: 100px; height: 2px;
  transform: translateY(-50%); z-index: 1;
}
.bad-line { background: #ff3333; opacity: 0.5; }
.bad-line.animated { animation: scan-line 1s infinite alternate; }
.good-line { background: var(--green-primary); opacity: 0.2; }
.good-line.blocked {
  right: 50%;
  background: linear-gradient(90deg, var(--green-primary), transparent);
}
.good-line.blocked::after {
  content: 'x'; position: absolute; right: -10px; top: -14px;
  color: var(--green-primary); font-family: monospace; font-size: 20px;
}
.demo-logs {
  font-size: 11px; line-height: 1.8; color: var(--text-dim);
  background: rgba(0,0,0,0.3); padding: 16px; border-radius: 8px;
  height: 120px;
}

@media (max-width: 768px) {
  .demo-split { grid-template-columns: 1fr; }
}
</style>
