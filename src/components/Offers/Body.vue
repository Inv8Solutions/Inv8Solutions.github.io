<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { offerDetails, DEFAULT_SERVICE_ID, type OfferDetail, type WhatWeBuild, type Benefit, type Example } from '@/data/offers'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

defineOptions({
  name: 'OffersBody',
})
const props = defineProps<{ selectedServiceId?: string }>()
const emit = defineEmits<{ (e: 'update:selectedServiceId', id: string): void }>()

const router = useRouter()
const { observeElements } = useScrollAnimation()

const localSelectedId = ref(props.selectedServiceId ?? DEFAULT_SERVICE_ID)

watch(() => props.selectedServiceId, (val) => {
  if (val) localSelectedId.value = val
})

const currentOffer = computed<OfferDetail>(() => {
  const fallbackOffer = offerDetails[0]!
  return offerDetails.find((offer) => offer.id === localSelectedId.value) ?? fallbackOffer
})

const selectService = (id: string) => {
  localSelectedId.value = id
  emit('update:selectedServiceId', id)
  setTimeout(() => {
    document.querySelector('#service-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 50)
}

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

onMounted(() => {
  observeElements('.offer-details-section')
  observeElements('.offer-deliverable-item')
})
</script>

<template>
  <!-- Service Cards Overview -->
  <section id="services-body" class="bg-[#03040f] px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="offer-details-section mb-10 text-center">
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Our Services</p>
        <h2 class="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
          End-to-end solutions<br />for every stage of <span class="text-blue-500">innovation.</span>
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/50">
          From strategy and design to development and growth,
          we help startups and businesses build meaningful digital products.
        </p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(offer, index) in offerDetails"
          :key="offer.id"
          :class="offer.id === localSelectedId ? 'ring-2 ring-blue-500 border-blue-500/50' : 'border-white/10 hover:border-white/20 hover:bg-[#111327]'"
          class="offer-deliverable-item group flex flex-col overflow-hidden rounded-[24px] border bg-[#0d0f1f] transition duration-300 cursor-pointer"
          :style="`animation-delay: ${index * 0.08}s`"
          @click="selectService(offer.id)"
        >
          <div class="relative h-48 overflow-hidden bg-[#080a18]">
            <img v-if="offer.image" :src="offer.image" :alt="offer.label" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0d0f1f] via-transparent to-transparent"></div>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <div class="mb-3 flex items-center justify-between">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl"
                :class="[index===0?'bg-blue-500/15 text-blue-400':index===1?'bg-purple-500/15 text-purple-400':index===2?'bg-green-500/15 text-green-400':'bg-yellow-500/15 text-yellow-400']">
                <i :class="[offer.heroIcon,'text-sm']" aria-hidden="true"></i>
              </div>
              <span class="text-xl font-black"
                :class="[index===0?'text-blue-500/50':index===1?'text-purple-500/50':index===2?'text-green-500/50':'text-yellow-500/50']">
                {{ (index+1).toString().padStart(2,'0') }}
              </span>
            </div>
            <h3 class="text-lg font-black leading-snug text-white">{{ offer.label }}</h3>
            <p class="mt-1.5 flex-1 text-sm leading-relaxed text-white/50">{{ offer.blurb }}</p>
            <button type="button" @click.stop="selectService(offer.id)"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition duration-200"
              :class="[index===0?'text-blue-400 hover:text-blue-300':index===1?'text-purple-400 hover:text-purple-300':index===2?'text-green-400 hover:text-green-300':'text-yellow-400 hover:text-yellow-300']">
              Learn more
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Service Detail Page -->
  <section id="service-detail" class="bg-[#03040f] px-4 pb-0 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">

      <!-- Hero: icon + headline + image -->
      <div class="flex flex-col gap-10 border-t border-white/10 pt-16 lg:flex-row lg:items-center lg:gap-0">
        <div class="flex-1 lg:pr-16">
          <div class="mb-5 inline-flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
              <i :class="[currentOffer.heroIcon, 'text-lg']" aria-hidden="true"></i>
            </div>
            <span class="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">{{ currentOffer.label }}</span>
          </div>
          <h2 class="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl" style="white-space: pre-line">{{ currentOffer.headline }}</h2>
          <p class="mt-5 max-w-lg text-base leading-relaxed text-white/55">{{ currentOffer.blurb }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <button type="button" @click="openProjectModal"
              class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500 hover:scale-105">
              Start a Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button type="button" @click="viewProjects"
              class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 hover:scale-105">
              View our work
              <i class="fa-solid fa-circle-play text-xs" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div class="lg:w-[48%] lg:shrink-0">
          <img v-if="currentOffer.image" :src="currentOffer.image" :alt="currentOffer.label"
            class="w-full rounded-3xl object-cover shadow-2xl shadow-blue-900/20 ring-1 ring-white/10" loading="lazy" />
        </div>
      </div>

      <!-- What We Build -->
      <div class="mt-20">
        <h3 class="mb-8 text-center text-2xl font-black text-white">What We Build</h3>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="item in currentOffer.whatWeBuild" :key="item.title"
            class="flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0d0f1f]">
            <div class="flex items-start gap-3 p-5">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <i :class="[item.icon, 'text-sm']" aria-hidden="true"></i>
              </div>
              <div>
                <h4 class="text-sm font-bold text-white">{{ item.title }}</h4>
                <p class="mt-1 text-xs leading-relaxed text-white/50">{{ item.description }}</p>
              </div>
            </div>
            <div v-if="item.image" class="mx-4 mb-4 h-36 overflow-hidden rounded-xl bg-[#080a18]">
              <img :src="item.image" :alt="item.title" class="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      <!-- What This Helps You Achieve -->
      <div class="mt-16">
        <h3 class="mb-8 text-center text-2xl font-black text-white">What This Helps You Achieve</h3>
        <div class="rounded-[24px] border border-white/10 bg-[#0d0f1f] p-6 sm:p-8">
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="benefit in currentOffer.benefits" :key="benefit.title" class="flex items-start gap-4">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" :class="benefit.iconColor">
                <i :class="[benefit.icon, 'text-sm']" aria-hidden="true"></i>
              </div>
              <div>
                <h4 class="text-sm font-bold text-white">{{ benefit.title }}</h4>
                <p class="mt-1 text-xs leading-relaxed text-white/50">{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Example Solutions -->
      <div class="mt-16">
        <h3 class="mb-8 text-center text-2xl font-black text-white">Example Solutions We've Built</h3>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="example in currentOffer.examples" :key="example.title" class="group cursor-pointer" @click="viewProjects">
            <div class="h-44 overflow-hidden rounded-2xl bg-[#0d0f1f]">
              <img :src="example.image" :alt="example.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
            </div>
            <h4 class="mt-3 text-sm font-bold text-white">{{ example.title }}</h4>
            <p class="mt-1 text-xs leading-relaxed text-white/50">{{ example.description }}</p>
          </div>
        </div>
      </div>

      <!-- Bottom CTA banner -->
      <div class="mt-16 mb-0 flex flex-col items-start justify-between gap-6 rounded-[24px] bg-[#0d1a3a] p-8 sm:flex-row sm:items-center sm:p-10">
        <div class="flex items-start gap-5">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
            <i class="fa-regular fa-calendar text-lg" aria-hidden="true"></i>
          </div>
          <div>
            <h4 class="text-lg font-black text-white">Have an idea but not sure where to start?</h4>
            <p class="mt-1 text-sm text-white/55">Book a discovery call and we'll help identify the right solution before any development begins.</p>
          </div>
        </div>
        <div class="flex flex-col items-start gap-2 sm:items-end">
          <button type="button" @click="openProjectModal"
            class="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-blue-50 hover:scale-105">
            Book a Discovery Call
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <span class="text-xs text-white/40">
            <i class="fa-solid fa-circle-check mr-1 text-green-400" aria-hidden="true"></i>
            No commitment. Just a conversation.
          </span>
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
