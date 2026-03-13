<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from './sections/HeroSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ContactSection from './sections/ContactSection.vue'

const preselectedService = ref('Dental Consultation')

const setService = (serviceName: string) => {
  preselectedService.value = serviceName
}
</script>

<template>
  <main class="bg-white text-gray-900">
    <HeroSection @select-service="setService" />
    <ServicesSection @select-service="setService" />
    <AboutSection />
    <ContactSection :initial-service="preselectedService" />
  </main>
</template>
