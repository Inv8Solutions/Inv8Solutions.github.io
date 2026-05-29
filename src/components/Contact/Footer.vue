<script setup lang="ts">
const quickLinks = ['About Us', 'Services', 'Works', 'Contact Us']
const serviceList = [
  'UI/UX Design',
  'MVP Development',
  'Innovation Integration',
  'IoT Development',
  'Pitchdeck Design',
  'IP Registration',
]

defineOptions({
  name: 'ContactFooterSection',
})
</script>

<template>
  <footer class="border-t border-white/10 bg-[#03040f] px-4 py-16  sm:px-6 lg:px-8">
    <div class="mx-auto w-full max-w-7xl">
      <div
        class="grid gap-10 pb-10 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] md:gap-12 lg:pb-14"
      >
        <div class="space-y-3">
          <h2 class="text-xl font-black text-white">inv8 Studio</h2>
          <p class="text-sm text-white/45">Product design and development studio.</p>
        </div>

        <div class="space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
            Quick Navigation
          </h3>
          <ul class="space-y-2 text-sm">
            <li v-for="link in quickLinks" :key="link">
              <a href="#" class="transition hover:text-white">{{ link }}</a>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
            Services List
          </h3>
          <ul class="space-y-2 text-sm">
            <li v-for="service in serviceList" :key="service">
              <span>{{ service }}</span>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
            Get in Touch
          </h3>
          <a
            href="mailto:inv8design@gmail.com"
            class="inline-flex items-center gap-2 text-sm font-medium text-gray-900 transition hover:text-white"
          >
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4 text-white/45"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m18.75 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m18.75 0v.243a2.25 2.25 0 0 1-1.03 1.889l-6.75 4.218a2.25 2.25 0 0 1-2.39 0L3.53 8.882a2.25 2.25 0 0 1-1.03-1.889V6.75"
                />
              </svg>
            </span>
            inv8design@gmail.com
          </a>
        </div>
      </div>

      <div
        class="border-t border-gray-200 pt-6 text-sm text-white/45 sm:flex sm:items-center sm:justify-between"
      >
        <p>© 2025 inv8 Studio. All rights reserved.</p>
        <div class="mt-4 flex gap-6 sm:mt-0">
          <a href="#" class="transition hover:text-white">Privacy Policy</a>
          <a href="#" class="transition hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
