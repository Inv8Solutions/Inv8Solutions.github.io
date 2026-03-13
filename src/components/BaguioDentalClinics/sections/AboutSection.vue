<script setup lang="ts">
const dentists = [
  {
    name: 'Dr. OYSE',
    role: 'General Dentist',
    note: 'Patient-first consultations and preventive treatment planning.',
  },
  {
    name: 'Dr. EASSE',
    role: 'General Dentist',
    note: 'Gentle restorative and family dental care for all ages.',
  },
]
</script>

<template>
  <section class="bg-gray-50">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <h2 class="text-3xl font-semibold text-gray-900">Meet the Clinic Team</h2>
        <p class="mt-4 text-gray-600">
          Build trust quickly by showing who will handle patients, where your clinic is located, and
          what booking rules apply.
        </p>
        <div class="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div class="rounded-xl border border-gray-200 bg-white p-4">
            <p class="font-semibold text-gray-900">Opening Hours</p>
            <p class="mt-1 text-gray-600">Mon–Sat • 9:00 AM – 6:00 PM</p>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white p-4">
            <p class="font-semibold text-gray-900">Location</p>
            <p class="mt-1 text-gray-600">Baguio City, Benguet</p>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white p-4">
            <p class="font-semibold text-gray-900">Booking Policy</p>
            <p class="mt-1 text-gray-600">Appointments may move if emergencies arise.</p>
          </div>
          <div class="rounded-xl border border-gray-200 bg-white p-4">
            <p class="font-semibold text-gray-900">Support</p>
            <p class="mt-1 text-gray-600">Phone + email confirmations enabled</p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <article
          v-for="(dentist, index) in dentists"
          :key="dentist.name"
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-fade-in-up"
          :class="index === 1 ? 'animate-delay-200' : ''"
        >
          <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">{{ dentist.role }}</p>
          <h3 class="mt-2 text-xl font-semibold text-gray-900">{{ dentist.name }}</h3>
          <p class="mt-2 text-sm text-gray-600">{{ dentist.note }}</p>
          <p class="mt-4 text-xs text-gray-500">Lil Tooth Fairy Dental Clinic • Baguio Branch</p>
        </article>
      </div>
    </div>
  </section>
</template>
