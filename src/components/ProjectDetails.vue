<template>
  <main class="min-h-screen bg-white">
    <!-- 1. DetailIntro Section -->
    <DetailIntro ref="introRef" />

    <!-- 2. DetailDossier Section -->
    <DetailDossier ref="dossierRef" />

    <!-- 3. ChallengeSection Section -->
    <ChallengeSection ref="challengeRef" />

    <!-- 4. SolutionSection Section -->
    <SolutionSection ref="solutionRef" />

    <!-- 5. ProjectImageGrid Section -->
    <ProjectImageGrid ref="imageGridRef" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DetailIntro from './Details/DetailIntro.vue'
import DetailDossier from './Details/DetailDossier.vue'
import ChallengeSection from './Details/ChallengeSection.vue'
import SolutionSection from './Details/SolutionSection.vue'
import ProjectImageGrid from './Details/ProjectImageGrid.vue'

// Template refs for component access
const introRef = ref<InstanceType<typeof DetailIntro>>()
const dossierRef = ref<InstanceType<typeof DetailDossier>>()
const challengeRef = ref<InstanceType<typeof ChallengeSection>>()
const solutionRef = ref<InstanceType<typeof SolutionSection>>()
const imageGridRef = ref<InstanceType<typeof ProjectImageGrid>>()

// Function to refresh all component data
const refreshAllData = async () => {
  try {
    // Refresh each component's data
    if (introRef.value?.refreshIntro) {
      await introRef.value.refreshIntro()
    }

    if (dossierRef.value?.refreshDossier) {
      await dossierRef.value.refreshDossier()
    }

    if (challengeRef.value?.refreshChallenge) {
      await challengeRef.value.refreshChallenge()
    }

    if (solutionRef.value?.refreshSolution) {
      await solutionRef.value.refreshSolution()
    }

    if (imageGridRef.value?.refreshImages) {
      await imageGridRef.value.refreshImages()
    }
  } catch (error) {
    console.error('Failed to refresh component data:', error)
  }
}

// Expose functions for parent components
defineExpose({
  refreshAllData,
  introRef,
  dossierRef,
  challengeRef,
  solutionRef,
  imageGridRef,
})

// Optional: Load all data on mount
onMounted(() => {
  // Components will automatically load their data on mount
  // This is just for any additional initialization if needed
  console.log('Details page mounted with all components')
})
</script>

<style scoped>
/* Add any page-specific styles if needed */
main {
  width: 100%;
}
</style>
