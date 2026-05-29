<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const openStartProjectModal = () => {
  router.push('/contactus')
}

const floatingIcons = [
  {
    name: 'Figma',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    style: 'top:18%; left:7%; --rotate-angle: -8deg;',
    delay: '0s',
  },
  {
    name: 'React',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    style: 'bottom:18%; left:13%; --rotate-angle: -12deg;',
    delay: '0.5s',
  },
  {
    name: 'Notion',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg',
    style: 'top:16%; right:10%; --rotate-angle: 10deg;',
    delay: '1s',
  },
  {
    name: 'Arduino',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg',
    style: 'bottom:16%; right:16%; --rotate-angle: 8deg;',
    delay: '1.5s',
  },
]
</script>

<template>
  <section class="relative overflow-hidden bg-white">
    <!-- Subtle dot grid background -->
    <div
      class="pointer-events-none absolute inset-0"
      style="background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px); background-size: 32px 32px; opacity: 0.35;"
      aria-hidden="true"
    ></div>
    <!-- Radial fade on dot grid -->
    <div
      class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, white 100%);"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto flex max-w-6xl flex-col px-4 pb-28 pt-20 text-gray-900 sm:px-6 lg:px-8">
      <div class="flex flex-1 flex-col items-center text-center">
        <div
          class="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600 animate-fade-in-up"
        >
          <span class="inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          Open for Work
        </div>
        <h1 class="mb-6 max-w-5xl text-4xl font-black leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl animate-fade-in-up animate-delay-200">
          The innovation partner for startups and <span class="text-blue-600">growing businesses.</span>
        </h1>
        <p class="mb-10 max-w-2xl text-lg leading-relaxed text-gray-500 animate-fade-in-up animate-delay-400">
          We help startups and MSMEs validate opportunities, build meaningful solutions, and create lasting value through strategy, design, and engineering.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up animate-delay-600">
          <button
            @click="openStartProjectModal"
            class="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-300/50 transition-smooth hover:bg-blue-700 hover:shadow-xl hover:scale-105"
          >
            Start a Project
          </button>
          <button
            @click="router.push('/services')"
            class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-bold text-gray-700 shadow-sm transition-smooth hover:border-gray-300 hover:shadow-md hover:scale-105"
          >
            Explore Services
            <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      <div
        v-for="icon in floatingIcons"
        :key="icon.name"
        class="absolute rounded-2xl bg-white/95 p-4 shadow-xl shadow-gray-200/90 ring-1 ring-gray-100 animate-float"
        :style="`${icon.style} animation-delay: ${icon.delay};`"
      >
        <img :src="icon.src" :alt="`${icon.name} icon`" class="h-10 w-10" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>
</template>
