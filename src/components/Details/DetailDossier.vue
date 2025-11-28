<template>
  <section class="w-full bg-white px-4 py-10 sm:px-6 lg:px-12">
    <div class="mx-auto flex max-w-7xl flex-col gap-4">
      <div class="border-y border-gray-200 py-6 sm:py-8">
        <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex flex-col gap-2">
            <dt
              class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400"
            >
              <span
                aria-hidden="true"
                class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500"
              >
                <svg
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
                  <path d="M3 20.4a9 9 0 0 1 18 0" />
                </svg>
              </span>
              Client
            </dt>
            <dd class="text-lg font-medium text-gray-900">{{ projectDossier.clientName }}</dd>
          </div>

          <div class="flex flex-col gap-2">
            <dt
              class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400"
            >
              <span
                aria-hidden="true"
                class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500"
              >
                <svg
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M7 7h10v10H7Z" />
                  <path d="M7 12h10" />
                </svg>
              </span>
              Services
            </dt>
            <dd class="text-lg font-medium text-gray-900">{{ projectDossier.service }}</dd>
          </div>

          <div class="flex flex-col gap-2">
            <dt
              class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400"
            >
              <span
                aria-hidden="true"
                class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500"
              >
                <svg
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4l2.5 2.5" />
                </svg>
              </span>
              Timeline
            </dt>
            <dd class="text-lg font-medium text-gray-900">{{ projectDossier.timeline }}</dd>
          </div>

          <div class="flex flex-col gap-2">
            <dt
              class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400"
            >
              <span
                aria-hidden="true"
                class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500"
              >
                <svg
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                  <path d="M8 7v10" />
                  <path d="M16 7v10" />
                </svg>
              </span>
              Stack
            </dt>
            <dd class="text-lg font-medium text-gray-900">
              {{ projectDossier.techStack.join(', ') }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

interface ProjectDossierContent {
  clientName: string
  service: string
  timeline: string
  techStack: string[]
}

const route = useRoute()
const isLoading = ref(false)
const projectDossierData = ref<ProjectDossierContent | null>(null)

const defaultProjectDossier: ProjectDossierContent = {
  clientName: 'N/A',
  service: 'N/A',
  timeline: 'N/A',
  techStack: ['N/A'],
}

async function fetchProjectDossierFromFirebase(id: string): Promise<ProjectDossierContent | null> {
  try {
    const docRef = doc(db, 'sampleworks', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      console.warn(`No dossier found for ID: ${id}`)
      return null
    }

    const data = docSnap.data()
    const techStackField = Array.isArray(data.techStack) ? data.techStack : []

    return {
      clientName: data.clientName ?? defaultProjectDossier.clientName,
      service: data.service ?? defaultProjectDossier.service,
      timeline: data.timeline ?? defaultProjectDossier.timeline,
      techStack: techStackField.length ? techStackField : [...defaultProjectDossier.techStack],
    }
  } catch (error) {
    console.error('Failed to fetch dossier data from Firestore', error)
    return null
  }
}

async function loadProjectDossier() {
  const projectId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

  if (!projectId) {
    console.error('No project ID found in route for dossier fetch')
    projectDossierData.value = defaultProjectDossier
    return
  }

  isLoading.value = true
  try {
    const payload = await fetchProjectDossierFromFirebase(projectId)
    if (payload) {
      projectDossierData.value = {
        ...defaultProjectDossier,
        ...payload,
        techStack: payload.techStack.length
          ? [...payload.techStack]
          : [...defaultProjectDossier.techStack],
      }
    } else {
      projectDossierData.value = defaultProjectDossier
    }
  } catch (error) {
    console.error('Failed to load project dossier data', error)
    projectDossierData.value = defaultProjectDossier
  } finally {
    isLoading.value = false
  }
}

const projectDossier = computed(() => projectDossierData.value ?? defaultProjectDossier)

watch(
  () => route.params.id,
  () => {
    loadProjectDossier()
  },
)

defineExpose({
  refreshDossier: loadProjectDossier,
})

onMounted(() => {
  loadProjectDossier()
})
</script>
