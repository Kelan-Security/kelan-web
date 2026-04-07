<template>
  <div class="orb-wrapper" ref="wrapperRef">
    <canvas ref="orbCanvas" class="orb-canvas" width="500" height="500" />
    <div class="orb-glow"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const orbCanvas = ref<HTMLCanvasElement>()
const wrapperRef = ref<HTMLDivElement>()
let animId: number

interface OrbParticle {
  theta: number; phi: number; r: number;
  speed: number; size: number; opacity: number;
}

onMounted(() => {
  const canvas = orbCanvas.value!
  const ctx = canvas.getContext('2d')!
  const cx = 250, cy = 250, R = 150

  const pts: OrbParticle[] = Array.from({ length: 900 }, () => ({
    theta: Math.random() * Math.PI * 2,
    phi:   Math.acos(2 * Math.random() - 1),
    r:     R * (0.85 + Math.random() * 0.3),
    speed: (Math.random() - 0.5) * 0.003,
    size:  Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.2, 
  }))

  let rotY = 0
  let targetRotX = 0
  let targetRotY = 0
  let currentRotX = 0

  const draw = () => {
    ctx.clearRect(0, 0, 500, 500)
    rotY += 0.005 

    // Smooth interoplation for mouse tracking
    currentRotX += (targetRotX - currentRotX) * 0.05
    const totalRotY = rotY + targetRotY * 0.5

    pts.forEach(p => {
      p.theta += p.speed
      
      // Basic 3D spherical rendering
      // Apply base rotation
      let x = p.r * Math.sin(p.phi) * Math.cos(p.theta + totalRotY)
      let y = p.r * Math.cos(p.phi)
      let z = p.r * Math.sin(p.phi) * Math.sin(p.theta + totalRotY)
      
      // Apply X tilt tracking mouse Y
      const cosX = Math.cos(currentRotX)
      const sinX = Math.sin(currentRotX)
      const y2 = y * cosX - z * sinX
      const z2 = y * sinX + z * cosX

      const scale = (z2 + R * 1.5) / (R * 2.5)
      const px = cx + x * scale
      // flatten Y a bit for pseudo-3D look
      const py = cy + y2 * scale * 0.9
      
      const alpha = p.opacity * scale
      const size  = p.size * scale * (z2 > 0 ? 1.2 : 0.8)

      if (alpha > 0) {
        ctx.beginPath()
        ctx.arc(px, py, Math.max(0.1, size), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }
    })
    animId = requestAnimationFrame(draw)
  }
  draw()

  const onMouseMove = (e: MouseEvent) => {
    if (!wrapperRef.value) return
    const rect = wrapperRef.value.getBoundingClientRect()
    // normalized -1 to 1 based on center of sphere wrapper
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
    
    targetRotY = nx * 1.5 // Mouse X pans rotation Y
    targetRotX = -ny * 0.8 // Mouse Y tilts rotation X
  }
  const onMouseLeave = () => {
    targetRotX = 0
    targetRotY = 0
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseout', onMouseLeave)
  
  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseout', onMouseLeave)
  })
})
</script>

<style scoped>
.orb-wrapper {
  position: relative; width: 500px; height: 500px;
}
.orb-canvas { position: relative; z-index: 2; pointer-events: none; }
.orb-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%);
  border-radius: 50%; z-index: 1;
  animation: pulse-glow-orb 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse-glow-orb {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
}

@media (max-width: 768px) {
  .orb-wrapper {
    width: 100%;
    height: 400px;
  }
  .orb-canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
