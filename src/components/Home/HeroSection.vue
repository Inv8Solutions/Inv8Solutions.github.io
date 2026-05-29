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
  <section class="relative overflow-hidden bg-[#03040f]">
    <!-- Blue grid -->
    <div
      class="pointer-events-none absolute inset-0"
      style="background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 60px 60px;"
      aria-hidden="true"
    ></div>
    <!-- Blue glassmorphism glow -->
    <div
      class="pointer-events-none absolute -top-20 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full opacity-20"
      style="background: radial-gradient(circle, #3b82f6 0%, transparent 65%);"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto flex max-w-6xl flex-col px-4 pb-28 pt-28 sm:px-6 lg:px-8">
      <div class="flex flex-1 flex-col items-center text-center">
        <div class="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-bold uppercase tracking-widest text-blue-400 animate-fade-in-up">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          Open for Work
        </div>
        <h1 class="mb-6 max-w-5xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl animate-fade-in-up animate-delay-200">
          The innovation partner for startups and <span class="text-blue-500">growing businesses.</span>
        </h1>
        <p class="mb-10 max-w-2xl text-lg leading-relaxed text-white/50 animate-fade-in-up animate-delay-400">
          We help startups and MSMEs validate opportunities, build meaningful solutions, and create lasting value through strategy, design, and engineering.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up animate-delay-600">
          <button
            @click="openStartProjectModal"
            class="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500 hover:scale-105"
          >
            Start a Project
          </button>
          <button
            @click="router.push('/services')"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 hover:scale-105"
          >
            Explore Services
            <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Floating tech icons -->
    <div class="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      <div
        v-for="icon in floatingIcons"
        :key="icon.name"
        class="absolute rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md animate-float"
        :style="`${icon.style} animation-delay: ${icon.delay};`"
      >
        <img :src="icon.src" :alt="`${icon.name} icon`" class="h-10 w-10 opacity-80" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>
</template>
