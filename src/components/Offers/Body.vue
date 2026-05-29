<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { offerDetails, DEFAULT_SERVICE_ID } from '@/data/offers'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'

defineOptions({ name: 'OffersBody' })

const router = useRouter()
const route = useRoute()

const selectedId = ref(DEFAULT_SERVICE_ID)

const currentOffer = computed(() => offerDetails.find(o => o.id === selectedId.value) ?? offerDetails[0]!)
const currentIndex = computed(() => offerDetails.findIndex(o => o.id === selectedId.value))

const selectTab = (id: string) => {
  selectedId.value = id
}

// Handle hash-based deep linking from Home page "Learn more" buttons
onMounted(() => {
  const hash = route.hash // e.g. #service-uiux
  if (hash) {
    const id = hash.replace('#service-', '')
    const match = offerDetails.find(o => o.id === id)
    if (match) selectedId.value = match.id
    // scroll body into view
    setTimeout(() => {
      document.querySelector('#services-body')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
})

watch(() => route.hash, (hash) => {
  if (hash) {
    const id = hash.replace('#service-', '')
    const match = offerDetails.find(o => o.id === id)
    if (match) selectedId.value = match.id
  }
})

const accentColor = (index: number) => {
  const colors = [
    { text: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500', activeBg: 'bg-blue-500/10' },
    { text: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500', activeBg: 'bg-purple-500/10' },
    { text: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-500', activeBg: 'bg-green-500/10' },
    { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500', activeBg: 'bg-yellow-500/10' },
  ]
  return colors[index % colors.length]!
}

// Modal state
const isProjectModalOpen = ref(false)
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
    id: 'service', label: 'Service Interested In *', type: 'select',
    options: [
      { value: 'web-app-dev', label: 'Web & App Development' },
      { value: 'ui-ux-design', label: 'UI/UX Design' },
      { value: 'biz-innovation', label: 'Business Innovation Solutions' },
      { value: 'product-strategy', label: 'Innovation & Product Strategy' },
      { value: 'other', label: 'Others' },
    ],
    placeholder: 'Select a service',
  },
  {
    id: 'budget', label: 'Estimated Budget', type: 'select',
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
    id: 'timeline', label: 'Project Timeline', type: 'select',
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

formFields.forEach(f => { formData.value[f.id] = '' })

const openProjectModal = () => { isProjectModalOpen.value = true; resetForm() }
const closeProjectModal = () => { isProjectModalOpen.value = false }
const resetForm = () => {
  formFields.forEach(f => { formData.value[f.id] = '' })
  projectDetails.value = ''
  submitStatus.value = 'idle'
  errorMessage.value = ''
}

const handleSubmit = async () => {
  const missing = ['name', 'email', 'service'].filter(f => !formData.value[f]?.trim())
  if (missing.length) { errorMessage.value = 'Please fill in all required fields'; submitStatus.value = 'error'; return }
  if (!projectDetails.value.trim()) { errorMessage.value = 'Please tell us about your project'; submitStatus.value = 'error'; return }

  isSubmitting.value = true
  submitStatus.value = 'idle'
  errorMessage.value = ''
  try {
    const data = {
      name: formData.value.name, email: formData.value.email,
      company: formData.value.company || null, service: formData.value.service,
      budget: formData.value.budget || null, timeline: formData.value.timeline || null,
      projectDetails: projectDetails.value, status: 'new', createdAt: serverTimestamp(),
    }
    const docRef = await addDoc(collection(db, 'inquiries'), data)
    const sendEmail = httpsCallable(getFunctions(), 'sendInquiryConfirmation')
    await sendEmail({ ...data, id: docRef.id })
    resetForm()
    submitStatus.value = 'success'
    setTimeout(() => { closeProjectModal(); submitStatus.value = 'idle' }, 2000)
  } catch {
    errorMessage.value = 'Failed to submit. Please try again.'
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="services-body" class="bg-[#03040f] px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">

      <!-- Two-column header -->
      <div class="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-xl">
          <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Our Services</p>
          <h2 class="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            End-to-end solutions<br />for every stage of <span class="text-blue-500">innovation.</span>
          </h2>
        </div>
        <p class="max-w-sm text-base leading-relaxed text-white/50 lg:text-right">
          From strategy and design to development and growth, we help startups and businesses build meaningful digital products.
        </p>
      </div>

      <!-- Service tabs -->
      <div class="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <button
          v-for="(offer, i) in offerDetails"
          :key="offer.id"
          @click="selectTab(offer.id)"
          class="flex items-center gap-3 rounded-[16px] border px-4 py-4 text-left transition duration-200"
          :class="selectedId === offer.id
            ? [accentColor(i).border, accentColor(i).activeBg, accentColor(i).text]
            : 'border-white/10 bg-[#0d0f1f] text-white/50 hover:border-white/20 hover:text-white/80'"
        >
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition"
            :class="selectedId === offer.id ? [accentColor(i).bg, accentColor(i).text] : 'bg-white/5 text-white/40'">
            <i :class="[offer.heroIcon, 'text-sm']" aria-hidden="true"></i>
          </div>
          <span class="text-sm font-bold leading-tight">{{ offer.label }}</span>
        </button>
      </div>

      <!-- Bento content card -->
      <div class="overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0c1c]">
        <Transition name="tab-fade" mode="out-in">
          <div :key="selectedId" class="grid sm:grid-cols-2">
            <div
              v-for="(item, idx) in currentOffer.whatWeBuild"
              :key="item.title"
              class="group flex flex-col cursor-default"
              :class="{
                'border-r border-white/10': idx % 2 === 0 && !(idx === currentOffer.whatWeBuild.length - 1 && currentOffer.whatWeBuild.length % 2 === 1),
                'border-b border-white/10': idx < currentOffer.whatWeBuild.length - (currentOffer.whatWeBuild.length % 2 === 0 ? 2 : 1),
                'sm:col-span-2': idx === currentOffer.whatWeBuild.length - 1 && currentOffer.whatWeBuild.length % 2 === 1,
              }"
            >
              <!-- Image: hidden by default (h-0), expands on hover -->
              <div class="relative overflow-hidden bg-[#080a18] transition-[height] duration-500 ease-in-out h-0 group-hover:h-56">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.title"
                  class="h-56 w-full object-cover object-top"
                  loading="lazy"
                />
                <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0c1c] to-transparent"></div>
              </div>

              <!-- Text: always visible -->
              <div class="flex min-h-[160px] items-start justify-between gap-4 p-6">
                <div>
                  <h4 class="text-xl font-black leading-snug text-white">{{ item.title }}</h4>
                  <p class="mt-2 text-sm leading-relaxed text-white/50">{{ item.description }}</p>
                </div>
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition duration-300 mt-0.5 opacity-0 group-hover:opacity-100"
                  :class="[accentColor(currentIndex).bg, accentColor(currentIndex).text]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Bottom CTA strip -->
      <div class="mt-3 flex flex-col items-start justify-between gap-4 rounded-[16px] border border-white/10 bg-[#0d0f1f] px-6 py-4 sm:flex-row sm:items-center">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
            <i class="fa-regular fa-comment-dots text-sm" aria-hidden="true"></i>
          </div>
          <p class="text-sm text-white/60">
            Not sure what you need?
            <span class="text-white/80"> Let's talk about your idea.</span>
          </p>
        </div>
        <button
          @click="openProjectModal"
          class="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 hover:scale-105"
        >
          Book a discovery call
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

    </div>
  </section>

  <!-- Project Modal -->
  <div v-if="isProjectModalOpen" class="fixed inset-0 z-50 overflow-y-auto bg-gray-600/50" @click="closeProjectModal">
    <div class="relative top-10 mx-auto w-full max-w-2xl rounded-lg border bg-white p-6 shadow-lg" @click.stop>
      <div class="mb-6 flex items-center justify-between">
        <h3 class="text-2xl font-semibold text-gray-900">Start Your Project</h3>
        <button @click="closeProjectModal" class="text-gray-400 hover:text-gray-600">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div v-if="submitStatus === 'error'" class="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>
        <div v-if="submitStatus === 'success'" class="rounded-2xl border border-green-200 bg-green-50 p-4">
          <p class="text-sm text-green-600">Thank you! Your inquiry has been submitted. We'll be in touch soon.</p>
        </div>
        <div v-for="field in formFields" :key="field.id" class="space-y-2">
          <label :for="field.id" class="text-sm font-medium text-gray-700">{{ field.label }}</label>
          <select v-if="field.type === 'select'" :id="field.id" v-model="formData[field.id]"
            class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting">
            <option value="" disabled>{{ field.placeholder }}</option>
            <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
          <input v-else :id="field.id" v-model="formData[field.id]" :type="field.type" :placeholder="field.placeholder"
            class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting" />
        </div>
        <div class="space-y-2">
          <label for="project-details" class="text-sm font-medium text-gray-700">Tell us about your project *</label>
          <textarea id="project-details" v-model="projectDetails" rows="4"
            placeholder="Describe your project, goals, and any specific requirements..."
            class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting"></textarea>
        </div>
        <div class="flex gap-3 pt-4">
          <button type="button" @click="closeProjectModal" :disabled="isSubmitting"
            class="flex-1 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">Cancel</button>
          <button type="submit" :disabled="isSubmitting"
            class="flex-1 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
            <span v-if="isSubmitting">Submitting...</span>
            <span v-else>Send Message</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
