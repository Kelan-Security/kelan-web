import { createRouter, createWebHistory } from 'vue-router'
import HomeView      from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',          component: HomeView },
    { path: '/dashboard', component: DashboardView },
    { path: '/product',   component: () => import('@/views/ProductView.vue') },
    { path: '/about',     component: () => import('@/views/AboutView.vue') },
  ],
  scrollBehavior: () => ({ top: 0 })
})
