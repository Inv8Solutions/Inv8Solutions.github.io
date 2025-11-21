<script setup lang="ts">
defineOptions({
  name: 'StepsSection',
})

const steps = [
  {
    number: '01.',
    title: 'Discover',
    description:
      'We explore the problem space, uncover user needs, and identify the real challenges behind the idea. This gives us clarity on what truly matters.',
  },
  {
    number: '02.',
    title: 'Define',
    description:
      'We refine insights into a clear, focused direction. The key problem is articulated, and the solution strategy becomes sharp and actionable.',
  },
  {
    number: '03.',
    title: 'Develop',
    description:
      'We design and build lean prototypes or MVP features that address the core problem. This stage turns direction into tangible, testable solutions.',
  },
  {
    number: '04.',
    title: 'Deliver',
    description:
      'We launch, validate with real users, and iterate with purpose. Each release strengthens the product and moves it closer to market readiness.',
  },
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
  { name: 'Raspberry Pi', icon: 'fa-brands fa-raspberry-pi' },
  { name: 'Arduino', icon: 'fa-solid fa-infinity' },
  { name: 'Linux', icon: 'fa-brands fa-linux' },
]
</script>

<template>
  <section class="bg-[#050505] py-20 text-white" aria-labelledby="steps-heading">
    <div class="mx-auto max-w-7xl px-4">
      <div class="text-center">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-200"
        >
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-400"></span>
          Our Process
        </div>
        <h2 id="steps-heading" class="mt-6 text-3xl font-semibold text-white md:text-5xl">
          A proven process for
        </h2>
        <p class="mt-2 text-3xl font-semibold text-white/70 md:text-5xl">purposeful innovation</p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="step in steps"
          :key="step.number"
          class="rounded-[28px] border border-white/5 bg-white/5 px-6 py-8 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.8)]"
        >
          <p class="text-sm font-semibold uppercase tracking-wider text-white/60">
            {{ step.number }}
          </p>
          <h3 class="mt-2 text-2xl font-semibold">{{ step.title }}</h3>
          <p class="mt-6 text-sm leading-relaxed text-white/70">{{ step.description }}</p>
        </article>
      </div>

      <div class="mt-12 rounded-[32px] border border-white/5 bg-white/5 px-6 py-5">
        <div
          class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/50"
        >
          <span>Tools we trust to build with clarity</span>
        </div>
        <div class="mt-6 flex flex-wrap items-center gap-6 text-white/70">
          <div
            v-for="tool in tools"
            :key="tool.name"
            class="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl transition-all hover:bg-white/10"
          >
            <i :class="tool.icon" aria-hidden="true"></i>
            <span class="sr-only">{{ tool.name }}</span>
            <span
              class="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              {{ tool.name }}
              <span
                class="absolute bottom-0 left-1/2 -mb-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-800"
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
