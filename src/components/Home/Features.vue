<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { offerDetails } from '@/data/offers'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

defineOptions({ name: 'FeaturesSection' })

const router = useRouter()
const { observeElements } = useScrollAnimation()

const accentColor = (index: number) => {
  const colors = [
    { text: 'text-blue-400', bg: 'bg-blue-500/15', number: 'text-blue-500/40', learnMore: 'text-blue-400 hover:text-blue-300' },
    { text: 'text-purple-400', bg: 'bg-purple-500/15', number: 'text-purple-500/40', learnMore: 'text-purple-400 hover:text-purple-300' },
    { text: 'text-green-400', bg: 'bg-green-500/15', number: 'text-green-500/40', learnMore: 'text-green-400 hover:text-green-300' },
    { text: 'text-yellow-400', bg: 'bg-yellow-500/15', number: 'text-yellow-500/40', learnMore: 'text-yellow-400 hover:text-yellow-300' },
  ]
  return colors[index % colors.length]!
}

const goToService = (id: string) => {
  router.push(`/services#service-${id}`)
}

onMounted(() => {
  observeElements('.feature-card')
  observeElements('.features-header')
})
</script>

<template>
  <section class="bg-[#03040f] px-4 py-20 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">

      <!-- Header -->
      <div class="features-header mb-10 text-center">
        <div class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
          Our Services
        </div>
        <h2 class="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
          End-to-end solutions<br />for every stage of <span class="text-blue-500">innovation.</span>
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/50">
          From strategy and design to development and growth,
          we help startups and businesses build meaningful digital products.
        </p>
      </div>

      <!-- 4 service cards -->
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(offer, index) in offerDetails"
          :key="offer.id"
          class="feature-card group flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0f1f] transition duration-300 cursor-pointer hover:border-white/20 hover:bg-[#111327]"
          :style="`animation-delay: ${index * 0.08}s`"
          @click="goToService(offer.id)"
        >
          <!-- Service image -->
          <div class="relative h-48 overflow-hidden bg-[#080a18]">
            <img
              v-if="offer.image"
              :src="offer.image"
              :alt="offer.label"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0d0f1f] via-transparent to-transparent"></div>
          </div>

          <div class="flex flex-1 flex-col p-5">
            <div class="mb-3 flex items-center justify-between">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl"
                :class="[accentColor(index).bg, accentColor(index).text]"
              >
                <i :class="[offer.heroIcon, 'text-sm']" aria-hidden="true"></i>
              </div>
              <span class="text-xl font-black" :class="accentColor(index).number">
                {{ (index + 1).toString().padStart(2, '0') }}
              </span>
            </div>
            <h3 class="text-lg font-black leading-snug text-white">{{ offer.label }}</h3>
            <p class="mt-1.5 flex-1 text-sm leading-relaxed text-white/50">{{ offer.blurb }}</p>
            <button
              type="button"
              @click.stop="goToService(offer.id)"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition duration-200"
              :class="accentColor(index).learnMore"
            >
              Learn more
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </article>
      </div>

      <!-- View all services CTA -->
      <div class="mt-10 text-center">
        <button
          @click="router.push('/services')"
          class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 hover:scale-105"
        >
          View all services
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

    </div>
  </section>
</template>
