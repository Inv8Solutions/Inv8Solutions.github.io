<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '@/components/Offers/HeroSection.vue'
import OffersBody from '@/components/Offers/Body.vue'
import SampleWorks from '@/components/Offers/SampleWorks.vue'
import { DEFAULT_SERVICE_ID } from '@/data/offers'

defineOptions({
  name: 'ServicesPage',
})

const selectedServiceId = ref(DEFAULT_SERVICE_ID)
</script>

<template>
  <div class="services-page">
    <hero-section v-model:selected-service-id="selectedServiceId" />
    <offers-body :selected-service-id="selectedServiceId" />
    <sample-works :service-id="selectedServiceId" />
  </div>
</template>

<style scoped>
.services-page {
  min-height: 100vh;
  width: 100%;
}
</style>
