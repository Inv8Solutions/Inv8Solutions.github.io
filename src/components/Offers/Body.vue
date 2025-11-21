<script setup lang="ts">
import { computed } from 'vue'
import { offerDetails, DEFAULT_SERVICE_ID, type OfferDetail } from '@/data/offers'

defineOptions({
  name: 'OffersBody',
})
const props = defineProps<{ selectedServiceId?: string }>()

const currentOffer = computed<OfferDetail>(() => {
  const resolvedId = props.selectedServiceId ?? DEFAULT_SERVICE_ID
  const fallbackOffer = offerDetails[0]!
  return offerDetails.find((offer) => offer.id === resolvedId) ?? fallbackOffer
})
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
              class="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/60 transition hover:bg-blue-700"
            >
              Start a Project
            </button>
            <button
              type="button"
              class="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:border-gray-400"
            >
              View Projects
            </button>
          </div>
        </div>

        <div
          class="hidden min-h-[320px] rounded-[32px] border border-gray-100 bg-white shadow-inner md:block"
        >
          <div class="flex h-full items-center justify-center">
            <div class="h-40 w-40 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100"></div>
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
</template>
