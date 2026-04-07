<template>
  <div id="app">
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <BottomNav />
    <Footer />
    <!-- Custom cursor -->
    <div class="cursor" ref="cursor"></div>
    <div class="cursor-trail" ref="cursorTrail"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar   from '@/components/layout/NavBar.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
import Footer   from '@/components/layout/Footer.vue'

const cursor      = ref<HTMLElement>()
const cursorTrail = ref<HTMLElement>()

onMounted(() => {
  let trailX = 0, trailY = 0
  window.addEventListener('mousemove', e => {
    if(cursor.value) {
      cursor.value.style.left = e.clientX + 'px'
      cursor.value.style.top  = e.clientY + 'px'
    }
    requestAnimationFrame(() => {
      trailX += (e.clientX - trailX) * 0.15
      trailY += (e.clientY - trailY) * 0.15
      if(cursorTrail.value) {
        cursorTrail.value.style.left = trailX + 'px'
        cursorTrail.value.style.top  = trailY + 'px'
      }
    })
  })
})
</script>

<style>
.cursor, .cursor-trail {
  position: fixed; border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
}
.cursor {
  width: 8px; height: 8px;
  background: var(--green-primary);
  box-shadow: 0 0 8px rgba(0, 255, 159,0.8);
}
.cursor-trail {
  width: 24px; height: 24px;
  border: 1px solid rgba(0, 255, 159,0.4);
  transition: width 0.15s, height 0.15s;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
