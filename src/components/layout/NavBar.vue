<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <!-- Hexagon mark made of circuit lines -->
        <path d="M14 2L25 8V20L14 26L3 20V8L14 2Z"
              stroke="#39ff14" stroke-width="1.5" fill="none"/>
        <path d="M14 2L14 8M14 20L14 26M3 8L8 11M20 17L25 20M3 20L8 17M20 11L25 8"
              stroke="#39ff14" stroke-width="0.75" opacity="0.5"/>
        <circle cx="14" cy="14" r="3" fill="#39ff14" opacity="0.8"/>
      </svg>
      <span class="logo-text">KELAN SECURITY</span>
    </div>

    <!-- Right actions -->
    <div class="nav-actions">
      <a href="#product" class="nav-link mono" @click.prevent="scrollTo('product')">Product</a>
      <a href="#pricing" class="nav-link mono" @click.prevent="scrollTo('pricing')">Pricing</a>
      <a href="#docs" class="nav-link mono" @click.prevent="scrollTo('docs')">Docs</a>
      <a href="https://github.com/kelan-security/kelan-core"
         target="_blank" class="nav-link mono">GitHub</a>
      <button class="contact-pill" @click="scrollTo('contact')">
        <span>Contact us</span>
        <div class="contact-dot"></div>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 40px;
  background: linear-gradient(to bottom, rgba(3,5,4,0.95), rgba(3,5,4,0));
  backdrop-filter: blur(8px);
}
.logo {
  display: flex; align-items: center; gap: 12px;
  font-family: var(--font-display);
}
.logo-text {
  font-size: 18px; font-weight: 700; letter-spacing: 0.1em;
  color: var(--text-primary);
}
.logo-text::after {
  content: '';
  display: inline-block; width: 6px; height: 6px;
  background: var(--green-primary); border-radius: 50%;
  margin-left: 4px; vertical-align: middle;
  box-shadow: var(--glow-sm);
}
.nav-actions { display: flex; align-items: center; gap: 32px; }
.nav-link {
  font-size: 13px; color: var(--text-secondary);
  text-decoration: none; letter-spacing: 0.05em;
  transition: color 0.2s;
}
.nav-link:hover { color: var(--green-primary); }
.contact-pill {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 20px 10px 24px;
  background: rgba(57,255,20,0.08);
  border: 1px solid var(--border-card);
  border-radius: 100px;
  font-family: var(--font-mono); font-size: 12px;
  color: var(--text-primary); cursor: pointer;
  transition: all 0.25s;
}
.contact-pill:hover {
  background: rgba(57,255,20,0.15);
  border-color: var(--border-active);
  box-shadow: var(--glow-sm);
}
.contact-dot {
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--green-primary);
  box-shadow: var(--glow-sm);
  animation: pulse-glow 2s ease-in-out infinite;
}
</style>
