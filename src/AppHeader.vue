<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'

defineOptions({
  name: 'AppHeader',
})

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const isProjectModalOpen = ref(false)

// Contact form state
const formData = ref<Record<string, string>>({})
const projectDetails = ref('')
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const formFields = [
  { id: 'name', label: 'Your Name *', type: 'text', placeholder: 'John Doe' },
  { id: 'email', label: 'Email Address *', type: 'email', placeholder: 'john@company.com' },
  { id: 'company', label: 'Company Name', type: 'text', placeholder: 'Your Company' },
  {
    id: 'service',
    label: 'Service Interested In *',
    type: 'select',
    options: [
      { value: 'ui-ux-design', label: 'UI/UX Design' },
      { value: 'mvp-dev', label: 'MVP Development' },
      { value: 'sme-innovation', label: 'Innovation for SMEs' },
      { value: 'consulting', label: 'Technical Consulting' },
      { value: 'iot-dev', label: 'IoT Development' },
      { value: 'other', label: 'Others' },
    ],
    placeholder: 'Select a service',
  },
  {
    id: 'budget',
    label: 'Estimated Budget',
    type: 'select',
    options: [
      { value: '20k-below', label: '₱20,000 and below' },
      { value: '20k-40k', label: '₱20,001 - ₱40,000' },
      { value: '40k-60k', label: '₱40,001 - ₱60,000' },
      { value: '60k-100k', label: '₱60,001 - ₱100,000' },
      { value: '100k-plus', label: '₱100,001 and above' },
    ],
    placeholder: 'Select budget range',
  },
  {
    id: 'timeline',
    label: 'Project Timeline',
    type: 'select',
    options: [
      { value: 'asap', label: 'ASAP' },
      { value: 'within-1-month', label: 'Within 1 Month' },
      { value: '1-3-months', label: '1 - 3 Months' },
      { value: '3-6-months', label: '3 - 6 Months' },
      { value: 'flexible', label: 'Flexible' },
    ],
    placeholder: 'Select timeline',
  },
]

// Initialize form data
formFields.forEach((field) => {
  formData.value[field.id] = ''
})

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Works', path: '/works' },
  { name: 'Contact', path: '/contactus' },
]

const isActive = (path: string) => {
  if (path === '/' && route.path === '/') return true
  if (path === '/#contact' && route.hash === '#contact') return true
  if (path === '/contactus' && route.path === '/contactus') return true
  return route.path.startsWith(path) && path !== '/'
}

const navigate = (path: string) => {
  if (path.startsWith('#')) {
    if (route.path === '/') {
      const element = document.querySelector(path)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push({ path: '/', hash: path.substring(1) })
    }
  } else {
    // Close mobile menu if open
    if (isMenuOpen.value) {
      isMenuOpen.value = false
    }
    router.push(path)
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const openProjectModal = () => {
  isProjectModalOpen.value = true
  resetForm()
}

const closeProjectModal = () => {
  isProjectModalOpen.value = false
}

const resetForm = () => {
  formFields.forEach((field) => {
    formData.value[field.id] = ''
  })
  projectDetails.value = ''
  submitStatus.value = 'idle'
  errorMessage.value = ''
}

const handleSubmit = async () => {
  // Validate required fields
  const requiredFields = ['name', 'email', 'service']
  const missingFields = requiredFields.filter((field) => !formData.value[field]?.trim())

  if (missingFields.length > 0) {
    errorMessage.value = 'Please fill in all required fields'
    submitStatus.value = 'error'
    return
  }

  if (!projectDetails.value.trim()) {
    errorMessage.value = 'Please tell us about your project'
    submitStatus.value = 'error'
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'
  errorMessage.value = ''

  try {
    const inquiryData = {
      name: formData.value.name,
      email: formData.value.email,
      company: formData.value.company || null,
      service: formData.value.service,
      budget: formData.value.budget || null,
      timeline: formData.value.timeline || null,
      projectDetails: projectDetails.value,
      status: 'new',
      createdAt: serverTimestamp(),
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'inquiries'), inquiryData)

    // Send confirmation email
    const functions = getFunctions()
    const sendEmail = httpsCallable(functions, 'sendInquiryConfirmation')

    await sendEmail({
      ...inquiryData,
      id: docRef.id,
    })

    // Reset form and close modal on success
    resetForm()
    submitStatus.value = 'success'

    // Close modal after a short delay to show success message
    setTimeout(() => {
      closeProjectModal()
      submitStatus.value = 'idle'
    }, 2000)
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    errorMessage.value = 'Failed to submit inquiry. Please try again.'
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 shadow-sm">
    <div class="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
      <header class="flex items-center justify-between gap-6 py-6">
        <a href="/" class="text-2xl font-semibold text-blue-600">inv8 Studio</a>

        <!-- Desktop Navigation -->
        <nav class="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.path"
            @click.prevent="navigate(link.path)"
            class="transition-colors duration-200 cursor-pointer"
            :class="{
              'text-blue-600': isActive(link.path),
              'hover:text-gray-900': !isActive(link.path),
            }"
          >
            {{ link.name }}
          </a>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="flex items-center gap-4">
          <button
            type="button"
            @click="toggleMenu"
            class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 md:hidden"
            :aria-expanded="isMenuOpen"
            :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true" v-if="!isMenuOpen">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
            <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true" v-else>
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <button
            @click="openProjectModal"
            class="hidden rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/70 transition hover:bg-blue-700 md:inline-flex"
          >
            Start a Project
          </button>
        </div>
      </header>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav v-if="isMenuOpen" class="mb-4 rounded-2xl bg-white p-4 shadow-lg md:hidden">
          <ul class="space-y-4">
            <li v-for="link in navLinks" :key="link.name">
              <a
                :href="link.path"
                @click="[navigate(link.path), closeMenu()]"
                class="block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200"
                :class="{
                  'bg-blue-50 text-blue-600': isActive(link.path),
                  'text-gray-700 hover:bg-gray-50': !isActive(link.path),
                }"
              >
                {{ link.name }}
              </a>
            </li>
            <li>
              <button
                @click="[openProjectModal(), closeMenu()]"
                class="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/70 transition hover:bg-blue-700"
              >
                Start a Project
              </button>
            </li>
          </ul>
        </nav>
      </Transition>
    </div>
  </div>

  <!-- Project Modal -->
  <div
    v-if="isProjectModalOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click="closeProjectModal"
  >
    <div
      class="relative top-10 mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-lg bg-white"
      @click.stop
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-semibold text-gray-900">Start Your Project</h3>
        <button
          @click="closeProjectModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <!-- Error/Success Messages -->
        <div
          v-if="submitStatus === 'error'"
          class="rounded-2xl bg-red-50 border border-red-200 p-4"
        >
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>

        <div
          v-if="submitStatus === 'success'"
          class="rounded-2xl bg-green-50 border border-green-200 p-4"
        >
          <p class="text-sm text-green-600">
            Thank you! Your inquiry has been submitted successfully. We'll be in touch soon.
          </p>
        </div>

        <div v-for="field in formFields" :key="field.id" class="space-y-2">
          <label :for="field.id" class="text-sm font-medium text-gray-700">{{ field.label }}</label>
          <select
            v-if="field.type === 'select'"
            :id="field.id"
            v-model="formData[field.id]"
            class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting"
          >
            <option value="" disabled>{{ field.placeholder }}</option>
            <option v-for="option in field.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <input
            v-else
            :id="field.id"
            v-model="formData[field.id]"
            :type="field.type"
            :placeholder="field.placeholder"
            class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting"
          />
        </div>

        <div class="space-y-2">
          <label for="project-details" class="text-sm font-medium text-gray-700"
            >Tell us about your project *</label
          >
          <textarea
            id="project-details"
            v-model="projectDetails"
            rows="4"
            placeholder="Describe your project, goals, and any specific requirements..."
            class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting"
          ></textarea>
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="closeProjectModal"
            class="flex-1 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            :disabled="isSubmitting"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/60 transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Submitting...</span>
            <span v-else>Send Message</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
