<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

defineOptions({
  name: 'WorksHeroSection',
})

const { observeElements } = useScrollAnimation()

const categories = [
  'All Projects',
  'Founders & Startups',
  'Organizations & LGUs',
  'MSMEs & Social Enterprises',
]

// State
const selectedCategory = ref('All Projects')
const isLoading = ref(false)
const error = ref<string | null>(null)
const filteredCount = ref(0)

// Emit filtered count to parent component
const emit = defineEmits<{
  projectsFiltered: [count: number]
  loadingChanged: [isLoading: boolean]
}>()

// Filter projects in DOM based on selected category
async function filterProjectsInDOM(category: string) {
  isLoading.value = true
  error.value = null

  try {
    await nextTick() // Ensure DOM is updated

    // Find all project cards in the ProductContainer
    const projectCards = document.querySelectorAll('[data-project-card]')
    let visibleCount = 0

    projectCards.forEach((card) => {
      const cardElement = card as HTMLElement
      const serviceElement = cardElement.querySelector('[data-project-service]')
      const projectService = serviceElement?.textContent?.trim()

      if (category === 'All Projects') {
        // Show all cards
        cardElement.style.display = 'block'
        visibleCount++
      } else {
        // Show/hide based on service match
        if (projectService === category) {
          cardElement.style.display = 'block'
          visibleCount++
        } else {
          cardElement.style.display = 'none'
        }
      }
    })

    filteredCount.value = visibleCount
    emit('projectsFiltered', visibleCount)
  } catch (err) {
    console.error('Error filtering projects:', err)
    error.value = 'Failed to filter projects. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Handle category selection (DOM manipulation only)
function selectCategory(category: string) {
  selectedCategory.value = category
  filterProjectsInDOM(category)
}

// Load initial filtering on mount
onMounted(() => {
  selectCategory('All Projects')
  observeElements('.hero-content')
  observeElements('.category-button')
})

// Expose methods for parent component
defineExpose({
  selectCategory,
  refreshFiltering: () => filterProjectsInDOM(selectedCategory.value),
  filteredCount: filteredCount.value,
})
</script>

<template>
  <section class="relative overflow-hidden bg-[#03040f] px-4 py-16 sm:px-6 lg:px-8">
    <!-- Blue glow -->
    <div class="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-15" style="background: radial-gradient(circle, #3b82f6 0%, transparent 65%);" aria-hidden="true"></div>
    <!-- Grid -->
    <div class="pointer-events-none absolute inset-0" style="background-image: linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px); background-size: 60px 60px;" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-7xl">
      <div class="hero-content overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0f1f] px-6 py-12 text-center sm:px-12">
        <div class="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          Our Portfolio
        </div>

        <h1 class="mb-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
          Work designed to solve real problems
        </h1>
        <p class="mx-auto mb-8 max-w-3xl text-base text-white/50">
          A collection of digital products, systems, and solutions we've built for founders and
          businesses — crafted with clarity, purpose, and disciplined execution.
        </p>

        <div class="mb-8 h-px w-full bg-white/10"></div>

        <!-- Error State -->
        <div v-if="error" class="mb-6 rounded-lg bg-yellow-50 border border-yellow-200 p-4">
          <div class="flex items-center justify-center">
            <svg
              class="h-5 w-5 text-yellow-400 mr-2"
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
            <p class="text-sm text-yellow-800">{{ error }}</p>
          </div>
        </div>

        <!-- Category Buttons -->
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :disabled="isLoading"
            class="category-button rounded-full border px-5 py-2 text-sm font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{
              'border-blue-500 bg-blue-600 text-white': selectedCategory === category,
              'border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white':
                selectedCategory !== category,
            }"
          >
            <span v-if="isLoading" class="inline-flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
            <span v-else>{{ category }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
