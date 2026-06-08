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
import ReferralView from '@/views/ReferralView.vue'
import BIDView from '@/views/BIDView.vue'

const SITE_NAME = 'inv8 Studio'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: `${SITE_NAME} | Product Design & Innovation Studio` },
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { title: `About Us — ${SITE_NAME} | Product Design & Development Philippines` },
  },
  {
    path: '/works',
    name: 'Works',
    component: Works,
    meta: { title: `Our Work — ${SITE_NAME}` },
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: { title: `Services — ${SITE_NAME}` },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogView,
    meta: { title: `Blog — ${SITE_NAME}` },
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: BlogPostView,
    props: true,
    // title set dynamically in BlogPostView
  },
  {
    path: '/contactus',
    name: 'ContactUs',
    component: ContactUs,
    meta: { title: `Contact Us — ${SITE_NAME}` },
  },
  {
    path: '/referrals',
    name: 'Referrals',
    component: ReferralView,
    meta: { title: `Referral Program — ${SITE_NAME}` },
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { title: `Admin Login — ${SITE_NAME}` },
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { title: `Admin Panel — ${SITE_NAME}` },
  },
  {
    path: '/project/:id',
    name: 'ProjectDetails',
    component: ProjectDetails,
    props: true,
    // title set dynamically in ProjectDetails
  },
  {
    path: '/bid',
    name: 'BID',
    component: BIDView,
    meta: { title: `BID Program — Free Business Innovation Discovery | ${SITE_NAME}` },
  },
  {
    path: '/BaguioDental/Clinics',
    name: 'BaguioDentalClinics',
    component: BaguioDentalClinics,
    alias: ['/baguiodental/clinics'],
    meta: { title: 'Baguio Dental Clinics' },
  },
  {
    path: '/:slug',
    name: 'BlogPostRoot',
    component: BlogPostView,
    props: true,
    // title set dynamically in BlogPostView
  },
  // catch-all — must be last
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
      return { el: to.hash, behavior: 'smooth' }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.afterEach((to) => {
  const title = to.meta?.title as string | undefined
  if (title) document.title = title
})

export default router
