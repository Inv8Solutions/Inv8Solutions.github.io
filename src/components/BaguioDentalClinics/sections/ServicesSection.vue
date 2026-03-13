<script setup lang="ts">
const emit = defineEmits<{
  (event: 'select-service', serviceName: string): void
}>()

const services = [
  {
    name: 'Dental Consultation / Check-up',
    duration: '30 mins',
    price: 'From ₱500',
    description: 'Complete oral check-up with treatment planning and recommendations.',
  },
  {
    name: 'Teeth Cleaning',
    duration: '45 mins',
    price: 'From ₱1,200',
    description: 'Professional cleaning to remove tartar buildup and keep gums healthy.',
  },
  {
    name: 'Tooth Extraction (Bunot)',
    duration: '45-60 mins',
    price: 'From ₱1,000',
    description: 'Safe and gentle extraction with post-care guidance for faster recovery.',
  },
  {
    name: 'Orthodontics / Braces',
    duration: '60 mins',
    price: 'Assessment required',
    description: 'Alignment and bite correction planning for teens and adults.',
  },
  {
    name: 'Root Canal Therapy',
    duration: '60-90 mins',
    price: 'Case-based',
    description: 'Pain-relief focused treatment to save infected or damaged teeth.',
  },
  {
    name: 'Zirconia Crowns',
    duration: 'By appointment',
    price: 'Case-based',
    description: 'Strong and natural-looking crowns for long-term restoration.',
  },
]
</script>

<template>
  <section id="clinic-services" class="bg-white">
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <h2 class="text-3xl font-semibold text-gray-900">Popular Services</h2>
        <p class="mt-3 text-gray-600">
          Inspired by proven clinic booking layouts: show services first, then let patients book in a
          single flow.
        </p>
      </div>

      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.name"
          class="group rounded-2xl border border-gray-200 bg-white p-5 transition-smooth hover:-translate-y-1 hover:shadow-lg"
        >
          <p class="text-xs font-semibold uppercase tracking-wide text-blue-700">{{ service.duration }}</p>
          <h3 class="mt-2 text-lg font-semibold text-gray-900">{{ service.name }}</h3>
          <p class="mt-3 text-sm text-gray-600">{{ service.description }}</p>

          <div class="mt-5 flex items-center justify-between gap-3">
            <p class="text-sm font-medium text-gray-700">{{ service.price }}</p>
            <button
              class="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white"
              @click="emit('select-service', service.name)"
            >
              Book this
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
