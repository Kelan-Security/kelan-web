<template>
  <section class="threat-demo section" id="threat-demo">
    <div class="container container-wide">
      <div class="demo-header reveal">
        <SectionBadge text="Live Comparison">
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </template>
        </SectionBadge>
        <h2 class="display-md mb-md">Split-second mitigation.</h2>
        <p class="section-sub">
          Watch how Kelan Security intercept attacks at the driver level compared to a standard, unprotected application stack.
        </p>
        <div class="sim-control-wrapper">
          <button @click="forceReplay" class="sim-replay-btn mono">
            <span class="replay-icon">⟲</span> REPLAY ATTACK SIMULATION
          </button>
        </div>
      </div>

      <div class="demo-split">
        <!-- Without Kelan Security -->
        <GlassCard class="demo-pane demo-bad reveal" style="transition-delay: 0.2s;">
          <div class="pane-header">
            <span class="mono title-red">WITHOUT KELAN</span>
            <div class="status-badge bad-badge mono">UNPROTECTED</div>
          </div>
          
          <div class="demo-stage" :class="{ 'stage-breached': simStep === 3 }">
            <!-- Hacker Node -->
            <div class="stage-node hacker-node">
              <svg class="node-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span>HACKER</span>
            </div>
            
            <!-- Connection path and flow -->
            <div class="datapath bad-path">
              <div class="path-line"></div>
              <!-- Packet indicator animating across path -->
              <div class="attack-packet bad-packet" :class="{ 'moving-bad': simStep >= 1 }"></div>
            </div>
            
            <!-- Server Node -->
            <div class="stage-node server-node" :class="{ breached: simStep === 3 }">
              <svg class="node-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="6" rx="1" />
                <rect x="2" y="9" width="20" height="6" rx="1" />
                <rect x="2" y="16" width="20" height="6" rx="1" />
                <circle cx="6" cy="5" r="1" fill="currentColor" />
                <circle cx="6" cy="12" r="1" fill="currentColor" />
                <circle cx="6" cy="19" r="1" fill="currentColor" />
              </svg>
              <span>SERVER</span>
              <div class="node-alert-banner mono" v-if="simStep === 3">BREACHED</div>
            </div>
          </div>
          
          <!-- Terminal logs fading in sequentially -->
          <div class="demo-logs mono">
            <p v-if="simStep >= 1" class="fade-in">[0.0ms] TCP SYN received</p>
            <p v-if="simStep >= 1" class="fade-in">[2.0ms] TCP SYN-ACK sent</p>
            <p v-if="simStep >= 2" class="fade-in">[5.0ms] Handshake complete</p>
            <p v-if="simStep >= 3" class="fade-in text-red font-bold">[12.0ms] Payload executed. Breach.</p>
          </div>
        </GlassCard>

        <!-- With Kelan Security -->
        <GlassCard class="demo-pane demo-good reveal" style="transition-delay: 0.3s;" withGlow>
          <div class="pane-header">
            <span class="mono text-green">WITH KELAN</span>
            <div class="status-badge good-badge mono">SHIELD ACTIVE</div>
          </div>
          
          <div class="demo-stage" :class="{ 'stage-blocked': simStep >= 2 }">
            <!-- Hacker Node -->
            <div class="stage-node hacker-node">
              <svg class="node-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span>HACKER</span>
            </div>
            
            <!-- Connection path and eBPF blocker -->
            <div class="datapath good-path">
              <div class="path-line active-half"></div>
              <div class="path-line inactive-half"></div>
              
              <!-- Enforcer Blocker Shield -->
              <div class="enforcer-shield" :class="{ triggered: simStep >= 2 }">
                <div class="shield-core"></div>
                <div class="shield-ring"></div>
              </div>
              
              <!-- Packet indicator animating and terminating at shield -->
              <div class="attack-packet good-packet" :class="{ 'moving-good': simStep >= 1, 'blocked-p': simStep >= 2 }"></div>
            </div>
            
            <!-- Server Node -->
            <div class="stage-node server-node protected">
              <svg class="node-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="6" rx="1" />
                <rect x="2" y="9" width="20" height="6" rx="1" />
                <rect x="2" y="16" width="20" height="6" rx="1" />
                <circle cx="6" cy="5" r="1" fill="currentColor" />
                <circle cx="6" cy="12" r="1" fill="currentColor" />
                <circle cx="6" cy="19" r="1" fill="currentColor" />
              </svg>
              <span>SERVER</span>
              <div class="node-alert-banner mono green" v-if="simStep >= 2">SECURE</div>
            </div>
          </div>
          
          <!-- Terminal logs fading in sequentially -->
          <div class="demo-logs mono">
            <p v-if="simStep >= 1" class="fade-in">[0.0ms] AITP Hello intercepted</p>
            <p v-if="simStep >= 2" class="fade-in">[0.8ms] Trust Eval: <span class="score-counter">{{ score }}</span>/255</p>
            <p v-if="simStep >= 3" class="fade-in text-green">[2.1ms] Intent declared malicious</p>
            <p v-if="simStep >= 3" class="fade-in text-green font-bold">[2.1ms] XDP KILL SIGNED.</p>
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlassCard from '@/components/ui/GlassCard.vue'

const simStep = ref(0) // 0: idle, 1: sending, 2: evaluating, 3: completed/breached/blocked
const score = ref(255)

let simInterval: any = null

const startSimulation = () => {
  simStep.value = 0
  score.value = 255
  
  // Step 1: hacker sends attack payload
  setTimeout(() => {
    simStep.value = 1
  }, 400)
  
  // Step 2: evaluation and trust drop
  setTimeout(() => {
    simStep.value = 2
    let current = 255
    const drop = setInterval(() => {
      current -= 15
      if (current <= 18) {
        current = 18
        clearInterval(drop)
      }
      score.value = current
    }, 35)
  }, 1200)
  
  // Step 3: mitigation verdict signed / breach complete
  setTimeout(() => {
    simStep.value = 3
  }, 2200)
}

const forceReplay = () => {
  if (simInterval) {
    clearInterval(simInterval)
  }
  startSimulation()
  simInterval = setInterval(startSimulation, 5200)
}

onMounted(() => {
  startSimulation()
  simInterval = setInterval(startSimulation, 5200)
})

onUnmounted(() => {
  if (simInterval) clearInterval(simInterval)
})
</script>

<style scoped>
.threat-demo { background: var(--bg-deep); padding: 100px 6vw 140px; }
.demo-header { max-width: 600px; margin: 0 0 60px 0; }
.sim-control-wrapper { margin-top: 24px; }
.sim-replay-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  padding: 8px 20px;
  font-size: 11px;
  border-radius: 100px;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  display: inline-flex; align-items: center; gap: 8px;
}
.sim-replay-btn:hover {
  background: rgba(0, 255, 159, 0.05);
  border-color: rgba(0, 255, 159, 0.25);
  color: var(--green-primary);
  box-shadow: 0 0 15px rgba(0, 255, 159, 0.05);
}
.replay-icon { font-size: 14px; font-weight: bold; }

.demo-split {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}

.demo-pane { 
  padding: 40px; 
  display: flex; flex-direction: column; 
  border-radius: 12px;
  /* base identity transformations for individual properties to prevent stacking shifts */
  translate: 0px 0px;
  scale: 1;
  transition: 
    translate 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    scale 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s ease,
    box-shadow 0.4s ease;
}

.demo-pane:hover {
  translate: 0px -4px;
  scale: 1.01;
}
.demo-bad:hover {
  border-color: rgba(255, 59, 48, 0.15);
  box-shadow: 0 12px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255, 59, 48, 0.02);
}
.demo-good:hover {
  border-color: rgba(0, 255, 159, 0.25);
  box-shadow: 0 12px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0, 255, 159, 0.04);
}

.pane-header {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 12px; letter-spacing: 0.1em; margin-bottom: 40px;
}
.title-red { color: #FF453A; }

.status-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 100px;
}
.bad-badge {
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.25);
  color: #FF453A;
}
.good-badge {
  background: rgba(0, 255, 159, 0.08);
  border: 1px solid rgba(0, 255, 159, 0.2);
  color: var(--green-primary);
  box-shadow: var(--glow-sm);
}

.demo-stage {
  height: 150px; position: relative; display: flex;
  align-items: center; justify-content: space-between;
  margin-bottom: 30px; border-bottom: 1px solid var(--border-subtle);
  padding: 0 20px;
  transition: background-color 0.4s ease;
}

.stage-breached {
  background: radial-gradient(circle at center, rgba(255, 59, 48, 0.03), transparent 70%);
}

.stage-node {
  font-family: var(--font-mono); font-size: 10px;
  font-weight: 600;
  padding: 14px 20px; border: 1px solid var(--border-card);
  background: var(--bg-void); border-radius: 6px;
  position: relative; z-index: 5;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  color: var(--text-secondary);
}

.node-svg { color: var(--text-dim); }

.server-node.breached { 
  border-color: #FF453A; color: #FF453A; 
  box-shadow: 0 0 15px rgba(255,59,48,0.2);
  animation: node-shake 0.4s ease-in-out;
}
.server-node.breached .node-svg { color: #FF453A; }

.server-node.protected { 
  border-color: var(--green-primary); 
  box-shadow: var(--glow-sm); 
  color: #FFF;
}
.server-node.protected .node-svg { color: var(--green-primary); }

.node-alert-banner {
  position: absolute;
  bottom: -22px; left: 50%;
  transform: translateX(-50%);
  font-size: 8px; font-weight: 800;
  color: #FF453A;
  background: rgba(255, 59, 48, 0.15);
  border: 1px solid rgba(255, 59, 48, 0.3);
  padding: 1px 8px;
  border-radius: 3px;
  letter-spacing: 0.05em;
}

.node-alert-banner.green {
  color: var(--green-primary);
  background: rgba(0, 255, 159, 0.1);
  border-color: rgba(0, 255, 159, 0.25);
}

/* Datapaths & packets */
.datapath {
  position: absolute; top: 50%; left: 110px; right: 110px; height: 2px;
  transform: translateY(-50%); z-index: 1;
}

.path-line {
  position: absolute; width: 100%; height: 100%; top: 0; left: 0;
}

.bad-path .path-line {
  background: linear-gradient(90deg, rgba(255, 59, 48, 0.5), rgba(255, 59, 48, 0.2));
}

.good-path .active-half {
  width: 50%; left: 0;
  background: linear-gradient(90deg, var(--green-primary), rgba(0, 255, 159, 0.3));
}

.good-path .inactive-half {
  width: 50%; left: 50%;
  background: rgba(255,255,255,0.04);
  border-top: 1px dashed rgba(255,255,255,0.1);
  height: 0;
}

.attack-packet {
  position: absolute; width: 8px; height: 8px; border-radius: 50%;
  top: 50%; transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 3;
}

.bad-packet {
  background: #FF453A;
  box-shadow: 0 0 10px #FF453A;
}

.good-packet {
  background: #FF453A;
  box-shadow: 0 0 10px #FF453A;
}

/* Animations based on simStep */
.moving-bad {
  animation: bad-packet-flow 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

.moving-good {
  animation: good-packet-flow 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

.blocked-p {
  animation-iteration-count: 1;
}

/* eBPF Shield enforcer */
.enforcer-shield {
  position: absolute;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
  z-index: 4;
}

.shield-core {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--green-primary);
  box-shadow: var(--glow-sm);
  z-index: 2;
  transition: transform 0.3s;
}

.shield-ring {
  position: absolute; width: 100%; height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(0, 255, 159, 0.3);
  transition: transform 0.4s, border-color 0.4s;
}

.enforcer-shield.triggered .shield-ring {
  animation: shield-flare 0.6s ease-out infinite alternate;
}

/* Logs and fades */
.demo-logs {
  font-size: 11px; line-height: 1.8; color: var(--text-dim);
  background: rgba(0,0,0,0.4); padding: 18px 20px; border-radius: 8px;
  height: 130px;
  border: 1px solid var(--border-card);
  display: flex; flex-direction: column; gap: 4px;
}

.fade-in {
  animation: log-fade 0.3s ease-out forwards;
}

.font-bold { font-weight: 700; }
.text-red { color: #FF453A; }

@keyframes bad-packet-flow {
  0% { left: 0%; opacity: 0; }
  10% { opacity: 1; }
  85% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

@keyframes good-packet-flow {
  0% { left: 0%; opacity: 0; }
  10% { opacity: 1; }
  45% { opacity: 1; }
  50% { left: 50%; opacity: 0; transform: translate(-50%, -50%) scale(1.8); }
  100% { left: 50%; opacity: 0; }
}

@keyframes shield-flare {
  from { transform: scale(0.9); border-color: rgba(0, 255, 159, 0.4); box-shadow: 0 0 10px rgba(0, 255, 159, 0.1); }
  to { transform: scale(1.5); border-color: rgba(0, 255, 159, 0.8); box-shadow: 0 0 20px rgba(0, 255, 159, 0.3); }
}

@keyframes log-fade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes node-shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}

@media (max-width: 768px) {
  .demo-split { grid-template-columns: 1fr; }
}
</style>
