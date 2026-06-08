<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLanguage } from '@/composables/useLanguage'
import img1 from '@/assets/introImage1.png'
import img2 from '@/assets/introImage2.png'
import img3 from '@/assets/introImage5.png'

const router = useRouter()
const { observeElements } = useScrollAnimation()
const { t } = useLanguage()

const openStartProjectModal = () => {
  router.push('/contactus')
}

onMounted(() => {
  observeElements('.wwu-header')
})
</script>

<template>
  <section class="wwu-section relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 py-16">
    <!-- Subtle radial glow -->
    <div
      class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 70%);"
      aria-hidden="true"
    ></div>

    <!-- Content -->
    <div class="wwu-header relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <span class="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
        <span class="inline-block h-2 w-2 rounded-full bg-white"></span>
        {{ t('Work With Us', 'Makipagtulungan sa Amin') }}
      </span>
      <h2 class="mt-4 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
        {{ t('Ready to build something', 'Handa ka na bang bumuo ng isang bagay') }}<br class="hidden sm:block" /> {{ t('that actually works?', 'na talagang gumagana?') }}
      </h2>
      <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100/80">
        {{ t('From idea to launch, we partner with startups and growing businesses to validate, design, and ship products that create real impact.', 'Mula sa ideya hanggang paglulunsad, nakikipagtulungan kami sa mga startup at lumalagong negosyo upang mapatunayan, magdisenyo, at maihatid ang mga produktong lumilikha ng tunay na epekto.') }}
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          @click="openStartProjectModal"
          class="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-lg shadow-blue-900/30 transition hover:bg-blue-50 hover:scale-105"
        >
          {{ t('Start a Project', 'Magsimula ng Proyekto') }}
          <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
        </button>
        <a
          href="https://discord.gg/jngYbhwsa5"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 hover:scale-105"
        >
          <i class="fa-brands fa-discord" aria-hidden="true"></i>
          {{ t('Join Our Community', 'Sumali sa Aming Komunidad') }}
        </a>
      </div>
    </div>

    <!-- Floating screenshots -->
    <div class="relative mx-auto mt-16 max-w-5xl px-4">
      <div class="flex items-end justify-center gap-4">
        <!-- Left card — tilted left -->
        <div
          class="hidden sm:block w-56 overflow-hidden rounded-2xl shadow-2xl shadow-blue-900/40 ring-1 ring-white/10 -rotate-3 translate-y-4 transition duration-500 hover:rotate-0 hover:translate-y-0"
        >
          <img :src="img1" alt="Product preview" class="w-full object-cover" loading="lazy" />
        </div>

        <!-- Center card — prominent -->
        <div
          class="w-72 overflow-hidden rounded-2xl shadow-2xl shadow-blue-900/50 ring-1 ring-white/20 scale-105 z-10 transition duration-500 hover:scale-110"
        >
          <img :src="img2" alt="Product preview" class="w-full object-cover" loading="lazy" />
        </div>

        <!-- Right card — tilted right -->
        <div
          class="hidden sm:block w-56 overflow-hidden rounded-2xl shadow-2xl shadow-blue-900/40 ring-1 ring-white/10 rotate-3 translate-y-4 transition duration-500 hover:rotate-0 hover:translate-y-0"
        >
          <img :src="img3" alt="Product preview" class="w-full object-cover" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>
