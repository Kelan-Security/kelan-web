<template>
  <section class="contact-section section" id="contact">
    <div class="container contact-content">
      <!-- Fingerprint blobs -->
      <div class="blob-group reveal">
        <div class="fingerprint-blob blob-1">
          <canvas ref="blob1" width="200" height="200"></canvas>
        </div>
        <div class="fingerprint-blob blob-2" style="margin-left: -40px; z-index: -1; opacity: 0.5;">
          <canvas ref="blob2" width="180" height="180"></canvas>
        </div>
      </div>

      <SectionBadge text="Get in touch" class="reveal" style="transition-delay: 0.1s;" />
      <h2 class="display-lg reveal" style="transition-delay: 0.2s;">
        Contact us<br>
        <span class="text-green">Today</span>
        <span class="pencil-icon">✎</span>
      </h2>
      <p class="contact-desc reveal" style="transition-delay: 0.3s;">
        Whenever you have queries, require expert advice,
        or need a pilot deployment — we're a click away.
      </p>
      <div class="reveal" style="transition-delay: 0.4s;">
        <GlowButton label="Contact us" variant="pill" @click="openContact" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlowButton from '@/components/ui/GlowButton.vue'

const openContact = () => window.open('mailto:tanush@kelansecurtity.io')

const blob1 = ref<HTMLCanvasElement>()
const blob2 = ref<HTMLCanvasElement>()

const drawFingerprint = (canvas: HTMLCanvasElement, lines: number, color: string) => {
  const ctx = canvas.getContext('2d')
  if(!ctx) return
  const w = canvas.width, h = canvas.height
  const cx = w/2, cy = h/2
  
  ctx.clearRect(0,0,w,h)
  ctx.lineWidth = 1.5
  ctx.strokeStyle = color
  ctx.lineCap = 'round'

  for(let i=1; i<=lines; i++) {
    const r = (i / lines) * (w*0.4)
    ctx.beginPath()
    // create stylized semi-circles
    for(let a=Math.PI*0.1; a<Math.PI*1.9; a+=0.1) {
      // add noise
      const noise = Math.sin(a * 4 + i) * 2
      const x = cx + (r + noise) * Math.cos(a)
      const y = cy + (r + noise) * Math.sin(a)
      if(a === Math.PI*0.1) ctx.moveTo(x,y)
      else ctx.lineTo(x,y)
    }
    // dotted parts
    if(i % 3 === 0) ctx.setLineDash([4, 8])
    else ctx.setLineDash([])
    
    ctx.stroke()
  }
}

onMounted(() => {
  if(blob1.value) drawFingerprint(blob1.value, 15, 'var(--green-primary)')
  if(blob2.value) drawFingerprint(blob2.value, 12, 'rgba(0, 255, 159,0.4)')
})
</script>

<style scoped>
.contact-section {
  text-align: center;
  background: radial-gradient(ellipse at center, rgba(0, 255, 159,0.04) 0%, transparent 60%);
  padding: 120px 6vw;
}
.contact-content { position: relative; z-index: 2; }
.blob-group {
  position: relative; height: 200px; width: 400px;
  margin: 0 auto 40px;
  display: flex; align-items: center; justify-content: center;
}
.fingerprint-blob canvas {
  filter: drop-shadow(0 0 20px rgba(0, 255, 159,0.4));
  opacity: 0.7;
}
.contact-desc {
  max-width: 400px; margin: 20px auto 40px;
  color: var(--text-secondary); font-size: 15px; line-height: 1.7;
}
.pencil-icon { font-size: 0.6em; margin-left: 12px; }

@media (max-width: 640px) {
  .blob-group { width: 100%; height: 160px; }
}
</style>
