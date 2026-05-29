<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { offerDetails, DEFAULT_SERVICE_ID } from '@/data/offers'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import imgMockup from '@/assets/services-hero-mockup.png'

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
  <section class="relative min-h-screen overflow-hidden bg-[#03040f] px-4 sm:px-6 lg:px-8">
    <!-- Subtle grid -->
    <div
      class="pointer-events-none absolute inset-0"
      style="background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 60px 60px;"
      aria-hidden="true"
    ></div>
    <!-- Blue glow top-right -->
    <div
      class="pointer-events-none absolute -top-20 right-0 h-[700px] w-[700px] rounded-full opacity-25"
      style="background: radial-gradient(circle, #3b82f6 0%, transparent 65%);"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto flex min-h-screen max-w-7xl items-center">
      <div class="flex w-full flex-col gap-8 py-10 lg:flex-row lg:items-center lg:gap-0">

        <!-- Left: text — takes ~55% -->
        <div class="offers-hero-left lg:w-[55%] lg:pr-12">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            Our Services
          </div>

          <h1 class="text-5xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl xl:text-7xl">
            Solutions built for<br />
            founders and<br />
            <span class="text-blue-500">growing businesses.</span>
          </h1>

          <p class="mt-6 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
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

        </div>

        <!-- Right: hero mockup — takes ~50% -->
        <div class="offers-hero-right relative hidden lg:block lg:w-[50%]">
          <img
            :src="imgMockup"
            alt="inv8 product dashboard and mobile app mockup"
            class="w-full scale-110 object-contain drop-shadow-[0_40px_80px_rgba(59,130,246,0.2)]"
            loading="eager"
          />
        </div>

      </div>
    </div>
  </section>
</template>
