<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { collection, query, where, limit, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

export interface SampleWork {
  id?: string
  title: string
  shortDesc: string
  coverPhoto?: string
  service?: string
  platform?: string
  clientName?: string
  createdAt?: Date | null
}

const props = defineProps<{
  serviceId?: string
}>()

const { observeElements } = useScrollAnimation()

// Reactive state
const projects = ref<SampleWork[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

// Map service IDs to Firestore service names
const serviceIdMapping: Record<string, string> = {
  uiux: 'UI/UX Design',
  mvp: 'MVP Development',
  innovation: 'Innovation for SMEs',
  iot: 'IoT Solutions',
  pitchdeck: 'Pitchdeck Design',
}

// Fetch sample works based on service
const fetchSampleWorks = async (serviceId?: string) => {
  isLoading.value = true
  error.value = null

  try {
    const serviceName = serviceId ? serviceIdMapping[serviceId] : null

    let q = query(collection(db, 'sampleworks'), limit(2))

    if (serviceName) {
      q = query(collection(db, 'sampleworks'), where('service', '==', serviceName), limit(2))
    }

    const querySnapshot = await getDocs(q)
    const fetchedProjects: SampleWork[] = []

    querySnapshot.forEach((doc) => {
      fetchedProjects.push({
        id: doc.id,
        ...doc.data(),
      } as SampleWork)
    })

    projects.value = fetchedProjects
  } catch (err) {
    console.error('Error fetching sample works:', err)
    error.value = 'Failed to load sample projects'
  } finally {
    isLoading.value = false
    await nextTick()
    observeElements('.sample-work-card')
  }
}

// Watch for serviceId changes
watch(
  () => props.serviceId,
  (newServiceId) => {
    fetchSampleWorks(newServiceId)
  },
  { immediate: true },
)

// Initial load
onMounted(() => {
  fetchSampleWorks(props.serviceId)
})
</script>

<template>
  <section v-if="projects.length > 0 || isLoading" class="bg-white px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <div class="text-center">
        <h2 class="text-3xl font-semibold text-gray-900 sm:text-4xl">Our Sample Projects</h2>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="mt-10 grid gap-8 md:grid-cols-2">
        <div v-for="i in 2" :key="i" class="animate-pulse">
          <div
            class="flex flex-col gap-6 rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8"
          >
            <div class="rounded-[28px] border border-gray-200 bg-[#ededed] shadow-inner">
              <div class="aspect-[16/10] w-full rounded-[24px] bg-[#d9d9d9]"></div>
            </div>
            <div class="space-y-3">
              <div class="h-6 w-3/4 rounded bg-gray-200"></div>
              <div class="h-4 w-full rounded bg-gray-200"></div>
              <div class="h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="mt-10 text-center">
        <div class="rounded-2xl bg-red-50 border border-red-200 p-6">
          <p class="text-red-600">{{ error }}</p>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-else class="mt-10 grid gap-8 md:grid-cols-2">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          class="sample-work-card flex flex-col gap-6 rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8 transition-smooth hover:shadow-[0_25px_70px_rgba(15,23,42,0.09)] hover:-translate-y-1"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <div class="rounded-[28px] border border-gray-200 bg-[#ededed] shadow-inner">
            <div class="aspect-[16/10] w-full rounded-[24px] bg-[#d9d9d9]">
              <img
                v-if="project.coverPhoto"
                :src="project.coverPhoto"
                :alt="project.title"
                class="h-full w-full object-cover rounded-[24px]"
              />
            </div>
          </div>

          <div class="flex flex-1 flex-col gap-4">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ project.title }}</h3>
              <p class="mt-2 text-sm text-gray-600">
                {{ project.shortDesc }}
              </p>
              <div v-if="project.service" class="mt-2">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ project.service }}
                </span>
              </div>
            </div>

            <div class="mt-auto flex justify-end">
              <button
                type="button"
                class="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 transition-smooth hover:border-gray-400 hover:bg-gray-50 hover:scale-110"
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
