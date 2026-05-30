<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const router = useRouter()
const { observeElements } = useScrollAnimation()

onMounted(() => {
  observeElements('.services-closing-header')
})
</script>

<template>
  <section class="relative overflow-hidden bg-[#03040f] px-4 py-24 sm:px-6 lg:px-8">
    <!-- Top border line -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true"></div>
    <!-- Blue glow bottom-center -->
    <div
      class="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-10"
      style="background: radial-gradient(circle, #3b82f6 0%, transparent 70%);"
      aria-hidden="true"
    ></div>

    <div class="services-closing-header relative mx-auto max-w-3xl text-center">
      <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Get Started</p>

      <h2 class="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
        Not sure where to start?<br />
        <span class="text-blue-500">Book a Discovery Sprint.</span>
      </h2>

      <p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55">
        In one focused session, we listen to where you are, help you identify the most important problem to solve, and give you a clear next step. Whether you continue working with us or not, you walk away with clarity.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          @click="router.push('/contactus')"
          class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500 hover:scale-105"
        >
          Book a Discovery Sprint
          <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
        </button>
      </div>

      <!-- Divider -->
      <div class="mx-auto mt-16 h-px w-24 bg-white/10"></div>

      <p class="mt-10 text-sm font-semibold text-white/40 uppercase tracking-widest">Or just say hello.</p>
      <p class="mt-3 text-base leading-relaxed text-white/50">
        We reply within 24 hours. No scripts, no pressure. Just a real conversation about what you are trying to build.
      </p>
      <a
        href="mailto:inv8design@gmail.com"
        class="mt-4 inline-block text-base font-semibold text-blue-400 transition hover:text-blue-300"
      >
        inv8design@gmail.com
      </a>
    </div>
  </section>
</template>
