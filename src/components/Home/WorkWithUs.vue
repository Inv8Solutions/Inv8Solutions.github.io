<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const router = useRouter()
const { observeElements } = useScrollAnimation()

const openBookingModal = () => {
  // Trigger the footer booking modal by emitting a custom event
  window.dispatchEvent(new CustomEvent('open-booking-modal'))
}

const openStartProjectModal = () => {
  router.push('/contactus')
}

onMounted(() => {
  observeElements('.wwu-card')
})
</script>

<template>
  <section class="bg-[#f6f7fb] px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div
        class="wwu-card rounded-[48px] bg-[#090910] px-6 py-10 text-center text-white shadow-[0_30px_60px_rgba(7,9,25,0.55)] sm:px-12 sm:py-16"
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
            @click="openBookingModal"
            class="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
          >
            Book a FREE Call
          </button>
          <button
            type="button"
            @click="openStartProjectModal"
            class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-blue-50"
          >
            Start a Project
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
