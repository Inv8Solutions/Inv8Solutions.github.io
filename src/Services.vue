<script setup lang="ts">
import { ref, computed } from 'vue'
import HeroSection from '@/components/Offers/HeroSection.vue'
import OffersBody from '@/components/Offers/Body.vue'
import SampleWorks from '@/components/Offers/SampleWorks.vue'
import { DEFAULT_SERVICE_ID } from '@/data/offers'
import type { Project } from '@/components/Offers/SampleWorks.vue'

defineOptions({
  name: 'ServicesPage',
})

const selectedServiceId = ref(DEFAULT_SERVICE_ID)

// Sample projects data - replace with Firebase data later
const sampleProjects = ref<Project[]>([
  {
    id: '1',
    title: 'Forensic Lens',
    description:
      'We craft clear, compelling pitch decks that communicate your vision with precision. Our approach focuses on structure, storytelling, and visuals that help founders present their product with confidence.',
    serviceId: 'uiux',
  },
  {
    id: '2',
    title: 'Quadrangle',
    description:
      'We craft clear, compelling pitch decks that communicate your vision with precision. Our approach focuses on structure, storytelling, and visuals that help founders present their product with confidence.',
    serviceId: 'uiux',
  },
])

// Filter projects by selected service
const filteredProjects = computed(() => {
  return sampleProjects.value.filter((project: Project) =>
    selectedServiceId.value ? project.serviceId === selectedServiceId.value : true,
  )
})
</script>

<template>
  <div class="services-page">
    <hero-section v-model:selected-service-id="selectedServiceId" />
    <offers-body :selected-service-id="selectedServiceId" />
    <sample-works :projects="filteredProjects" />
  </div>
</template>

<style scoped>
.services-page {
  min-height: 100vh;
  width: 100%;
}
</style>
