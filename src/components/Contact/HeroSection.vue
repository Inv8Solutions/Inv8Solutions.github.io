<script setup lang="ts">
defineOptions({
  name: 'ContactHeroSection',
})
</script>

<template>
  <section class="bg-[#f7f7f8] px-4 py-16 sm:px-6 lg:px-8">
    <div
      class="mx-auto max-w-7xl rounded-[48px] border border-gray-100 bg-white px-6 py-16 text-center shadow-[0_35px_100px_rgba(15,23,42,0.08)] sm:px-10"
    >
      <div
        class="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-1.5 text-sm font-medium text-blue-600"
      >
        <span class="h-2 w-2 rounded-full bg-blue-500"></span>
        Contact Us
      </div>

      <h1 class="text-3xl font-semibold text-gray-900 sm:text-4xl">
        Let’s build something
        <span class="block text-blue-600">Amazing Together</span>
      </h1>

      <p class="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
        Have a project in mind? We’d love to hear about it. Share your vision, and we’ll help you
        bring it to life.
      </p>
    </div>
  </section>
</template>
