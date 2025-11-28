<template>
  <section class="w-full bg-white px-4 py-12 sm:px-6 lg:px-12">
    <div class="mx-auto flex max-w-7xl flex-col">
      <div
        class="rounded-[32px] bg-black px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:gap-16"
      >
        <div class="flex-1 space-y-6">
          <div>
            <h2 class="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">Solution</h2>
          </div>

          <p class="text-base leading-relaxed text-slate-200">
            {{ solutionContent.description }}
          </p>

          <ul class="space-y-4">
            <li
              v-for="(detail, index) in solutionContent.bullets"
              :key="`solution-detail-${index}`"
              class="flex gap-3"
            >
              <span
                class="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-300"
              >
                <svg
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M5 12l4 4 10-10" />
                </svg>
              </span>
              <div>
                <p class="font-semibold text-white">{{ detail.title }}</p>
                <p class="text-sm text-slate-300">{{ detail.description }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="mt-10 flex-1 lg:mt-0">
          <div class="aspect-[4/3] w-full rounded-[28px] bg-white/10 p-4">
            <div class="flex h-full w-full items-center justify-center rounded-[20px] bg-white/80">
              <img
                v-if="solutionContent.coverPhoto"
                :src="solutionContent.coverPhoto"
                :alt="`${solutionContent.subtitle} preview`"
                class="h-full w-full rounded-[20px] object-cover"
              />
              <div
                v-else
                class="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-200 text-gray-500"
              >
                <svg
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M3 7h18v10H3Z" />
                  <path d="m3 15 4-4 4 4 4-4 6 6" />
                  <circle cx="8" cy="10" r="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

interface SolutionDetail {
  title: string
  description: string
}

interface SolutionContent {
  subtitle: string
  description: string
  bullets: SolutionDetail[]
  coverPhoto?: string
}

const route = useRoute()
const isLoading = ref(false)
const solutionData = ref<SolutionContent | null>(null)

const defaultSolutionContent: SolutionContent = {
  subtitle: 'Solution',
  description:
    'We designed and developed a guided mobile application that trains students to capture accurate, standardized forensic photographs with clear prompts for lighting, exposure, scale placement, focus, and documentation.',
  bullets: [],
}

async function fetchSolutionFromFirebase(id: string): Promise<SolutionContent | null> {
  try {
    const docRef = doc(db, 'sampleworks', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      console.warn(`No solution found for ID: ${id}`)
      return null
    }

    const data = docSnap.data()
    const features = Array.isArray(data.features) ? data.features : []
    const featureDesc = Array.isArray(data.featureDesc) ? data.featureDesc : []

    console.log('Raw data:', data)
    console.log('Features:', features)
    console.log('FeatureDesc:', featureDesc)

    const bullets = features.map((feature: string, index: number) => ({
      title: feature,
      description: featureDesc[index] || '',
    }))

    console.log('Mapped bullets:', bullets)

    return {
      subtitle: 'Solution',
      description: data.solution ?? defaultSolutionContent.description,
      bullets,
      coverPhoto: data.coverPhoto,
    }
  } catch (error) {
    console.error('Failed to fetch solution data from Firestore', error)
    return null
  }
}

async function loadSolution() {
  const projectId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

  if (!projectId) {
    console.error('No project ID found in route for solution fetch')
    solutionData.value = defaultSolutionContent
    return
  }

  isLoading.value = true
  try {
    const payload = await fetchSolutionFromFirebase(projectId)
    if (payload) {
      solutionData.value = {
        ...defaultSolutionContent,
        ...payload,
        bullets: payload.bullets.length ? payload.bullets : [...defaultSolutionContent.bullets],
      }
    } else {
      solutionData.value = defaultSolutionContent
    }
  } catch (error) {
    console.error('Failed to load solution data', error)
    solutionData.value = defaultSolutionContent
  } finally {
    isLoading.value = false
  }
}

const solutionContent = computed(() => solutionData.value ?? defaultSolutionContent)

watch(
  () => route.params.id,
  () => {
    loadSolution()
  },
)

defineExpose({
  refreshSolution: loadSolution,
})

onMounted(() => {
  loadSolution()
})
</script>
