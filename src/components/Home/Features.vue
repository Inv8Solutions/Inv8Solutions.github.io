<script setup lang="ts">
defineOptions({
  name: 'FeaturesSection',
})
const features = [
  {
    title: 'UI/UX Design',
    description:
      'We design intuitive, user-centered interfaces that bring clarity to complex ideas. Our process focuses on usability, simplicity, and creating experiences that feel natural from day one.',
  },
  {
    title: 'MVP Development',
    description:
      'We build lean, functional MVPs that turn early ideas into working products fast. Our approach prioritizes essential features, clean architecture, and real-world validation from the very first release.',
  },
  {
    title: 'Innovation for SMEs',
    description:
      'We modernize business operations by identifying inefficiencies and designing practical digital solutions. Our work streamlines workflows, reduces manual effort, and helps teams operate with greater clarity and control.',
  },
  {
    title: 'IoT Development',
    description:
      'We create reliable, scalable IoT systems that connect devices, data, and environments seamlessly. Our process integrates hardware, software, and cloud technologies to deliver solutions that perform consistently in real-world conditions.',
  },
  {
    title: 'Pitchdeck Design',
    description:
      'We craft clear, compelling pitch decks that communicate your vision with precision. Our approach focuses on structure, storytelling, and visuals that help founders present their product with confidence.',
  },
  {
    title: 'Intellectual Property Registration',
    description:
      "We support founders in securing their IP through a trusted partner specializing in trademarks, patents, and design protection. It reduces friction in the process, ensuring you're guided by experts from filing to approval.",
  },
]
</script>

<template>
  <section class="bg-white py-20" aria-labelledby="features-heading">
    <div class="mx-auto max-w-6xl px-4" :aria-describedby="'features-intro'">
      <div class="text-center">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-600"
        >
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
          What We Do
        </div>
        <h2 id="features-heading" class="mt-6 text-3xl font-semibold text-gray-900 md:text-5xl">
          We help founders launch faster
        </h2>
        <p class="mt-2 text-2xl font-light text-gray-500 md:text-4xl">
          and help businesses operate smarter.
        </p>
      </div>

      <div class="mt-12 grid gap-8 md:grid-cols-2">
        <article
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.5)]"
        >
          <div
            class="rounded-3xl bg-gradient-to-b from-gray-100 to-gray-50 px-4 pb-[55%] pt-6"
          ></div>

          <div class="mt-6 flex items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ feature.title }}</h3>
            </div>
            <button
              type="button"
              class="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-gray-300 hover:text-gray-900"
              aria-label="Learn more"
            >
              <svg
                viewBox="0 0 24 24"
                class="h-5 w-5 transition group-hover:translate-x-0.5"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.25 12a.75.75 0 01.75-.75h10.19l-2.72-2.72a.75.75 0 111.06-1.06l4 4a.75.75 0 010 1.06l-4 4a.75.75 0 11-1.06-1.06l2.72-2.72H6a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-gray-500">
            {{ feature.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
