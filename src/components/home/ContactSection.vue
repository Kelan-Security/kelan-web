<template>
  <section class="contact-section section" id="contact">
    <div class="container contact-content">
      <!-- Fingerprint blobs -->
      <div class="blob-group reveal" ref="blobGroup">
        <canvas ref="blobCanvas" class="blob-canvas" width="600" height="300"></canvas>
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
import { ref, onMounted, onUnmounted } from 'vue'
import SectionBadge from '@/components/ui/SectionBadge.vue'
import GlowButton from '@/components/ui/GlowButton.vue'

const openContact = () => window.open('mailto:kernalsecurity@gmail.com')

const blobCanvas = ref<HTMLCanvasElement>()
const blobGroup = ref<HTMLDivElement>()
let animId: number

interface OrbitParticle {
  ring: 1 | 2;
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  zOffset: number;
}

interface DriftStar {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const orbitParticles: OrbitParticle[] = []
const driftStars: DriftStar[] = []

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false }
let currentTiltX = 0
let currentTiltY = 0
let targetTiltX = 0
let targetTiltY = 0
let proximity = 0
let pulsePhase = 0
let angle1 = 0
let angle2 = 0
const baseSpeed = 0.0015

// Extract green primary rgb from CSS variable
let greenRGB = '20, 184, 166' // fallback to teal

const initParticles = (w: number, h: number) => {
  orbitParticles.length = 0
  driftStars.length = 0

  // 15 orbiting particles around rings
  for (let i = 0; i < 15; i++) {
    orbitParticles.push({
      ring: Math.random() > 0.5 ? 1 : 2,
      angle: Math.random() * Math.PI * 2,
      radius: 95 + Math.random() * 50,
      speed: (Math.random() * 0.002 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 1.8 + 0.8,
      opacity: Math.random() * 0.5 + 0.3,
      zOffset: (Math.random() - 0.5) * 30
    })
  }

  // 25 background drifting stars/particles
  for (let i = 0; i < 25; i++) {
    driftStars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      z: -120 - Math.random() * 120, // deep background
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      size: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.35 + 0.15
    })
  }
}

onMounted(() => {
  // Resolve CSS color variable dynamically to keep theme synced
  const dummy = document.createElement('div')
  dummy.style.color = 'var(--green-primary)'
  document.body.appendChild(dummy)
  const style = window.getComputedStyle(dummy)
  const colorStr = style.color
  document.body.removeChild(dummy)
  
  if (colorStr.startsWith('rgb')) {
    const matches = colorStr.match(/\d+/g)
    if (matches && matches.length >= 3) {
      greenRGB = `${matches[0]}, ${matches[1]}, ${matches[2]}`
    }
  }

  const canvas = blobCanvas.value
  if (!canvas) return
  
  initParticles(canvas.width, canvas.height)
  
  const onMouseMove = (e: MouseEvent) => {
    if (!blobGroup.value) return
    const rect = blobGroup.value.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    const maxDist = 350
    proximity = Math.max(0, Math.min(1, 1 - dist / maxDist))
    
    targetTiltY = (dx / maxDist) * 0.3
    targetTiltX = -(dy / maxDist) * 0.3
    mouse.active = true
  }

  const onMouseLeave = () => {
    proximity = 0
    targetTiltX = 0
    targetTiltY = 0
    mouse.active = false
  }

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 0) return
    const touch = e.touches[0]
    if (!blobGroup.value) return
    const rect = blobGroup.value.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    
    const dx = touch.clientX - cx
    const dy = touch.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    const maxDist = 350
    proximity = Math.max(0, Math.min(1, 1 - dist / maxDist))
    
    targetTiltY = (dx / maxDist) * 0.3
    targetTiltX = -(dy / maxDist) * 0.3
    mouse.active = true
  }

  const onTouchEnd = () => {
    proximity = 0
    targetTiltX = 0
    targetTiltY = 0
    mouse.active = false
  }

  const handleOrientation = (e: DeviceOrientationEvent) => {
    if (e.beta === null || e.gamma === null) return
    if (mouse.active) return // prioritize direct mouse/touch
    
    // Assume typical mobile viewing holding tilt is beta = 45 degrees
    const b = Math.max(-30, Math.min(30, e.beta - 45))
    const g = Math.max(-30, Math.min(30, e.gamma))
    
    targetTiltX = (b / 30) * 0.3
    targetTiltY = (g / 30) * 0.3
    proximity = Math.min(1, Math.sqrt(targetTiltX * targetTiltX + targetTiltY * targetTiltY) * 2)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseleave', onMouseLeave)
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchend', onTouchEnd)
  
  if (typeof DeviceOrientationEvent !== 'undefined' && 
      // @ts-ignore
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    const requestPermission = () => {
      // @ts-ignore
      DeviceOrientationEvent.requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation)
          }
        })
        .catch(console.error)
      window.removeEventListener('click', requestPermission)
    }
    window.addEventListener('click', requestPermission)
  } else {
    window.addEventListener('deviceorientation', handleOrientation)
  }

  const draw = () => {
    const canvas = blobCanvas.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)
    
    // Smoothly interpolate tilt values
    currentTiltX += (targetTiltX - currentTiltX) * 0.08
    currentTiltY += (targetTiltY - currentTiltY) * 0.08
    
    // Update rotation angles with proximity acceleration
    const speedMult = 1.0 + proximity * 2.0
    angle1 += baseSpeed * speedMult
    angle2 -= baseSpeed * speedMult
    
    // Update breathing pulse scale
    pulsePhase += 0.012
    const pulse1 = 1.0 + 0.03 * Math.sin(pulsePhase)
    const pulse2 = 1.0 + 0.03 * Math.sin(pulsePhase + 1.2) // offset
    
    const cx1 = 225
    const cx2 = 375
    const cy = 150
    const perspective = 300
    
    // ── DRAW DRIFTING STARS (Background) ──
    driftStars.forEach(star => {
      star.x += star.vx * speedMult
      star.y += star.vy * speedMult
      
      if (star.x < 0) star.x = w
      if (star.x > w) star.x = 0
      if (star.y < 0) star.y = h
      if (star.y > h) star.y = 0
      
      const dx = star.x - 300
      const dy = star.y - 150
      const z = star.z
      
      // Rotate Y
      const x1 = dx * Math.cos(currentTiltY) - z * Math.sin(currentTiltY)
      const z1 = dx * Math.sin(currentTiltY) + z * Math.cos(currentTiltY)
      // Rotate X
      const y1 = dy * Math.cos(currentTiltX) - z1 * Math.sin(currentTiltX)
      const z2 = dy * Math.sin(currentTiltX) + z1 * Math.cos(currentTiltX)
      
      const scale = perspective / (perspective + z2)
      const px = 300 + x1 * scale
      const py = 150 + y1 * scale
      
      ctx.beginPath()
      ctx.arc(px, py, star.size * scale, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 255, 159, ${star.opacity * scale})`
      ctx.fill()
    })
    
    const project3D = (rx: number, ry: number, rz: number, ringCx: number, ringCy: number) => {
      const x1 = rx * Math.cos(currentTiltY) - rz * Math.sin(currentTiltY)
      const z1 = rx * Math.sin(currentTiltY) + rz * Math.cos(currentTiltY)
      const y1 = ry * Math.cos(currentTiltX) - z1 * Math.sin(currentTiltX)
      const z2 = ry * Math.sin(currentTiltX) + z1 * Math.cos(currentTiltX)
      
      const scale = perspective / (perspective + z2)
      const px = ringCx + x1 * scale
      const py = ringCy + y1 * scale
      return { px, py, scale, z: z2 }
    }
    
    const drawRing3D = (ringCx: number, ringCy: number, lines: number, strokeColor: string, rotAngle: number, scaleFactor: number) => {
      ctx.strokeStyle = strokeColor
      ctx.lineCap = 'round'
      
      for (let i = 1; i <= lines; i++) {
        const r = (i / lines) * (80) * scaleFactor
        ctx.beginPath()
        
        if (i % 3 === 0) ctx.setLineDash([4, 8])
        else ctx.setLineDash([])
        
        let first = true
        
        // draw stylized semi-circles
        for (let a = Math.PI * 0.1; a < Math.PI * 1.9; a += 0.08) {
          const noise = Math.sin(a * 4 + i + pulsePhase) * (2 + proximity * 3)
          const radius = r + noise
          const angle = a + rotAngle
          
          const rx = radius * Math.cos(angle)
          const ry = radius * Math.sin(angle)
          const rz = Math.sin(a * 4 + i + pulsePhase) * 4 // dynamic 3D warp distortion
          
          const pt = project3D(rx, ry, rz, ringCx, ringCy)
          
          ctx.lineWidth = 1.5 * pt.scale
          
          if (first) {
            ctx.moveTo(pt.px, pt.py)
            first = false
          } else {
            ctx.lineTo(pt.px, pt.py)
          }
        }
        ctx.stroke()
      }
    }
    
    // ── DRAW RING 2 (Right Ring - faint) ──
    drawRing3D(cx2, cy, 12, 'rgba(0, 255, 159, 0.28)', angle2, pulse2)
    
    // ── DRAW RING 1 (Left Ring - solid) ──
    drawRing3D(cx1, cy, 15, `rgba(${greenRGB}, 0.85)`, angle1, pulse1)
    
    // ── DRAW ORBITING PARTICLES ──
    orbitParticles.forEach(p => {
      p.angle += p.speed * speedMult
      
      const ringCx = p.ring === 1 ? cx1 : cx2
      const scaleFactor = p.ring === 1 ? pulse1 : pulse2
      const rx = p.radius * scaleFactor * Math.cos(p.angle)
      const ry = p.radius * scaleFactor * Math.sin(p.angle) * 0.4 // flattened orbit
      const rz = p.radius * scaleFactor * Math.sin(p.angle) * 0.8 + p.zOffset
      
      const pt = project3D(rx, ry, rz, ringCx, cy)
      
      ctx.beginPath()
      ctx.arc(pt.px, pt.py, p.size * pt.scale, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 255, 159, ${p.opacity * pt.scale})`
      ctx.fill()
    })
    
    animId = requestAnimationFrame(draw)
  }
  
  draw()
  
  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseleave', onMouseLeave)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
    window.removeEventListener('deviceorientation', handleOrientation)
  })
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
.blob-canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  filter: drop-shadow(0 0 20px rgba(0, 255, 159,0.4));
  opacity: 0.8;
  width: 600px;
  height: 300px;
}
.contact-desc {
  max-width: 400px; margin: 20px auto 40px;
  color: var(--text-secondary); font-size: 15px; line-height: 1.7;
}
.pencil-icon { font-size: 0.6em; margin-left: 12px; }

@media (max-width: 640px) {
  .blob-group { width: 100%; height: 160px; }
  .blob-canvas {
    width: 440px;
    height: 220px;
  }
}
</style>
