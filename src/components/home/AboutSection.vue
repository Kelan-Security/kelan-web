<template>
  <section class="about-section section" id="about">
    <div class="container container-wide">
      <div class="about-grid">
        <!-- Left: About Us -->
        <div class="about-card glass-panel reveal" style="transition-delay: 0.1s;">
          <div class="card-badge mono">
            <svg class="badge-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span class="badge-text">About Us</span>
          </div>
          <h2 class="display-sm text-main">Kelan Security</h2>
          <p class="desc">
            We believe that network security must transition from reactive post-handshake inspections to proactive, kernel-level enforcement. Founded in India by Tanush, Kelan Security is dedicated to creating open-source, resilient transport layer tools. By embedding agentic intelligence directly within system drivers, we empower modern infrastructure to deflect breaches before they reach userland.
          </p>
          <div class="founder-sig mono mt-lg">
            <span>— Tanush, Founder</span>
            <span class="social-links">
              <a href="https://www.linkedin.com/in/tanush-jain-17601321a/" target="_blank" class="social-link" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://github.com/Tanush-Jain" target="_blank" class="social-link" aria-label="GitHub">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
            </span>
          </div>
        </div>

        <!-- Right: About AITP Product -->
        <div class="about-card glass-panel reveal" style="transition-delay: 0.2s;">
          <div class="card-badge mono">
            <svg class="badge-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span class="badge-text">Our Protocol</span>
          </div>
          <h2 class="display-sm text-main">Agentic Intelligent Transport Protocol (AITP)</h2>
          <p class="desc">
            AITP is a ground-up transport protocol engineered in Rust that fuses cryptographic identities (Ed25519) with real-time intent checks. By operating at the OS driver level via eBPF XDP, AITP stops unauthenticated or malicious packets in under 1 microsecond. Session trust is continuously assessed using local model pipelines (like Nvidia Nemotron) ensuring that only legitimate requests ever touch your network stack.
          </p>
          <div class="aitp-specs mono mt-lg">
            <span class="spec-badge">eBPF / XDP</span>
            <span class="spec-badge">Rust Core</span>
            <span class="spec-badge">Sub-µs Kill</span>
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="about-stats-row reveal" style="transition-delay: 0.3s;">
        <div v-for="item in stats" :key="item.label" class="stat-card glass-panel">
          <div class="stat-val display-sm">{{ item.val }}</div>
          <div class="stat-label mono">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { val: '1', label: 'FOUNDER' },
  { val: '6+', label: 'MONTHS OF R&D' },
  { val: 'IN', label: 'LOCATED IN INDIA' },
  { val: 'RUST', label: 'CORE LANGUAGE' },
  { val: '131+', label: 'TESTS PASSING' },
]
</script>

<style scoped>
.about-section {
  background: var(--bg-void); 
  padding: 120px 6vw;
  position: relative;
}

/* Subtle background accent glow behind the about section */
.about-section::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.01) 0%, transparent 70%);
  z-index: 1;
  pointer-events: none;
}

.container-wide { 
  max-width: 1280px; 
  position: relative;
  z-index: 2;
}

.about-grid {
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 40px; 
  align-items: stretch;
}

.about-card {
  padding: 48px 40px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.card-badge {
  display: inline-flex; 
  align-items: center; 
  gap: 8px;
  font-size: 11px; 
  letter-spacing: 0.15em;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 24px;
  align-self: flex-start;
  
  /* Glassmorphism Pill */
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 6px 16px;
  border-radius: 100px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.badge-icon {
  color: var(--green-primary);
}

.text-main { 
  margin-bottom: 20px; 
  line-height: 1.3; 
  font-weight: 600; 
  color: #FFF; 
  letter-spacing: -0.01em;
}

.desc { 
  color: var(--text-secondary); 
  line-height: 1.7; 
  font-size: 15px; 
  flex-grow: 1; 
  opacity: 0.85;
}

.founder-sig {
  margin-top: 32px; 
  color: var(--text-secondary); 
  font-size: 12px; 
  display: flex;
  align-items: center;
  gap: 16px;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.social-link {
  color: var(--text-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s, transform 0.3s;
}

.social-link:hover {
  color: var(--green-primary);
  transform: translateY(-2px);
}

.aitp-specs {
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.spec-badge {
  font-size: 10px;
  padding: 6px 14px;
  background: rgba(20, 184, 166, 0.04);
  border: 1px solid rgba(20, 184, 166, 0.2);
  color: var(--green-bright);
  border-radius: 100px;
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: all 0.3s;
}

.about-card:hover .spec-badge {
  border-color: rgba(20, 184, 166, 0.35);
  background: rgba(20, 184, 166, 0.08);
}

.about-stats-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 48px;
}

.stat-card {
  padding: 32px 20px;
  text-align: center;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.stat-val { 
  color: var(--green-primary); 
  margin-bottom: 8px; 
  font-weight: 700;
  transition: color 0.3s;
}

.stat-card:hover .stat-val {
  color: var(--green-bright);
}

.stat-label { 
  font-size: 10px; 
  color: var(--text-dim); 
  letter-spacing: 0.12em; 
  text-transform: uppercase; 
}

@media (max-width: 1024px) {
  .about-grid { grid-template-columns: 1fr; }
  .about-stats-row { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 640px) {
  .about-stats-row { grid-template-columns: 1fr; }
}
</style>
