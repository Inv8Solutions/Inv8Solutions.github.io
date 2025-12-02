<script setup lang="ts">
import { computed } from 'vue'
import { offerDetails, DEFAULT_SERVICE_ID } from '@/data/offers'
import { Typed } from '@duskmoon/vue3-typed-js'

const props = defineProps<{
  selectedServiceId?: string
}>()

const emit = defineEmits<{
  (e: 'update:selectedServiceId', id: string): void
}>()

const selectedId = computed(() => props.selectedServiceId ?? DEFAULT_SERVICE_ID)

const typingStrings = ['Desirable', 'Viable', 'Feasible', 'Scalable', 'Secure']

const selectService = (id: string) => {
  if (id !== selectedId.value) emit('update:selectedServiceId', id)
}
</script>

<template>
  <section class="bg-[#f5f5f5] px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-5xl">
      <div
        class="rounded-[36px] bg-white px-6 py-14 text-center shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:px-12"
      >
        <div
          class="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-1.5 text-sm font-semibold text-blue-600"
        >
          <span class="h-2 w-2 rounded-full bg-blue-500"></span>
          Our Services
        </div>

        <h1 class="text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
          We build products that are
          <Typed
            :options="{
              strings: typingStrings,
              typeSpeed: 100,
              backSpeed: 50,
              loop: true,
              backDelay: 700,
              showCursor: false,
            }"
            class="inline text-blue-600 font-semibold"
          >
            <span class="typing"></span>
          </Typed>
        </h1>

        <p class="mx-auto mt-4 max-w-3xl text-base text-gray-500 sm:text-lg">
          We help founders and businesses design, build, and launch digital products through a
          process grounded in insight, simplicity, and disciplined execution.
        </p>

        <div class="mx-auto my-8 h-px w-full max-w-7xl bg-gray-200"></div>

        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="offer in offerDetails"
            :key="offer.id"
            type="button"
            class="rounded-full border px-5 py-2 text-sm font-medium transition"
            :class="[
              selectedId === offer.id
                ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300',
            ]"
            @click="selectService(offer.id)"
          >
            {{ offer.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: custom cursor animation if you want it
.typing-cursor {
  display: inline-block;
  width: 3px;
  background-color: currentColor;
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}
*/
</style>
