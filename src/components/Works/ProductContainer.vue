<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'WorksProductContainer',
})

type Project = {
  title: string
  description: string
  link?: string
}

const defaultProjects: Project[] = [
  {
    title: 'Forensic Lens',
    description:
      'We craft clear, compelling pitch decks that communicate your vision with precision. Our approach focuses on structure, storytelling, and visuals that help founders present their product with confidence.',
    link: '#',
  },
  {
    title: 'Quadrangle',
    description:
      'We craft clear, compelling pitch decks that communicate your vision with precision. Our approach focuses on structure, storytelling, and visuals that help founders present their product with confidence.',
    link: '#',
  },
]

const props = defineProps<{
  projects?: Project[]
}>()

const cards = computed(() => (props.projects?.length ? props.projects : defaultProjects))
</script>

<template>
  <section class="w-full px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
      <article
        v-for="project in cards"
        :key="project.title"
        class="flex flex-col rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
      >
        <div class="rounded-[26px] bg-gray-200/80 pb-[60%]"></div>

        <div class="mt-6 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-gray-900">{{ project.title }}</h3>
            <a
              :href="project.link || '#'"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-400"
              aria-label="View project"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                class="h-4 w-4"
              >
                <path d="M7 17l10-10" />
                <path d="M9 7h8v8" />
              </svg>
            </a>
          </div>
          <p class="text-sm leading-relaxed text-gray-500">
            {{ project.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
