<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/AppHeader.vue'
import FooterSection from '@/components/Footer.vue'
import BaguioDentalHeader from '@/components/BaguioDentalClinics/BaguioDentalHeader.vue'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const router = useRouter()
const isDentalRoute = computed(() => route.path.startsWith('/BaguioDental/Clinics'))
const { initTheme } = useTheme()

// Check authentication for admin routes
const checkAdminAuth = () => {
  if (route.path === '/admin' || route.path.startsWith('/admin/')) {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated !== 'true') {
      router.push('/admin/login')
    }
  }
}

// Handle scroll behavior for hash links
onMounted(() => {
  initTheme()

  if (route.hash) {
    const element = document.querySelector(route.hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
  <BaguioDentalHeader v-if="isDentalRoute" />
  <AppHeader v-else-if="!$route.path.startsWith('/admin')" />
  <main class="min-h-screen" :class="{ 'admin-layout': $route.path.startsWith('/admin') }">
    <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.fullPath" />
    </router-view>
  </main>
  <FooterSection
    v-if="!isDentalRoute && !$route.path.startsWith('/contactus') && !$route.path.startsWith('/admin')"
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
