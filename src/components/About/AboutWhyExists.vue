<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { observeElements } = useScrollAnimation()
const storyImage = '/images/our-story.jpg'

const timeline = [
  {
    period: 'Q4 2025',
    title: 'Recognizing the Gap',
    description: 'We observed recurring challenges across startups, TBIs, universities, and businesses. Great ideas existed, but many lacked the product strategy, validation, and execution needed to succeed.',
    icon: 'fa-regular fa-lightbulb',
  },
  {
    period: 'Early 2026',
    title: 'Supporting Builders',
    description: 'We began working with founders, organizations, and ecosystem partners to help transform concepts into structured, actionable product initiatives.',
    icon: 'fa-solid fa-people-group',
  },
  {
    period: '2026',
    title: 'inv8 Studio Launch',
    description: 'inv8 was formally established as a product design and development studio dedicated to helping startups and MSMEs build meaningful digital products with confidence.',
    icon: 'fa-solid fa-rocket',
  },
  {
    period: 'Future',
    title: 'A Trusted Innovation Partner',
    description: 'Our vision is to become the innovation partner of choice for founders, businesses, universities, and ecosystem organizations across the Philippines and Southeast Asia.',
    icon: 'fa-solid fa-mountain-sun',
  },
]

onMounted(() => {
  observeElements('.story-left')
  observeElements('.story-right')
  observeElements('.timeline-item')
  observeElements('.vm-card')
})
</script>

<template>
  <!-- ── Our Story ─────────────────────────────────────────── -->
  <section aria-labelledby="story-heading" class="bg-white py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Section label -->
      <div class="story-left mb-14 flex flex-col gap-2">
        <span class="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600">
          <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          Our Story
        </span>
        <h2 id="story-heading" class="text-4xl font-black leading-tight text-gray-900 md:text-5xl">
          How <span class="text-blue-600">inv8</span> Started
        </h2>
        <div class="h-1 w-10 rounded-full bg-blue-600"></div>
      </div>

      <div class="flex flex-col gap-12 lg:flex-row lg:items-start">

        <!-- Left: Narrative -->
        <div class="story-left animate-delay-100 flex flex-col gap-4 text-sm leading-relaxed text-gray-500 lg:w-[40%]">
          <p>inv8 started with a simple observation.</p>
          <p>Across startups, universities, incubators, innovation programs, and growing businesses, there was no shortage of ideas. What was often missing was the structure, product thinking, and execution needed to turn those ideas into real outcomes.</p>
          <p>We saw founders building without validation, organizations investing in solutions without clear product direction, and innovation programs producing promising concepts that struggled to move beyond the prototype stage.</p>
          <p>In Q4 2025, we began working with founders, ecosystem builders, and organizations to help bridge this gap.</p>
          <p>By 2026, inv8 became a registered product design and development studio focused on helping startups and MSMEs move from ideas to market-ready solutions through strategy, design, and engineering.</p>
          <p class="font-medium text-gray-700">Today, we work as a trusted innovation partner — helping organizations reduce uncertainty, accelerate execution, and build products that create real impact.</p>
        </div>

        <!-- Right: Image + Timeline -->
        <div class="story-right flex flex-col gap-6 sm:flex-row lg:w-[60%]">
          <!-- Image -->
          <div class="relative min-h-[380px] overflow-hidden rounded-3xl bg-gray-900 shadow-xl sm:flex-1">
            <img
              :src="storyImage"
              alt="inv8 team working on product strategy"
              class="absolute inset-0 h-full w-full object-cover opacity-80"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-6 text-xs font-black uppercase leading-relaxed tracking-widest text-white/70">
              Building<br />Meaningful<br />Products.<br />Creating<br />Real Impact.<br />
              <span class="mt-1 block text-sm text-blue-400">inv8</span>
            </div>
          </div>

          <!-- Timeline -->
          <div class="flex flex-col sm:w-56">
            <div
              v-for="(item, i) in timeline"
              :key="item.period"
              class="timeline-item relative flex gap-3"
              :style="`animation-delay: ${i * 0.1}s`"
            >
              <div class="flex flex-col items-center">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 shadow-sm">
                  <i :class="[item.icon, 'text-[10px]']" aria-hidden="true"></i>
                </div>
                <div v-if="i < timeline.length - 1" class="mt-1 w-px flex-1 bg-gradient-to-b from-blue-200 to-transparent"></div>
              </div>
              <div class="pb-7">
                <p class="text-[11px] font-bold uppercase tracking-wider text-blue-600">{{ item.period }}</p>
                <p class="mt-0.5 text-sm font-bold text-gray-900">{{ item.title }}</p>
                <p class="mt-1 text-xs leading-relaxed text-gray-500">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ── Vision & Mission ──────────────────────────────────── -->
  <section aria-label="Vision and Mission" class="bg-[#0a1628] py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-10 sm:grid-cols-2 sm:gap-6">

        <div class="vm-card flex items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:bg-white/8">
          <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
            <i class="fa-solid fa-mountain-sun text-xl" aria-hidden="true"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-blue-400">Our Vision</p>
            <h3 class="mt-2 text-xl font-black leading-snug text-white">
              To become the leading product design and development studio for early-stage innovation in the Philippines,
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-white/55">
              empowering founders and businesses to build meaningful, market-ready digital products with clarity, speed, and disciplined execution.
            </p>
          </div>
        </div>

        <div class="vm-card animate-delay-100 flex items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:bg-white/8">
          <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
            <i class="fa-solid fa-bullseye text-xl" aria-hidden="true"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-blue-400">Our Mission</p>
            <h3 class="mt-2 text-xl font-black leading-snug text-white">
              To transform ideas into practical, user-centered solutions
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-white/55">
              by integrating strategy, design, and engineering into a lean, evidence-driven process. inv8 delivers market-ready products that help early-stage founders validate their ideas and help businesses modernize with confidence.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
