<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  initialService: string
}>()

const serviceOptions = [
  { name: 'Dental Consultation', duration: 30 },
  { name: 'Dental Consultation / Check-up', duration: 30 },
  { name: 'Teeth Cleaning', duration: 45 },
  { name: 'Tooth Extraction (Bunot)', duration: 60 },
  { name: 'Orthodontics / Braces', duration: 60 },
  { name: 'Root Canal Therapy', duration: 90 },
  { name: 'Zirconia Crowns', duration: 60 },
]

const selectedService = ref(props.initialService || 'Dental Consultation')
const selectedDate = ref('')
const selectedTime = ref('')
const patientName = ref('')
const patientPhone = ref('')

watch(
  () => props.initialService,
  (newService) => {
    if (newService) selectedService.value = newService
  },
)

const clinicSchedule = {
  startHour: 9,
  endHour: 18,
  breakStart: 12,
  breakEnd: 13,
}

const nextSevenDays = computed(() => {
  const dates: Array<{ value: string; label: string }> = []
  const now = new Date()

  for (let day = 0; day < 7; day += 1) {
    const current = new Date(now)
    current.setDate(now.getDate() + day)

    const dayOfWeek = current.getDay()
    if (dayOfWeek !== 0) {
      const [value = ''] = current.toISOString().split('T')
      const label = current.toLocaleDateString('en-PH', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })

      dates.push({ value, label })
    }
  }

  return dates
})

if (!selectedDate.value && nextSevenDays.value.length) {
  selectedDate.value = nextSevenDays.value[0]?.value ?? ''
}

const selectedDuration = computed(() => {
  const selected = serviceOptions.find((service) => service.name === selectedService.value)
  return selected?.duration ?? 30
})

const availableSlots = computed(() => {
  const slots: string[] = []
  const stepMinutes = 30

  for (let hour = clinicSchedule.startHour; hour < clinicSchedule.endHour; hour += 1) {
    if (hour >= clinicSchedule.breakStart && hour < clinicSchedule.breakEnd) {
      continue
    }

    for (let minute = 0; minute < 60; minute += stepMinutes) {
      const totalMinutes = hour * 60 + minute
      const endMinutes = totalMinutes + selectedDuration.value
      const clinicEndMinutes = clinicSchedule.endHour * 60

      if (endMinutes > clinicEndMinutes) {
        continue
      }

      const displayHour = Math.floor(totalMinutes / 60)
      const displayMinute = totalMinutes % 60
      const suffix = displayHour >= 12 ? 'PM' : 'AM'
      const normalizedHour = displayHour % 12 === 0 ? 12 : displayHour % 12
      const formattedMinute = String(displayMinute).padStart(2, '0')

      slots.push(`${normalizedHour}:${formattedMinute} ${suffix}`)
    }
  }

  return slots.slice(0, 8)
})

watch(availableSlots, (slots) => {
  selectedTime.value = slots[0] ?? ''
})

const bookingSummary = computed(() => {
  if (!selectedService.value || !selectedDate.value || !selectedTime.value) {
    return 'Select your service, date, and time to generate your appointment summary.'
  }

  const readableDate = new Date(selectedDate.value).toLocaleDateString('en-PH', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return `${selectedService.value} • ${readableDate} • ${selectedTime.value}`
})

const bookingLink = computed(() => {
  const service = encodeURIComponent(selectedService.value)
  const date = encodeURIComponent(selectedDate.value)
  const time = encodeURIComponent(selectedTime.value)
  return `https://dentalclinic6801.setmore.com/book?service=${service}&date=${date}&time=${time}`
})
</script>

<template>
  <section class="bg-white">
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <h2 class="text-3xl font-semibold text-gray-900">Automated Appointment Assistant</h2>
        <p class="mt-3 text-gray-600">
          Patients choose a service, and the system automatically suggests matching dates and time slots.
          This keeps booking smooth and reduces manual chat back-and-forth.
        </p>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm animate-fade-in-up">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="text-sm font-medium text-gray-700">
              Service
              <select
                v-model="selectedService"
                class="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option v-for="service in serviceOptions" :key="service.name" :value="service.name">
                  {{ service.name }}
                </option>
              </select>
            </label>

            <label class="text-sm font-medium text-gray-700">
              Preferred Date
              <select
                v-model="selectedDate"
                class="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option v-for="day in nextSevenDays" :key="day.value" :value="day.value">{{ day.label }}</option>
              </select>
            </label>

            <label class="text-sm font-medium text-gray-700">
              Preferred Time
              <select
                v-model="selectedTime"
                class="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option v-for="slot in availableSlots" :key="slot" :value="slot">{{ slot }}</option>
              </select>
            </label>

            <label class="text-sm font-medium text-gray-700">
              Full Name
              <input
                v-model="patientName"
                type="text"
                placeholder="Juan Dela Cruz"
                class="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
              />
            </label>

            <label class="text-sm font-medium text-gray-700 md:col-span-2">
              Mobile Number
              <input
                v-model="patientPhone"
                type="text"
                placeholder="0917 000 0000"
                class="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
              />
            </label>
          </div>

          <div class="mt-5 rounded-2xl bg-blue-50 p-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">Auto Summary</p>
            <p class="mt-2 text-sm text-gray-700">{{ bookingSummary }}</p>
          </div>

          <div class="mt-5 flex flex-wrap gap-3">
            <a
              :href="bookingLink"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-smooth hover:bg-blue-700 hover:scale-105"
            >
              Continue to Booking
            </a>
            <a
              href="tel:09171181637"
              class="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-smooth hover:bg-gray-50"
            >
              Call Clinic
            </a>
          </div>
        </div>

        <aside class="space-y-4 animate-fade-in-up animate-delay-200">
          <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Clinic Address</p>
            <p class="mt-2 text-sm font-medium text-gray-900">B1S2, Megatower 7, Honeymoon Road, Baguio City</p>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Contact</p>
            <p class="mt-2 text-sm text-gray-900">0917 118 1637</p>
            <p class="text-sm text-gray-900">surgdent2044083@gmail.com</p>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Good to Know</p>
            <ul class="mt-2 space-y-1 text-sm text-gray-700">
              <li>• Appointment requests may shift for urgent cases</li>
              <li>• Confirmation is sent via call or message</li>
              <li>• Walk-ins accepted based on slot availability</li>
            </ul>
          </div>
        </aside>
      </div>

      <div class="mt-8 rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
        <p class="font-semibold text-gray-900">Pro tip for clinic demos</p>
        <p class="mt-2">
          Before presenting, preload the page and choose a service to show instant schedule suggestions.
          This gives clinics a clear “automated booking” wow moment.
        </p>
      </div>
    </div>
  </section>
</template>
