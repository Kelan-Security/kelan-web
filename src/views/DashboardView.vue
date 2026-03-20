<template>
  <div class="dashboard-view pt-nav">
    <!-- Assuming the existing admin dashboard runs on localhost:3000 which is proxied to /api -->
    <iframe src="/api" class="dashboard-frame" frameborder="0"></iframe>
  </div>
</template>

<style scoped>
.pt-nav { padding-top: var(--nav-height); }
.dashboard-view {
  width: 100vw; height: 100vh;
  display: flex; flex-direction: column;
}
.dashboard-frame {
  width: 100%; height: 100%;
  flex-grow: 1; border: none;
}
</style>
