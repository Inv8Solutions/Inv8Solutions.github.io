<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'FooterSection',
})

const route = useRoute()
const router = useRouter()

const quickLinks = [
  { name: 'About Us', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Works', path: '/works' },
  { name: 'Contact Us', path: '/contactus' },
]

const services = [
  'UI/UX Design',
  'MVP Development',
  'Innovation Integration',
  'IoT Development',
  'Pitchdeck Design',
  'IP Registration',
]

const policies = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]

const currentYear = new Date().getFullYear()

const isActive = (path: string) => {
  if (path === '/' && route.path === '/') return true
  if (path === '/#contact' && route.hash === '#contact') return true
  if (path === '/contactus' && route.path === '/contactus') return true
  return route.path.startsWith(path) && path !== '/'
}

const navigate = (path: string) => {
  if (path.startsWith('#')) {
    if (route.path === '/') {
      const element = document.querySelector(path)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push({ path: '/', hash: path.substring(1) })
    }
  } else {
    router.push(path)
  }
}
</script>

<template>
  <footer class="bg-[#f6f7fb] text-gray-900">
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div
        class="rounded-[48px] bg-[#090910] px-6 py-10 text-center text-white shadow-[0_30px_60px_rgba(7,9,25,0.55)] sm:px-12 sm:py-16"
      >
        <span
          class="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]"
        >
          <span class="inline-block h-2 w-2 rounded-full bg-[#1675ff]"></span>
          Work with Us
        </span>
        <h2 class="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          Ready to build your next product?
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
          We design and develop solutions that are simple, scalable, and market-ready from day one.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            class="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
          >
            Book a FREE Call
          </button>
          <button
            type="button"
            class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-blue-50"
          >
            Start a Project
          </button>
        </div>
      </div>

      <div
        class="mt-16 grid gap-8 border-t border-gray-200 pt-10 md:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]"
      >
        <div class="space-y-4 text-left">
          <p class="text-2xl font-semibold text-[#1363ff]">inv8 Solutions</p>
          <p class="text-sm text-gray-500">Product design and development studio.</p>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Quick Navigation
          </p>
          <ul class="mt-4 space-y-2 text-sm text-gray-600">
            <li v-for="link in quickLinks" :key="link.name">
              <a
                :href="link.path"
                @click.prevent="navigate(link.path)"
                class="transition hover:text-gray-900 cursor-pointer"
                :class="{
                  'text-blue-600 font-medium': isActive(link.path),
                }"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Services List
          </p>
          <ul class="mt-4 space-y-2 text-sm text-gray-600">
            <li v-for="service in services" :key="service">{{ service }}</li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Get in Touch</p>
          <a class="mt-4 flex items-center gap-3 text-sm text-gray-700" href="mailto:hello@inv8.io">
            <span
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="h-5 w-5"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4 7.75A1.75 1.75 0 0 1 5.75 6h12.5A1.75 1.75 0 0 1 20 7.75v8.5A1.75 1.75 0 0 1 18.25 18H5.75A1.75 1.75 0 0 1 4 16.25z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  d="m5 8 7 5 7-5"
                />
              </svg>
            </span>
            <span class="font-medium">hello@inv8.io</span>
          </a>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ currentYear }} Inv8 Studio. All rights reserved.</p>
        <div class="flex flex-wrap gap-6">
          <a
            v-for="policy in policies"
            :key="policy.label"
            :href="policy.href"
            class="transition hover:text-gray-900"
          >
            {{ policy.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
