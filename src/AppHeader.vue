<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const navLinks = [
  { name: 'About Us', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Works', path: '/works' },
  { name: 'Contact Us', path: '/#contact' },
]

const isActive = (path: string) => {
  if (path === '/' && route.path === '/') return true
  if (path === '/#contact' && route.hash === '#contact') return true
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
  <div class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 shadow-sm">
    <div class="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
      <header class="flex items-center justify-between gap-6 py-6">
        <a href="/" class="text-2xl font-semibold text-blue-600">inv8 Solutions</a>

        <!-- Desktop Navigation -->
        <nav class="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.path"
            @click.prevent="navigate(link.path)"
            class="transition-colors duration-200 cursor-pointer"
            :class="{
              'text-blue-600': isActive(link.path),
              'hover:text-gray-900': !isActive(link.path),
            }"
          >
            {{ link.name }}
          </a>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="flex items-center gap-4">
          <button
            type="button"
            @click="toggleMenu"
            class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 md:hidden"
            :aria-expanded="isMenuOpen"
            :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true" v-if="!isMenuOpen">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
            <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true" v-else>
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <button
            class="hidden rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/70 transition hover:bg-blue-700 md:inline-flex"
          >
            Start a Project
          </button>
        </div>
      </header>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav v-if="isMenuOpen" class="mb-4 rounded-2xl bg-white p-4 shadow-lg md:hidden">
          <ul class="space-y-4">
            <li v-for="link in navLinks" :key="link.name">
              <a
                :href="link.path"
                @click="[navigate(link.path), closeMenu()]"
                class="block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200"
                :class="{
                  'bg-blue-50 text-blue-600': isActive(link.path),
                  'text-gray-700 hover:bg-gray-50': !isActive(link.path),
                }"
              >
                {{ link.name }}
              </a>
            </li>
            <li>
              <button
                class="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/70 transition hover:bg-blue-700"
                @click="[navigate('/#contact'), closeMenu()]"
              >
                Start a Project
              </button>
            </li>
          </ul>
        </nav>
      </Transition>
    </div>
  </div>
</template>
