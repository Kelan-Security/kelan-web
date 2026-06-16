<template>
  <nav class="bottom-nav">
    <div class="bottom-nav-inner">
      <span class="nav-dot left-dot"></span>
      
      <div class="nav-items-wrapper">
        <!-- Active indicator background sliding capsule -->
        <div class="nav-active-indicator" :style="indicatorStyle"></div>
        
        <button
          v-for="(item, idx) in navItems" 
          :key="item.id"
          :ref="el => { if (el) itemRefs[idx] = el as HTMLElement }"
          class="bottom-nav-item"
          :class="{ active: activeSection === item.id }"
          @click="scrollTo(item.id)"
        >
          {{ item.label }}
        </button>
      </div>

      <span class="nav-dot right-dot"></span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'

const navItems = [
  { label: 'Home',    id: 'hero' },
  { label: 'Product', id: 'product' },
  { label: 'About',   id: 'about' },
  { label: 'Docs',    id: 'docs' },
]

const activeSection = ref('hero')
const itemRefs = ref<HTMLElement[]>([])

// Style to dynamically position the active indicator pill
const activeIndex = computed(() => {
  return navItems.findIndex(item => item.id === activeSection.value)
})

const indicatorStyle = ref({
  width: '0px',
  left: '0px',
  opacity: 0
})

const updateIndicator = () => {
  const index = activeIndex.value
  if (index !== -1 && itemRefs.value[index]) {
    const el = itemRefs.value[index]
    indicatorStyle.value = {
      width: `${el.offsetWidth}px`,
      left: `${el.offsetLeft}px`,
      opacity: 1
    }
  } else {
    indicatorStyle.value.opacity = 0
  }
}

watch(activeSection, () => {
  nextTick(updateIndicator)
})

const scrollTo = (id: string) => {
  activeSection.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  window.addEventListener('resize', updateIndicator)
  
  // Set up intersection observer to track page scrolling
  const options = {
    root: null,
    rootMargin: '-30% 0px -50% 0px', // When the section takes up the middle part of viewport
    threshold: 0.05
  }
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)
  
  navItems.forEach(item => {
    const el = document.getElementById(item.id)
    if (el) observer?.observe(el)
  })

  // Initial update
  setTimeout(() => {
    updateIndicator()
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIndicator)
  observer?.disconnect()
})
</script>

<style scoped>
.bottom-nav {
  position: fixed; 
  bottom: 32px; 
  left: 50%; 
  transform: translateX(-50%);
  z-index: 100;
  pointer-events: none; /* Let clicks pass through outside the inner bar */
}

.bottom-nav-inner {
  pointer-events: auto; /* Re-enable pointer events on the actual navigation */
  display: flex; 
  align-items: center; 
  gap: 12px;
  padding: 8px 16px;
  background: rgba(8, 10, 15, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 100px;
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  box-shadow: 
    0 16px 40px rgba(0, 0, 0, 0.6), 
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 0 0 1px rgba(20, 184, 166, 0.03);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.bottom-nav-inner:hover {
  border-color: rgba(20, 184, 166, 0.2);
  box-shadow: 
    0 20px 48px rgba(0, 0, 0, 0.7), 
    inset 0 1px 0 rgba(20, 184, 166, 0.1),
    0 0 15px rgba(20, 184, 166, 0.05);
}

.nav-dot {
  width: 6px; 
  height: 6px; 
  border-radius: 50%;
  background: var(--green-primary);
  opacity: 0.8;
}

.left-dot {
  animation: pulse-dot-left 3s ease-in-out infinite;
}

.right-dot {
  animation: pulse-dot-right 3s ease-in-out infinite;
  animation-delay: 1.5s;
}

.nav-items-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-active-indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  background: rgba(20, 184, 166, 0.08);
  border: 1px solid rgba(20, 184, 166, 0.15);
  border-radius: 100px;
  transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
  z-index: 1;
}

.bottom-nav-item {
  position: relative;
  z-index: 2;
  padding: 8px 18px;
  background: transparent;
  border: none;
  font-family: var(--font-mono); 
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 100px;
  transition: color 0.3s ease;
  letter-spacing: 0.1em;
}

.bottom-nav-item:hover { 
  color: #FFF; 
}

.bottom-nav-item.active {
  color: var(--green-bright);
}

@keyframes pulse-dot-left {
  0%, 100% { transform: scale(1); opacity: 0.5; box-shadow: none; }
  50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 8px var(--green-primary); }
}

@keyframes pulse-dot-right {
  0%, 100% { transform: scale(1); opacity: 0.5; box-shadow: none; }
  50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 8px var(--green-primary); }
}
</style>
