<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { observeElements } = useScrollAnimation()

const steps = [
  { number: '01', title: 'Discover', description: 'We explore the problem space, uncover user needs, and identify the real challenges behind the idea. This gives us clarity on what truly matters.' },
  { number: '02', title: 'Define', description: 'We refine insights into a clear, focused direction. The key problem is articulated, and the solution strategy becomes sharp and actionable.' },
  { number: '03', title: 'Develop', description: 'We design and build lean prototypes or MVP features that address the core problem. This stage turns direction into tangible, testable solutions.' },
  { number: '04', title: 'Deliver', description: 'We launch, validate with real users, and iterate with purpose. Each release strengthens the product and moves it closer to market readiness.' },
]

const tools = [
  { name: 'Figma', icon: 'fa-brands fa-figma' },
  { name: 'Notion', icon: 'fa-brands fa-notion' },
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'CSS3', icon: 'fa-brands fa-css3' },
  { name: 'TailwindCSS', icon: 'fa-solid fa-wind' },
  { name: 'VueJS', icon: 'fa-brands fa-vuejs' },
  { name: 'NextJS', icon: 'fa-solid fa-n' },
  { name: 'Vaadin', icon: 'fa-brands fa-vaadin' },
  { name: 'Git', icon: 'fa-brands fa-git-alt' },
  { name: 'Android', icon: 'fa-brands fa-android' },
  { name: 'Python', icon: 'fa-brands fa-python' },
  { name: 'Java', icon: 'fa-brands fa-java' },
]

onMounted(() => {
  observeElements('.process-header')
  observeElements('.process-card')
  observeElements('.tools-row')
})
</script>

<template>
  <section aria-labelledby="process-heading" class="bg-[#050505] py-24 text-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="process-header mb-14 text-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300">
          <span class="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
          Our Process
        </span>
        <h2 id="process-heading" class="mt-5 text-4xl font-black leading-tight text-white md:text-5xl">
          A proven process for
          <span class="text-white/50">purposeful innovation</span>
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50">
          Every engagement follows a disciplined four-step framework built to reduce risk, accelerate learning, and ship products that work.
        </p>
      </div>

      <!-- Step cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(step, i) in steps"
          :key="step.number"
          class="process-card group flex flex-col rounded-[28px] border border-white/5 bg-white/[0.04] p-7 transition hover:bg-white/[0.08] hover:-translate-y-1 hover:border-blue-500/20"
          :style="`animation-delay: ${i * 0.1}s`"
        >
          <span class="text-xs font-bold uppercase tracking-widest text-blue-500/80">{{ step.number }}</span>
          <h3 class="mt-3 text-2xl font-black text-white">{{ step.title }}</h3>
          <div class="mt-2 h-px w-8 rounded-full bg-blue-600 transition-all group-hover:w-12"></div>
          <p class="mt-5 text-sm leading-relaxed text-white/55 flex-1">{{ step.description }}</p>
        </article>
      </div>

      <!-- Tools -->
      <div class="tools-row mt-10 rounded-3xl border border-white/5 bg-white/[0.03] px-7 py-6">
        <p class="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">Tools we trust to build with clarity</p>
        <div class="mt-5 flex flex-wrap items-center gap-4">
          <div
            v-for="tool in tools"
            :key="tool.name"
            class="group/t relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-white/60 transition hover:bg-white/10 hover:scale-110 hover:border-white/20 hover:text-white"
          >
            <i :class="tool.icon" aria-hidden="true"></i>
            <span class="sr-only">{{ tool.name }}</span>
            <span class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition group-hover/t:opacity-100">
              {{ tool.name }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
