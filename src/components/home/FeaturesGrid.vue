<template>
  <section class="features-section section">
    <div class="container">
      <SectionBadge text="Security Solutions">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        </template>
      </SectionBadge>
      <h2 class="display-lg features-title">
        Automated Threat<br>
        Detection and Response.<br>
        <span class="text-green">10x Faster.</span>
      </h2>

      <div class="bento-grid">
        <!-- Card 1.0 — Network Monitoring -->
        <GlassCard withGlow class="bento-card card-lg reveal">
          <BracketNum num="1.0" />
          
          <!-- Upgraded Visual: Interactive Network Mesh -->
          <div class="card-visual network-viz">
            <svg width="100%" height="120" viewBox="0 0 400 120" class="network-svg">
              <defs>
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 255, 159, 0.03)" stroke-width="1" />
                </pattern>
                <linearGradient id="path-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(0, 255, 159, 0.1)" />
                  <stop offset="50%" stop-color="rgba(0, 255, 159, 0.6)" />
                  <stop offset="100%" stop-color="rgba(0, 255, 159, 0.1)" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              
              <!-- Connection Paths -->
              <path d="M 50 60 Q 125 15 200 60 T 350 60" fill="none" stroke="url(#path-glow)" stroke-width="2" class="network-path path-1" />
              <path d="M 50 60 Q 125 105 200 60 T 350 60" fill="none" stroke="url(#path-glow)" stroke-width="2" class="network-path path-2" />
              <path d="M 50 60 H 350" fill="none" stroke="rgba(0, 255, 159, 0.05)" stroke-width="1.5" stroke-dasharray="6 6" />
              
              <!-- Nodes -->
              <circle cx="50" cy="60" r="7" fill="#030805" stroke="var(--green-primary)" stroke-width="2" class="node node-pulse" />
              <circle cx="125" cy="38" r="5" fill="#030805" stroke="rgba(0, 255, 159, 0.5)" stroke-width="1.5" class="node" />
              <circle cx="200" cy="60" r="8" fill="#030805" stroke="var(--green-primary)" stroke-width="2.5" class="node node-pulse-heavy" />
              <circle cx="275" cy="82" r="5" fill="#030805" stroke="rgba(0, 255, 159, 0.5)" stroke-width="1.5" class="node" />
              <circle cx="350" cy="60" r="7" fill="#030805" stroke="var(--green-primary)" stroke-width="2" class="node node-pulse" />
            </svg>
          </div>

          <h3>Real-time Network<br>Intelligence</h3>
          <p>Every network session is dynamically analyzed by Gemini 2.5 in under 5ms. Fully automated evaluation, zero configuration latency, and persistent transport monitoring.</p>
        </GlassCard>

        <!-- Card 2.0 — eBPF -->
        <GlassCard withGlow class="bento-card card-tall reveal" style="transition-delay: 0.1s;">
          <BracketNum num="2.0" />
          
          <!-- Upgraded Visual: High-Tech Radar Dashboard -->
          <div class="card-visual ebpf-viz">
            <div class="radar-container">
              <div class="radar-grid"></div>
              <div class="radar-sweep"></div>
              <div class="radar-pulse"></div>
              <div class="kernel-core">
                <div class="core-inner"></div>
              </div>
            </div>
            <div class="kernel-status">
              <span class="status-indicator active"></span>
              <span class="mono">STATUS: ENFORCING</span>
            </div>
            <div class="stats-row mono">
              <div class="stat-col"><span class="label">SPEED:</span> <span class="val">&lt; 1μs</span></div>
              <div class="stat-col"><span class="label">LAYER:</span> <span class="val">XDP_DRV</span></div>
            </div>
          </div>

          <h3>Kernel-level<br>Enforcement</h3>
          <p>Instantaneous session terminations executed directly within the Linux network driver. Threat packets are discarded at the lowest layer before ever reaching the user-space stack.</p>
        </GlassCard>

        <!-- Card 3.0 — Sentinel -->
        <GlassCard withGlow class="bento-card reveal" style="transition-delay: 0.2s;">
          <BracketNum num="3.0" />
          
          <!-- Upgraded Visual: Live Deviation Scanner -->
          <div class="card-visual sentinel-viz">
            <svg width="100%" height="90" viewBox="0 0 200 90" class="sentinel-svg">
              <defs>
                <linearGradient id="wave-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="var(--green-primary)" stop-opacity="0.3" />
                  <stop offset="100%" stop-color="var(--green-primary)" stop-opacity="0.0" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="rgba(0,0,0,0.15)" />
              <line x1="0" y1="45" x2="200" y2="45" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2 2" />
              <line x1="50" y1="0" x2="50" y2="90" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2 2" />
              <line x1="100" y1="0" x2="100" y2="90" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2 2" />
              <line x1="150" y1="0" x2="150" y2="90" stroke="rgba(255,255,255,0.03)" stroke-dasharray="2 2" />
              
              <!-- Anomaly Line -->
              <path d="M 0 65 Q 30 60 60 75 T 100 20 T 140 80 T 200 70" fill="none" stroke="rgba(0, 255, 159, 0.4)" stroke-width="1.5" />
              <path d="M 0 65 Q 30 60 60 75 T 100 20 T 140 80 T 200 70 L 200 90 L 0 90 Z" fill="url(#wave-grad)" />
              
              <!-- Anomaly Pulse Dot -->
              <circle cx="100" cy="20" r="4" fill="#FF3B30" class="anomaly-dot" />
              <circle cx="100" cy="20" r="10" fill="none" stroke="#FF3B30" stroke-width="1.5" class="anomaly-ring" />
              
              <!-- Scanning Bar -->
              <line x1="0" y1="0" x2="0" y2="90" stroke="var(--green-primary)" stroke-width="1.5" class="scan-bar" />
            </svg>
            <div class="sentinel-alert mono">
              <span class="alert-dot"></span>
              DEVIATION BLOCKED
            </div>
          </div>

          <div class="sentinel-badge mono">Adaptive Baseline</div>
          <h3>Sentinel AI</h3>
          <p>Continuous behavior profiling. Learns your network's baseline and automatically blocks anomalies.</p>
        </GlassCard>

        <!-- Card 4.0 — Trust Engine -->
        <GlassCard withGlow class="bento-card card-wide reveal" style="transition-delay: 0.3s;">
          <BracketNum num="4.0" />
          
          <!-- Upgraded Visual: Cryptographic Shield Scanner -->
          <div class="card-visual trust-viz">
            <div class="shield-container">
              <svg width="90" height="90" viewBox="0 0 100 100" class="shield-svg">
                <defs>
                  <linearGradient id="shield-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="rgba(0, 255, 159, 0.2)" />
                    <stop offset="100%" stop-color="rgba(0, 255, 159, 0.02)" />
                  </linearGradient>
                </defs>
                <!-- Target Circle -->
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0,255,159,0.06)" stroke-width="1" stroke-dasharray="4 3" />
                <circle cx="50" cy="50" r="39" fill="none" stroke="rgba(0,255,159,0.12)" stroke-width="1.5" />
                
                <!-- Shield Vector -->
                <path d="M 50 22 C 65 22 75 25 75 35 C 75 55 60 72 50 78 C 40 72 25 55 25 35 C 25 25 35 22 50 22 Z" 
                      fill="url(#shield-gradient)" stroke="var(--green-primary)" stroke-width="2" class="shield-path" />
                
                <!-- Details -->
                <path d="M 40 40 Q 50 35 60 40 M 35 50 Q 50 42 65 50 M 42 60 Q 50 52 58 60" 
                      fill="none" stroke="rgba(0, 255, 159, 0.35)" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <div class="scanner-laser"></div>
            </div>
            <div class="trust-details">
              <p class="card-eyebrow mono">SECURE ENCLAVE</p>
              <h3>Safeguarding Your Infrastructure</h3>
              <p>Cryptographic identity verification pins session trust at Layer 3, isolating hosts and blocking lateral movement threats at first handshake.</p>
            </div>
          </div>
        </GlassCard>

        <!-- Card 5.0 — Customised -->
        <GlassCard withGlow class="bento-card reveal" style="transition-delay: 0.4s;">
          <BracketNum num="5.0" />
          
          <!-- Upgraded Visual: 3D Layer Stack -->
          <div class="card-visual solutions-viz">
            <div class="isometric-stack">
              <div class="iso-layer defense-layer">
                <span class="mono">DEFENSE</span>
              </div>
              <div class="iso-layer enterprise-layer">
                <span class="mono">ENTERPRISE</span>
              </div>
              <div class="iso-layer startup-layer">
                <span class="mono">STARTUP</span>
              </div>
            </div>
          </div>

          <p class="card-eyebrow mono">DEPLOYMENT MODES</p>
          <h3>Modular Options</h3>
          <p>Four distinct deployment presets, full air-gap compliance, and custom routing configurations tailored for enterprise defense, tech startups, or cloud infrastructures.</p>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GlassCard from '@/components/ui/GlassCard.vue'
import BracketNum from '@/components/ui/BracketNum.vue'
import SectionBadge from '@/components/ui/SectionBadge.vue'
</script>

<style scoped>
.features-section { padding: 80px 6vw 120px; }
.features-label { font-size: 11px; letter-spacing: 0.15em; margin-bottom: 16px; }
.features-title { margin-bottom: 60px; }
.bento-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
}
.card-lg  { grid-column: 1; grid-row: 1; }
.card-tall{ grid-column: 2; grid-row: 1 / 3; }
.card-wide{ grid-column: 1; grid-row: 2; }
.bento-card h3 {
  font-family: var(--font-display); font-size: 1.25rem;
  font-weight: 600; margin: 16px 0 10px;
}
.bento-card p { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }

/* --- CARD HOVER AND ANIMATION POLISH --- */
.bento-card {
  position: relative;
  /* base identity transformations for individual properties to prevent stacking shifts */
  translate: 0px 0px;
  rotate: 0deg;
  scale: 1;
  border-radius: 12px;
  transition: 
    translate 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    scale 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s ease,
    box-shadow 0.4s ease;
}

.bento-card:hover {
  translate: 0px -6px;
  scale: 1.015;
  border-color: rgba(0, 255, 159, 0.25);
  box-shadow: 
    0 16px 40px rgba(0, 0, 0, 0.5), 
    0 0 30px rgba(0, 255, 159, 0.05);
}

/* 1.0 Network Intelligence Viz */
.network-viz {
  height: 120px; position: relative; margin: 16px 0 24px;
  border: 1px solid var(--border-card);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.network-svg .network-path {
  stroke-dasharray: 20 80;
  stroke-dashoffset: 0;
  animation: flow-packets 3.5s linear infinite;
}

.bento-card:hover .network-svg .network-path {
  animation-duration: 1.8s; /* Flow packets much faster on card hover */
}

.network-svg .path-2 {
  animation-delay: -1.75s;
}

.node {
  transition: r 0.3s ease, fill 0.3s ease;
}

.bento-card:hover .node-pulse {
  animation: node-ping 1s ease-in-out infinite alternate;
}

.bento-card:hover .node-pulse-heavy {
  animation: node-ping-heavy 0.8s ease-in-out infinite alternate;
}

@keyframes flow-packets {
  to { stroke-dashoffset: -100; }
}

@keyframes node-ping {
  to { r: 9; fill: var(--green-primary); }
}
@keyframes node-ping-heavy {
  to { r: 11; fill: var(--green-primary); }
}

/* 2.0 eBPF Radar Dashboard Viz */
.ebpf-viz {
  display: flex; flex-direction: column; align-items: center;
  padding: 32px 0 24px;
  margin: 16px 0 20px;
  border: 1px solid var(--border-card);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.radar-container {
  width: 90px; height: 90px;
  position: relative;
  margin-bottom: 20px;
  display: flex; align-items: center; justify-content: center;
}

.radar-grid {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 50%;
  border: 1px solid rgba(0, 255, 159, 0.06);
  background: 
    radial-gradient(circle, transparent 30%, rgba(0, 255, 159, 0.02) 30%, rgba(0, 255, 159, 0.02) 31%, transparent 31%, transparent 60%, rgba(0, 255, 159, 0.02) 60%, rgba(0, 255, 159, 0.02) 61%, transparent 61%),
    linear-gradient(to right, transparent 49.5%, rgba(0, 255, 159, 0.05) 49.5%, rgba(0, 255, 159, 0.05) 50.5%, transparent 50.5%),
    linear-gradient(to bottom, transparent 49.5%, rgba(0, 255, 159, 0.05) 49.5%, rgba(0, 255, 159, 0.05) 50.5%, transparent 50.5%);
}

.radar-sweep {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, rgba(0, 255, 159, 0.2) 0deg, transparent 90deg, transparent 360deg);
  animation: radar-spin 6s linear infinite;
  transform-origin: center;
}

.bento-card:hover .radar-sweep {
  animation-duration: 2.5s; /* Sweep faster on hover */
}

.radar-pulse {
  position: absolute;
  width: 60px; height: 60px;
  border-radius: 50%;
  border: 1.5px solid rgba(0, 255, 159, 0.3);
  animation: radar-ping-expand 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  opacity: 0;
}

.kernel-core {
  width: 20px; height: 20px;
  background: var(--green-primary);
  border-radius: 50%;
  box-shadow: var(--glow-sm);
  display: flex; align-items: center; justify-content: center;
  z-index: 2;
}

.core-inner {
  width: 8px; height: 8px;
  background: #030805;
  border-radius: 50%;
}

.kernel-status {
  display: flex; align-items: center; gap: 8px;
  background: rgba(0, 255, 159, 0.06);
  border: 1px solid rgba(0, 255, 159, 0.15);
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 16px;
}

.kernel-status span.mono {
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--green-primary);
  font-weight: 700;
}

.status-indicator {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--green-primary);
  box-shadow: var(--glow-sm);
}

.status-indicator.active {
  animation: pulse-indicator 1.2s alternate infinite;
}

.stats-row {
  display: flex; justify-content: space-between;
  width: 80%;
  font-size: 10px;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 12px;
}

.stats-row .label { color: var(--text-dim); }
.stats-row .val { color: #FFF; font-weight: 600; }

@keyframes radar-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes radar-ping-expand {
  0% { transform: scale(0.4); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

@keyframes pulse-indicator {
  to { opacity: 0.3; transform: scale(0.9); }
}

/* 3.0 Sentinel AI Deviation Scanner Viz */
.sentinel-viz {
  position: relative;
  height: 90px;
  border: 1px solid var(--border-card);
  border-radius: 8px;
  background: #000;
  margin: 16px 0;
  overflow: hidden;
}

.scan-bar {
  animation: scanner-loop 4s linear infinite;
}

.anomaly-dot {
  animation: pulse-red-dot 1s ease-in-out infinite alternate;
}

.anomaly-ring {
  transform-origin: 100px 20px;
  animation: pulse-red-ring 1.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.sentinel-alert {
  position: absolute;
  top: 8px; right: 8px;
  background: rgba(255, 59, 48, 0.15);
  border: 1px solid rgba(255, 59, 48, 0.3);
  color: #FF453A;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  border-radius: 4px;
  display: flex; align-items: center; gap: 4px;
}

.alert-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: #FF453A;
  animation: blink-dot 0.6s infinite alternate;
}

.sentinel-badge {
  display: inline-block; padding: 6px 16px;
  background: rgba(0, 255, 159,0.08);
  border: 1px solid rgba(0, 255, 159, 0.15);
  border-radius: 100px; font-size: 11px;
  color: var(--green-primary); margin-bottom: 16px;
}

@keyframes scanner-loop {
  0% { transform: translateX(0); opacity: 1; }
  45% { opacity: 1; }
  50% { transform: translateX(200px); opacity: 0; }
  55% { transform: translateX(0px); opacity: 0; }
  60% { opacity: 1; }
  100% { transform: translateX(200px); }
}

@keyframes pulse-red-dot {
  to { r: 6; fill: #FF453A; }
}

@keyframes pulse-red-ring {
  0% { transform: scale(0.3); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}

@keyframes blink-dot {
  to { opacity: 0.3; }
}

/* 4.0 Secure Enclave / Trust Engine Viz */
.trust-viz {
  display: flex; align-items: center; gap: 32px;
  margin: 16px 0 8px;
}

.shield-container {
  width: 90px; height: 90px;
  position: relative;
  flex-shrink: 0;
  border: 1px solid var(--border-card);
  background: rgba(0,0,0,0.25);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}

.shield-path {
  transition: stroke-width 0.3s ease, filter 0.3s ease;
}

.bento-card:hover .shield-path {
  stroke-width: 2.5px;
  filter: drop-shadow(0 0 6px var(--green-primary));
}

.scanner-laser {
  position: absolute;
  left: 0; width: 100%; height: 2px;
  background: linear-gradient(90deg, transparent, var(--green-primary), transparent);
  box-shadow: 0 0 8px var(--green-primary);
  opacity: 0;
  top: 0;
  transition: opacity 0.3s;
}

.bento-card:hover .scanner-laser {
  opacity: 1;
  animation: laser-sweep 2s ease-in-out infinite alternate;
}

.trust-details {
  flex-grow: 1;
}

.card-eyebrow { font-size: 10px; letter-spacing: 0.15em; color: var(--text-dim); margin-bottom: 8px; }

@keyframes laser-sweep {
  0% { top: 5%; }
  100% { top: 95%; }
}

/* 5.0 Customized Solutions 3D Stack Viz */
.solutions-viz {
  height: 140px;
  display: flex; align-items: center; justify-content: center;
  margin: 16px 0 24px;
}

.isometric-stack {
  position: relative;
  width: 130px; height: 130px;
  transform: rotateX(60deg) rotateZ(-45deg);
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.bento-card:hover .isometric-stack {
  transform: rotateX(50deg) rotateZ(-30deg) scale(1.03);
}

.iso-layer {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(4, 12, 8, 0.85);
  border: 1px solid rgba(0, 255, 159, 0.2);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 255, 159, 0.03);
  display: flex; align-items: flex-end; justify-content: flex-start;
  padding: 12px;
  transform-style: preserve-3d;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.iso-layer span.mono {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(0, 255, 159, 0.4);
  transition: color 0.3s, text-shadow 0.3s;
}

/* Base stack spacing */
.startup-layer {
  transform: translateZ(28px);
  border-color: rgba(0, 255, 159, 0.45);
  background: rgba(0, 255, 159, 0.05);
}
.startup-layer span.mono { color: var(--green-primary); }

.enterprise-layer {
  transform: translateZ(0px);
  border-color: rgba(0, 255, 159, 0.25);
}

.defense-layer {
  transform: translateZ(-28px);
  border-color: rgba(0, 255, 159, 0.15);
}

/* Expanded stack hover */
.bento-card:hover .startup-layer {
  transform: translateZ(54px);
  border-color: rgba(0, 255, 159, 0.7);
  box-shadow: 0 10px 25px rgba(0, 255, 159, 0.15);
}

.bento-card:hover .enterprise-layer {
  transform: translateZ(0px);
  border-color: rgba(0, 255, 159, 0.45);
  box-shadow: 0 8px 20px rgba(0, 255, 159, 0.08);
}
.bento-card:hover .enterprise-layer span.mono {
  color: var(--green-primary);
}

.bento-card:hover .defense-layer {
  transform: translateZ(-54px);
  border-color: rgba(0, 255, 159, 0.3);
  box-shadow: 0 5px 15px rgba(0, 255, 159, 0.04);
}
.bento-card:hover .defense-layer span.mono {
  color: var(--green-primary);
}

/* Responsive Grid layouts */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .card-lg { grid-column: 1 / -1; }
  .card-tall { grid-column: 1; grid-row: 2; height: 100%; }
  .card-wide { grid-column: 1 / -1; grid-row: 3; }
}

@media (max-width: 640px) {
  .bento-grid { grid-template-columns: 1fr; }
  .card-lg, .card-tall, .card-wide, .bento-card { grid-column: 1; grid-row: auto; }
  .trust-viz { flex-direction: column; align-items: center; text-align: center; }
}
</style>
