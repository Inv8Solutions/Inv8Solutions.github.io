<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { audiences, DEFAULT_AUDIENCE_ID } from '@/data/offers'

defineOptions({ name: 'OffersBody' })

const route = useRoute()
const router = useRouter()

const selectedId  = ref(DEFAULT_AUDIENCE_ID)
const hoveredIdx  = ref(0)

const currentAudience = computed(() => audiences.find(a => a.id === selectedId.value) ?? audiences[0]!)
const currentIndex    = computed(() => audiences.findIndex(a => a.id === selectedId.value))
const activeService   = computed(() => currentAudience.value.services[hoveredIdx.value])

const selectTab = (id: string) => {
  selectedId.value = id
  hoveredIdx.value = 0
}

const accentColor = (index: number) => {
  const colors = [
    { text: 'text-blue-400',   bg: 'bg-blue-500/15',   border: 'border-blue-500',   activeBg: 'bg-blue-500/10',   pill: 'bg-blue-500/20 text-blue-300',   bar: 'bg-blue-500' },
    { text: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500', activeBg: 'bg-purple-500/10', pill: 'bg-purple-500/20 text-purple-300', bar: 'bg-purple-500' },
    { text: 'text-green-400',  bg: 'bg-green-500/15',  border: 'border-green-500',  activeBg: 'bg-green-500/10',  pill: 'bg-green-500/20 text-green-300',  bar: 'bg-green-500' },
  ]
  return colors[index % colors.length]!
}

onMounted(() => {
  const hash = route.hash
  if (hash) {
    const id = hash.replace('#service-', '')
    const match = audiences.find(a => a.id === id)
    if (match) selectedId.value = match.id
    setTimeout(() => {
      document.querySelector('#services-body')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
})

watch(() => route.hash, (hash) => {
  if (hash) {
    const id = hash.replace('#service-', '')
    const match = audiences.find(a => a.id === id)
    if (match) { selectedId.value = match.id; hoveredIdx.value = 0 }
  }
})
</script>

<template>
  <section id="services-body" class="bg-[#03040f] px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">

      <!-- Intro -->
      <div class="mb-16 max-w-3xl">
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Our Approach</p>
        <p class="mt-5 text-lg leading-relaxed text-white/70 sm:text-xl">
          Good ideas deserve good execution. We have sat across the table from hundreds of founders, community leaders,
          and business owners. We know what they need, what they struggle with, and what actually works. Our job is to
          listen first, then build the right thing together.
        </p>
      </div>

      <!-- Audience tabs -->
      <div class="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          v-for="(audience, i) in audiences"
          :key="audience.id"
          @click="selectTab(audience.id)"
          class="flex items-center gap-3 rounded-[16px] border px-5 py-4 text-left transition duration-200"
          :class="selectedId === audience.id
            ? [accentColor(i).border, accentColor(i).activeBg, accentColor(i).text]
            : 'border-white/10 bg-[#0d0f1f] text-white/50 hover:border-white/20 hover:text-white/80'"
        >
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition"
            :class="selectedId === audience.id ? [accentColor(i).bg, accentColor(i).text] : 'bg-white/5 text-white/40'"
          >
            <i :class="[audience.icon, 'text-sm']" aria-hidden="true"></i>
          </div>
          <span class="text-sm font-bold leading-tight">{{ audience.label }}</span>
        </button>
      </div>

      <!-- Content: split layout -->
      <Transition name="tab-fade" mode="out-in">
        <div :key="selectedId" class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:items-start">

          <!-- ── Left: section header + service rows ── -->
          <div>
            <!-- Section header -->
            <div class="mb-6 rounded-[20px] border border-white/[0.07] bg-[#0a0c1c] px-7 py-7">
              <p class="text-xs font-bold uppercase tracking-[0.3em]" :class="accentColor(currentIndex).text">
                {{ currentAudience.sectionHeader }}
              </p>
              <h2 class="mt-3 text-3xl font-black leading-snug tracking-tight text-white sm:text-4xl">
                {{ currentAudience.sectionTagline }}
              </h2>
              <p class="mt-4 max-w-xl text-base leading-relaxed text-white/55">
                {{ currentAudience.sectionIntro }}
              </p>
            </div>

            <!-- Service rows (hover-interactive) -->
            <div class="overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0a0c1c]">
              <div
                v-for="(service, idx) in currentAudience.services"
                :key="service.title"
                class="group relative cursor-default border-b border-white/[0.06] px-7 py-5 last:border-b-0 transition-colors duration-200"
                :class="hoveredIdx === idx ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'"
                @mouseenter="hoveredIdx = idx"
              >
                <!-- Active accent bar -->
                <div
                  class="absolute left-0 top-0 h-full w-0.5 rounded-r-full transition-all duration-300"
                  :class="hoveredIdx === idx ? accentColor(currentIndex).bar : 'bg-transparent'"
                ></div>

                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-4">
                    <!-- Number pill -->
                    <span
                      class="shrink-0 text-sm font-black tabular-nums transition-colors duration-200"
                      :class="hoveredIdx === idx ? accentColor(currentIndex).text : 'text-white/20'"
                    >
                      {{ String(idx + 1).padStart(2, '0') }}
                    </span>
                    <!-- Title -->
                    <span
                      class="text-base font-bold leading-snug transition-colors duration-200 sm:text-lg"
                      :class="hoveredIdx === idx ? 'text-white' : 'text-white/60 group-hover:text-white/80'"
                    >
                      {{ service.title }}
                    </span>
                  </div>
                  <!-- Arrow -->
                  <svg
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    class="h-4 w-4 shrink-0 -rotate-45 transition-all duration-200"
                    :class="hoveredIdx === idx ? accentColor(currentIndex).text : 'text-white/15 group-hover:text-white/30'"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>

                <!-- Description — visible when active -->
                <Transition name="desc-fade">
                  <p
                    v-if="hoveredIdx === idx"
                    class="mt-2.5 pl-9 text-sm leading-relaxed text-white/55"
                  >
                    {{ service.description }}
                  </p>
                </Transition>
              </div>
            </div>

            <!-- CTA strip -->
            <div class="mt-4 flex flex-col items-start justify-between gap-4 rounded-[16px] border border-white/[0.07] bg-[#0d0f1f] px-6 py-4 sm:flex-row sm:items-center">
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                  <i class="fa-regular fa-comment-dots text-sm" aria-hidden="true"></i>
                </div>
                <p class="text-sm text-white/60">
                  Not sure where to start?
                  <span class="text-white/80"> Book a Discovery Sprint and we'll figure it out together.</span>
                </p>
              </div>
              <button
                @click="router.push('/contactus')"
                class="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 hover:scale-105"
              >
                Book a Discovery Sprint
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <!-- ── Right: sticky image panel ── -->
          <div class="hidden lg:block">
            <div class="sticky top-24 overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0a0c1c]">
              <!-- Image area -->
              <div class="relative overflow-hidden" style="aspect-ratio: 4/3;">
                <Transition name="img-swap" mode="out-in">
                  <img
                    :key="hoveredIdx + '-' + selectedId"
                    :src="activeService?.image"
                    :alt="activeService?.title"
                    class="h-full w-full object-cover"
                  />
                </Transition>
                <!-- Bottom gradient -->
                <div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a0c1c] to-transparent"></div>
              </div>

              <!-- Service info -->
              <div class="-mt-6 relative px-6 pb-6">
                <Transition name="info-fade" mode="out-in">
                  <div :key="hoveredIdx + '-' + selectedId">
                    <span
                      class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                      :class="accentColor(currentIndex).pill"
                    >
                      {{ String(hoveredIdx + 1).padStart(2, '0') }} / {{ currentAudience.services.length }}
                    </span>
                    <h3 class="mt-3 text-xl font-black text-white leading-snug">{{ activeService?.title }}</h3>
                    <p class="mt-2 text-xs leading-relaxed text-white/40">
                      <span class="font-semibold uppercase tracking-wider text-white/30">Best for: </span>
                      {{ activeService?.bestFor }}
                    </p>
                  </div>
                </Transition>
              </div>
            </div>
          </div>

        </div>
      </Transition>

    </div>
  </section>
</template>

<style scoped>
.tab-fade-enter-active,
.tab-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.tab-fade-enter-from   { opacity: 0; transform: translateY(6px); }
.tab-fade-leave-to     { opacity: 0; transform: translateY(-6px); }

.desc-fade-enter-active,
.desc-fade-leave-active { transition: opacity 0.2s ease, max-height 0.25s ease; max-height: 200px; overflow: hidden; }
.desc-fade-enter-from,
.desc-fade-leave-to     { opacity: 0; max-height: 0; }

.img-swap-enter-active,
.img-swap-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.img-swap-enter-from   { opacity: 0; transform: scale(1.04); }
.img-swap-leave-to     { opacity: 0; transform: scale(0.97); }

.info-fade-enter-active,
.info-fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.info-fade-enter-from   { opacity: 0; transform: translateY(6px); }
.info-fade-leave-to     { opacity: 0; transform: translateY(-4px); }
</style>
