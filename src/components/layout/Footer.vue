<template>
  <footer class="footer">
    <div class="footer-bg"></div>
    <div class="container footer-content">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <div class="logo">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L25 8V20L14 26L3 20V8L14 2Z" stroke="#39ff14" stroke-width="1.5" fill="none"/>
              <path d="M14 2L14 8M14 20L14 26M3 8L8 11M20 17L25 20M3 20L8 17M20 11L25 8" stroke="#39ff14" stroke-width="0.75" opacity="0.5"/>
              <circle cx="14" cy="14" r="3" fill="#39ff14" opacity="0.8"/>
            </svg>
            <span class="logo-text">KERNEX</span>
          </div>
          <p class="tagline">The Network Has a Brain Now.</p>
        </div>

        <!-- Services -->
        <div class="footer-col">
          <h4 class="col-title mono">SERVICES</h4>
          <ul class="col-links">
            <li><a href="#">Detection</a></li>
            <li><a href="#">Protocol</a></li>
            <li><a href="#">Sentinel</a></li>
            <li><a href="#">eBPF Engine</a></li>
          </ul>
        </div>

        <!-- Explore -->
        <div class="footer-col">
          <h4 class="col-title mono">EXPLORE</h4>
          <ul class="col-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/product">Product</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><a href="/docs">Documentation</a></li>
          </ul>
        </div>

        <!-- Connect -->
        <div class="footer-col">
          <h4 class="col-title mono">CONNECT</h4>
          <ul class="col-links">
            <li><a href="https://github.com/kelan-security/kelan-core" target="_blank">GitHub</a></li>
            <li><a href="mailto:tanush@kelansecurtity.io">Contact</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright mono">© 2026 Kelan Security Security</p>
        <p class="rights mono">All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: 80px 6vw 120px;
  background: var(--bg-void);
  border-top: 1px solid var(--border-subtle);
  overflow: hidden;
}
.footer-bg {
  position: absolute; bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 60%; height: 60%;
  background: radial-gradient(ellipse at bottom, rgba(57,255,20,0.05) 0%, transparent 60%);
  pointer-events: none;
}
.footer-content { position: relative; z-index: 2; }
.footer-grid {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px; margin-bottom: 60px;
}
.logo {
  display: flex; align-items: center; gap: 12px;
  font-family: var(--font-display);
  margin-bottom: 16px;
}
.logo-text {
  font-size: 16px; font-weight: 700; letter-spacing: 0.1em;
  color: var(--text-primary);
}
.tagline {
  color: var(--text-dim); font-size: 14px;
  max-width: 250px;
}
.col-title {
  color: var(--green-primary); font-size: 11px;
  letter-spacing: 0.15em; margin-bottom: 20px;
}
.col-links {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 12px;
}
.col-links a {
  color: var(--text-secondary); text-decoration: none;
  font-size: 14px; transition: color 0.2s;
}
.col-links a:hover { color: var(--text-primary); }
.footer-bottom {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 32px; border-top: 1px solid var(--border-subtle);
  font-size: 11px; color: var(--text-dim); letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: 1 / -1; margin-bottom: 20px; }
  .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
}
</style>
