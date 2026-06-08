<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { audiences, audiencesFil } from '@/data/offers'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLanguage } from '@/composables/useLanguage'
import { computed } from 'vue'

const { t, lang } = useLanguage()
const activeAudiences = computed(() => lang.value === 'fil' ? audiencesFil : audiences)

defineOptions({ name: 'FeaturesSection' })

const router = useRouter()
const { observeElements } = useScrollAnimation()

const activeAudience = ref(audiences[0]!.id)

const palette = [
  {
    badge:    'bg-blue-500/10 border-blue-500/30 text-blue-400',
    icon:     'bg-blue-500/10 text-blue-400',
    bar:      'bg-blue-500',
    check:    'text-blue-400',
    tab:      'border-blue-500 bg-blue-500/10 text-blue-400',
    hover:    'hover:border-blue-500/30',
    btn:      'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30',
  },
  {
    badge:    'bg-purple-500/10 border-purple-500/30 text-purple-400',
    icon:     'bg-purple-500/10 text-purple-400',
    bar:      'bg-purple-500',
    check:    'text-purple-400',
    tab:      'border-purple-500 bg-purple-500/10 text-purple-400',
    hover:    'hover:border-purple-500/30',
    btn:      'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30',
  },
  {
    badge:    'bg-green-500/10 border-green-500/30 text-green-400',
    icon:     'bg-green-500/10 text-green-400',
    bar:      'bg-green-500',
    check:    'text-green-400',
    tab:      'border-green-500 bg-green-500/10 text-green-400',
    hover:    'hover:border-green-500/30',
    btn:      'bg-green-600 hover:bg-green-500 shadow-green-600/30',
  },
]

const currentIdx  = () => activeAudiences.value.findIndex(a => a.id === activeAudience.value)
const current     = () => activeAudiences.value.find(a => a.id === activeAudience.value)!
const currentPal  = () => palette[currentIdx() % palette.length]!

onMounted(() => {
  observeElements('.features-header')
  observeElements('.feature-card')
})
</script>

<template>
  <section class="bg-[#03040f] px-4 py-24 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">

      <!-- Header -->
      <div class="features-header mb-12 text-center">
        <div class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
          {{ t('Our Services', 'Aming mga Serbisyo') }}
        </div>
        <h2 class="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
          {{ t('End-to-end solutions', 'Kumpletong solusyon') }}<br />{{ t('for every stage of', 'para sa bawat yugto ng') }} <span class="text-blue-500">{{ t('innovation.', 'inobasyon.') }}</span>
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/50">
          {{ t('From strategy and design to development and growth, we help startups and businesses build meaningful digital products.', 'Mula sa estratehiya at disenyo hanggang pagbuo at paglago, tinutulungan namin ang mga startup at negosyo na lumikha ng makabuluhang digital na produkto.') }}
        </p>
      </div>

      <!-- Audience tab switcher -->
      <div class="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          v-for="(audience, i) in activeAudiences"
          :key="audience.id"
          @click="activeAudience = audience.id"
          class="flex items-center gap-3 rounded-2xl border px-5 py-4 text-left transition duration-200"
          :class="activeAudience === audience.id
            ? [palette[i % palette.length]!.tab, 'border']
            : 'border-white/10 bg-[#0d0f1f] text-white/50 hover:border-white/20 hover:text-white/80'"
        >
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition"
            :class="activeAudience === audience.id
              ? palette[i % palette.length]!.icon
              : 'bg-white/5 text-white/40'"
          >
            <i :class="[audience.icon, 'text-sm']" aria-hidden="true"></i>
          </div>
          <span class="text-sm font-bold leading-tight">{{ audience.label }}</span>
        </button>
      </div>

      <!-- Active audience panel -->
      <Transition name="panel-fade" mode="out-in">
        <div :key="activeAudience" class="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">

          <!-- Service list -->
          <div class="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0a0c1c]">
            <!-- Panel header -->
            <div class="border-b border-white/[0.06] px-7 py-6">
              <p class="text-xs font-bold uppercase tracking-[0.25em]" :class="currentPal().check">
                {{ current().sectionHeader }}
              </p>
              <h3 class="mt-2 text-xl font-black text-white leading-snug">
                {{ current().sectionTagline }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-white/50 max-w-lg">
                {{ current().sectionIntro }}
              </p>
            </div>

            <!-- Service rows -->
            <div>
              <div
                v-for="(service, idx) in current().services"
                :key="service.title"
                class="group flex items-start gap-4 border-b border-white/[0.05] px-7 py-4 last:border-b-0 transition hover:bg-white/[0.02]"
              >
                <!-- Number -->
                <span class="shrink-0 pt-0.5 text-sm font-black tabular-nums text-white/20 group-hover:text-white/40 transition">
                  {{ String(idx + 1).padStart(2, '0') }}
                </span>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-white/80 group-hover:text-white transition text-sm leading-snug">
                    {{ service.title }}
                  </p>
                  <p class="mt-0.5 text-xs leading-relaxed text-white/40 line-clamp-2">
                    {{ service.description }}
                  </p>
                </div>
                <!-- Arrow -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  class="h-3.5 w-3.5 shrink-0 mt-1 -rotate-45 text-white/15 group-hover:text-white/40 transition">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Right: featured image of first service + CTA -->
          <div class="flex flex-col gap-5">
            <!-- Image card -->
            <div class="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0a0c1c] flex-1">
              <div class="relative overflow-hidden" style="aspect-ratio: 4/3;">
                <img
                  :src="current().services[0]?.image"
                  :alt="current().services[0]?.title"
                  class="h-full w-full object-cover transition duration-500"
                />
                <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0c1c] to-transparent"></div>
              </div>
              <div class="px-5 pb-5 -mt-4 relative">
                <span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border"
                  :class="currentPal().badge">
                  {{ current().services.length }} {{ t('services', 'serbisyo') }}
                </span>
                <p class="mt-2 text-sm font-bold text-white leading-snug">{{ current().services[0]?.title }}</p>
              </div>
            </div>

            <!-- CTA card -->
            <div class="rounded-[20px] border border-white/[0.07] bg-[#0d0f1f] p-5">
              <p class="text-sm font-semibold text-white/80 leading-snug">
                {{ t(`Ready to explore what we can do for your ${current().label.split(' ')[0]}?`, `Handa ka na bang tuklasin kung ano ang magagawa namin para sa iyong ${current().label.split(' ')[0]}?`) }}
              </p>
              <p class="mt-1.5 text-xs text-white/45 leading-relaxed">
                {{ t('Browse the full list or book a discovery sprint to find the right fit.', 'Tingnan ang buong listahan o mag-book ng discovery sprint para mahanap ang pinakaangkop.') }}
              </p>
              <div class="mt-4 flex flex-col gap-2">
                <button
                  @click="router.push(`/services#service-${activeAudience}`)"
                  class="w-full rounded-full py-2.5 text-sm font-bold text-white transition hover:scale-105 shadow-lg"
                  :class="currentPal().btn"
                >
                  {{ t(`View all ${current().label} services`, `Tingnan lahat ng serbisyo para sa ${current().label}`) }}
                </button>
                <button
                  @click="router.push('/contactus')"
                  class="w-full rounded-full border border-white/15 py-2.5 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  {{ t('Book a Discovery Sprint', 'Mag-book ng Discovery Sprint') }}
                </button>
              </div>
            </div>
          </div>

        </div>
      </Transition>

    </div>
  </section>
</template>

<style scoped>
.panel-fade-enter-active,
.panel-fade-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.panel-fade-enter-from   { opacity: 0; transform: translateY(6px); }
.panel-fade-leave-to     { opacity: 0; transform: translateY(-4px); }

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
