<template>
  <section class="w-full bg-white px-4 py-12 sm:px-6 lg:px-12">
    <div class="mx-auto flex max-w-7xl flex-col gap-8">
      <div class="challenge-section flex flex-col gap-6 py-8 lg:flex-row lg:items-start lg:gap-16">
        <h2 class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:w-1/3">
          {{ challengeContent.subtitle }}
        </h2>

        <p class="text-base leading-relaxed text-gray-600 lg:w-2/3">
          {{ challengeContent.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import{ useScrollAnimation } from '@/composables/useScrollAnimation'

const { observeElements } = useScrollAnimation()

interface ChallengeContent {
  subtitle: string
  description: string
}

const route = useRoute()
const isLoading = ref(false)
const challengeData = ref<ChallengeContent | null>(null)

const defaultChallengeContent: ChallengeContent = {
  subtitle: 'The Challenge',
  description:
    'Forensic photography requires precision and consistency in capturing images for legal and investigative purposes. Students often struggle with understanding the technical requirements, proper lighting conditions, and standard procedures needed to produce admissible forensic photographs.',
}

async function fetchChallengeFromFirebase(id: string): Promise<ChallengeContent | null> {
  try {
    const docRef = doc(db, 'sampleworks', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      console.warn(`No challenge found for ID: ${id}`)
      return null
    }

    const data = docSnap.data()

    return {
      subtitle: 'Challenge',
      description: data.challenge ?? defaultChallengeContent.description,
    }
  } catch (error) {
    console.error('Failed to fetch challenge data from Firestore', error)
    return null
  }
}

async function loadChallenge() {
  const projectId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

  if (!projectId) {
    console.error('No project ID found in route for challenge fetch')
    challengeData.value = defaultChallengeContent
    return
  }

  isLoading.value = true
  try {
    const payload = await fetchChallengeFromFirebase(projectId)
    if (payload) {
      challengeData.value = {
        ...defaultChallengeContent,
        ...payload,
      }
    } else {
      challengeData.value = defaultChallengeContent
    }
  } catch (error) {
    console.error('Failed to load challenge data', error)
    challengeData.value = defaultChallengeContent
  } finally {
    isLoading.value = false
  }
}

const challengeContent = computed(() => challengeData.value ?? defaultChallengeContent)

watch(
  () => route.params.id,
  () => {
    loadChallenge()
  },
)

defineExpose({
  refreshChallenge: loadChallenge,
})

onMounted(() => {
  loadChallenge()
  observeElements('.challenge-section')
})
</script>
