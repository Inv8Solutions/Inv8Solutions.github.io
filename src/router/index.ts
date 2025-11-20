import { createRouter, createWebHistory } from 'vue-router'

// Import your pages
import Home from '@/App.vue'
import Works from '@/Works.vue'
import Services from '@/Services.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/works', name: 'Works', component: Works },
  { path: '/services', name: 'Services', component: Services },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
