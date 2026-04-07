<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <!-- Hexagon mark made of circuit lines -->
        <path d="M14 2L25 8V20L14 26L3 20V8L14 2Z"
              stroke="var(--green-primary)" stroke-width="1.5" fill="none"/>
        <path d="M14 2L14 8M14 20L14 26M3 8L8 11M20 17L25 20M3 20L8 17M20 11L25 8"
              stroke="var(--green-primary)" stroke-width="0.75" opacity="0.5"/>
        <circle cx="14" cy="14" r="3" fill="var(--green-primary)" opacity="0.8"/>
      </svg>
      <span class="logo-text">KELAN SECURITY</span>
    </div>

    <!-- Right actions -->
    <div class="nav-actions glass-nav">
      <a href="#product" class="nav-link mono" @click.prevent="scrollTo('product')">Product</a>
      <a href="#pricing" class="nav-link mono" @click.prevent="scrollTo('pricing')">Pricing</a>
      <a href="#docs" class="nav-link mono" @click.prevent="scrollTo('docs')">Docs</a>
      <a href="https://github.com/kelan-security/kelan-core"
         target="_blank" class="nav-link mono">GitHub</a>
      <GlowButton label="Contact us" variant="pill" @click="scrollTo('contact')" class="nav-contact-btn" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import GlowButton from '@/components/ui/GlowButton.vue'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 48px;
  background: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%);
}

.logo {
  display: flex; align-items: center; gap: 14px;
  font-family: var(--font-display);
  cursor: pointer;
}

.logo-text {
  font-size: 18px; font-weight: 600; letter-spacing: 0.15em;
  color: var(--text-primary);
}

.logo-text::after {
  content: '';
  display: inline-block; width: 6px; height: 6px;
  background: var(--green-primary); border-radius: 50%;
  margin-left: 6px; vertical-align: middle;
}

.nav-actions { 
  display: flex; align-items: center; gap: 40px; 
}

.glass-nav {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 255, 159, 0.1);
  padding: 8px 8px 8px 32px;
  border-radius: 100px;
  box-shadow: inset 0 0 10px rgba(0, 255, 159, 0.05);
}

.nav-link {
  font-size: 13px; color: var(--text-secondary);
  text-decoration: none; letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 1px;
  background: var(--text-primary);
  transition: width 0.3s ease;
}

.nav-link:hover { 
  color: var(--text-primary); 
}

.nav-link:hover::after {
  width: 100%;
}

.nav-contact-btn {
  transform: scale(0.9);
}
</style>
