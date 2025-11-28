<template>
  <section class="w-full bg-white px-4 py-12 sm:px-6 lg:px-12">
    <div class="mx-auto max-w-7xl">
      <button
        class="inline-flex items-center gap-2 border-none bg-transparent p-0 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        type="button"
        @click="handleBackNavigation"
      >
        <span aria-hidden="true" class="text-lg leading-none">←</span>
        Back to Projects
      </button>
      <br />
      <div
        class="mt-10 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600"
        :aria-busy="isLoading"
      >
        <span
          class="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]"
        />
        {{ projectContent.categoryLabel }}
      </div>

      <div class="mt-7 max-w-3xl space-y-4">
        <h1 class="text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl lg:text-[56px]">
          {{ projectContent.title }}
        </h1>
        <p class="text-lg leading-relaxed text-gray-600">
          {{ projectContent.description }}
        </p>
      </div>

      <div class="mt-12 rounded-[40px] bg-[#f4f4f5] p-2 sm:p-4">
        <div class="aspect-[16/9] w-full rounded-[32px] bg-gray-100">
          <img
            v-if="projectContent.mediaPreviewUrl"
            :src="projectContent.mediaPreviewUrl"
            :alt="`${projectContent.title} preview screenshot`"
            class="h-full w-full rounded-[32px] object-cover"
          />
          <span v-else class="sr-only">Media preview placeholder to be fetched from Firebase.</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

interface ProjectIntroContent {
  id: string
  categoryLabel: string
  title: string
  description: string
  shortDesc?: string
  platform?: string
  coverPhoto?: string
  mediaPreviewUrl: string | null
}

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const projectIntro = ref<ProjectIntroContent | null>(null)

const defaultProjectIntro: ProjectIntroContent = {
  id: 'forensic-lens',
  categoryLabel: 'Mobile Application',
  title: 'Forensic Lens',
  description:
    'a mobile application that assists forensics photography students in capturing photos with accurate and standardized settings for investigative purposes',
  mediaPreviewUrl: null,
}

async function fetchProjectIntroFromFirebase(id: string): Promise<ProjectIntroContent | null> {
  console.log('Fetching document with ID:', id)
  console.log('Firestore db instance:', db)

  try {
    const docRef = doc(db, 'sampleworks', id)
    console.log('Document reference created:', docRef.path)
    console.log('Document reference object:', docRef)

    const docSnap = await getDoc(docRef)
    console.log('Document snapshot:', docSnap)

    if (docSnap.exists()) {
      const data = docSnap.data()
      console.log('Document data:', data)

      const result = {
        id: docSnap.id,
        title: data.title || '',
        categoryLabel: data.platform || 'Project',
        description: data.shortDesc || '',
        mediaPreviewUrl: data.coverPhoto || null,
        shortDesc: data.shortDesc,
        platform: data.platform,
        coverPhoto: data.coverPhoto,
      }

      console.log('Mapped document data:', result)
      return result
    } else {
      console.error('No such document! ID:', id)
      return null
    }
  } catch (error) {
    console.error('Error fetching document:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      })
    }
    return null
  }
}

// Debug function to list all projects in the collection
async function listAllProjects() {
  try {
    console.log('Firestore db instance:', db)
    console.log('Fetching all projects from collection...')

    // Try the 'sampleworks' collection first
    const projectsRef = collection(db, 'sampleworks')
    console.log('Collection reference:', projectsRef)

    const querySnapshot = await getDocs(projectsRef)
    console.log('Query snapshot:', querySnapshot)
    console.log('Query snapshot empty?', querySnapshot.empty)
    console.log('Query snapshot size:', querySnapshot.size)

    const projects: ProjectIntroContent[] = []
    querySnapshot.forEach((doc) => {
      console.log(`Document ID: ${doc.id} =>`, doc.data())
      const data = doc.data()
      projects.push({
        id: doc.id,
        categoryLabel: data.platform || 'Project',
        title: data.title || '',
        description: data.shortDesc || '',
        mediaPreviewUrl: data.coverPhoto || null,
        shortDesc: data.shortDesc,
        platform: data.platform,
        coverPhoto: data.coverPhoto,
      })
    })
    console.log('All projects in collection:', projects)

    // If no projects found, try some common alternative names
    if (projects.length === 0) {
      console.log('No projects found. Trying alternative collection names...')
      const alternatives = [
        'sampleworks',
        'projects',
        'project',
        'Project',
        'Projects',
        'entries',
        'Entries',
      ]

      for (const altName of alternatives) {
        try {
          console.log(`Trying collection: ${altName}`)
          const altRef = collection(db, altName)
          const altSnapshot = await getDocs(altRef)
          if (!altSnapshot.empty) {
            console.log(`Found ${altSnapshot.size} documents in '${altName}' collection!`)
            altSnapshot.forEach((doc) => {
              console.log(`Document ID: ${doc.id} =>`, doc.data())
            })
            break
          }
        } catch (altError) {
          console.log(`Failed to access '${altName}':`, altError)
        }
      }
    }

    return projects
  } catch (error) {
    console.error('Error listing projects:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      })
    }
    return []
  }
}

async function loadProjectIntro() {
  // First, list all available projects for debugging
  await listAllProjects()

  console.log('Route params:', route.params)
  const projectId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

  // If we don't have a projectId, try to get the first project for testing
  const testProjectId = projectId || 'test-project-id' // Replace with a known working ID if needed

  if (!projectId) {
    console.error('No project ID found in URL')
    projectIntro.value = defaultProjectIntro
    return
  }

  console.log('Loading project with ID:', projectId)
  isLoading.value = true

  try {
    // Try with the actual projectId first, then fallback to test ID if needed
    let payload = await fetchProjectIntroFromFirebase(projectId)

    // If no payload and we're not already using the test ID, try with test ID
    if (!payload && projectId !== testProjectId) {
      console.warn(`No data for ID '${projectId}', trying with test ID:`, testProjectId)
      payload = await fetchProjectIntroFromFirebase(testProjectId)
    }
    console.log('Received payload:', payload)

    if (payload) {
      const mergedData = {
        ...defaultProjectIntro,
        ...payload,
        title: payload.title || defaultProjectIntro.title,
        categoryLabel: payload.platform || defaultProjectIntro.categoryLabel,
        description: payload.shortDesc || defaultProjectIntro.description,
        mediaPreviewUrl: payload.coverPhoto || defaultProjectIntro.mediaPreviewUrl,
      }
      console.log('Merged project data:', mergedData)
      projectIntro.value = mergedData
    } else {
      console.warn('No payload received, using default project intro')
      projectIntro.value = defaultProjectIntro
    }
  } catch (error) {
    console.error('Error in loadProjectIntro:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      })
    }
    projectIntro.value = defaultProjectIntro
  } finally {
    isLoading.value = false
  }
}

// Watch for route changes to reload data when ID changes
watch(
  () => route.params.id,
  () => {
    loadProjectIntro()
  },
)

const projectContent = computed(() => projectIntro.value ?? defaultProjectIntro)

function handleBackNavigation() {
  router.back()
}

defineExpose({
  refreshIntro: loadProjectIntro,
})

onMounted(() => {
  loadProjectIntro()
})
</script>
