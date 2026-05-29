<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { observeElements } = useScrollAnimation()

const problems = [
  { number: '01', title: 'No Technical Co-Founder', description: 'Founders lack the technical capability to build and iterate on their product.' },
  { number: '02', title: 'Agencies Misaligned with Needs', description: 'Solutions are delivered without fully understanding the actual problem.' },
  { number: '03', title: 'SMEs Struggle with Digital Adoption', description: 'Businesses rely on manual processes due to limited access to simple digital systems.' },
  { number: '04', title: 'Building Without Validation', description: 'Products are built based on assumptions instead of real user needs.' },
  { number: '05', title: 'Lack of Structured Growth Systems', description: 'Products launch without clear systems for iteration, acquisition, and scaling.' },
  { number: '06', title: 'Limited Access to Support', description: 'Founders and innovators build with little access to guidance or collaboration.' },
]

onMounted(() => {
  observeElements('.prob-header')
  observeElements('.prob-card')
})
</script>

<template>
  <section aria-labelledby="problems-heading" class="bg-[#03040f] py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="prob-header mx-auto mb-16 max-w-3xl text-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          The Problem We Solve
        </span>
        <h2 id="problems-heading" class="mt-5 text-4xl font-black leading-tight text-white md:text-5xl">
          Most ideas never make it<br class="hidden sm:block" /> to
          <span class="text-blue-400">launch</span>
        </h2>
        <p class="mt-5 text-base leading-relaxed text-white/55">
          Early-stage founders and small businesses have strong ideas but lack the product clarity, technical support, and structured execution needed to bring them to life. inv8 exists to bridge this gap.
        </p>
      </div>

      <!-- Problem cards -->
      <div class="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-[#0d0f1f]/5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(problem, i) in problems"
          :key="problem.number"
          class="prob-card group bg-[#0d0f1f] p-7 transition hover:bg-blue-500/10"
          :style="`animation-delay: ${i * 0.07}s`"
        >
          <p class="text-xs font-bold text-blue-500">{{ problem.number }}</p>
          <h3 class="mt-3 text-base font-bold text-white group-hover:text-blue-700 transition-colors">{{ problem.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-white/55">{{ problem.description }}</p>
        </article>
      </div>

    </div>
  </section>
</template>
