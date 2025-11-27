<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/AppHeader.vue'
import FooterSection from '@/components/Footer.vue'

const route = useRoute()

// Handle scroll behavior for hash links
onMounted(() => {
  if (route.hash) {
    const element = document.querySelector(route.hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
})
</script>

<template>
  <AppHeader />
  <main class="min-h-screen">
    <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.fullPath" />
    </router-view>
  </main>
  <FooterSection v-if="!$route.path.startsWith('/contactus')" />
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
</style>
