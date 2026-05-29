<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const router = useRouter()
const heroBg = '/images/about-hero.jpg'
const { observeElements } = useScrollAnimation()

const openStartProjectModal = () => {
  router.push('/contactus')
}

const valueProps = [
  { icon: 'fa-solid fa-people-group', title: 'Innovation Partner', description: 'We work with you, not just for you.' },
  { icon: 'fa-solid fa-lightbulb', title: 'Strategy-First', description: 'We start with clarity before building.' },
  { icon: 'fa-solid fa-code', title: 'Design + Engineering', description: 'End-to-end execution under one roof.' },
  { icon: 'fa-solid fa-arrow-trend-up', title: 'Impact-Driven', description: 'We build solutions that create real impact.' },
]

onMounted(() => {
  observeElements('.hero-animate')
})
</script>

<template>
  <section aria-labelledby="about-heading" class="relative overflow-hidden bg-white pt-12 pb-24">
    <!-- Subtle background grid -->
    <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-14 lg:flex-row lg:items-stretch">

        <!-- Left -->
        <div class="flex flex-col justify-center lg:w-1/2">
          <div class="hero-animate mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600">
            <span class="inline-block h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            Innovation Partner
          </div>

          <h1 id="about-heading" class="hero-animate animate-delay-100 text-5xl font-black leading-[1.1] tracking-tight text-gray-900 md:text-6xl">
            Your innovation<br />partner from idea<br />
            <span class="text-blue-600">to impact.</span>
          </h1>

          <p class="hero-animate animate-delay-200 mt-6 max-w-md text-lg leading-relaxed text-gray-500">
            We partner with founders, businesses, and organizations to build meaningful digital
            products through strategy, design, and engineering.
          </p>

          <div class="hero-animate animate-delay-300 mt-8 flex flex-wrap gap-3">
            <button
              @click="openStartProjectModal"
              class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-smooth hover:bg-blue-700 hover:scale-105 hover:shadow-blue-300"
            >
              <i class="fa-regular fa-calendar" aria-hidden="true"></i>
              Book a Discovery Call
            </button>
            <button
              @click="router.push('/services')"
              class="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-smooth hover:bg-gray-50 hover:border-gray-400 hover:scale-105"
            >
              <i class="fa-solid fa-play fa-xs" aria-hidden="true"></i>
              Explore Services
            </button>
          </div>

          <!-- Value props -->
          <div class="hero-animate animate-delay-400 mt-12 grid grid-cols-2 gap-5 border-t border-gray-100 pt-8">
            <div v-for="prop in valueProps" :key="prop.title" class="flex items-start gap-3">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <i :class="[prop.icon, 'text-sm']" aria-hidden="true"></i>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ prop.title }}</p>
                <p class="mt-0.5 text-xs leading-relaxed text-gray-500">{{ prop.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Image -->
        <div class="hero-animate animate-delay-200 relative w-full lg:w-1/2">
          <div class="relative min-h-[500px] overflow-hidden rounded-3xl bg-gray-100 shadow-2xl shadow-gray-200/60">
            <img
              :src="heroBg"
              alt="inv8 team collaborating on a product session"
              class="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchpriority="high"
            />
            <!-- Gradient overlay always present -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
            <!-- Placeholder (behind image via z-index) -->
            <div class="absolute inset-0 -z-10 flex flex-col items-center justify-center text-gray-400">
              <i class="fa-solid fa-image text-4xl" aria-hidden="true"></i>
              <p class="mt-2 text-xs">Add /public/images/about-hero.jpg</p>
            </div>
          </div>

          <!-- Floating card -->
          <div class="absolute bottom-6 right-6 flex max-w-[240px] items-start gap-3 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm ring-1 ring-gray-100">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <i class="fa-solid fa-star-of-life text-xs" aria-hidden="true"></i>
            </div>
            <p class="text-xs leading-snug text-gray-700">
              We combine insight, design, and technology to turn possibilities into products people love.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
