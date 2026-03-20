<template>
  <section class="hero">
    <!-- Atmospheric background -->
    <div class="hero-bg">
      <div class="bg-glow-1"></div>
      <div class="bg-glow-2"></div>
      <ParticleCanvas />
    </div>

    <!-- Content -->
    <div class="hero-content">
      <SectionBadge text="Transport Layer Security" />

      <h1 class="hero-headline display-xl">
        <span class="line">The Network</span>
        <span class="line accent">Has a Brain</span>
        <span class="line dim">Now.</span>
      </h1>

      <!-- Floating orb - right side -->
      <div class="hero-orb">
        <ParticleOrb />
      </div>

      <!-- Description - right column -->
      <p class="hero-desc">
        Agentic AI that lives at the transport layer.
        Every session. Every packet. Verified before
        your applications ever see it.
      </p>

      <div class="hero-actions">
        <GlowButton label="Get started" variant="pill" @click="scrollToDocs" />
        <a href="https://github.com/kelan-security/kelan-core"
           class="hero-link mono">
          ↗ View on GitHub
        </a>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="scroll-hint mono">
      <span>↓</span>
      <span>Scroll to explore</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlowButton from '@/components/ui/GlowButton.vue'
import ParticleCanvas from '@/components/ui/ParticleCanvas.vue'
import ParticleOrb from './ParticleOrb.vue'

const scrollToDocs = () => window.open('https://docs.kelansecurtity.io', '_blank')
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex; flex-direction: column; justify-content: center;
  padding: 120px 6vw 100px;
  position: relative; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0; z-index: 0;
}
.bg-glow-1 {
  position: absolute;
  top: -20%; left: -10%;
  width: 60%; height: 80%;
  background: radial-gradient(ellipse, rgba(57,255,20,0.06) 0%, transparent 70%);
  pointer-events: none;
}
.bg-glow-2 {
  position: absolute;
  bottom: -10%; right: 5%;
  width: 50%; height: 60%;
  background: radial-gradient(ellipse, rgba(57,255,20,0.04) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content {
  position: relative; z-index: 2;
  max-width: 1280px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 32px;
  align-items: start;
}
.hero-headline {
  grid-column: 1; grid-row: 2;
}
.hero-headline .line {
  display: block;
}
.hero-headline .accent { color: var(--green-primary); }
.hero-headline .dim    { color: var(--text-secondary); }
.hero-orb {
  grid-column: 2; grid-row: 1 / 4;
  display: flex; align-items: center; justify-content: center;
  animation: float 8s ease-in-out infinite;
}
.hero-desc {
  grid-column: 2; grid-row: 2;
  font-size: 15px; line-height: 1.7;
  color: var(--text-secondary);
  max-width: 280px;
  align-self: end;
}
.hero-actions {
  grid-column: 1; grid-row: 3;
  display: flex; align-items: center; gap: 28px;
  padding-top: 16px;
}
.hero-link {
  font-size: 13px; color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}
.hero-link:hover { color: var(--green-primary); }
.scroll-hint {
  position: absolute; bottom: 32px; left: 6vw;
  display: flex; align-items: center; gap: 12px;
  font-size: 12px; color: var(--text-dim);
  letter-spacing: 0.1em;
  z-index: 2;
}
</style>
