<template>
  <canvas ref="canvasRef" class="particle-canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; pulse: number;
  baseVx: number; baseVy: number;
}

const canvasRef = ref<HTMLCanvasElement>()
let animId: number
let particles: Particle[] = []
let mouse = { x: -1000, y: -1000, active: false }

const createParticles = (canvas: HTMLCanvasElement) => {
  const count = Math.floor((canvas.width * canvas.height) / 10000)
  particles = Array.from({ length: count }, () => {
    const vx = (Math.random() - 0.5) * 0.4
    const vy = (Math.random() - 0.5) * 0.4
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx, vy, baseVx: vx, baseVy: vy,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }
  })
}

const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  const interactionRadius = 200
  
  particles.forEach(p => {
    // Mouse physics
    if (mouse.active) {
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < interactionRadius) {
        // Pull particles gently towards cursor
        const force = (interactionRadius - dist) / interactionRadius
        p.vx += (dx / dist) * force * 0.05
        p.vy += (dy / dist) * force * 0.05
      }
    }
    
    // Friction towards base velocity
    p.vx += (p.baseVx - p.vx) * 0.02
    p.vy += (p.baseVy - p.vy) * 0.02

    p.x += p.vx; p.y += p.vy; p.pulse += 0.02
    
    if (p.x < 0) p.x = canvas.width
    if (p.x > canvas.width) p.x = 0
    if (p.y < 0) p.y = canvas.height
    if (p.y > canvas.height) p.y = 0
    
    const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
    ctx.fill()
  })
  
  // Connect particles (and to mouse)
  for (let i = 0; i < particles.length; i++) {
    const p1 = particles[i]

    // Connect to mouse
    if (mouse.active) {
      const dxm = mouse.x - p1.x
      const dym = mouse.y - p1.y
      const distm = Math.sqrt(dxm * dxm + dym * dym)
      if (distm < interactionRadius) {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.strokeStyle = `rgba(20, 184, 166, ${0.15 * (1 - distm / interactionRadius)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 100) {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 100)})`
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

  const onMouseMove = (e: MouseEvent) => {
    // map client to canvas bounds if needed, assuming absolute fullscreen
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.active = true
  }
  const onMouseLeave = () => { mouse.active = false }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseout', onMouseLeave)

  draw(canvas, ctx)
  
  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseout', onMouseLeave)
  })
})
</script>

<style scoped>
.particle-canvas {
  position: absolute; inset: 0; width: 100%; height: 100%;
  pointer-events: none;
}
</style>
