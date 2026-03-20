<template>
  <canvas ref="canvasRef" class="particle-canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; pulse: number;
}

const canvasRef = ref<HTMLCanvasElement>()
let animId: number
let particles: Particle[] = []

const createParticles = (canvas: HTMLCanvasElement) => {
  const count = Math.floor((canvas.width * canvas.height) / 12000)
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.1,
    pulse: Math.random() * Math.PI * 2,
  }))
}

const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.pulse += 0.02
    if (p.x < 0) p.x = canvas.width
    if (p.x > canvas.width) p.x = 0
    if (p.y < 0) p.y = canvas.height
    if (p.y > canvas.height) p.y = 0
    
    const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse))
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(57, 255, 20, ${alpha})`
    ctx.fill()
  })
  
  // Draw connecting lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 120) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(57, 255, 20, ${0.08 * (1 - dist / 120)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
  
  animId = requestAnimationFrame(() => draw(canvas, ctx))
}

onMounted(() => {
  const canvas = canvasRef.value!
  const ctx = canvas.getContext('2d')!
  const resize = () => {
    canvas.width  = canvas.offsetWidth || window.innerWidth
    canvas.height = canvas.offsetHeight || window.innerHeight
    createParticles(canvas)
  }
  resize()
  window.addEventListener('resize', resize)
  draw(canvas, ctx)
  
  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.particle-canvas {
  position: absolute; inset: 0; width: 100%; height: 100%;
  pointer-events: none;
}
</style>
