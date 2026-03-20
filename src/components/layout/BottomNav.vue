<template>
  <nav class="bottom-nav">
    <div class="bottom-nav-inner">
      <span class="nav-dot"></span>
      <router-link
        v-for="item in navItems" :key="item.path"
        :to="item.path"
        class="bottom-nav-item"
        :class="{ active: $route.path === item.path }"
      >
        {{ item.label }}
      </router-link>
      <span class="nav-dot"></span>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navItems = [
  { label: 'Home',    path: '/' },
  { label: 'Product', path: '/product' },
  { label: 'Docs',    path: '/docs' },
  { label: 'About',   path: '/about' },
]
</script>

<style scoped>
.bottom-nav {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  z-index: 100;
}
.bottom-nav-inner {
  display: flex; align-items: center; gap: 4px;
  padding: 8px 16px;
  background: rgba(13, 21, 13, 0.85);
  border: 1px solid var(--border-card);
  border-radius: 100px;
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(57,255,20,0.1);
}
.nav-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--green-primary);
  box-shadow: var(--glow-sm);
}
.bottom-nav-item {
  padding: 6px 18px;
  font-family: var(--font-mono); font-size: 12px;
  color: var(--text-secondary);
  text-decoration: none; border-radius: 100px;
  transition: all 0.2s;
  letter-spacing: 0.03em;
}
.bottom-nav-item:hover { color: var(--text-primary); }
.bottom-nav-item.active {
  background: rgba(57,255,20,0.12);
  color: var(--green-primary);
}
</style>
