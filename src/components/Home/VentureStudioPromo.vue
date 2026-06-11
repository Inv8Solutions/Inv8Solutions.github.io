<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLanguage } from '@/composables/useLanguage'

const router = useRouter()
const { observeElements } = useScrollAnimation()
const { t } = useLanguage()

onMounted(() => {
  observeElements('.vs-promo-animate')
})
</script>

<template>
  <section class="relative overflow-hidden bg-[#03040f] py-24">
    <!-- Grid bg -->
    <div class="pointer-events-none absolute inset-0" style="background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 60px 60px;" aria-hidden="true"></div>
    <!-- Blue glow bottom-right -->
    <div class="pointer-events-none absolute -bottom-32 right-0 h-[500px] w-[500px] rounded-full opacity-20" style="background: radial-gradient(circle, #3b82f6 0%, transparent 65%);" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-[#0a0f2e] via-[#0d0f1f] to-[#07091a]" style="box-shadow: 0 0 60px rgba(59,130,246,0.08);">
        <div class="flex flex-col gap-0 lg:flex-row">

          <!-- Left: content -->
          <div class="flex flex-col justify-center px-10 py-14 lg:w-1/2 lg:px-14">

            <div class="vs-promo-animate mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
              <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
              {{ t('inv8 Venture Studio', 'inv8 Venture Studio') }}
            </div>

            <h2 class="vs-promo-animate animate-delay-100 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              {{ t('We don\'t just build', 'Hindi lang kami nagtatayo') }}<br />
              {{ t('products.', 'ng mga produkto.') }}<br />
              <span class="text-blue-400">{{ t('We build companies.', 'Nagtatayo kami ng mga kumpanya.') }}</span>
            </h2>

            <p class="vs-promo-animate animate-delay-200 mt-5 max-w-md text-base leading-relaxed text-white/50">
              {{ t(
                'For selected founders and ventures, inv8 goes beyond services. We partner through equity, revenue-sharing, or hybrid models to build alongside you from idea to market.',
                'Para sa mga piling founder at venture, ang inv8 ay higit pa sa mga serbisyo. Nakikipagtulungan kami sa pamamagitan ng equity, revenue-sharing, o hybrid na mga modelo para magtayo kasabay mo mula sa ideya hanggang sa merkado.'
              ) }}
            </p>

            <!-- 3 pillars -->
            <div class="vs-promo-animate animate-delay-300 mt-8 grid grid-cols-3 gap-4 border-t border-white/8 pt-8">
              <div v-for="pillar in [
                { icon: 'fa-solid fa-compass-drafting', label: t('Product Strategy', 'Product Strategy') },
                { icon: 'fa-solid fa-pen-ruler',        label: t('Design & Build',   'Disenyo at Pagtatayo') },
                { icon: 'fa-solid fa-handshake',        label: t('Equity Models',    'Mga Modelo ng Equity') },
              ]" :key="pillar.label" class="flex flex-col items-center gap-2 text-center">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10 text-blue-400">
                  <i :class="pillar.icon" class="text-sm"></i>
                </div>
                <p class="text-xs font-semibold text-white/60">{{ pillar.label }}</p>
              </div>
            </div>

            <!-- CTAs -->
            <div class="vs-promo-animate animate-delay-400 mt-8 flex flex-wrap gap-3">
              <button
                @click="router.push('/venture-studio')"
                class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:scale-105 hover:bg-blue-500"
              >
                <i class="fa-solid fa-paper-plane text-xs"></i>
                {{ t('Apply to Venture Studio', 'Mag-apply sa Venture Studio') }}
              </button>
              <button
                @click="router.push('/venture-studio')"
                class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition hover:scale-105 hover:bg-white/10"
              >
                {{ t('Learn More', 'Alamin Pa') }}
                <i class="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>

          <!-- Right: visual panel -->
          <div class="relative flex items-stretch lg:w-1/2">
            <!-- Dark overlay gradient on left edge -->
            <div class="absolute inset-y-0 left-0 z-10 w-16 hidden lg:block" style="background: linear-gradient(to right, #0a0f2e, transparent);"></div>

            <div class="relative w-full overflow-hidden lg:min-h-[480px]">
              <!-- Background glow -->
              <div class="absolute inset-0" style="background: radial-gradient(ellipse 80% 60% at 60% 50%, rgba(59,130,246,0.12) 0%, transparent 70%);"></div>

              <!-- Floating cards grid -->
              <div class="relative flex h-full min-h-[400px] items-center justify-center p-10 lg:p-12">
                <div class="grid w-full max-w-sm gap-3">

                  <!-- Top row: 2 stat cards -->
                  <div class="grid grid-cols-2 gap-3">
                    <div class="vs-promo-animate rounded-2xl border border-white/8 bg-white/4 p-4 backdrop-blur-sm">
                      <p class="text-2xl font-black text-white">{{ t('Equity', 'Equity') }}</p>
                      <p class="mt-0.5 text-xs text-blue-400 font-semibold">{{ t('Partnership', 'Partnership') }}</p>
                      <p class="mt-2 text-[11px] leading-relaxed text-white/40">{{ t('Aligned from day one', 'Naka-align mula sa simula') }}</p>
                    </div>
                    <div class="vs-promo-animate rounded-2xl border border-white/8 bg-white/4 p-4 backdrop-blur-sm">
                      <p class="text-2xl font-black text-white">{{ t('Rev.', 'Rev.') }}</p>
                      <p class="mt-0.5 text-xs text-blue-400 font-semibold">{{ t('Share Model', 'Share Model') }}</p>
                      <p class="mt-2 text-[11px] leading-relaxed text-white/40">{{ t('No big upfront cost', 'Walang malaking upfront na gastos') }}</p>
                    </div>
                  </div>

                  <!-- Middle: wide feature card -->
                  <div class="vs-promo-animate rounded-2xl border border-blue-500/20 bg-blue-500/8 p-5 backdrop-blur-sm">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white text-sm">
                        <i class="fa-solid fa-rocket"></i>
                      </div>
                      <p class="text-sm font-bold text-white">{{ t('Full Execution Support', 'Buong Execution Support') }}</p>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="tag in [t('Strategy','Strategy'), t('UX Design','UX Design'), t('Engineering','Engineering'), t('Launch','Launch')]" :key="tag"
                        class="rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-blue-300">
                        {{ tag }}
                      </span>
                    </div>
                  </div>

                  <!-- Bottom row: milestone + quote -->
                  <div class="grid grid-cols-2 gap-3">
                    <div class="vs-promo-animate rounded-2xl border border-white/8 bg-white/4 p-4 backdrop-blur-sm">
                      <i class="fa-solid fa-shield-check text-blue-400 text-lg mb-2"></i>
                      <p class="text-xs font-bold text-white">{{ t('Selective', 'Mapili') }}</p>
                      <p class="mt-1 text-[11px] leading-relaxed text-white/40">{{ t('We only partner when we believe in the venture', 'Nakikipagtulungan lang kami kapag naniniwala kami sa venture') }}</p>
                    </div>
                    <div class="vs-promo-animate rounded-2xl border border-white/8 bg-white/4 p-4 backdrop-blur-sm">
                      <i class="fa-solid fa-people-group text-blue-400 text-lg mb-2"></i>
                      <p class="text-xs font-bold text-white">{{ t('PH + SEA', 'PH + SEA') }}</p>
                      <p class="mt-1 text-[11px] leading-relaxed text-white/40">{{ t('Focused on the Philippine and Southeast Asian market', 'Nakatuon sa Pilipinas at Timog-Silangang Asya') }}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
