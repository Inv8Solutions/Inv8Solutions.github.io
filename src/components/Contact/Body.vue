<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

defineOptions({ name: 'ContactBodySection' })

const { observeElements } = useScrollAnimation()

const contactInfo = [
  {
    icon: 'fa-regular fa-envelope',
    label: 'Email Address',
    value: 'inv8design@gmail.com',
  },
  {
    icon: 'fa-brands fa-discord',
    label: 'Community',
    value: 'discord.gg/jngYbhwsa5',
  },
  {
    icon: 'fa-solid fa-location-dot',
    label: 'Location',
    value: 'Baguio City, Philippines',
  },
]

const services = [
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'mvp-dev', label: 'MVP Development' },
  { value: 'sme-innovation', label: 'Innovation for SMEs' },
  { value: 'iot-dev', label: 'IoT Development' },
  { value: 'pitchdeck', label: 'Pitchdeck Design' },
  { value: 'consulting', label: 'Technical Consulting' },
  { value: 'other', label: 'Others' },
]

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  service: '',
  message: '',
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!form.value.firstName || !form.value.email || !form.value.message) {
    errorMessage.value = 'Please fill in all required fields.'
    submitStatus.value = 'error'
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'
  errorMessage.value = ''

  try {
    await addDoc(collection(db, 'inquiries'), {
      name: `${form.value.firstName} ${form.value.lastName}`.trim(),
      email: form.value.email,
      service: form.value.service || null,
      projectDetails: form.value.message,
      status: 'new',
      createdAt: serverTimestamp(),
    })

    form.value = { firstName: '', lastName: '', email: '', service: '', message: '' }
    submitStatus.value = 'success'
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Something went wrong. Please try again.'
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  observeElements('.contact-left')
  observeElements('.contact-right')
})
</script>

<template>
  <section class="bg-white px-4 py-20 sm:px-6 lg:px-8">
    <div class="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

      <!-- Left: headline + contact info -->
      <div class="contact-left space-y-10">
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-blue-600">Get In Touch</p>
          <h2 class="mt-4 text-4xl font-black leading-tight tracking-tight text-gray-900 md:text-5xl">
            Let's build something<br />great together.
          </h2>
          <p class="mt-4 max-w-md text-base leading-relaxed text-gray-500">
            Have a project in mind or want to explore how inv8 can help? Reach out and we'll get back to you within 24 hours.
          </p>
        </div>

        <ul class="space-y-5">
          <li
            v-for="item in contactInfo"
            :key="item.label"
            class="flex items-center gap-4"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700">
              <i :class="[item.icon, 'text-base']" aria-hidden="true"></i>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">{{ item.label }}</p>
              <p class="mt-0.5 text-sm font-semibold text-gray-900">{{ item.value }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Right: gradient bg + floating form card -->
      <div class="contact-right relative">
        <!-- Blue gradient background block -->
        <div class="absolute inset-x-0 bottom-0 h-3/4 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400"></div>

        <!-- Form card -->
        <div class="relative rounded-3xl bg-white p-8 shadow-2xl shadow-blue-200/60">
          <h3 class="text-xl font-black text-gray-900">Get in touch</h3>

          <!-- Status messages -->
          <div v-if="submitStatus === 'success'" class="mt-4 rounded-2xl bg-green-50 border border-green-200 p-4">
            <p class="text-sm font-semibold text-green-700">Message sent! We'll be in touch soon.</p>
          </div>
          <div v-if="submitStatus === 'error'" class="mt-4 rounded-2xl bg-red-50 border border-red-200 p-4">
            <p class="text-sm text-red-600">{{ errorMessage }}</p>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
            <!-- Name row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-gray-600">First Name *</label>
                <input
                  v-model="form.firstName"
                  type="text"
                  placeholder="Juan"
                  class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  :disabled="isSubmitting"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-gray-600">Last Name</label>
                <input
                  v-model="form.lastName"
                  type="text"
                  placeholder="Dela Cruz"
                  class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  :disabled="isSubmitting"
                />
              </div>
            </div>

            <!-- Email + Service row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-gray-600">Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="juan@company.com"
                  class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  :disabled="isSubmitting"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-gray-600">Service</label>
                <select
                  v-model="form.service"
                  class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  :disabled="isSubmitting"
                >
                  <option value="">Select one</option>
                  <option v-for="s in services" :key="s.value" :value="s.value">{{ s.label }}</option>
                </select>
              </div>
            </div>

            <!-- Message -->
            <div>
              <label class="mb-1.5 block text-xs font-semibold text-gray-600">Message *</label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Tell us about your project or idea..."
                class="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                :disabled="isSubmitting"
              ></textarea>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-300/40 transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>

    </div>
  </section>
</template>
