<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import acornLogo from '@/assets/Acorn.png'
import artistHubLogo from '@/assets/ArtistHub.png'
import bentoBasketLogo from '@/assets/BentoBasket.png'
import forensicLensLogo from '@/assets/ForensicLens.png'
import layer2Logo from '@/assets/layer2.png'
import retasifyLogo from '@/assets/Retasify.png'
import trapiHausLogo from '@/assets/TrapiHaus.png'

const companies = [
  { name: 'Retasify', image: retasifyLogo },
  { name: 'TrapiHaus', image: trapiHausLogo },
  { name: 'Acorn', image: acornLogo },
  { name: 'BentoBasket', image: bentoBasketLogo },
  { name: 'ForensicLens', image: forensicLensLogo },
  { name: 'ArtistHub', image: artistHubLogo },
  { name: 'Layer2', image: layer2Logo },
]

const { observeElements } = useScrollAnimation()

onMounted(() => {
  observeElements('.company-logo')
})
</script>

<template>
  <section class="bg-white py-12 min-h-[380px] flex flex-col justify-center">
    <div class="mx-auto w-full max-w-8xl px-4">
      <div class="text-center">
        <h2 class="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
          Companies we&apos;ve worked with
        </h2>
        <div
          class="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        />
      </div>

      <div
        class="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-x-12 gap-y-8 items-center justify-items-center max-w-4xl mx-auto"
      >
        <div
          v-for="(company, index) in companies"
          :key="company.name"
          class="company-logo flex items-center justify-center"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <img
            :src="company.image"
            :alt="`${company.name} logo`"
            class="h-8 w-auto object-contain opacity-60 transition-smooth hover:opacity-100 hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </section>
</template>
