import { createRouter, createWebHistory } from 'vue-router'
import Works from '../Works.vue'
import Services from '@/Services.vue'
import ContactUs from '@/components/ContactUs.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import BlogView from '@/views/BlogView.vue'
import BlogPostView from '@/views/BlogPostView.vue'
import AdminLogin from '@/AdminLogin.vue'
import AdminPanel from '@/AdminPanel.vue'
import ProjectDetails from '@/components/ProjectDetails.vue'
import { BaguioDentalClinics } from '@/components/BaguioDentalClinics'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
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
    path: '/blog',
    name: 'Blog',
    component: BlogView,
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: BlogPostView,
    props: true,
  },
  {
    path: '/contactus',
    name: 'ContactUs',
    component: ContactUs,
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
  },
  {
    path: '/project/:id',
    name: 'ProjectDetails',
    component: ProjectDetails,
    props: true,
  },
  {
    path: '/BaguioDental/Clinics',
    name: 'BaguioDentalClinics',
    component: BaguioDentalClinics,
    alias: ['/baguiodental/clinics'],
  },
  // Add a catch-all route for 404s (must be last)
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
