<template>
  <main>
    <HeroSection />
    <StatsSection />
    <HowItWorks />
    <FeaturesGrid />
    <SentinelSection />
    <ThreatDemo />
    <AboutSection />
    <PricingSection />
    <DocsSection />
    <ContactSection />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import HeroSection    from '@/components/home/HeroSection.vue'
import StatsSection   from '@/components/home/StatsSection.vue'
import HowItWorks     from '@/components/home/HowItWorks.vue'
import FeaturesGrid   from '@/components/home/FeaturesGrid.vue'
import SentinelSection from '@/components/home/SentinelSection.vue'
import ThreatDemo     from '@/components/home/ThreatDemo.vue'
import AboutSection   from '@/components/home/AboutSection.vue'
import PricingSection from '@/components/home/PricingSection.vue'
import DocsSection    from '@/components/home/DocsSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal('.reveal')

onMounted(() => {
  // Any other mount-time logic
})
</script>
