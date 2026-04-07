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
      <div class="hero-text-container">
        <SectionBadge text="AITP Security Gateway" />
        
        <h1 class="hero-headline display-xl">
          <span class="line">The Network</span>
          <span class="line accent">Has a Brain</span>
          <span class="line dim">Now.</span>
        </h1>

        <p class="hero-desc">
          Automated Threat Detection and Response driven by Agentic AI and eBPF. 
          <span class="text-green">10x Faster isolation.</span>
        </p>

        <div class="hero-actions">
          <GlowButton label="Get started" variant="solid" @click="scrollToDocs" />
          <a href="https://github.com/kelan-security/kelan-core"
             target="_blank"
             class="hero-link mono">
            ↗ View on GitHub
          </a>
        </div>
      </div>

      <!-- Floating orb - right side -->
      <div class="hero-orb-container">
        <!-- Re-use ParticleOrb which now wraps Spline Viewer -->
        <ParticleOrb />
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="scroll-hint mono">
      <span class="scroll-arrow">↓</span>
      <span>SCROLL TO EXPLORE</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlowButton from '@/components/ui/GlowButton.vue'
import ParticleOrb from './ParticleOrb.vue'
import ParticleCanvas from '@/components/ui/ParticleCanvas.vue'

const scrollToDocs = () => {
  document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex; flex-direction: column; justify-content: center;
  padding: 120px 6vw 100px;
  position: relative; overflow: hidden;
  background: transparent;
}
.hero-bg {
  position: absolute; inset: 0; z-index: 0;
}
.bg-glow-1 {
  position: absolute;
  top: -20%; left: -10%;
  width: 60%; height: 80%;
  background: radial-gradient(ellipse, rgba(20, 184, 166, 0.05) 0%, transparent 60%);
  pointer-events: none;
  filter: blur(80px);
}
.bg-glow-2 {
  position: absolute;
  bottom: -10%; right: 5%;
  width: 50%; height: 60%;
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.05) 0%, transparent 60%);
  pointer-events: none;
  filter: blur(80px);
}
.hero-content {
  position: relative; z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: 40px;
}
.hero-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.hero-headline {
  margin-bottom: 32px;
}
.hero-headline .line {
  display: block;
}
.hero-headline .accent { 
  color: var(--green-bright); 
}
.hero-headline .dim { 
  color: var(--text-dim); 
}
.hero-desc {
  font-size: 18px; line-height: 1.8;
  color: var(--text-secondary);
  max-width: 480px;
  margin-bottom: 48px;
}

.hero-actions {
  display: flex; align-items: center; gap: 32px;
}
.hero-link {
  font-size: 14px; color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
}
.hero-link::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 1px;
  background: var(--green-primary);
  transition: width 0.3s;
}
.hero-link:hover { 
  color: var(--green-primary); 
  text-shadow: var(--glow-sm);
}
.hero-link:hover::after { width: 100%; }

.hero-orb-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* subtle vertical float, but the actual orb is handled by Spline */
  animation: float-container 8s ease-in-out infinite; 
}

@keyframes float-container {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.scroll-hint {
  position: absolute; bottom: 40px; left: 6vw;
  display: flex; align-items: center; gap: 12px;
  font-size: 12px; color: var(--text-dim);
  letter-spacing: 0.15em;
  z-index: 2;
  opacity: 0.6;
  transition: all 0.3s;
}
.scroll-hint:hover {
  opacity: 1;
  color: var(--green-primary);
  text-shadow: var(--glow-sm);
}
.scroll-arrow {
  color: var(--green-primary);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
}

@media (max-width: 992px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 60px;
  }
  .hero-text-container {
    align-items: center;
  }
  .hero-desc {
    margin: 0 auto 40px;
  }
}
</style>
