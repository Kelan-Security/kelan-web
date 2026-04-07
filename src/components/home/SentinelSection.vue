<template>
  <section class="sentinel-section section">
    <div class="container container-wide">
      <div class="sentinel-header reveal">
        <SectionBadge text="Sentinel AI" />
        <h2 class="display-lg">
          The Sentinel<br>
          <span class="text-green">never sleeps.</span>
        </h2>
        <p class="sentinel-desc">
          Continuous behavioral profiling of every entity. 
          When traffic deviates from the baseline, it's blocked instantly.
        </p>
      </div>

      <div class="sentinel-layout">
        <div class="graph-side reveal" style="transition-delay: 0.2s;">
          <GlassCard class="graph-card" withGlow>
            <div class="graph-wrapper">
              <div class="radar-scan"></div>
              <div v-for="n in 12" :key="n" class="graph-node"
                   :class="{ anomalous: n === 3 || n === 7 }"
                   :style="{ left: `${10 + Math.random()*80}%`, top: `${10 + Math.random()*80}%`, animationDelay: `${n * 0.3}s` }">
              </div>
            </div>
            <div class="graph-footer mono">
              <span>SCANNING NETWORK BASELINE</span>
              <span class="text-green">14,203 ENTITIES</span>
            </div>
          </GlassCard>
        </div>

        <div class="classes-side">
          <div class="anomalies-grid">
            <GlassCard v-for="(anomaly, i) in anomalyClasses" :key="anomaly.id" class="anomaly-card reveal" :style="{ transitionDelay: `${0.1 * i}s` }" withGlow>
              <div class="anomaly-top">
                <span class="mono class-id">CLASS {{ anomaly.id }}</span>
                <span class="mono text-dim">DETECTED</span>
              </div>
              <h4>{{ anomaly.name }}</h4>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlassCard from '@/components/ui/GlassCard.vue'

const anomalyClasses = [
  { id: '01', name: 'Volumetric Flood' },
  { id: '02', name: 'Protocol Fuzzing' },
  { id: '03', name: 'Slowloris' },
  { id: '04', name: 'C2 Beaconing' },
  { id: '05', name: 'Port Scanning' },
  { id: '06', name: 'Data Exfiltration' },
  { id: '07', name: 'Behavioral Drift' },
]
</script>

<style scoped>
.sentinel-section { background: var(--bg-void); }
.container-wide { max-width: 1400px; }
.sentinel-header { margin-bottom: 60px; max-width: 600px; }
.sentinel-desc { margin-top: 24px; color: var(--text-secondary); line-height: 1.6; }

.sentinel-layout {
  display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
}

.graph-card { height: 100%; display: flex; flex-direction: column; }
.graph-wrapper {
  flex: 1; min-height: 300px; position: relative;
  border-radius: 8px; overflow: hidden;
  background: radial-gradient(circle at center, rgba(13,21,13,0.8), rgba(3,5,4,1));
  border: 1px solid var(--border-subtle);
  margin-bottom: 24px;
}
.radar-scan {
  position: absolute; top: 50%; left: 50%; width: 200%; height: 200%;
  background: conic-gradient(from 0deg, transparent 70%, rgba(0, 255, 159,0.2) 100%);
  transform-origin: center;
  animation: spin-slow 4s linear infinite;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.graph-node {
  position: absolute; width: 6px; height: 6px; border-radius: 50%;
  background: var(--green-primary); box-shadow: var(--glow-sm);
  animation: pulse-glow 2s infinite;
}
.graph-node.anomalous {
  background: #ff3333; box-shadow: 0 0 10px rgba(255,51,51,0.5);
  animation: none;
}
.graph-footer {
  display: flex; justify-content: space-between; font-size: 10px;
  letter-spacing: 0.1em; color: var(--text-dim);
}

.classes-side { display: flex; align-items: stretch; }
.anomalies-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px; width: 100%;
}
.anomaly-card { 
  padding: 20px; 
  cursor: crosshair;
}
.anomaly-top {
  display: flex; justify-content: space-between; margin-bottom: 12px;
  font-size: 10px;
}
.class-id { color: var(--green-primary); opacity: 0.8; }
.anomaly-card h4 {
  font-family: var(--font-display); font-size: 15px; font-weight: 600;
  color: var(--text-primary);
}
.anomaly-card:hover { background: rgba(0, 255, 159,0.05); }

@media (max-width: 1024px) {
  .sentinel-layout { grid-template-columns: 1fr; }
  .graph-wrapper { min-height: 250px; }
}
@media (max-width: 640px) {
  .anomalies-grid { grid-template-columns: 1fr; }
}
</style>
