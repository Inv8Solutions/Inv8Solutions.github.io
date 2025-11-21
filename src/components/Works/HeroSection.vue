<script setup lang="ts">
const categories = [
  'All Projects',
  'UI/UX Design',
  'MVP Development',
  'Innovation Systems',
  'IoT Solutions',
  'Pitchdeck Design',
]
</script>

<template>
  <section class="bg-[#f5f5f5] px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <div
        class="rounded-[32px] bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-12"
      >
        <div
          class="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700"
        >
          <span class="h-2 w-2 rounded-full bg-blue-500"></span>
          Our Portfolio
        </div>

        <h1 class="mb-4 text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl">
          Work designed to solve real problems
        </h1>
        <p class="mx-auto mb-8 max-w-3xl text-lg text-gray-500">
          A collection of digital products, systems, and IoT solutions we’ve built for founders and
          businesses — crafted with clarity, purpose, and disciplined execution.
        </p>

        <div class="mb-8 h-px w-full bg-gray-100"></div>

        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="category in categories"
            :key="category"
            class="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-white"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
