<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const router = useRouter()
const { observeElements } = useScrollAnimation()

const scrollToServices = () => {
  document.querySelector('#services-body')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  observeElements('.offers-hero-left')
})
</script>

<template>
  <section class="relative overflow-hidden bg-[#03040f] px-4 pb-20 pt-32 sm:px-6 lg:px-8">
    <!-- Subtle grid -->
    <div
      class="pointer-events-none absolute inset-0"
      style="background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 60px 60px;"
      aria-hidden="true"
    ></div>
    <!-- Blue glow top-right -->
    <div
      class="pointer-events-none absolute -top-20 right-0 h-[600px] w-[600px] rounded-full opacity-20"
      style="background: radial-gradient(circle, #3b82f6 0%, transparent 65%);"
      aria-hidden="true"
    ></div>

    <div class="offers-hero-left relative mx-auto max-w-4xl text-center">
      <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
        inv8 Studio
      </div>

      <h1 class="text-5xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl xl:text-7xl">
        We help builders turn<br />
        <span class="text-blue-500">good ideas into real things.</span>
      </h1>

      <p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
        inv8 Studio is a product design and innovation studio. We work with founders, organizations, and small businesses to design, build, and grow with purpose.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          @click="router.push('/contactus')"
          class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500 hover:scale-105"
        >
          Book a Discovery Sprint
          <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
        </button>
        <button
          @click="$router.push('/works')"
          class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10 hover:scale-105"
        >
          See Our Work
        </button>
      </div>
    </div>
  </section>
</template>
