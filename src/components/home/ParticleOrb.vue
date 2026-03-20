<template>
  <div class="orb-wrapper">
    <canvas ref="orbCanvas" class="orb-canvas" width="500" height="500" />
    <div class="orb-glow"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const orbCanvas = ref<HTMLCanvasElement>()
let animId: number

interface OrbParticle {
  theta: number; phi: number; r: number;
  speed: number; size: number; opacity: number;
}

onMounted(() => {
  const canvas = orbCanvas.value!
  const ctx = canvas.getContext('2d')!
  const cx = 250, cy = 250, R = 160

  const pts: OrbParticle[] = Array.from({ length: 500 }, () => ({
    theta: Math.random() * Math.PI * 2,
    phi:   Math.acos(2 * Math.random() - 1),
    r:     R * (0.85 + Math.random() * 0.3),
    speed: (Math.random() - 0.5) * 0.003,
    size:  Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.7 + 0.15,
  }))

  let rotY = 0
  const draw = () => {
    ctx.clearRect(0, 0, 500, 500)
    rotY += 0.004
    pts.forEach(p => {
      p.theta += p.speed
      const x3 = p.r * Math.sin(p.phi) * Math.cos(p.theta + rotY)
      const y3 = p.r * Math.cos(p.phi)
      const z3 = p.r * Math.sin(p.phi) * Math.sin(p.theta + rotY)
      
      const scale = (z3 + R * 1.5) / (R * 2.5)
      const px = cx + x3 * scale
      const py = cy + y3 * scale * 0.8
      
      const alpha = p.opacity * scale
      const size  = p.size * scale

      if (alpha > 0) {
        const grad = ctx.createRadialGradient(px, py, 0, px, py, size * 2)
        grad.addColorStop(0, `rgba(57, 255, 20, ${alpha})`)
        grad.addColorStop(1, `rgba(57, 255, 20, 0)`)
        
        ctx.beginPath()
        ctx.arc(px, py, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
    })
    animId = requestAnimationFrame(draw)
  }
  draw()
  
  onUnmounted(() => cancelAnimationFrame(animId))
})
</script>

<style scoped>
.orb-wrapper {
  position: relative; width: 500px; height: 500px;
}
.orb-canvas { position: relative; z-index: 2; }
.orb-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(57,255,20,0.12) 0%, transparent 70%);
  border-radius: 50%; z-index: 1;
  animation: pulse-glow 4s ease-in-out infinite;
}
</style>
