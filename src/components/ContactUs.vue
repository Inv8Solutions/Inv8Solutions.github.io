<script setup lang="ts">
import ContactHeroSection from './Contact/HeroSection.vue'
import ContactBodySection from './Contact/Body.vue'
import ContactFooter from './Contact/Footer.vue'

defineOptions({
  name: 'ContactUsPage',
})
</script>

<template>
  <div class="contact-page">
    <contact-hero-section />
    <contact-body-section />
    <contact-footer />
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  width: 100%;
}
</style>
