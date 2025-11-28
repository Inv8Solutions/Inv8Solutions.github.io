<template>
  <section class="w-full bg-white px-6 py-12 sm:px-6 lg:py-16">
    <div class="mx-auto max-w-6xl">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div
          v-for="(image, index) in projectImages"
          :key="image.id || index"
          class="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-shadow hover:shadow-md"
        >
          <img
            :src="image.url"
            :alt="image.alt || `Project image ${index + 1}`"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <!-- Loading state -->
          <div
            v-if="isLoading"
            class="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <div
              class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
            ></div>
          </div>

          <!-- Error state -->
          <div
            v-if="image.error"
            class="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <div class="text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
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
              <p class="mt-2 text-sm text-gray-500">Failed to load image</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="!isLoading && projectImages.length === 0"
        class="flex flex-col items-center justify-center py-16"
      >
        <svg class="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p class="mt-4 text-lg font-medium text-gray-900">No images available</p>
        <p class="mt-2 text-sm text-gray-500">
          Project images will appear here once added to Firebase
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

interface ProjectImage {
  id?: string
  url: string
  alt?: string
  error?: boolean
}

const route = useRoute()
const isLoading = ref(false)
const imagesData = ref<ProjectImage[] | null>(null)

const defaultProjectImages: ProjectImage[] = []

async function fetchProjectImagesFromFirebase(id: string): Promise<ProjectImage[]> {
  try {
    const docRef = doc(db, 'sampleworks', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      console.warn(`No project found for ID: ${id}`)
      return defaultProjectImages
    }

    const data = docSnap.data()
    const images = Array.isArray(data.images) ? data.images : []

    const projectImages = images.map((imageUrl: string, index: number) => ({
      id: `img-${index}`,
      url: imageUrl,
      alt: `Project image ${index + 1}`,
    }))

    console.log('Fetched images:', projectImages)
    return projectImages
  } catch (error) {
    console.error('Failed to fetch project images from Firestore', error)
    return defaultProjectImages
  }
}

async function loadProjectImages() {
  const projectId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

  if (!projectId) {
    console.error('No project ID found in route for images fetch')
    imagesData.value = defaultProjectImages
    return
  }

  isLoading.value = true
  try {
    const payload = await fetchProjectImagesFromFirebase(projectId)
    imagesData.value = payload
  } catch (error) {
    console.error('Failed to load project images', error)
    imagesData.value = defaultProjectImages
  } finally {
    isLoading.value = false
  }
}

const projectImages = computed(() => imagesData.value ?? defaultProjectImages)

watch(
  () => route.params.id,
  () => {
    loadProjectImages()
  },
)

defineExpose({
  refreshImages: loadProjectImages,
})

onMounted(() => {
  loadProjectImages()
})
</script>
