import { createRouter, createWebHistory } from 'vue-router'
import Works from '../Works.vue'
import Services from '@/Services.vue'
import ContactUs from '@/components/ContactUs.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/works',
    name: 'Works',
    component: Works,
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/contactus',
    name: 'ContactUs',
    component: ContactUs,
  },
  // Add a catch-all route for 404s
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
