<script setup lang="ts">
defineOptions({
  name: 'WhyChooseUs',
})

const reasons = [
  {
    title: 'Evidence-Driven Approach',
    description: 'We validate assumptions early, turning insights into stronger product decisions.',
    icon: 'fa-solid fa-chart-line',
  },
  {
    title: 'Integrated Design & Engineering',
    description: 'UX, frontend, and backend work together from day one for seamless execution.',
    icon: 'fa-solid fa-layer-group',
  },
  {
    title: 'Lean and Fast Delivery',
    description:
      'We focus on essentials, helping you launch faster without unnecessary complexity.',
    icon: 'fa-solid fa-rocket',
  },
  {
    title: 'User-Centered Solutions',
    description:
      'Every product is crafted around real needs, ensuring intuitive and meaningful experiences.',
    icon: 'fa-solid fa-users',
  },
  {
    title: 'Modern, Scalable Technology',
    description:
      'We use a reliable, future-ready tech stack built for performance and long-term growth.',
    icon: 'fa-solid fa-microchip',
  },
  {
    title: 'Built for Real-World Impact',
    description:
      'Whether it’s an MVP, SME system, or IoT solution, we design products that perform where it matters most.',
    icon: 'fa-solid fa-globe',
  },
]
</script>

<template>
  <section class="bg-[#f6f7fb] px-4 py-24 min-h-[720px] text-gray-900 flex flex-col justify-center">
    <div class="mx-auto max-w-5xl space-y-10 text-center">
      <div
        class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600"
      >
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
        Why Choose Us
      </div>
      <div class="space-y-3">
        <p class="text-3xl font-semibold text-gray-900 md:text-5xl">
          We deliver clarity, speed, and disciplined
        </p>
        <p class="text-3xl font-semibold text-gray-600 md:text-5xl">
          execution in every product we build.
        </p>
      </div>
    </div>

    <div class="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="reason in reasons"
        :key="reason.title"
        class="rounded-[28px] border border-gray-200 bg-white px-8 py-6 text-left shadow-[0_30px_80px_-60px_rgba(15,23,42,0.5)] transition-all duration-300 hover:shadow-lg"
      >
        <div
          class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"
        >
          <i :class="`${reason.icon} text-xl`"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900">{{ reason.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-gray-500">{{ reason.description }}</p>
      </article>
    </div>

    <!-- <div class="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 px-2 sm:grid-cols-2">
      <article
        v-for="reason in reasons"
        :key="reason.title"
        class="rounded-[28px] border border-gray-200 bg-white p-6 text-left shadow-[0_30px_80px_-60px_rgba(15,23,42,0.5)]"
      >
        <div
          class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"
        >
          <span class="text-xl">⬤</span>
        </div>
        <h3 class="text-lg font-semibold text-gray-900">{{ reason.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-gray-500">{{ reason.description }}</p>
      </article>
    </div> -->
  </section>
</template>
