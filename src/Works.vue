<script setup lang="ts">
import WorksHeroSection from './components/Works/HeroSection.vue'
import ProductContainer from './components/Works/ProductContainer.vue'
import WorkWithUs from './components/Home/WorkWithUs.vue'
defineOptions({
  name: 'WorksPage',
})
</script>

<template>
  <div class="works-page">
    <works-hero-section />
    <product-container />
    <work-with-us />
  </div>
</template>

<style scoped>
.works-page {
  min-height: 100vh;
}
</style>
