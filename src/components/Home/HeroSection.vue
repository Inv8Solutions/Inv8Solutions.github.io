<script setup lang="ts">
const navLinks = ["About Us", "Services", "Works", "Contact Us"]

const floatingIcons = [
  {
    name: "Figma",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    style: "top:18%; left:8%; transform: rotate(-8deg);",
  },
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    style: "bottom:15%; left:15%; transform: rotate(-12deg);",
  },
  {
    name: "Notion",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg",
    style: "top:16%; right:12%; transform: rotate(10deg);",
  },
  {
    name: "Arduino",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg",
    style: "bottom:12%; right:18%; transform: rotate(8deg);",
  },
]
</script>

<template>
  <section class="relative overflow-hidden bg-white">
    <div class="mx-auto flex max-w-6xl flex-col px-4 pb-20 pt-8 text-gray-900 sm:px-6 lg:px-8">
      <header class="mb-16 flex items-center justify-between gap-6">
        <p class="text-2xl font-semibold text-blue-600">inv8 Solutions</p>
        <nav class="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
          <a
            v-for="link in navLinks"
            :key="link"
            href="#"
            class="transition hover:text-gray-900"
          >
            {{ link }}
          </a>
        </nav>
        <button class="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/70 transition hover:bg-blue-700">
          Start a Project
        </button>
      </header>

      <div class="flex flex-1 flex-col items-center text-center">
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-600">
          <span class="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
          Open for Work
        </div>
        <h1 class="mb-6 max-w-4xl text-4xl font-semibold leading-tight text-gray-900 md:text-6xl">
          Creating digital products that solve real problems for real people
        </h1>
        <p class="mb-10 max-w-3xl text-lg text-gray-500">
          inv8 is a product design and development studio that turns complex challenges into simple, market-ready digital solutions through clarity, insight, and focused execution.
        </p>
        <button class="rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-300/60 transition hover:bg-blue-700">
          Start a Project
        </button>
      </div>
    </div>

    <div class="pointer-events-none absolute inset-0 hidden md:block">
      <div
        v-for="icon in floatingIcons"
        :key="icon.name"
        class="absolute rounded-2xl bg-white/95 p-4 shadow-xl shadow-gray-200/90 ring-1 ring-gray-100"
        :style="icon.style"
      >
        <img :src="icon.src" :alt="icon.name" class="h-10 w-10" loading="lazy" />
      </div>
    </div>
  </section>
</template>
