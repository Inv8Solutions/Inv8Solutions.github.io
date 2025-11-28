<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/AppHeader.vue'
import FooterSection from '@/components/Footer.vue'

const route = useRoute()
const router = useRouter()

// Check authentication for admin routes
const checkAdminAuth = () => {
  if (route.path === '/admin' || route.path.startsWith('/admin/')) {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated !== 'true') {
      // Redirect to login page
      router.push('/admin/login')
    }
  }
}

// Handle scroll behavior for hash links
onMounted(() => {
  if (route.hash) {
    const element = document.querySelector(route.hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Check admin auth on initial load
  checkAdminAuth()
})

// Watch for route changes to protect admin routes
watch(
  () => route.path,
  () => {
    checkAdminAuth()
  },
  { immediate: true },
)
</script>

<template>
  <AppHeader v-if="!$route.path.startsWith('/admin')" />
  <main class="min-h-screen" :class="{ 'admin-layout': $route.path.startsWith('/admin') }">
    <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.fullPath" />
    </router-view>
  </main>
  <FooterSection
    v-if="!$route.path.startsWith('/contactus') && !$route.path.startsWith('/admin')"
  />
</template>

<style>
/* Add smooth page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Admin layout styles */
.admin-layout {
  min-height: 100vh;
  width: 100%;
}
</style>
