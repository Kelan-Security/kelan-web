<template>
  <section class="sentinel-section section" id="sentinel">
    <div class="container container-wide">
      <div class="sentinel-header reveal">
        <SectionBadge text="Agentic Intelligent Transport Protocol (AITP)">
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </template>
        </SectionBadge>
        <h2 class="display-lg">
          The Sentinel<br>
          <span class="text-green">never sleeps.</span>
        </h2>
        <p class="sentinel-desc">
          Continuous behavioral profiling of every active device. When traffic patterns or cryptographic handshakes deviate from the established network baseline, AITP terminates and quarantines the entity instantly.
        </p>
      </div>

      <div class="sentinel-layout">
        <!-- Left Side — Dynamic Radar Map & Logs -->
        <div class="graph-side reveal" style="transition-delay: 0.2s;">
          <GlassCard class="graph-card" withGlow>
            <div class="graph-wrapper">
              <!-- Grid Backdrop & Radial Scans -->
              <div class="radar-scan"></div>
              <div class="radar-lines"></div>
              
              <!-- Static Node Coordinates (Prevents Hydration shifts) -->
              <div v-for="(node, n) in nodes" :key="n" class="graph-node"
                   :class="{ anomalous: node.anomalous }"
                   :style="{ left: `${node.x}%`, top: `${node.y}%`, animationDelay: `${n * 0.25}s` }">
                <!-- Target Reticle for Anomalies -->
                <div v-if="node.anomalous" class="target-reticle">
                  <div class="reticle-box"></div>
                  <span class="reticle-label mono">{{ node.label }}</span>
                </div>
              </div>
            </div>
            
            <!-- Live Scrolling Log Terminal -->
            <div class="terminal-container">
              <div class="terminal-header mono">
                <span class="term-dot green"></span>
                <span>AITP_DRIVER_LOGGER // LIVE TELEMETRY</span>
              </div>
              <div class="terminal-logs mono">
                <div v-for="(log, idx) in logs" :key="idx" class="log-line">
                  <span class="log-time">[{{ log.time }}]</span>
                  <span class="log-msg" :class="{ alert: log.isAlert }">{{ log.msg }}</span>
                </div>
              </div>
            </div>

            <div class="graph-footer mono">
              <span>SCANNING NETWORK BASELINE</span>
              <span class="text-green">14,203 ACTIVE ENTITIES</span>
            </div>
          </GlassCard>
        </div>

        <!-- Right Side — Anomaly Threat Classes -->
        <div class="classes-side">
          <div class="anomalies-grid">
            <GlassCard v-for="(anomaly, i) in anomalyClasses" 
                       :key="anomaly.id" 
                       class="anomaly-card reveal" 
                       :class="{ 'col-span-2': i === 6 }"
                       :style="{ transitionDelay: `${0.08 * i}s` }" 
                       withGlow>
              <div class="anomaly-top">
                <span class="mono class-id">CLASS {{ anomaly.id }}</span>
                <span class="mono alert-text">SHIELD ENABLED</span>
              </div>
              
              <div class="anomaly-content">
                <div class="anomaly-info">
                  <h4>{{ anomaly.name }}</h4>
                  <p class="anomaly-desc">{{ anomaly.desc }}</p>
                </div>
                
                <!-- Custom SVG Micro-Viz for each class -->
                <div class="anomaly-viz">
                  <!-- Volumetric Flood -->
                  <svg v-if="anomaly.viz === 'flood'" width="48" height="32" viewBox="0 0 48 32">
                    <rect x="4" y="22" width="6" height="10" fill="var(--green-primary)" class="bar-1" />
                    <rect x="14" y="14" width="6" height="18" fill="var(--green-primary)" class="bar-2" />
                    <rect x="24" y="6" width="6" height="26" fill="var(--green-primary)" class="bar-3" />
                    <rect x="34" y="18" width="6" height="14" fill="#FF3B30" class="bar-4" />
                  </svg>
                  
                  <!-- Protocol Fuzzing -->
                  <div v-else-if="anomaly.viz === 'fuzzing'" class="fuzz-display mono">
                    <span class="fuzz-char">0x3F</span>
                    <span class="fuzz-char fuzz-glitch">0x??</span>
                  </div>
                  
                  <!-- Slowloris -->
                  <svg v-else-if="anomaly.viz === 'slowloris'" width="48" height="32" viewBox="0 0 48 32">
                    <line x1="4" y1="16" x2="44" y2="16" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
                    <circle cx="10" cy="16" r="3" fill="var(--green-primary)" class="dot-slow-1" />
                    <circle cx="24" cy="16" r="3" fill="var(--green-primary)" class="dot-slow-2" />
                    <circle cx="38" cy="16" r="3" fill="#FF3B30" class="dot-slow-3" />
                  </svg>
                  
                  <!-- C2 Beaconing -->
                  <svg v-else-if="anomaly.viz === 'c2'" width="48" height="32" viewBox="0 0 48 32">
                    <path d="M 0 16 Q 12 4 24 16 T 48 16" fill="none" stroke="rgba(0, 255, 159, 0.15)" stroke-width="1.5" />
                    <path d="M 0 16 Q 12 0 24 16 T 48 16" fill="none" stroke="var(--green-primary)" stroke-width="2" class="c2-wave" />
                  </svg>
                  
                  <!-- Port Scanning -->
                  <div v-else-if="anomaly.viz === 'ports'" class="ports-grid">
                    <div v-for="p in 4" :key="p" class="port-dot" :class="`port-${p}`"></div>
                  </div>
                  
                  <!-- Data Exfiltration -->
                  <svg v-else-if="anomaly.viz === 'exfil'" width="48" height="32" viewBox="0 0 48 32">
                    <path d="M 8 8 H 28 V 24 H 8 Z" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
                    <path d="M 24 16 H 42 M 36 10 L 42 16 L 36 22" fill="none" stroke="var(--green-primary)" stroke-width="2" class="exfil-arrow" />
                  </svg>
                  
                  <!-- Behavioral Drift -->
                  <svg v-else-if="anomaly.viz === 'drift'" width="48" height="32" viewBox="0 0 48 32">
                    <path d="M 4 28 Q 24 28 24 16 T 44 4" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" stroke-dasharray="3 3" />
                    <path d="M 4 28 Q 24 28 32 20 T 44 24" fill="none" stroke="#FF3B30" stroke-width="2" class="drift-line" />
                  </svg>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlassCard from '@/components/ui/GlassCard.vue'

// Predefined node positions to avoid Math.random() SSR hydration mismatch
const nodes = [
  { x: 25, y: 35, anomalous: false },
  { x: 40, y: 20, anomalous: false },
  { x: 70, y: 30, anomalous: true, label: "EXFIL ATTEMPT" },
  { x: 50, y: 70, anomalous: false },
  { x: 85, y: 55, anomalous: false },
  { x: 15, y: 65, anomalous: false },
  { x: 60, y: 80, anomalous: true, label: "FUZZ INTRUSION" },
  { x: 80, y: 15, anomalous: false },
  { x: 30, y: 10, anomalous: false },
  { x: 90, y: 40, anomalous: true, label: "SYN FLOOD" }
]

const anomalyClasses = [
  { 
    id: '01', 
    name: 'Volumetric Flood', 
    desc: 'Mitigates massive UDP/SYN flood attempts at L3/L4 via kernel rate-limiting enforcers.',
    viz: 'flood' 
  },
  { 
    id: '02', 
    name: 'Protocol Fuzzing', 
    desc: 'Blocks malformed packets that violate AITP structures or attempt state corruption.',
    viz: 'fuzzing' 
  },
  { 
    id: '03', 
    name: 'Slowloris', 
    desc: 'Closes lingering, incomplete socket holds directly inside the network driver.',
    viz: 'slowloris' 
  },
  { 
    id: '04', 
    name: 'C2 Beaconing', 
    desc: 'Flags rhythmic out-of-band communication signals and baseline traffic synchronization.',
    viz: 'c2' 
  },
  { 
    id: '05', 
    name: 'Port Scanning', 
    desc: 'Quarantines entities that query multiple destination port addresses in sequence.',
    viz: 'ports' 
  },
  { 
    id: '06', 
    name: 'Data Exfiltration', 
    desc: 'Stops anomalous, oversized outbound payloads that diverge from the intent declaration.',
    viz: 'exfil' 
  },
  { 
    id: '07', 
    name: 'Behavioral Drift', 
    desc: 'Monitors long-term patterns, alerting on deviations in cryptographic signature frequency.',
    viz: 'drift' 
  },
]

// Scrolling logs
const logs = ref([
  { time: '09:41:02', msg: 'AITP core initialized.', isAlert: false },
  { time: '09:41:08', msg: 'Scanning baseline (14,203 active entities)...', isAlert: false },
  { time: '09:41:15', msg: 'Core healthy. Zero active deviations.', isAlert: false }
])

const logsPool = [
  "Auditing inbound handshakes...",
  "Dilithium3 signatures verified on 48 sessions.",
  "Warning: High frequency connection attempts from entity_f88",
  "Volumetric threshold exceeded on entity_f88 - SHIELD ACTIVE",
  "eBPF Driver: Dropped 14,820 packets from 192.168.12.99",
  "Scanning port baseline...",
  "Monitoring C2 heartbeat telemetry...",
  "Alert: Slowloris attempt blocked at kernel space",
  "Baseline drift detected on node_2a9 - Evaluating...",
  "Intent mismatch on node_2a9: Expected inference, received command - KILLED",
  "All enclaves report normal latency (0.24ms P50)"
]

let logInterval: any = null
onMounted(() => {
  logInterval = setInterval(() => {
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    const msg = logsPool[Math.floor(Math.random() * logsPool.length)]
    const isAlert = msg.includes('Warning') || msg.includes('Alert') || msg.includes('SHIELD') || msg.includes('KILLED')
    
    logs.value.push({ time, msg, isAlert })
    if (logs.value.length > 5) {
      logs.value.shift()
    }
  }, 2500)
})

onUnmounted(() => {
  if (logInterval) clearInterval(logInterval)
})
</script>

<style scoped>
.sentinel-section { background: var(--bg-void); padding: 100px 6vw 120px; }
.container-wide { max-width: 1400px; }
.sentinel-header { margin-bottom: 60px; max-width: 600px; }
.sentinel-desc { margin-top: 24px; color: var(--text-secondary); line-height: 1.6; }

.sentinel-layout {
  display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
}

.graph-card { height: 100%; display: flex; flex-direction: column; }
.graph-wrapper {
  flex: 1; min-height: 340px; position: relative;
  border-radius: 8px; overflow: hidden;
  background: radial-gradient(circle at center, rgba(3, 10, 6, 0.95), rgba(1, 2, 2, 1));
  border: 1px solid var(--border-subtle);
  margin-bottom: 20px;
}

.radar-scan {
  position: absolute; top: 50%; left: 50%; width: 200%; height: 200%;
  background: conic-gradient(from 0deg, transparent 75%, rgba(0, 255, 159, 0.15) 100%);
  transform-origin: center;
  animation: spin-slow 8s linear infinite;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
}

.radar-lines {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: 
    radial-gradient(circle, transparent 20%, rgba(0, 255, 159, 0.02) 20%, rgba(0, 255, 159, 0.02) 21%, transparent 21%, transparent 50%, rgba(0, 255, 159, 0.02) 50%, rgba(0, 255, 159, 0.02) 51%, transparent 51%, transparent 80%, rgba(0, 255, 159, 0.01) 80%, rgba(0, 255, 159, 0.01) 81%, transparent 81%),
    linear-gradient(to right, transparent 49.8%, rgba(0, 255, 159, 0.04) 49.8%, rgba(0, 255, 159, 0.04) 50.2%, transparent 50.2%),
    linear-gradient(to bottom, transparent 49.8%, rgba(0, 255, 159, 0.04) 49.8%, rgba(0, 255, 159, 0.04) 50.2%, transparent 50.2%);
}

.graph-node {
  position: absolute; width: 6px; height: 6px; border-radius: 50%;
  background: var(--green-primary); box-shadow: var(--glow-sm);
  animation: pulse-glow 2.5s infinite alternate;
}

.graph-node.anomalous {
  background: #ff3333; 
  box-shadow: 0 0 12px rgba(255,51,51,0.8);
  animation: pulse-anomalous 1.5s infinite alternate;
}

.target-reticle {
  position: absolute;
  top: -12px; left: -12px;
  width: 30px; height: 30px;
  pointer-events: none;
}

.reticle-box {
  width: 100%; height: 100%;
  border: 1px solid rgba(255, 51, 51, 0.5);
  animation: reticle-rotate 4s linear infinite;
}

.reticle-label {
  position: absolute;
  top: -14px; left: 50%;
  transform: translateX(-50%);
  font-size: 7px;
  font-weight: 700;
  color: #ff3333;
  white-space: nowrap;
  background: rgba(0,0,0,0.85);
  padding: 1px 4px;
  border: 1px solid rgba(255, 51, 51, 0.3);
  border-radius: 2px;
}

/* Logging Terminal */
.terminal-container {
  border: 1px solid var(--border-card);
  background: rgba(0,0,0,0.4);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 20px;
}

.terminal-header {
  font-size: 9px;
  color: var(--text-dim);
  margin-bottom: 8px;
  display: flex; align-items: center; gap: 6px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  padding-bottom: 6px;
}

.term-dot {
  width: 5px; height: 5px; border-radius: 50%;
}
.term-dot.green {
  background: var(--green-primary);
  box-shadow: var(--glow-sm);
}

.terminal-logs {
  font-size: 10px;
  height: 90px;
  overflow-y: hidden;
  display: flex; flex-direction: column; gap: 4px;
}

.log-line {
  display: flex; gap: 8px;
  line-height: 1.4;
}

.log-time { color: var(--green-primary); opacity: 0.6; }
.log-msg { color: #A8C8A8; }
.log-msg.alert { color: #FF453A; font-weight: 600; }

.graph-footer {
  display: flex; justify-content: space-between; font-size: 10px;
  letter-spacing: 0.1em; color: var(--text-dim);
}

/* Anomaly Cards styling */
.classes-side { display: flex; align-items: stretch; }
.anomalies-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%;
}

.anomaly-card { 
  padding: 16px 20px; 
  cursor: crosshair;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  /* base identity transformations for individual properties to prevent stacking shifts */
  translate: 0px 0px;
  scale: 1;
  transition: 
    translate 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    scale 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s ease,
    background-color 0.4s ease;
}

.anomaly-card:hover { 
  translate: 0px -4px;
  scale: 1.02;
  border-color: rgba(0, 255, 159, 0.25);
  background-color: rgba(0, 255, 159, 0.04); 
}

.anomaly-top {
  display: flex; justify-content: space-between; margin-bottom: 12px;
  font-size: 9px;
}
.class-id { color: var(--green-primary); opacity: 0.8; font-weight: 700; }
.alert-text { color: rgba(255,255,255,0.2); font-weight: 600; }
.anomaly-card:hover .alert-text { color: var(--green-primary); }

.anomaly-content {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
}

.anomaly-info { flex-grow: 1; }

.anomaly-card h4 {
  font-family: var(--font-display); font-size: 15px; font-weight: 600;
  color: var(--text-primary); margin-bottom: 6px;
}

.anomaly-desc {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Micro Visualizations style */
.anomaly-viz {
  width: 48px; height: 32px;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.3);
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.03);
  overflow: hidden;
}

/* Flood pulse anim */
.bar-1 { animation: flood-bar 0.8s ease-in-out infinite alternate; }
.bar-2 { animation: flood-bar 0.8s ease-in-out infinite alternate 0.2s; }
.bar-3 { animation: flood-bar 0.8s ease-in-out infinite alternate 0.4s; }
.bar-4 { animation: flood-bar 0.6s ease-in-out infinite alternate 0.1s; }

/* Fuzzing text glitch */
.fuzz-display { font-size: 8px; color: #FFF; display: flex; flex-direction: column; align-items: center; }
.fuzz-char.fuzz-glitch { color: var(--green-primary); animation: glitch-text 0.5s steps(2) infinite; }

/* Slowloris pulse */
.dot-slow-1 { animation: pulse-slowloris 2s infinite; }
.dot-slow-2 { animation: pulse-slowloris 2s infinite 0.6s; }
.dot-slow-3 { animation: pulse-slowloris 2s infinite 1.2s; }

/* C2 wave path */
.c2-wave {
  stroke-dasharray: 40;
  stroke-dashoffset: 80;
  animation: wave-move 1.5s linear infinite;
}

/* Port scanner dots */
.ports-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
.port-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.1); }
.port-1 { animation: port-light 1.2s infinite; }
.port-2 { animation: port-light 1.2s infinite 0.3s; }
.port-3 { animation: port-light 1.2s infinite 0.6s; }
.port-4 { animation: port-light 1.2s infinite 0.9s; }

/* Exfil line dash */
.exfil-arrow {
  animation: arrow-bounce 0.8s ease-in-out infinite alternate;
}

/* Drift line path */
.drift-line {
  stroke-dasharray: 6 30;
  animation: drift-flow 2s linear infinite;
}

.col-span-2 { grid-column: span 2; }

/* Micro Keyframes */
@keyframes flood-bar {
  from { transform: scaleY(0.4); transform-origin: bottom; }
  to { transform: scaleY(1.1); transform-origin: bottom; }
}
@keyframes glitch-text {
  0%, 100% { opacity: 1; color: var(--green-primary); }
  50% { opacity: 0.1; color: #ff3333; }
}
@keyframes pulse-slowloris {
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.4); opacity: 1; }
  100% { transform: scale(1); opacity: 0.3; }
}
@keyframes wave-move {
  to { stroke-dashoffset: 0; }
}
@keyframes port-light {
  0%, 100% { background: rgba(255,255,255,0.1); box-shadow: none; }
  50% { background: var(--green-primary); box-shadow: var(--glow-sm); }
}
@keyframes arrow-bounce {
  from { transform: translateX(-3px); }
  to { transform: translateX(3px); }
}
@keyframes drift-flow {
  from { stroke-dashoffset: 36; }
  to { stroke-dashoffset: 0; }
}

@keyframes pulse-anomalous {
  to { transform: scale(1.3); box-shadow: 0 0 18px rgba(255,51,51,1); }
}

@keyframes reticle-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 4px rgba(0, 255, 159, 0.2); }
  50% { box-shadow: 0 0 10px rgba(0, 255, 159, 0.6); }
}

@media (max-width: 1024px) {
  .sentinel-layout { grid-template-columns: 1fr; }
  .graph-wrapper { min-height: 250px; }
}
@media (max-width: 768px) {
  .anomalies-grid { grid-template-columns: 1fr; }
  .col-span-2 { grid-column: span 1; }
}
</style>
