<script setup lang="ts">
const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="footer">
    <div class="footer-bg"></div>
    <div class="container footer-content">
      <div class="footer-grid">
        <!-- Brand & Status -->
        <div class="footer-brand">
          <div class="logo">
            <img src="@/assets/MAIN_LG.png" alt="Kelan Security Logo" class="logo-img" />
            <span class="logo-text">KELAN SECURITY</span>
          </div>
          <p class="tagline">The Network Has a Brain Now.</p>
          
          <!-- Live Operational Status Indicator -->
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span class="status-text mono">All systems operational</span>
          </div>
        </div>

        <!-- Column 1: Protocol -->
        <div class="footer-col">
          <h4 class="col-title mono">PROTOCOL</h4>
          <ul class="col-links">
            <li><a href="#threat-demo" @click.prevent="scrollTo('threat-demo')">AITP Gateway</a></li>
            <li><a href="#sentinel" @click.prevent="scrollTo('sentinel')">eBPF Sentinel</a></li>
            <li><a href="#product" @click.prevent="scrollTo('product')">Core Engine</a></li>
            <li><a href="https://github.com/Kelan-Security/KelancoreV1" target="_blank" rel="noopener noreferrer">Open Source ↗</a></li>
          </ul>
        </div>

        <!-- Column 2: Explore -->
        <div class="footer-col">
          <h4 class="col-title mono">EXPLORE</h4>
          <ul class="col-links">
            <li><a href="#hero" @click.prevent="scrollTo('hero')">Home</a></li>
            <li><a href="#product" @click.prevent="scrollTo('product')">Product</a></li>
            <li><a href="#about" @click.prevent="scrollTo('about')">About Us</a></li>
            <li><a href="#docs" @click.prevent="scrollTo('docs')">Documentation</a></li>
          </ul>
        </div>

        <!-- Column 3: Community -->
        <div class="footer-col">
          <h4 class="col-title mono">COMMUNITY</h4>
          <ul class="col-links">
            <li><a href="https://github.com/Kelan-Security/KelancoreV1" target="_blank" rel="noopener noreferrer">GitHub Repository ↗</a></li>
            <li><a href="https://github.com/Kelan-Security/KelancoreV1/issues" target="_blank" rel="noopener noreferrer">Issue Tracker ↗</a></li>
            <li><a href="mailto:kernalsecurity@gmail.com">Email Contact</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="bottom-left">
          <p class="copyright mono">© 2026 Kelan Security. All rights reserved.</p>
        </div>
        <div class="bottom-right">
          <!-- Flag / Location indicator representing Indian founder origin -->
          <div class="built-in-india mono">
            Built with precision in 🇮🇳 India
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: 100px 6vw 120px;
  background: var(--bg-void);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.footer-bg {
  position: absolute; 
  bottom: 0; 
  left: 50%;
  transform: translateX(-50%) translateY(35%);
  width: 90%; 
  height: 90%;
  background: radial-gradient(ellipse at bottom, rgba(20, 184, 166, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.footer-content { 
  position: relative; 
  z-index: 2; 
}

.footer-grid {
  display: grid; 
  grid-template-columns: 2.2fr 1fr 1fr 1.2fr;
  gap: 64px; 
  margin-bottom: 72px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo {
  display: flex; 
  align-items: center; 
  gap: 14px;
  font-family: var(--font-display);
  margin-bottom: 18px;
}

.logo-img {
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(20, 184, 166, 0.2));
}

.logo-text {
  font-size: 16px; 
  font-weight: 700; 
  letter-spacing: 0.15em;
  color: var(--text-primary);
}

.tagline {
  color: var(--text-dim); 
  font-size: 14px;
  max-width: 280px;
  line-height: 1.6;
}

/* Status Indicator Pill */
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  padding: 6px 14px;
  background: rgba(20, 184, 166, 0.03);
  border: 1px solid rgba(20, 184, 166, 0.12);
  border-radius: 100px;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: var(--green-primary);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--green-primary);
  animation: pulse-status 2.5s infinite ease-in-out;
}

.status-text {
  font-size: 9px;
  color: var(--green-bright);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
}

.col-title {
  color: var(--green-primary); 
  font-size: 11px;
  letter-spacing: 0.18em; 
  margin-bottom: 24px;
  font-weight: 600;
}

.col-links {
  list-style: none; 
  padding: 0; 
  margin: 0;
  display: flex; 
  flex-direction: column; 
  gap: 14px;
}

.col-links a {
  color: var(--text-secondary); 
  text-decoration: none;
  font-size: 14px; 
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  opacity: 0.85;
}

.col-links a:hover { 
  color: var(--green-bright); 
  transform: translateX(6px);
  opacity: 1;
}

.footer-bottom {
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  padding-top: 36px; 
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 11px; 
  color: var(--text-dim); 
  letter-spacing: 0.08em;
}

.copyright {
  opacity: 0.8;
}

.built-in-india {
  font-size: 10px;
  color: var(--text-dim);
  opacity: 0.75;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(255,255,255,0.01);
  border: 1px solid rgba(255,255,255,0.03);
}

@keyframes pulse-status {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@media (max-width: 992px) {
  .footer-grid { 
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .footer-grid { 
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .footer-brand { 
    grid-column: 1 / -1; 
    margin-bottom: 24px; 
  }
  .footer-bottom { 
    flex-direction: column; 
    gap: 16px; 
    text-align: center; 
  }
}
</style>
