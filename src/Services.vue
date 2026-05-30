<script setup lang="ts">
import HeroSection from '@/components/Offers/HeroSection.vue'
import OffersBody from '@/components/Offers/Body.vue'
import ServicesClosing from '@/components/Offers/ServicesClosing.vue'

defineOptions({
  name: 'ServicesPage',
})
</script>

<template>
  <div class="services-page">
    <hero-section />
    <offers-body />
    <services-closing />
  </div>
</template>

<style scoped>
.services-page {
  min-height: 100vh;
  width: 100%;
}
</style>
