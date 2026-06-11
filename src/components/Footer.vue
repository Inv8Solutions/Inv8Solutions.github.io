<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { useLanguage } from '@/composables/useLanguage'

const { lang, toggle, t } = useLanguage()

defineOptions({
  name: 'FooterSection',
})

const route = useRoute()
const router = useRouter()

// Modal state
const isBookingModalOpen = ref(false)

// Form state
const bookingForm = ref({
  email: '',
  selectedDate: '',
  selectedTime: '',
  name: '',
  company: '',
  projectDetails: '',
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const errorMessage = ref('')

// Generate available dates (next 14 days)
const availableDates = computed(() => {
  const dates = []
  const today = new Date()

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    // Skip weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      })
    }
  }

  return dates
})

// Available time slots
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

const quickLinks = [
  { name: 'About Us',        nameFil: 'Tungkol sa Amin',    path: '/about' },
  { name: 'Services',        nameFil: 'Mga Serbisyo',       path: '/services' },
  { name: 'Works',           nameFil: 'Mga Gawa',           path: '/works' },
  { name: 'Blog',            nameFil: 'Blog',               path: '/blog' },
  { name: 'Contact Us',      nameFil: 'Makipag-ugnayan',    path: '/contactus' },
  { name: 'Referral Program',nameFil: 'Programang Referral',path: '/referrals' },
  { name: 'Venture Studio',  nameFil: 'Venture Studio',      path: '/venture-studio' },
]

const services = [
  { en: 'Web & App Development',         fil: 'Pagbuo ng Web at App' },
  { en: 'UI/UX Design',                  fil: 'Disenyo ng UI/UX' },
  { en: 'Business Innovation Solutions', fil: 'Solusyon sa Inobasyon ng Negosyo' },
  { en: 'Innovation & Product Strategy', fil: 'Estratehiya sa Inobasyon at Produkto' },
]

const policies = [
  { label: 'Privacy Policy',   labelFil: 'Patakaran sa Privacy', href: '#' },
  { label: 'Terms of Service', labelFil: 'Mga Tuntunin',          href: '#' },
  { label: 'Referral Program', labelFil: 'Programang Referral',   href: '/referrals' },
]

const currentYear = new Date().getFullYear()

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
    router.push(path)
  }
}

const closeBookingModal = () => {
  isBookingModalOpen.value = false
}

const resetForm = () => {
  bookingForm.value = {
    email: '',
    selectedDate: '',
    selectedTime: '',
    name: '',
    company: '',
    projectDetails: '',
  }
  submitStatus.value = 'idle'
  errorMessage.value = ''
}

const handleSubmitBooking = async () => {
  // Validate required fields
  if (
    !bookingForm.value.email ||
    !bookingForm.value.selectedDate ||
    !bookingForm.value.selectedTime
  ) {
    errorMessage.value = 'Please fill in all required fields'
    submitStatus.value = 'error'
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(bookingForm.value.email)) {
    errorMessage.value = 'Please enter a valid email address'
    submitStatus.value = 'error'
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'
  errorMessage.value = ''

  try {
    await addDoc(collection(db, 'calls'), {
      email: bookingForm.value.email,
      name: bookingForm.value.name || null,
      company: bookingForm.value.company || null,
      selected_date: bookingForm.value.selectedDate,
      selected_time: bookingForm.value.selectedTime,
      project_details: bookingForm.value.projectDetails || null,
      type: 'consultation_call',
      status: 'pending',
      created_at: new Date(),
    })

    // Reset form and show success
    resetForm()
    submitStatus.value = 'success'

    // Close modal after showing success message
    setTimeout(() => {
      closeBookingModal()
      submitStatus.value = 'idle'
    }, 3000)
  } catch (error) {
    console.error('Error submitting booking:', error)
    errorMessage.value = 'Failed to book call. Please try again.'
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <footer class="bg-[#03040f] ">
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div
        class="grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]"
      >
        <div class="space-y-4 text-left">
          <h2 class="text-2xl font-semibold text-white">inv8 Studio</h2>
          <p class="text-sm text-white/45">{{ t('Product design and development studio.', 'Studio ng disenyo at pagbuo ng produkto.') }}</p>
        </div>

        <div>
          <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-white/30">
            {{ t('Quick Navigation', 'Mabilis na Nabigasyon') }}
          </h3>
          <ul class="mt-4 space-y-2 text-sm text-white/55">
            <li v-for="link in quickLinks" :key="link.name">
              <a
                :href="link.path"
                @click.prevent="navigate(link.path)"
                class="transition hover: cursor-pointer"
                :class="{
                  'text-blue-400 font-medium': isActive(link.path),
                }"
              >
                {{ t(link.name, link.nameFil) }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-white/30">
            {{ t('Services List', 'Listahan ng Serbisyo') }}
          </h3>
          <ul class="mt-4 space-y-2 text-sm text-white/55">
            <li v-for="service in services" :key="service.en">{{ t(service.en, service.fil) }}</li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-white/30">
            {{ t('Get in Touch', 'Makipag-ugnayan') }}
          </h3>
          <a class="mt-4 flex items-center gap-3 text-sm text-white/60" href="mailto:inv8design@gmail.com">
            <span
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/45"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="h-5 w-5"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4 7.75A1.75 1.75 0 0 1 5.75 6h12.5A1.75 1.75 0 0 1 20 7.75v8.5A1.75 1.75 0 0 1 18.25 18H5.75A1.75 1.75 0 0 1 4 16.25z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  d="m5 8 7 5 7-5"
                />
              </svg>
            </span>
            <span class="font-medium">inv8design@gmail.com</span>
          </a>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ currentYear }} Inv8 Studio. {{ t('All rights reserved.', 'Lahat ng karapatan ay nakalaan.') }}</p>

        <div class="flex flex-wrap items-center gap-6">
          <a
            v-for="policy in policies"
            :key="policy.label"
            :href="policy.href"
            class="transition hover:text-white/70"
          >
            {{ t(policy.label, policy.labelFil) }}
          </a>

          <!-- Language toggle -->
          <button
            @click="toggle"
            class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60 transition hover:border-white/30 hover:text-white"
            :title="lang === 'en' ? 'Switch to Filipino' : 'Switch to English'"
          >
            <span class="text-base leading-none">🇵🇭</span>
            <span>{{ lang === 'en' ? 'Filipino' : 'English' }}</span>
          </button>
        </div>
      </div>
    </div>
  </footer>

  <!-- Booking Modal -->
  <div
    v-if="isBookingModalOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click="closeBookingModal"
  >
    <div
      class="relative top-10 mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-lg bg-white"
      @click.stop
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-semibold ">Book a FREE Consultation Call</h3>
        <button
          @click="closeBookingModal"
          class="text-white/30 hover:text-white/55 transition-colors"
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

      <form class="space-y-6" @submit.prevent="handleSubmitBooking">
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
            Thank you! Your consultation call has been booked successfully. We'll send a
            confirmation email soon.
          </p>
        </div>

        <!-- Email Input -->
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium text-white/60">Email Address *</label>
          <input
            id="email"
            v-model="bookingForm.email"
            type="email"
            placeholder="your.email@example.com"
            class="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm  placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting"
            required
          />
        </div>

        <!-- Name Input -->
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium text-white/60">Your Name</label>
          <input
            id="name"
            v-model="bookingForm.name"
            type="text"
            placeholder="John Doe"
            class="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm  placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting"
          />
        </div>

        <!-- Company Input -->
        <div class="space-y-2">
          <label for="company" class="text-sm font-medium text-white/60">Company Name</label>
          <input
            id="company"
            v-model="bookingForm.company"
            type="text"
            placeholder="Your Company"
            class="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm  placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting"
          />
        </div>

        <!-- Date Selection -->
        <div class="space-y-2">
          <label for="date" class="text-sm font-medium text-white/60">Preferred Date *</label>
          <select
            id="date"
            v-model="bookingForm.selectedDate"
            class="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm  placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting"
            required
          >
            <option value="" disabled>Select a date</option>
            <option v-for="date in availableDates" :key="date.value" :value="date.value">
              {{ date.label }}
            </option>
          </select>
        </div>

        <!-- Time Selection -->
        <div class="space-y-2">
          <label for="time" class="text-sm font-medium text-white/60">Preferred Time *</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="time in timeSlots"
              :key="time"
              type="button"
              @click="bookingForm.selectedTime = time"
              :disabled="isSubmitting"
              class="rounded-2xl border px-3 py-2 text-sm font-medium transition-colors"
              :class="{
                'border-blue-500 bg-blue-50 text-blue-700': bookingForm.selectedTime === time,
                'border-white/10 text-white/60 hover:border-gray-300':
                  bookingForm.selectedTime !== time,
              }"
            >
              {{ time }}
            </button>
          </div>
        </div>

        <!-- Project Details -->
        <div class="space-y-2">
          <label for="project-details" class="text-sm font-medium text-white/60"
            >Tell us about your project</label
          >
          <textarea
            id="project-details"
            v-model="bookingForm.projectDetails"
            rows="3"
            placeholder="Brief description of what you'd like to discuss..."
            class="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm  placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            :disabled="isSubmitting"
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="closeBookingModal"
            class="flex-1 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-white/60 transition hover:bg-gray-50"
            :disabled="isSubmitting"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/60 transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Booking...</span>
            <span v-else>Book Call</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
