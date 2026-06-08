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

    <!-- Founders Pricing Section -->
    <Transition name="tab-fade" mode="out-in">
      <div v-if="selectedId === 'founders'" key="founders-pricing" class="mx-auto max-w-6xl mt-16">
        <div class="mb-10">
          <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Transparent Pricing</p>
          <h2 class="mt-3 text-3xl font-black leading-snug tracking-tight text-white sm:text-4xl">
            Pick the plan that fits where you are
          </h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-white/55">
            Every founder's journey is different. Choose the package that matches your stage — from refining your pitch to shipping your first real product.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">

          <!-- Inv8 Pitch -->
          <div class="relative flex flex-col rounded-[24px] border border-white/[0.07] bg-[#0a0c1c] p-7 transition hover:border-blue-500/30 hover:bg-[#0c0e20]">
            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-300">
                Stage 1
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Inv8 Pitch</h3>
              <p class="mt-1 text-3xl font-black text-white">
                ₱5,000 <span class="text-base font-normal text-white/40">starts at</span>
              </p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                For first-time founders and early-stage entrepreneurs who need to communicate their idea clearly and confidently.
              </p>
            </div>

            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                'Pitch deck — up to 12 slides (PPTX + PDF)',
                'Written pitch script (3–5 min delivery)',
                'Slide-by-slide talking points',
                '1 coaching session (1 hr) + Q&A prep',
                '1 round of revisions',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-blue-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>

            <div class="border-t border-white/[0.06] pt-5 space-y-1">
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Timeline:</span> 1–2 weeks</p>
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Payment:</span> 100% upfront</p>
            </div>
          </div>

          <!-- Inv8 MVP — featured -->
          <div class="relative flex flex-col rounded-[24px] border border-purple-500/40 bg-[#0a0c1c] p-7 ring-1 ring-purple-500/20 transition hover:border-purple-500/60">
            <!-- Most Popular badge -->
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                Most Popular
              </span>
            </div>

            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-purple-300">
                Stage 2
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Inv8 MVP</h3>
              <p class="mt-1 text-3xl font-black text-white">
                ₱15,000 <span class="text-base font-normal text-white/40">starts at</span>
              </p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                For founders who have validated their idea and are ready to visualize or test a working version.
              </p>
            </div>

            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                'Up to 10 high-fidelity Figma screens',
                'Interactive prototype (clickable, shareable)',
                'Basic design system (colors, type, buttons)',
                'No-code MVP setup with up to 3 core features',
                'User testing guide + feedback template',
                '2 coaching sessions (1 hr each)',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-purple-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>

            <div class="border-t border-white/[0.06] pt-5 space-y-1">
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Timeline:</span> 2–4 weeks</p>
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Payment:</span> 50% upfront / 50% on delivery</p>
            </div>
          </div>

          <!-- Inv8 Launch -->
          <div class="relative flex flex-col rounded-[24px] border border-white/[0.07] bg-[#0a0c1c] p-7 transition hover:border-green-500/30 hover:bg-[#0c0e20]">
            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-300">
                Stage 3
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Inv8 Launch</h3>
              <p class="mt-1 text-3xl font-black text-white">
                ₱30,000 <span class="text-base font-normal text-white/40">starts at</span>
              </p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                For founders ready to build and ship a real product to real users — end to end.
              </p>
            </div>

            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                'Product discovery + requirements doc',
                'Full UI/UX design — up to 15 screens + design system',
                'Front-end + back-end development',
                'Up to 2 third-party integrations',
                'QA, deployment to Vercel / Railway / Render',
                '30-day post-launch bug fixes + strategy session',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>

            <div class="border-t border-white/[0.06] pt-5 space-y-1">
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Timeline:</span> 8–14 weeks</p>
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Payment:</span> 40% / 30% on design / 30% on launch</p>
            </div>
          </div>

        </div>

        <!-- Bottom CTA -->
        <div class="mt-8 flex flex-col items-start justify-between gap-4 rounded-[16px] border border-white/[0.07] bg-[#0d0f1f] px-6 py-4 sm:flex-row sm:items-center">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
              <i class="fa-regular fa-circle-question text-sm" aria-hidden="true"></i>
            </div>
            <p class="text-sm text-white/60">
              Not sure which plan is right for you?
              <span class="text-white/80"> Let's talk through your idea together.</span>
            </p>
          </div>
          <button
            @click="router.push('/contactus')"
            class="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 hover:scale-105"
          >
            Get in Touch
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- MSMEs Starter Packs -->
    <Transition name="tab-fade" mode="out-in">
      <div v-if="selectedId === 'msmes'" key="msmes-starter-packs" class="mx-auto max-w-6xl mt-16">
        <div class="mb-10">
          <p class="text-xs font-bold uppercase tracking-[0.3em] text-green-400">Starter Packs</p>
          <h2 class="mt-3 text-3xl font-black leading-snug tracking-tight text-white sm:text-4xl">
            Simple packages built for small businesses
          </h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-white/55">
            No jargon. No bloat. Just the right tools to help your business get found, sell online, or make better decisions.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">

          <!-- Get Found Pack -->
          <div class="relative flex flex-col rounded-[24px] border border-white/[0.07] bg-[#0a0c1c] p-7 transition hover:border-green-500/30 hover:bg-[#0c0e20]">
            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-300">
                Get Discovered
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Get Found Pack</h3>
              <p class="mt-1 text-3xl font-black text-white">₱4,999</p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                Establish a credible online presence and make it easier for customers to discover your business.
              </p>
            </div>
            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                'Google Business Profile setup & optimization',
                'Facebook & Instagram profile optimization',
                '1-page digital business card website',
                'QR code generation for online access',
                'Printable QR materials',
                'Basic digital presence training',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>
            <div class="border-t border-white/[0.06] pt-5">
              <button @click="router.push('/contactus')" class="w-full rounded-full border border-green-500/40 py-2.5 text-sm font-bold text-green-400 transition hover:bg-green-500/10">
                Get Started
              </button>
            </div>
          </div>

          <!-- Sell Online Pack — featured -->
          <div class="relative flex flex-col rounded-[24px] border border-green-500/40 bg-[#0a0c1c] p-7 ring-1 ring-green-500/20 transition hover:border-green-500/60">
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                Most Popular
              </span>
            </div>
            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-300">
                Go Digital
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Sell Online Pack</h3>
              <p class="mt-1 text-3xl font-black text-white">₱14,999</p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                Enable customers to browse products, place orders, and pay online — all in one place.
              </p>
            </div>
            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                '3–5 page website with product catalog (up to 20 products)',
                'GCash, Maya, or PayMongo payment integration',
                'Order form with automated confirmation',
                'Google Business Profile optimization',
                'Social media profile optimization',
                'Onboarding & training session',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>
            <div class="border-t border-white/[0.06] pt-5">
              <button @click="router.push('/contactus')" class="w-full rounded-full bg-green-600 py-2.5 text-sm font-bold text-white transition hover:bg-green-500">
                Get Started
              </button>
            </div>
          </div>

          <!-- Business Numbers Pack -->
          <div class="relative flex flex-col rounded-[24px] border border-white/[0.07] bg-[#0a0c1c] p-7 transition hover:border-green-500/30 hover:bg-[#0c0e20]">
            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-300">
                Get Clarity
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Business Numbers Pack</h3>
              <p class="mt-1 text-3xl font-black text-white">₱7,999</p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                Improve visibility into business performance through simple reporting and tracking systems.
              </p>
            </div>
            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                'Sales tracker & inventory tracker',
                'Expense tracker & cash flow summary',
                'Mobile-friendly business dashboard',
                'Organized Google Drive workspace',
                'Training & handover session',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>
            <div class="border-t border-white/[0.06] pt-5">
              <button @click="router.push('/contactus')" class="w-full rounded-full border border-green-500/40 py-2.5 text-sm font-bold text-green-400 transition hover:bg-green-500/10">
                Get Started
              </button>
            </div>
          </div>

        </div>
      </div>
    </Transition>

    <!-- MSMEs Pricing Section -->
    <Transition name="tab-fade" mode="out-in">
      <div v-if="selectedId === 'msmes'" key="msmes-pricing" class="mx-auto max-w-6xl mt-16">
        <div class="mb-10">
          <p class="text-xs font-bold uppercase tracking-[0.3em] text-green-400">Transparent Pricing</p>
          <h2 class="mt-3 text-3xl font-black leading-snug tracking-tight text-white sm:text-4xl">
            Pick the plan that fits where you are
          </h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-white/55">
            Whether you're just going online or ready for a full digital overhaul, we have a package built around your stage and budget.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">

          <!-- Inv8 Digitalize -->
          <div class="relative flex flex-col rounded-[24px] border border-white/[0.07] bg-[#0a0c1c] p-7 transition hover:border-green-500/30 hover:bg-[#0c0e20]">
            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-300">
                Stage 1
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Inv8 Digitalize</h3>
              <p class="mt-1 text-3xl font-black text-white">
                ₱15,000 <span class="text-base font-normal text-white/40">starts at</span>
              </p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                For businesses going online for the first time — sari-sari stores, local shops, family businesses, and cooperatives with zero or minimal digital presence.
              </p>
            </div>

            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                'Simple website — up to 4 pages, mobile-responsive',
                'Facebook, Instagram & Google Business Profile setup',
                'Basic wordmark logo + brand starter kit',
                '5 branded social media templates (Canva-editable)',
                'WhatsApp Business + Google Workspace setup',
                '1-hour training on managing your site & socials',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>

            <div class="border-t border-white/[0.06] pt-5 space-y-1">
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Timeline:</span> 2–3 weeks</p>
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Payment:</span> 100% upfront</p>
            </div>
          </div>

          <!-- Inv8 Automate — featured -->
          <div class="relative flex flex-col rounded-[24px] border border-green-500/40 bg-[#0a0c1c] p-7 ring-1 ring-green-500/20 transition hover:border-green-500/60">
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                Most Popular
              </span>
            </div>

            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-300">
                Stage 2
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Inv8 Automate</h3>
              <p class="mt-1 text-3xl font-black text-white">
                ₱25,000 <span class="text-base font-normal text-white/40">starts at</span>
              </p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                For MSMEs already online but drowning in manual tasks — inquiries, orders, scheduling, invoicing, and follow-ups.
              </p>
            </div>

            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                'Workflow assessment — identify top 3 processes to automate',
                'Chatbot setup (Facebook, Instagram, or website)',
                'Online booking/appointment system (Calendly or similar)',
                'Automated invoicing + order management workflow',
                'Up to 3 tool integrations via Zapier or Make',
                '14-day support after setup',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>

            <div class="border-t border-white/[0.06] pt-5 space-y-1">
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Timeline:</span> 3–5 weeks</p>
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Payment:</span> 50% upfront / 50% on delivery</p>
            </div>
          </div>

          <!-- Inv8 Transform -->
          <div class="relative flex flex-col rounded-[24px] border border-white/[0.07] bg-[#0a0c1c] p-7 transition hover:border-green-500/30 hover:bg-[#0c0e20]">
            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-300">
                Stage 3
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Inv8 Transform</h3>
              <p class="mt-1 text-3xl font-black text-white">
                ₱45,000 <span class="text-base font-normal text-white/40">starts at</span>
              </p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                For MSMEs and social enterprises ready for a full digital overhaul — restructure how you operate, serve customers, and make decisions.
              </p>
            </div>

            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                'Digital transformation roadmap + strategy report',
                'Full website rebuild — up to 6 pages with CMS',
                'Online payments/bookings (GCash, PayMongo, Calendly)',
                'Everything in Inv8 Automate — up to 5 workflows',
                'Custom no-code CRM + automated reporting dashboard',
                '30-day post-delivery support + Day 30 strategy session',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>

            <div class="border-t border-white/[0.06] pt-5 space-y-1">
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Timeline:</span> 6–10 weeks</p>
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Payment:</span> 40% / 30% on strategy / 30% on delivery</p>
            </div>
          </div>

        </div>

        <!-- Bottom CTA -->
        <div class="mt-8 flex flex-col items-start justify-between gap-4 rounded-[16px] border border-white/[0.07] bg-[#0d0f1f] px-6 py-4 sm:flex-row sm:items-center">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-400">
              <i class="fa-regular fa-circle-question text-sm" aria-hidden="true"></i>
            </div>
            <p class="text-sm text-white/60">
              Not sure which plan fits your business?
              <span class="text-white/80"> Let's map it out together in a free discovery call.</span>
            </p>
          </div>
          <button
            @click="router.push('/contactus')"
            class="inline-flex shrink-0 items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-500 hover:scale-105"
          >
            Get in Touch
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Organizations Pricing Section -->
    <Transition name="tab-fade" mode="out-in">
      <div v-if="selectedId === 'organizations'" key="organizations-pricing" class="mx-auto max-w-6xl mt-16">
        <div class="mb-10">
          <p class="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">Transparent Pricing</p>
          <h2 class="mt-3 text-3xl font-black leading-snug tracking-tight text-white sm:text-4xl">
            Pick the engagement that fits your goals
          </h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-white/55">
            From a single keynote to a full program build — we meet your organization wherever you are on the innovation journey.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">

          <!-- Inv8 Talk -->
          <div class="relative flex flex-col rounded-[24px] border border-white/[0.07] bg-[#0a0c1c] p-7 transition hover:border-purple-500/30 hover:bg-[#0c0e20]">
            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-purple-300">
                Engagement 1
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Inv8 Talk</h3>
              <p class="mt-1 text-3xl font-black text-white">
                ₱10,000 <span class="text-base font-normal text-white/40">starts at</span>
              </p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                For organizations, LGUs, and universities looking to expose their team or community to innovation thinking and digital trends.
              </p>
            </div>

            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                '1 keynote or seminar (1–2 hrs) — online or in-person',
                'Custom topic scoping call (30 min)',
                'Audience Q&A facilitation (30 min)',
                'Designed presentation deck branded for the event',
                '1-page takeaway handout for participants',
                'Session summary sent to organizer within 48 hrs',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-purple-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>

            <div class="border-t border-white/[0.06] pt-5 space-y-1">
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Timeline:</span> 1–2 weeks from booking</p>
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Payment:</span> 100% upfront</p>
            </div>
          </div>

          <!-- Inv8 Activate — featured -->
          <div class="relative flex flex-col rounded-[24px] border border-purple-500/40 bg-[#0a0c1c] p-7 ring-1 ring-purple-500/20 transition hover:border-purple-500/60">
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                Most Popular
              </span>
            </div>

            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-purple-300">
                Engagement 2
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Inv8 Activate</h3>
              <p class="mt-1 text-3xl font-black text-white">
                ₱50,000 <span class="text-base font-normal text-white/40">starts at</span>
              </p>
              <p class="mt-3 text-sm leading-relaxed text-white/50">
                For organizations that want immersive, facilitated workshops where teams actively explore challenges and co-create solutions.
              </p>
            </div>

            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                'Pre-workshop discovery + custom design (1 hr)',
                'Full-day facilitated workshop — up to 8 hrs',
                'Design Thinking, Lean Startup, or custom framework',
                'Participant workbooks — up to 30 pax',
                'Workshop synthesis report + 90-day action plan',
                'Final findings presentation to leadership (1 hr)',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-purple-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>

            <div class="border-t border-white/[0.06] pt-5 space-y-1">
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Timeline:</span> 2–3 weeks prep + workshop day</p>
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Payment:</span> 50% upfront / 50% on synthesis delivery</p>
            </div>
          </div>

          <!-- Inv8 Program -->
          <div class="relative flex flex-col rounded-[24px] border border-white/[0.07] bg-[#0a0c1c] p-7 transition hover:border-purple-500/30 hover:bg-[#0c0e20]">
            <div class="mb-5">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-purple-300">
                Engagement 3
              </span>
              <h3 class="mt-4 text-2xl font-black text-white">Inv8 Program</h3>
              <p class="mt-1 text-base font-black text-white/70 mt-2">
                Get a Quote
              </p>
              <div class="mt-3 space-y-1">
                <p class="text-xs text-white/40">Program design only: <span class="text-white/60 font-semibold">₱80K–₱150K</span></p>
                <p class="text-xs text-white/40">Design + facilitation (1 cohort): <span class="text-white/60 font-semibold">₱150K–₱300K</span></p>
                <p class="text-xs text-white/40">Full ecosystem program: <span class="text-white/60 font-semibold">₱300K–₱600K+</span></p>
              </div>
            </div>

            <div class="mb-6 flex-1 space-y-3">
              <div v-for="item in [
                'Stakeholder discovery + needs assessment',
                'Program framework, curriculum & milestone design',
                'Startup competition mechanics + judging rubric',
                'Train-the-trainer capacity building for staff',
                'Program branding, collaterals, and certificates',
                'Impact report + DOST/DICT/CHED compliance support',
              ]" :key="item" class="flex items-start gap-2.5 text-sm text-white/65">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-purple-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item }}
              </div>
            </div>

            <div class="border-t border-white/[0.06] pt-5 space-y-1">
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Timeline:</span> 6–16 weeks depending on scope</p>
              <p class="text-xs text-white/35"><span class="text-white/50 font-semibold">Payment:</span> 40% / 30% on framework approval / 30% on delivery</p>
            </div>
          </div>

        </div>

        <!-- Bottom CTA -->
        <div class="mt-8 flex flex-col items-start justify-between gap-4 rounded-[16px] border border-white/[0.07] bg-[#0d0f1f] px-6 py-4 sm:flex-row sm:items-center">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-400">
              <i class="fa-regular fa-circle-question text-sm" aria-hidden="true"></i>
            </div>
            <p class="text-sm text-white/60">
              Need a custom scope for your program or event?
              <span class="text-white/80"> Let's talk and we'll put together a proposal.</span>
            </p>
          </div>
          <button
            @click="router.push('/contactus')"
            class="inline-flex shrink-0 items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500 hover:scale-105"
          >
            Get in Touch
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>

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
