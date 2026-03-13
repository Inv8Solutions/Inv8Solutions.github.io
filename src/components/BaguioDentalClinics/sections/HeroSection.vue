<script setup lang="ts">
const emit = defineEmits<{
  (event: 'select-service', serviceName: string): void
}>()

const startConsultation = () => {
  emit('select-service', 'Dental Consultation')
}

const quickStats = [
  { label: 'Patients served', value: '3,200+' },
  { label: 'Average rating', value: '4.9/5' },
  { label: 'Response time', value: '< 10 mins' },
]
</script>

<template>
  <section class="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-cyan-50">
    <div class="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
      <div>
        <p
          class="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-blue-700 ring-1 ring-blue-100 animate-fade-in-up"
        >
          <span class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Baguio Dental Clinics • Smart Booking Ready
        </p>
        <h1
          class="max-w-2xl text-4xl font-semibold leading-tight text-gray-900 animate-fade-in-up animate-delay-200 md:text-6xl"
        >
          Modern dental care with a booking experience patients love
        </h1>
        <p class="mt-6 max-w-xl text-lg text-gray-600 animate-fade-in-up animate-delay-300">
          A premium clinic website with clear services, trusted dentist profiles, and an automated
          appointment assistant that recommends available schedules in seconds.
        </p>

        <div class="mt-8 flex flex-wrap gap-3 animate-fade-in-up animate-delay-400">
          <button
            class="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-smooth hover:bg-blue-700 hover:scale-105"
            @click="startConsultation"
          >
            Book Consultation
          </button>
          <a
            href="#clinic-services"
            class="rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-smooth hover:bg-gray-50"
          >
            Explore Services
          </a>
        </div>

        <div class="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
          <article
            v-for="item in quickStats"
            :key="item.label"
            class="rounded-2xl border border-gray-200 bg-white/90 p-4 animate-scale-in"
          >
            <p class="text-2xl font-semibold text-gray-900">{{ item.value }}</p>
            <p class="mt-1 text-sm text-gray-500">{{ item.label }}</p>
          </article>
        </div>
      </div>

      <div class="relative">
        <div class="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/60">
          <h2 class="text-xl font-semibold text-gray-900">Why clinics choose this setup</h2>
          <ul class="mt-4 space-y-3 text-sm text-gray-600">
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
              Service-first layout inspired by real booking behavior
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
              Team, hours, and booking policy surfaced early for trust
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
              Lightweight animations that feel premium but stay fast
            </li>
          </ul>

          <div class="mt-6 rounded-2xl bg-blue-50 p-4">
            <p class="text-xs uppercase tracking-wide text-blue-700">Next available</p>
            <p class="mt-1 text-lg font-semibold text-gray-900">Today • 2:30 PM</p>
            <p class="text-sm text-gray-600">Auto-updated in booking assistant below</p>
          </div>
        </div>

        <div
          class="absolute -right-4 -top-4 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-lg ring-1 ring-gray-100 animate-float"
          style="--rotate-angle: 6deg"
        >
          4.9 ★ Patient Satisfaction
        </div>
        <div
          class="absolute -bottom-5 -left-5 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-lg ring-1 ring-gray-100 animate-float"
          style="--rotate-angle: -6deg; animation-delay: 0.6s"
        >
          Same-day slots available
        </div>
      </div>
    </div>
  </section>
</template>
