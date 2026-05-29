<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { offerDetails, DEFAULT_SERVICE_ID } from '@/data/offers'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import imgPhone from '@/assets/introImage3.png'
import imgDashboard from '@/assets/introImage4.png'
import imgCard from '@/assets/introImage6.png'

const { observeElements } = useScrollAnimation()

const props = defineProps<{
  selectedServiceId?: string
}>()

const emit = defineEmits<{
  (e: 'update:selectedServiceId', id: string): void
}>()

const selectedId = computed(() => props.selectedServiceId ?? DEFAULT_SERVICE_ID)

const selectService = (id: string) => {
  if (id !== selectedId.value) emit('update:selectedServiceId', id)
}

const scrollToServices = () => {
  document.querySelector('#services-body')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  observeElements('.offers-hero-left')
  observeElements('.offers-hero-right')
})
</script>

<template>
  <section class="relative overflow-hidden bg-[#03040f] px-4 pt-24 pb-0 sm:px-6 lg:px-8">
    <!-- Subtle grid -->
    <div
      class="pointer-events-none absolute inset-0"
      style="background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 60px 60px;"
      aria-hidden="true"
    ></div>
    <!-- Blue glow top-right -->
    <div
      class="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full opacity-20"
      style="background: radial-gradient(circle, #3b82f6 0%, transparent 70%);"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto max-w-7xl">
      <div class="flex flex-col items-center gap-16 lg:flex-row lg:items-end">

        <!-- Left: text -->
        <div class="offers-hero-left flex-1 pb-24">
          <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            Our Services
          </div>

          <h1 class="text-5xl font-black leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
            Solutions built for<br />
            founders and<br />
            <span class="text-blue-500">growing businesses.</span>
          </h1>

          <p class="mt-6 max-w-lg text-lg leading-relaxed text-white/55">
            From validating ideas to building products and modernizing operations, inv8 helps startups and MSMEs move from uncertainty to execution.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <button
              @click="scrollToServices"
              class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500 hover:scale-105"
            >
              Explore Our Services
              <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
            </button>
            <button
              @click="$router.push('/works')"
              class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10 hover:scale-105"
            >
              <i class="fa-solid fa-play fa-xs" aria-hidden="true"></i>
              How We Work
            </button>
          </div>

          <!-- Service filter pills -->
          <div class="mt-14 border-t border-white/10 pt-8">
            <p class="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Browse by service</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="offer in offerDetails"
                :key="offer.id"
                type="button"
                class="rounded-full border px-4 py-1.5 text-xs font-semibold transition-smooth hover:scale-105"
                :class="[
                  selectedId === offer.id
                    ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-900/40'
                    : 'border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white',
                ]"
                @click="selectService(offer.id)"
              >
                {{ offer.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right: floating mockups -->
        <div class="offers-hero-right relative hidden lg:flex lg:w-[520px] lg:shrink-0 lg:items-end">
          <!-- Background dashboard -->
          <div class="relative w-full overflow-hidden rounded-t-3xl shadow-2xl shadow-blue-900/30 ring-1 ring-white/10">
            <img
              :src="imgDashboard"
              alt="Dashboard product preview"
              class="w-full object-cover"
              loading="eager"
            />
            <!-- fade bottom into background -->
            <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#03040f] to-transparent"></div>
          </div>

          <!-- Floating phone -->
          <div class="absolute -left-12 bottom-16 w-44 overflow-hidden rounded-3xl shadow-2xl shadow-black/60 ring-1 ring-white/10">
            <img :src="imgPhone" alt="Mobile app preview" class="w-full object-cover" loading="lazy" />
          </div>

          <!-- Floating card top-right -->
          <div class="absolute -right-6 top-12 w-52 overflow-hidden rounded-2xl bg-white/5 p-0 shadow-xl shadow-black/50 ring-1 ring-white/10 backdrop-blur-sm">
            <img :src="imgCard" alt="Project card preview" class="w-full object-cover rounded-2xl" loading="lazy" />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
