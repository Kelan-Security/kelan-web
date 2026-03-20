<template>
  <section class="pricing-section section">
    <div class="container">
      <div class="text-center reveal">
        <SectionBadge text="Pricing" />
        <h2 class="display-lg text-main">Simple, transparent pricing.</h2>
        <p class="desc mx-auto">Start free, scale as your network grows.</p>
      </div>

      <div class="pricing-grid mt-xl">
        <!-- Community -->
        <GlassCard class="pricing-card reveal" style="transition-delay: 0.1s;">
          <h3 class="tier-name mono">COMMUNITY</h3>
          <div class="price display-md">Free<span class="period">/forever</span></div>
          <p class="tier-desc">Perfect for homelabs and small projects.</p>
          <ul class="features">
            <li><span class="check text-green">✓</span> ≤ 5 nodes</li>
            <li><span class="check text-green">✓</span> Basic anomaly detection</li>
            <li><span class="check text-green">✓</span> Community support</li>
            <li class="disabled"><span class="check text-dim">—</span> Extended data retention</li>
          </ul>
          <GlowButton label="Get Started" variant="outline" class="w-full mt-auto" />
        </GlassCard>

        <!-- Startup -->
        <GlassCard class="pricing-card popular reveal" style="transition-delay: 0.2s;" withGlow>
          <div class="popular-badge mono">MOST SECURE</div>
          <h3 class="tier-name mono text-green">STARTUP</h3>
          <div class="price display-md">$299<span class="period">/mo</span></div>
          <p class="tier-desc">Advanced protection for scaling teams.</p>
          <ul class="features">
            <li><span class="check text-green">✓</span> ≤ 50 nodes</li>
            <li><span class="check text-green">✓</span> Gemini Flash Trust Eval</li>
            <li><span class="check text-green">✓</span> Priority email support</li>
            <li><span class="check text-green">✓</span> 30-day data retention</li>
          </ul>
          <GlowButton label="Start 14-day trial" variant="solid" class="w-full mt-auto" />
        </GlassCard>

        <!-- Enterprise -->
        <GlassCard class="pricing-card reveal" style="transition-delay: 0.3s;">
          <h3 class="tier-name mono">ENTERPRISE</h3>
          <div class="price display-md">$1500<span class="period">/mo</span></div>
          <p class="tier-desc">Custom deployment for mission-critical apps.</p>
          <ul class="features">
            <li><span class="check text-green">✓</span> Unlimited nodes</li>
            <li><span class="check text-green">✓</span> Air-gap capable</li>
            <li><span class="check text-green">✓</span> 24/7 dedicated support</li>
            <li><span class="check text-green">✓</span> Custom model fine-tuning</li>
          </ul>
          <GlowButton label="Contact Sales" variant="outline" class="w-full mt-auto" />
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import GlowButton from '@/components/ui/GlowButton.vue'
</script>

<style scoped>
.pricing-section { background: var(--bg-deep); padding: 120px 6vw; }
.text-center { text-align: center; }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-main { margin-bottom: 16px; font-size: clamp(2rem, 4vw, 3rem); }
.desc { color: var(--text-secondary); max-width: 500px; font-size: 15px; }
.mt-xl { margin-top: 60px; }

.pricing-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  align-items: stretch;
}
.pricing-card {
  display: flex; flex-direction: column; padding: 40px 32px;
  position: relative;
}
.popular { border-color: var(--border-active); background: rgba(13,21,13,0.8); transform: translateY(-10px); }
.popular-badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: var(--green-primary); color: #000; font-size: 10px;
  padding: 4px 12px; border-radius: 100px; font-weight: 700;
  letter-spacing: 0.1em;
}

.tier-name { font-size: 12px; letter-spacing: 0.15em; color: var(--text-dim); margin-bottom: 20px; }
.price { color: var(--text-primary); margin-bottom: 12px; }
.period { font-size: 14px; font-family: var(--font-body); color: var(--text-dim); font-weight: 400; }
.tier-desc { font-size: 13px; color: var(--text-secondary); margin-bottom: 32px; }

.features { list-style: none; margin-bottom: 40px; flex-grow: 1; }
.features li {
  display: flex; align-items: flex-start; gap: 12px;
  margin-bottom: 16px; font-size: 14px; color: var(--text-primary);
}
.features li.disabled { color: var(--text-dim); }
.check { font-size: 12px; margin-top: 2px; }

.w-full { width: 100%; justify-content: center; }
.mt-auto { margin-top: auto; }

@media (max-width: 1024px) {
  .pricing-grid { grid-template-columns: 1fr; gap: 40px; max-width: 500px; margin-left: auto; margin-right: auto; }
  .popular { transform: none; }
}
</style>
