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
  <footer class="border-t border-gray-200 bg-white px-4 py-16 text-gray-600 sm:px-6 lg:px-8">
    <div class="mx-auto w-full max-w-7xl">
      <div
        class="grid gap-10 pb-10 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] md:gap-12 lg:pb-14"
      >
        <div class="space-y-3">
          <p class="text-2xl font-semibold text-[#1363ff]">inv8 Solutions</p>
          <p class="text-sm text-gray-500">Product design and development studio.</p>
        </div>

        <div class="space-y-4">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Quick Navigation
          </p>
          <ul class="space-y-2 text-sm">
            <li v-for="link in quickLinks" :key="link">
              <a href="#" class="transition hover:text-gray-900">{{ link }}</a>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Services List
          </p>
          <ul class="space-y-2 text-sm">
            <li v-for="service in serviceList" :key="service">
              <span>{{ service }}</span>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Get in Touch</p>
          <a
            href="mailto:hello@inv8.io"
            class="inline-flex items-center gap-2 text-sm font-medium text-gray-900 transition hover:text-[#1363ff]"
          >
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4 text-gray-500"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m18.75 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m18.75 0v.243a2.25 2.25 0 0 1-1.03 1.889l-6.75 4.218a2.25 2.25 0 0 1-2.39 0L3.53 8.882a2.25 2.25 0 0 1-1.03-1.889V6.75"
                />
              </svg>
            </span>
            hello@inv8.io
          </a>
        </div>
      </div>

      <div
        class="border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex sm:items-center sm:justify-between"
      >
        <p>© 2025 inv8 Studio. All rights reserved.</p>
        <div class="mt-4 flex gap-6 sm:mt-0">
          <a href="#" class="transition hover:text-gray-900">Privacy Policy</a>
          <a href="#" class="transition hover:text-gray-900">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
