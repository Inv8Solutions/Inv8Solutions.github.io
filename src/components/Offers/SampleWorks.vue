<script setup lang="ts">
export interface Project {
  id: string
  title: string
  description: string
  imageUrl?: string
  serviceId?: string
}

const props = defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <section v-if="props.projects.length > 0" class="bg-white px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <div class="text-center">
        <h2 class="text-3xl font-semibold text-gray-900 sm:text-4xl">Our Sample Projects</h2>
      </div>

      <div class="mt-10 grid gap-8 md:grid-cols-2">
        <article
          v-for="project in props.projects"
          :key="project.id"
          class="flex flex-col gap-6 rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8"
        >
          <div class="rounded-[28px] border border-gray-200 bg-[#ededed] shadow-inner">
            <div class="aspect-[16/10] w-full rounded-[24px] bg-[#d9d9d9]"></div>
          </div>

          <div class="flex flex-1 flex-col gap-4">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ project.title }}</h3>
              <p class="mt-2 text-sm text-gray-600">
                {{ project.description }}
              </p>
            </div>

            <div class="mt-auto flex justify-end">
              <button
                type="button"
                class="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 transition hover:border-gray-400 hover:bg-gray-50"
                :aria-label="`View ${project.title}`"
              >
                <svg
                  class="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7 17l10-10" />
                  <path d="M8 7h9v9" />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
