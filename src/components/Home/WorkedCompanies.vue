<script setup lang="ts">
const companies = [
  { name: 'Retasify', image: '/src/assets/Retasify.png' },
  { name: 'TrapiHaus', image: '/src/assets/TrapiHaus.png' },
  { name: 'Acorn', image: '/src/assets/Acorn.png' },
  { name: 'BentoBasket', image: '/src/assets/BentoBasket.png' },
  { name: 'ForensicLens', image: '/src/assets/ForensicLens.png' },
  { name: 'ArtistHub', image: '/src/assets/ArtistHub.png' },
  { name: 'Layer2', image: '/src/assets/layer2.png' },
]
</script>

<template>
  <section class="bg-white py-12 min-h-[380px] flex flex-col justify-center">
    <div class="mx-auto w-full max-w-8xl px-4">
      <div class="text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
          Companies we&apos;ve worked with
        </p>
        <div
          class="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        />
      </div>

      <div
        class="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-x-12 gap-y-8 items-center justify-items-center max-w-4xl mx-auto"
      >
        <div
          v-for="company in companies"
          :key="company.name"
          class="flex items-center justify-center"
        >
          <img
            :src="company.image"
            :alt="company.name"
            class="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </div>
  </section>
</template>
