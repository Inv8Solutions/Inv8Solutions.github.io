<script setup lang="ts">
const companies = [
  { name: 'Logoipsum', icon: 'circle' },
  { name: 'Logoipsum', icon: 'burst' },
  { name: 'Logoipsum', icon: 'wordmark' },
  { name: 'Logoipsum', icon: 'wave' },
  { name: 'Logoipsum', icon: 'chat' },
]
</script>

<template>
  <section class="bg-white py-24 min-h-[720px] flex flex-col justify-center">
    <div class="mx-auto w-full max-w-7xl px-4">
      <div class="text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
          Companies we&apos;ve worked with
        </p>
        <div
          class="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        />
      </div>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-10 text-gray-500 md:gap-16">
        <div
          v-for="company in companies"
          :key="company.icon"
          class="flex items-center gap-3 text-base font-semibold tracking-tight text-gray-500"
        >
          <span
            class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-400 shadow-sm"
          >
            <svg v-if="company.icon === 'circle'" viewBox="0 0 24 24" class="h-6 w-6 fill-current">
              <circle cx="12" cy="12" r="6" />
            </svg>
            <svg
              v-else-if="company.icon === 'burst'"
              viewBox="0 0 24 24"
              class="h-6 w-6 fill-current"
            >
              <path d="M12 2l2.1 4.8 5.2.4-3.9 3.4 1.2 5-4.6-2.6-4.6 2.6 1.2-5-3.9-3.4 5.2-.4z" />
            </svg>
            <svg
              v-else-if="company.icon === 'wordmark'"
              viewBox="0 0 120 24"
              class="h-6 w-14 fill-current"
            >
              <rect x="4" y="10" width="20" height="4" rx="2" />
              <rect x="32" y="10" width="20" height="4" rx="2" />
              <rect x="60" y="10" width="20" height="4" rx="2" />
              <rect x="88" y="10" width="20" height="4" rx="2" />
            </svg>
            <svg
              v-else-if="company.icon === 'wave'"
              viewBox="0 0 48 24"
              class="h-6 w-12 fill-none stroke-current"
            >
              <path
                d="M2 12c5-8 9 8 14 0s9-8 14 0 9 8 14 0"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" class="h-6 w-6 fill-current">
              <path d="M19 4H5a2 2 0 00-2 2v7a2 2 0 002 2h3v4l4-4h7a2 2 0 002-2V6a2 2 0 00-2-2z" />
            </svg>
          </span>
          <span>Logoipsum</span>
        </div>
      </div>
    </div>
  </section>
</template>
