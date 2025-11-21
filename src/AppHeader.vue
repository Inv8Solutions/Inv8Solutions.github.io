<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

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
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header class="flex items-center justify-between gap-6 py-6">
        <a href="/" class="text-2xl font-semibold text-blue-600">inv8 Solutions</a>
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
        <button
          class="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/70 transition hover:bg-blue-700"
        >
          Start a Project
        </button>
      </header>
    </div>
  </div>
</template>
