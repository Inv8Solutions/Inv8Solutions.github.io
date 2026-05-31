<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { db, storage } from '@/firebase'
import { collection, getDocs, query, orderBy, limit as limitQ } from 'firebase/firestore'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

defineOptions({
  name: 'WorksProductContainer',
})

const { observeElements } = useScrollAnimation()

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

// Fetch data from Firestore sampleworks collection
async function fetchSampleWorks(): Promise<SampleWork[]> {
  const q = query(collection(db, 'sampleworks'), orderBy('title', 'asc'), limitQ(10))
  const snap = await getDocs(q)
  const results = await Promise.all(snap.docs.map(async (d) => {
    const data = d.data() as any
    let coverPhoto = data.coverPhoto || data.image_url || ''
    if (!coverPhoto && data.image_path) {
      try { coverPhoto = await getDownloadURL(storageRef(storage, data.image_path)) } catch (e) { console.warn('failed to resolve image path for', d.id, e); coverPhoto = '' }
    }
    return {
      id: d.id,
      title: data.title || '',
      shortDesc: data.short_desc || '',
      coverPhoto,
      service: data.service_id || '',
    }
  }))
  return results
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
onMounted(async () => {
  await loadSampleWorks()
  await nextTick()
  observeElements('.work-project-card')
})

// Expose refresh function for parent components
defineExpose({
  refreshWorks: loadSampleWorks,
})
</script>

<template>
  <section class="w-full bg-[#03040f] px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Loading State -->
      <div v-if="isLoading" class="grid gap-5 md:grid-cols-2">
        <div
          v-for="n in 4"
          :key="n"
          class="loading-skeleton rounded-[28px] pb-[65%]"
          role="status"
          aria-label="Loading project"
        ></div>
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
          class="mx-auto h-16 w-16 text-white/20"
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
        <h3 class="mt-4 text-lg font-medium text-white">No projects found</h3>
        <p class="mt-2 text-sm text-white/50">
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
      <div v-else class="grid gap-4 md:grid-cols-2">
        <article
          v-for="project in projects"
          :key="project.id || project.title"
          data-project-card
          class="work-project-card group overflow-hidden rounded-[20px] cursor-pointer bg-[#0d0f1f] border border-white/[0.07] transition duration-500 hover:scale-[1.015] hover:-translate-y-1"
          @click="handleProjectView(project)"
          @keydown.enter="handleProjectView(project)"
          @keydown.space.prevent="handleProjectView(project)"
          tabindex="0"
          role="button"
          :aria-label="`View ${project.title} project details`"
        >
          <!-- Image area -->
          <div class="relative h-72 overflow-hidden bg-[#080a18]">
            <img
              v-if="project.coverPhoto"
              :src="project.coverPhoto"
              :alt="`${project.title} cover image`"
              class="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <!-- Service tag -->
            <span
              v-if="project.service"
              data-project-service
              class="absolute left-3.5 top-3.5 rounded-full bg-black/30 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md"
            >
              {{ project.service }}
            </span>
          </div>

          <!-- Content row -->
          <div class="flex items-center justify-between gap-4 border-t border-white/[0.07] px-5 py-4">
            <h3 class="text-base font-black leading-snug text-white">{{ project.title }}</h3>
            <button
              type="button"
              @click.stop="handleProjectView(project)"
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110"
              aria-label="View project"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5 -rotate-45">
                <path d="M5 12h14" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
