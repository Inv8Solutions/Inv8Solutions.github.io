<script setup lang="ts">
defineOptions({
  name: 'ProductPreview',
})

const projects = [
  {
    title: 'Forensic Lens',
    description:
      'We craft clear, compelling pitch decks that communicate your vision with precision. Our approach focuses on structure, storytelling, and visuals that help founders present their product with confidence.',
  },
  {
    title: 'Quadrangle',
    description:
      'We craft clear, compelling pitch decks that communicate your vision with precision. Our approach focuses on structure, storytelling, and visuals that help founders present their product with confidence.',
  },
  {
    title: 'Automated Certificate System',
    description:
      'We craft clear, compelling pitch decks that communicate your vision with precision. Our approach focuses on structure, storytelling, and visuals that help founders present their product with confidence.',
  },
  {
    title: 'Pitchdeck Redesign',
    description:
      'We craft clear, compelling pitch decks that communicate your vision with precision. Our approach focuses on structure, storytelling, and visuals that help founders present their product with confidence.',
  },
]
</script>

<template>
  <section class="bg-[#f8f8fc] px-4 py-20 text-gray-900">
    <div class="mx-auto max-w-6xl space-y-10">
      <header class="flex flex-wrap items-center justify-between gap-6">
        <div class="space-y-5">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-600"
          >
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            Our Works
          </div>
          <div>
            <p class="text-4xl font-semibold leading-tight md:text-5xl">
              Products and systems we<br class="hidden sm:block" />
              have designed
            </p>
          </div>
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.7)] transition hover:-translate-y-0.5"
        >
          View All Projects
          <span
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-lg"
            aria-hidden="true"
          >
            →
          </span>
        </button>
      </header>

      <div class="grid gap-10 md:grid-cols-2">
        <article
          v-for="project in projects"
          :key="project.title"
          class="flex flex-col rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.35)]"
        >
          <div class="rounded-3xl bg-gradient-to-b from-gray-100 to-gray-50 pb-[60%]"></div>

          <div class="mt-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">{{ project.title }}</h3>
              <button
                type="button"
                class="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
                aria-label="View project"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  class="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M7 17l10-10" />
                  <path d="M9 7h8v8" />
                </svg>
              </button>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-gray-500">
              {{ project.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
