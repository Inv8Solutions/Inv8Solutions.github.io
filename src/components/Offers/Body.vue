<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { offerDetails, DEFAULT_SERVICE_ID, type OfferDetail } from '@/data/offers'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'

defineOptions({
  name: 'OffersBody',
})
const props = defineProps<{ selectedServiceId?: string }>()

const router = useRouter()

const currentOffer = computed<OfferDetail>(() => {
  const resolvedId = props.selectedServiceId ?? DEFAULT_SERVICE_ID
  const fallbackOffer = offerDetails[0]!
  return offerDetails.find((offer) => offer.id === resolvedId) ?? fallbackOffer
})

// Modal state
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

// Map service IDs to category names for works page filtering
const serviceIdToCategory: Record<string, string> = {
  uiux: 'UI/UX Design',
  mvp: 'MVP Development',
  innovation: 'Innovation for SMEs',
  iot: 'IoT Solutions',
  pitchdeck: 'Pitchdeck Design',
}

// Map service IDs to form values
const serviceIdToFormValue: Record<string, string> = {
  uiux: 'ui-ux-design',
  mvp: 'mvp-dev',
  innovation: 'sme-innovation',
  iot: 'iot-dev',
  pitchdeck: 'other',
}

const viewProjects = () => {
  const category = serviceIdToCategory[currentOffer.value.id]
  if (category) {
    // Navigate to works page with category query parameter
    router.push({
      path: '/works',
      query: { category },
    })
  } else {
    // Fallback to works page without category
    router.push('/works')
  }
}

const openProjectModal = () => {
  isProjectModalOpen.value = true
  resetForm()
  // Pre-select the service based on current offer
  const serviceValue = serviceIdToFormValue[currentOffer.value.id]
  if (serviceValue) {
    formData.value.service = serviceValue
  }
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
  <section class="bg-white px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl space-y-16">
      <div
        class="grid gap-10 rounded-[36px] border border-gray-100 bg-[#f8f9fb] px-6 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:px-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
      >
        <div class="space-y-8">
          <div>
            <div
              class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1 text-sm font-semibold text-blue-600"
            >
              <span class="h-2 w-2 rounded-full bg-blue-500"></span>
              {{ currentOffer.badge }}
            </div>
            <h2 class="mt-6 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
              {{ currentOffer.title }}
            </h2>
            <p class="mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
              {{ currentOffer.blurb }}
            </p>
          </div>

          <div>
            <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-700">
              What you get
            </p>
            <ul class="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
              <li
                v-for="item in currentOffer.deliverables"
                :key="item"
                class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700"
              >
                <span
                  class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="h-4 w-4"
                  >
                    <path d="M5 12l4 4 10-10" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              @click="openProjectModal"
              class="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/60 transition hover:bg-blue-700"
            >
              Start a Project
            </button>
            <button
              type="button"
              @click="viewProjects"
              class="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:border-gray-400"
            >
              View Projects
            </button>
          </div>
        </div>

        <div
          class="hidden min-h-[320px] rounded-[32px] border border-gray-100 bg-white shadow-inner md:block"
        >
          <div class="flex h-full items-center justify-center p-8">
            <div class="relative w-full h-full max-w-sm">
              <img
                v-if="currentOffer.image"
                :src="currentOffer.image"
                :alt="currentOffer.title"
                class="w-full h-full object-contain rounded-2xl"
              />
              <div
                v-else
                class="h-40 w-40 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="space-y-10 rounded-[32px] border border-gray-100 bg-white px-6 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-10"
      >
        <div class="text-center">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">What we do</p>
          <h3 class="mt-3 text-3xl font-semibold text-gray-900">{{ currentOffer.title }}</h3>
          <p class="mt-2 text-base text-gray-500">
            A proven playbook tailored for {{ currentOffer.label }} engagements.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(capability, index) in currentOffer.capabilities"
            :key="capability.title"
            class="flex flex-col gap-3 rounded-3xl border border-gray-100 bg-[#f9fafc] p-6"
          >
            <span class="text-sm font-semibold text-gray-400">{{
              (index + 1).toString().padStart(2, '0')
            }}</span>
            <h4 class="text-lg font-semibold text-gray-900">{{ capability.title }}</h4>
            <p class="text-sm text-gray-500">{{ capability.description }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

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
        <h3 class="text-2xl font-semibold text-gray-900">
          Start Your {{ currentOffer.label }} Project
        </h3>
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
