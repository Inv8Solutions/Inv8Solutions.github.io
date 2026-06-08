<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useLanguage } from '@/composables/useLanguage'

defineOptions({
  name: 'AppHeader',
})

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const { isDark, toggleTheme } = useTheme()
const { t } = useLanguage()

const navLinks = computed(() => [
  { name: t('Home', 'Home'), path: '/' },
  { name: t('About Us', 'Tungkol sa Amin'), path: '/about' },
  { name: t('Services', 'Mga Serbisyo'), path: '/services' },
  { name: t('Works', 'Mga Gawa'), path: '/works' },
  { name: t('Blog', 'Blog'), path: '/blog' },
  { name: t('Contact', 'Makipag-ugnayan'), path: '/contactus' },
])

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
    // Close mobile menu if open
    if (isMenuOpen.value) {
      isMenuOpen.value = false
    }
    router.push(path)
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
const handleOpenProjectModalEvent = () => {
  navigate('/contactus')
}

onMounted(() => {
  window.addEventListener('open-start-project-modal', handleOpenProjectModalEvent)
})

onUnmounted(() => {
  window.removeEventListener('open-start-project-modal', handleOpenProjectModalEvent)
})
</script>

<template>
  <div class="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#07090f]">
    <div class="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
      <header class="flex items-center justify-between gap-6 py-6">
        <a href="/" class="text-xl font-black text-white tracking-tight">inv8 Studio</a>

        <!-- Desktop Navigation -->
        <nav class="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.path"
            @click.prevent="navigate(link.path)"
            class="transition-colors duration-200 cursor-pointer hover:text-white"
            :class="{ 'text-blue-400 font-semibold': isActive(link.path) }"
          >
            {{ link.name }}
          </a>
        </nav>

        <!-- Theme toggle + Mobile Menu Button -->
        <div class="flex items-center gap-3">
          <!-- Dark/Light toggle -->
          <button
            type="button"
            @click="toggleTheme"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <path stroke-linecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          </button>

          <button
            type="button"
            @click="toggleMenu"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:bg-white/10 hover:text-white md:hidden"
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
            @click="navigate('/contactus')"
            class="hidden rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500 hover:scale-105 md:inline-flex"
          >
            {{ t('Start a Project', 'Magsimula ng Proyekto') }}
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
        <nav v-if="isMenuOpen" class="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f1f] p-4 md:hidden">
          <ul class="space-y-1">
            <li v-for="link in navLinks" :key="link.name">
              <a
                :href="link.path"
                @click="[navigate(link.path), closeMenu()]"
                class="block rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200"
                :class="{
                  'bg-blue-500/10 text-blue-400': isActive(link.path),
                  'text-white/60 hover:bg-white/5 hover:text-white': !isActive(link.path),
                }"
              >
                {{ link.name }}
              </a>
            </li>
            <li class="pt-2">
              <button
                @click="[navigate('/contactus'), closeMenu()]"
                class="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                {{ t('Start a Project', 'Magsimula ng Proyekto') }}
              </button>
            </li>
          </ul>
        </nav>
      </Transition>
    </div>
  </div>
</template>
