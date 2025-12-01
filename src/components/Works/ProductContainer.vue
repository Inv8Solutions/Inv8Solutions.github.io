<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from '@/firebase'

defineOptions({
  name: 'WorksProductContainer',
})

interface SampleWork {
  id?: string
  title: string
  shortDesc: string
  coverPhoto?: string
  service?: string
}

const router = useRouter()
const isLoading = ref(false)
const error = ref<string | null>(null)
const sampleWorks = ref<SampleWork[]>([])

// Fetch data from Firebase sampleworks collection
async function fetchSampleWorks(): Promise<SampleWork[]> {
  try {
    const q = query(collection(db, 'sampleworks'), limit(10))
    const querySnapshot = await getDocs(q)
    const works: SampleWork[] = []
    querySnapshot.forEach((doc) => {
      works.push({ id: doc.id, ...doc.data() } as SampleWork)
    })
    return works
  } catch (err) {
    console.error('Error fetching sample works:', err)
    throw err
  }
}

// Load sample works data
async function loadSampleWorks() {
  isLoading.value = true
  error.value = null

  try {
    const data = await fetchSampleWorks()
    sampleWorks.value = data
  } catch (err) {
    error.value = 'Failed to load projects. Please try again later.'
    console.error('Error loading sample works:', err)
  } finally {
    isLoading.value = false
  }
}

// Computed property to get projects to display
const projects = computed(() => sampleWorks.value)

// Handle project view click
const handleProjectView = (project: SampleWork) => {
  // Navigate to project details page with document ID
  if (project.id) {
    router.push(`/project/${project.id}`)
  } else {
    // Fallback to works page if no ID
    router.push('/works')
  }
}

// Handle image error
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

// Load data on component mount
onMounted(() => {
  loadSampleWorks()
})

// Expose refresh function for parent components
defineExpose({
  refreshWorks: loadSampleWorks,
})
</script>

<template>
  <section class="w-full px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Loading State -->
      <div v-if="isLoading" class="grid gap-10 md:grid-cols-2">
        <div
          v-for="n in 4"
          :key="n"
          class="flex flex-col rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
        >
          <div class="animate-pulse">
            <div class="rounded-[26px] bg-gray-200 pb-[60%]"></div>
            <div class="mt-6">
              <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="rounded-lg bg-yellow-50 border border-yellow-200 p-6">
        <div class="flex">
          <svg
            class="h-5 w-5 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div class="ml-3">
            <p class="text-sm text-yellow-800">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="projects.length === 0" class="text-center py-16">
        <svg
          class="mx-auto h-16 w-16 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No projects found</h3>
        <p class="mt-2 text-sm text-gray-500">
          There are currently no projects in the sampleworks collection.
        </p>
        <div class="mt-6">
          <button
            @click="loadSampleWorks"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid gap-10 md:grid-cols-2">
        <article
          v-for="project in projects"
          :key="project.id || project.title"
          data-project-card
          class="flex flex-col rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-transform hover:scale-[1.02] cursor-pointer"
          @click="handleProjectView(project)"
        >
          <div
            class="rounded-[26px] bg-gradient-to-b from-gray-100 to-gray-50 pb-[60%] relative overflow-hidden"
          >
            <img
              v-if="project.coverPhoto"
              :src="project.coverPhoto"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>

          <div class="mt-6 flex flex-col gap-3">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900">{{ project.title }}</h3>
                <div v-if="project.service" class="mt-1">
                  <span
                    data-project-service
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ project.service }}
                  </span>
                </div>
              </div>
              <button
                type="button"
                @click.stop="handleProjectView(project)"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-400 flex-shrink-0 ml-4"
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
              </button>
            </div>
            <p class="text-sm leading-relaxed text-gray-500">
              {{ project.shortDesc }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
