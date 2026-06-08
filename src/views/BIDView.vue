<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import heroImage from '@/assets/hero-image.png'

const router = useRouter()
const { isDark } = useTheme()

const openFaq = ref<number | null>(null)
const toggleFaq = (i: number) => { openFaq.value = openFaq.value === i ? null : i }

const faqs = [
  {
    q: 'Is this really free?',
    a: 'Yes. The BID visit and the Innovation Opportunity Report cost you nothing. There is no hidden fee and no obligation to hire inv8 afterward.',
  },
  {
    q: 'Will you try to sell me something during the visit?',
    a: 'No. The visit is purely for observation and discovery. We are there to understand your business, not to pitch you. If, after the debrief, you want to explore working with us, we will discuss that separately.',
  },
  {
    q: 'What if I am not tech-savvy?',
    a: 'That is exactly who this program is for. You do not need to know anything about technology or digital tools. We will explain everything in plain language and make sure the report is easy to understand.',
  },
  {
    q: 'What kind of opportunities will you find?',
    a: 'It depends on your business. Common areas we identify include: reducing time spent on manual tasks, improving how customers find or contact the business, organizing records and inventory, and streamlining how orders or transactions are processed. Every report is specific to what we actually observe.',
  },
  {
    q: 'What happens after the debrief?',
    a: 'You decide. If one of the opportunities in the report is something you want to act on, we can discuss how inv8 can help. If you want to handle it on your own or work with someone else, that is completely fine. The report is yours either way.',
  },
  {
    q: 'How do I know if I will be selected?',
    a: 'We select businesses based on a few criteria: whether you are the decision-maker, whether your business has a clear operational pain we can help with, and whether the timing and logistics work for both sides. We will let you know within 2 to 3 days of your application.',
  },
  {
    q: 'What if I am not selected for this batch?',
    a: 'We keep strong applications on file for the next batch. You will not need to reapply from scratch.',
  },
  {
    q: 'Is this only for businesses in Baguio City proper?',
    a: 'No. We cover the full Baguio-Benguet area, including La Trinidad, Itogon, Tublay, and other parts of Benguet. If your business is further out, reach out and we will check if logistics work.',
  },
]

const steps = [
  { n: '01', title: 'Apply', body: 'Fill out a short form with 5 quick questions about your business. Applications are reviewed within 2 to 3 days.' },
  { n: '02', title: 'Get Confirmed', body: 'We review all applications and select the best fit for each batch. If you are selected, we reach out personally to confirm your slot and schedule the visit.' },
  { n: '03', title: 'We Visit', body: 'The inv8 team visits your business for 1.5 to 2 hours. We observe, ask questions, and take notes. You just show us how things work.' },
  { n: '04', title: 'You Receive Your Report', body: 'Within 5 days, we send you a written Innovation Opportunity Report: 3 clear, specific areas where your business can improve, with practical recommendations and cost estimates.' },
  { n: '05', title: 'We Walk Through It Together', body: 'We schedule a 30-minute debrief to go through the report with you, answer your questions, and help you figure out your next move.' },
]

const deliverables = [
  {
    icon: 'fa-solid fa-map-location-dot',
    title: 'An on-site visit from the inv8 team',
    body: 'We come to you. We spend 1.5 to 2 hours at your business, observing how things run and talking with you and your team.',
  },
  {
    icon: 'fa-solid fa-comments',
    title: 'A structured discovery conversation',
    body: 'We ask the questions most business owners never get asked. What takes the most time? Where do things break down? What would you fix first if you could?',
  },
  {
    icon: 'fa-solid fa-file-lines',
    title: 'Your Innovation Opportunity Report',
    body: 'Within 5 days of the visit, we deliver a written 5 to 8 page report identifying 3 specific areas where your business can improve — each with a recommended approach, a rough cost range, and a realistic timeline. Yours to keep.',
  },
  {
    icon: 'fa-solid fa-people-arrows',
    title: 'A debrief walkthrough',
    body: 'We sit down with you (or hop on a call) to walk through the report together, answer your questions, and help you decide what to do next.',
  },
]

const goodFit = [
  'Your business has been operating for at least a year',
  'You have 3 to 50 people on your team',
  'You feel like some parts of your operations could be faster, cleaner, or less stressful',
  'You are the owner, manager, or decision-maker for the business',
  'You are based in Baguio City or anywhere in Benguet',
]

/* ── meta ── */
const originalTitle = document.title
const originalDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''

onMounted(() => {
  document.title = 'BID Program — Free Business Innovation Discovery | inv8 Studio'
  document.querySelector('meta[name="description"]')?.setAttribute('content',
    'inv8 BID Program: a free, on-site business discovery visit for Baguio-Benguet MSMEs. We observe your operations and deliver an Innovation Opportunity Report — at no cost.')
})
onUnmounted(() => {
  document.title = originalTitle
  document.querySelector('meta[name="description"]')?.setAttribute('content', originalDesc)
})
</script>

<template>
  <div class="min-h-screen bg-[#03040f]">

    <!-- ═══════════════════════════════════════
         HERO
    ═══════════════════════════════════════ -->
    <section
      class="relative overflow-hidden transition-colors duration-300"
      :class="isDark ? 'bg-[#03040f]' : 'bg-white'"
      style="min-height: 640px;"
    >
      <!-- Left content — stays in max-width container -->
      <div class="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" style="min-height: 640px;">
        <div class="flex flex-col justify-center pt-28 pb-16 lg:w-1/2" style="min-height: 640px;">

          <!-- Badge -->
          <span
            class="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors duration-300 w-fit"
            :class="isDark ? 'border-blue-500/30 text-blue-400' : 'border-blue-500/40 text-blue-600'"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            June 2026 Batch · Now Open
          </span>

          <!-- Headline -->
          <h1
            class="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-5xl transition-colors duration-300"
            :class="isDark ? 'text-white' : 'text-gray-900'"
          >
            We visit your business.<br />
            <span class="text-blue-500">You get a free<br />improvement plan.</span>
          </h1>

          <!-- First description -->
          <p
            class="mt-5 text-base leading-relaxed max-w-md transition-colors duration-300"
            :class="isDark ? 'text-white/60' : 'text-gray-600'"
          >
            We'll take a close look at how your business operates and identify practical ways to save time, improve workflows, and better serve your customers.
          </p>

          <!-- Blue rule -->
          <div class="my-5 w-10 border-t-2 border-blue-500"></div>

          <!-- Second description -->
          <p
            class="text-base leading-relaxed max-w-md transition-colors duration-300"
            :class="isDark ? 'text-white/60' : 'text-gray-600'"
          >
            Receive a personalized report with clear recommendations, estimated costs, and next steps. Yours to keep, whether you work with us or not.
          </p>

          <!-- CTA -->
          <button
            @click="router.push('/contactus')"
            class="mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 hover:scale-105 w-fit"
          >
            <i class="fa-solid fa-calendar-days text-base"></i>
            Apply for a Free Slot
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Trust items -->
          <div class="mt-6 space-y-3">
            <div
              class="flex items-center gap-3 text-sm transition-colors duration-300"
              :class="isDark ? 'text-white/50' : 'text-gray-500'"
            >
              <i class="fa-solid fa-shield-halved text-blue-500 w-5 text-center"></i>
              No obligation. No sales pressure.
            </div>
            <div
              class="flex items-center gap-3 text-sm transition-colors duration-300"
              :class="isDark ? 'text-white/50' : 'text-gray-500'"
            >
              <i class="fa-solid fa-users text-blue-500 w-5 text-center"></i>
              Only 3 businesses are selected per batch.
            </div>
          </div>
        </div>
      </div>

      <!-- ── Right: image — absolute, from 50% to right edge, full height ── -->
      <div class="absolute inset-y-0 right-0 hidden lg:block" style="left: 48%;">
        <img
          :src="heroImage"
          alt="inv8 team visiting a local Baguio business"
          class="h-full w-full object-cover object-center"
        />

        <!-- Left gradient blending into background -->
        <div
          class="absolute inset-y-0 left-0 w-48 transition-colors duration-300"
          :class="isDark
            ? 'bg-gradient-to-r from-[#03040f] to-transparent'
            : 'bg-gradient-to-r from-white to-transparent'"
        ></div>

        <!-- Floating "What you'll get" card -->
        <div
          class="absolute bottom-10 right-8 w-72 rounded-2xl shadow-xl border p-5 transition-colors duration-300"
          :class="isDark
            ? 'bg-[#0d0f1f] border-white/10 shadow-black/40'
            : 'bg-white border-gray-100 shadow-black/10'"
        >
          <div class="flex items-start gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <i class="fa-solid fa-list-check text-sm"></i>
            </div>
            <div>
              <p
                class="font-bold text-sm transition-colors duration-300"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >What you'll get:</p>
              <div class="mt-2 space-y-1.5">
                <div
                  v-for="item in [
                    'On-site visit and discovery',
                    'Your Improvement Plan (delivered in 5 days)',
                    'Walkthrough and Q&A session',
                  ]"
                  :key="item"
                  class="flex items-start gap-2 text-xs transition-colors duration-300"
                  :class="isDark ? 'text-white/60' : 'text-gray-600'"
                >
                  <i class="fa-solid fa-check text-blue-500 mt-0.5 shrink-0"></i>
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- ═══════════════════════════════════════
         WHAT IS THE BID PROGRAM
    ═══════════════════════════════════════ -->
    <section class="px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-start">

          <!-- ── Left: explanation ── -->
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">What Is the BID Program?</p>
            <h2 class="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              A free business check-up for
              <span class="text-blue-500"> Baguio-Benguet businesses.</span>
            </h2>

            <!-- Definition pill -->
            <div class="mt-6 flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
              <i class="fa-solid fa-book-open text-blue-400 text-sm shrink-0"></i>
              <p class="text-sm text-white/80 leading-snug">
                BID stands for <span class="font-bold text-blue-400">Business Innovation Discovery.</span>
              </p>
            </div>

            <!-- Description -->
            <p class="mt-5 text-base leading-relaxed text-white/60">
              It's a free on-site business assessment where the inv8 team visits your business, observes how things work, and identifies practical ways to improve operations, save time, and reduce day-to-day frustrations.
            </p>

            <!-- 4 process items -->
            <div class="mt-8 space-y-5">
              <div
                v-for="item in [
                  { icon: 'fa-solid fa-clock',         title: 'We visit your business.',                    sub: 'We spend 1.5 to 2 hours on-site, observe your operations, and ask the right questions.' },
                  { icon: 'fa-solid fa-magnifying-glass', title: 'We identify opportunities.',              sub: 'We look for areas causing delays, manual work, inefficiencies, or missed opportunities.' },
                  { icon: 'fa-solid fa-file-lines',    title: 'You receive a personalized Improvement Plan.', sub: 'Within 5 days, you\'ll receive a clear, jargon-free report with practical recommendations, cost estimates, and next steps.' },
                  { icon: 'fa-solid fa-check',         title: 'You decide what\'s next.',                   sub: 'The report is yours to keep, whether you work with inv8 or not.' },
                ]"
                :key="item.title"
                class="flex items-start gap-4"
              >
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                  <i :class="[item.icon, 'text-sm']"></i>
                </div>
                <div>
                  <p class="font-bold text-white text-sm leading-snug">{{ item.title }}</p>
                  <p class="mt-1 text-sm leading-relaxed text-white/50">{{ item.sub }}</p>
                </div>
              </div>
            </div>

            <!-- Footer pill -->
            <div class="mt-8 flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
              <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400">
                <i class="fa-solid fa-check text-xs"></i>
              </div>
              <p class="text-sm text-white/70 leading-snug">
                <span class="font-bold text-blue-400">It is free.</span> And it is for businesses right here in Baguio-Benguet.
              </p>
            </div>
          </div>

          <!-- ── Right: two stacked cards ── -->
          <div class="flex flex-col gap-5">

            <!-- Card 1: What You Can Expect -->
            <div class="rounded-2xl border border-white/[0.07] bg-[#0a0c1c] p-6">
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5">What You Can Expect</p>
              <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div
                  v-for="stat in [
                    { icon: 'fa-solid fa-clock',          value: '2 Hours',  label: 'On-site business visit',        sub: 'We spend time at your business.' },
                    { icon: 'fa-solid fa-calendar-days',  value: '5 Days',   label: 'Receive your Improvement Plan', sub: 'We deliver your report within 5 working days.' },
                    { icon: 'fa-solid fa-peso-sign',      value: '₱0',       label: 'No cost to participate',        sub: '100% free with no hidden fees.' },
                    { icon: 'fa-solid fa-lightbulb',      value: '3',        label: 'Recommendations',               sub: 'Practical opportunities for improvement in every report.' },
                  ]"
                  :key="stat.value"
                  class="flex flex-col items-center text-center rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 gap-2"
                >
                  <i :class="[stat.icon, 'text-blue-400 text-xl']"></i>
                  <p class="text-2xl font-black text-blue-400 leading-none">{{ stat.value }}</p>
                  <p class="text-xs font-bold text-white leading-snug">{{ stat.label }}</p>
                  <p class="text-[11px] text-white/40 leading-snug">{{ stat.sub }}</p>
                </div>
              </div>
            </div>

            <!-- Card 2: How BID Works -->
            <div class="rounded-2xl border border-white/[0.07] bg-[#0a0c1c] p-6">
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">How BID Works</p>

              <!-- Steps with arrows -->
              <div class="flex items-start justify-between gap-1">
                <div
                  v-for="(step, i) in [
                    { icon: 'fa-solid fa-store',           n: '1', title: 'We Visit',   desc: 'We come to your business and meet with you and your team.' },
                    { icon: 'fa-solid fa-magnifying-glass',n: '2', title: 'We Observe', desc: 'We observe how things work, ask questions, and take note of what we see.' },
                    { icon: 'fa-solid fa-file-lines',      n: '3', title: 'We Report',  desc: 'You receive a personalized Improvement Plan within 5 days.' },
                    { icon: 'fa-solid fa-rocket',          n: '4', title: 'You Decide', desc: 'Use the recommendations to improve your business in your own way and at your own pace.' },
                  ]"
                  :key="step.n"
                  class="flex items-start"
                >
                  <!-- Step item -->
                  <div class="flex flex-col items-center text-center" style="width: 90px;">
                    <div class="flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/30 bg-[#111528] text-blue-400">
                      <i :class="[step.icon, 'text-lg']"></i>
                    </div>
                    <p class="mt-2 text-xs font-bold text-white leading-snug">{{ step.n }}. {{ step.title }}</p>
                    <p class="mt-1 text-[11px] text-white/40 leading-snug">{{ step.desc }}</p>
                  </div>

                  <!-- Arrow between steps -->
                  <div v-if="i < 3" class="flex items-start pt-6 px-1 shrink-0">
                    <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-white/20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- No-obligation footer -->
              <div class="mt-6 border-t border-white/[0.06] pt-4 flex items-start gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
                  <i class="fa-solid fa-shield-halved text-sm"></i>
                </div>
                <div>
                  <p class="text-sm font-bold text-white leading-snug">No obligation. No sales pressure.</p>
                  <p class="mt-0.5 text-xs text-white/45 leading-relaxed">Our goal is to share useful insights. If you need help implementing the recommendations, we'll be here when you're ready.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         WHO IT IS FOR
    ═══════════════════════════════════════ -->
    <section class="px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <!-- Label -->
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Who This Is For</p>

            <!-- Headline -->
            <h2 class="mt-4 text-3xl font-black leading-snug text-white sm:text-4xl">
              Made for business owners who know things can
              <span class="text-blue-500"> run better.</span>
            </h2>

            <!-- Description -->
            <p class="mt-5 text-base leading-relaxed text-white/60">
              The BID Program is designed for Baguio-Benguet businesses that are already operating and looking for practical ways to improve their day-to-day operations.
            </p>
            <p class="mt-3 text-base leading-relaxed text-white/60">
              You don't need a website, digital tools, or technical knowledge to participate.
            </p>

            <!-- Blue rule -->
            <div class="my-6 w-10 border-t-2 border-blue-500"></div>

            <!-- Good fit checklist -->
            <p class="mb-4 text-base font-bold text-white">Are you a good fit?</p>
            <div class="space-y-3">
              <div
                v-for="item in [
                  'Your business has been operating for at least 1 year',
                  'You have 3 to 50 people on your team',
                  'You want to improve how your business runs',
                  'You are the owner or decision-maker',
                  'You are based in Baguio City or anywhere in Benguet',
                ]"
                :key="item"
                class="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0d0f1f] px-4 py-3"
              >
                <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <i class="fa-solid fa-check text-white text-[10px]"></i>
                </div>
                <span class="text-sm text-white/80">{{ item }}</span>
              </div>
            </div>

            <!-- Footer note -->
            <div class="mt-6 flex items-start gap-3">
              <i class="fa-solid fa-users text-blue-500/60 text-lg mt-0.5 shrink-0"></i>
              <p class="text-sm text-white/45 leading-relaxed">
                We keep it simple. No complicated forms.<br />Just answer a few questions to apply.
              </p>
            </div>
          </div>

          <!-- ── Right column ── -->
          <div class="space-y-5">

            <!-- Businesses we work with -->
            <div class="rounded-2xl border border-white/[0.07] bg-[#0a0c1c] p-6">
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 mb-5">Businesses We Commonly Work With</p>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="biz in [
                    { icon: 'fa-solid fa-store',          label: 'Retail Stores',              desc: 'Sari-sari stores, boutiques, convenience stores, and more' },
                    { icon: 'fa-solid fa-mug-hot',        label: 'Cafés & Restaurants',        desc: 'Cafés, dine-in restaurants, fast food, and bakeries' },
                    { icon: 'fa-solid fa-suitcase-rolling',label: 'Hotels & Tourism',           desc: 'Guesthouses, homestays, travel and tour operators' },
                    { icon: 'fa-solid fa-kit-medical',    label: 'Clinics & Wellness',         desc: 'Clinics, dental practices, spas, and wellness centers' },
                    { icon: 'fa-solid fa-graduation-cap', label: 'Schools & Training Centers', desc: 'Private schools, tutorial centers, and training providers' },
                    { icon: 'fa-solid fa-people-group',   label: 'Cooperatives & Associations',desc: 'Co-ops, transport groups, and member-based orgs' },
                  ]"
                  :key="biz.label"
                  class="flex items-start gap-3"
                >
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                    <i :class="[biz.icon, 'text-sm']"></i>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white leading-snug">{{ biz.label }}</p>
                    <p class="mt-0.5 text-xs leading-relaxed text-white/45">{{ biz.desc }}</p>
                  </div>
                </div>

                <!-- Service-based spans full width -->
                <div class="col-span-2 flex items-start gap-3 border-t border-white/[0.06] pt-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                    <i class="fa-solid fa-screwdriver-wrench text-sm"></i>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white leading-snug">Service-Based Businesses</p>
                    <p class="mt-0.5 text-xs leading-relaxed text-white/45">Construction, repair services, salons, laundry, printing, logistics, and other service providers</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- This program is NOT for -->
            <div class="rounded-2xl border border-red-500/20 bg-[#0a0c1c] p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-red-400">
                  <i class="fa-solid fa-circle-info text-sm"></i>
                </div>
                <p class="font-bold text-white text-base">This Program Is Not For</p>
              </div>
              <div class="space-y-3">
                <div v-for="item in [
                  'Businesses that haven\'t started operating yet',
                  'Business ideas that are still in the planning stage',
                  'Individuals looking for employment or training',
                ]" :key="item" class="flex items-start gap-3">
                  <i class="fa-solid fa-xmark text-red-400 mt-0.5 shrink-0 w-4 text-center"></i>
                  <span class="text-sm text-white/65">{{ item }}</span>
                </div>
              </div>
              <div class="mt-5 border-t border-white/[0.06] pt-4">
                <p class="text-sm leading-relaxed text-white/45">
                  The BID Program focuses on real operating businesses so we can observe actual workflows, identify challenges, and provide practical recommendations.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         SCARCITY
    ═══════════════════════════════════════ -->
    <section class="px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <div class="rounded-[28px] border border-amber-500/20 bg-amber-500/5 px-8 py-10 sm:px-12">
          <div class="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Limited Slots Per Batch</p>
              <h2 class="mt-3 text-2xl font-black text-white sm:text-3xl">Each batch is limited to 3 businesses.</h2>
              <p class="mt-4 max-w-lg text-base leading-relaxed text-white/60">
                This is intentional. We want to give each visit the time and attention it deserves, and we want the report to be genuinely useful — not rushed.
              </p>
              <p class="mt-3 text-sm text-white/50">
                Applications are reviewed before slots are confirmed. Not everyone who applies will be selected for the current batch, but we keep strong applications on file for the next one.
              </p>
            </div>
            <div class="flex flex-col items-start gap-3 sm:items-end sm:shrink-0">
              <button
                @click="router.push('/contactus')"
                class="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-amber-400 hover:scale-105 shadow-lg shadow-amber-500/20"
              >
                Apply Now — June 2026 Batch
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <p class="text-xs text-amber-400/70">Slots are limited. Applications close once the batch is full.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         WHY INV8
    ═══════════════════════════════════════ -->
    <section class="px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">

          <!-- ── Left: headline + 3 pillars ── -->
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Why inv8?</p>
            <h2 class="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              Local knowledge.<br />
              Practical recommendations.<br />
              <span class="text-blue-500">No unnecessary complexity.</span>
            </h2>

            <div class="mt-10 space-y-0 divide-y divide-white/[0.06]">
              <div
                v-for="pillar in [
                  {
                    icon: 'fa-solid fa-mountain-sun',
                    title: 'We understand local businesses.',
                    body: 'We work with businesses, cooperatives, schools, and organizations across Baguio and Benguet. By spending time on the ground, we understand how local businesses operate and what challenges they face.',
                  },
                  {
                    icon: 'fa-solid fa-bullseye',
                    title: 'We recommend what makes sense.',
                    body: 'We are not interested in recommending expensive systems or complicated technology for the sake of it. We focus on solutions that save time, reduce manual work, improve customer experience, and support business growth.',
                  },
                  {
                    icon: 'fa-solid fa-handshake',
                    title: 'We earn trust by doing good work.',
                    body: 'The BID Program is our way of getting to know local businesses and sharing useful recommendations before asking for anything in return.',
                  },
                ]"
                :key="pillar.title"
                class="flex items-start gap-5 py-7"
              >
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0d0f1f] text-blue-400">
                  <i :class="[pillar.icon, 'text-base']"></i>
                </div>
                <div>
                  <p class="font-bold text-white text-base leading-snug">{{ pillar.title }}</p>
                  <p class="mt-2 text-sm leading-relaxed text-white/55">{{ pillar.body }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Right: What We Bring card ── -->
          <div class="rounded-2xl border border-white/[0.07] bg-[#0a0c1c] p-7">

            <!-- Card header -->
            <div class="flex items-center gap-3 mb-6">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <i class="fa-solid fa-people-group text-base"></i>
              </div>
              <p class="text-lg font-bold text-blue-400">What We Bring</p>
            </div>

            <!-- Service list -->
            <div class="divide-y divide-white/[0.06]">
              <div
                v-for="svc in [
                  { icon: 'fa-solid fa-pen-ruler',        title: 'Product & Service Design',        desc: 'We help design better experiences for your customers and team.' },
                  { icon: 'fa-solid fa-display',          title: 'Websites & Digital Platforms',    desc: 'Modern, secure, and easy-to-manage websites and systems.' },
                  { icon: 'fa-solid fa-gears',            title: 'Business Process Automation',     desc: 'We help reduce manual work and improve day-to-day operations.' },
                  { icon: 'fa-solid fa-chart-bar',        title: 'Internal Tools & Dashboards',     desc: 'Tools that help you track, manage, and make better decisions.' },
                  { icon: 'fa-solid fa-wifi',             title: 'IoT & Smart Systems',             desc: 'Solutions that connect devices and automate physical processes.' },
                  { icon: 'fa-solid fa-location-dot',     title: 'Local, On-Site Collaboration',    desc: 'We visit your business and work closely with your team.' },
                ]"
                :key="svc.title"
                class="flex items-start gap-4 py-4"
              >
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-white/50">
                  <i :class="[svc.icon, 'text-sm']"></i>
                </div>
                <div>
                  <p class="font-bold text-white text-sm leading-snug">{{ svc.title }}</p>
                  <p class="mt-0.5 text-xs leading-relaxed text-white/45">{{ svc.desc }}</p>
                </div>
              </div>
            </div>

            <!-- Footer callout -->
            <div class="mt-4 pt-5 border-t border-white/[0.06] flex items-start gap-3">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400">
                <i class="fa-solid fa-check text-xs"></i>
              </div>
              <p class="text-sm leading-relaxed text-white/65">
                <span class="font-bold text-blue-400">One team</span> that can help identify opportunities and support implementation when needed.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         FAQ
    ═══════════════════════════════════════ -->
    <section class="px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Questions You Might Have</p>
        <h2 class="mt-4 text-3xl font-black text-white sm:text-4xl">FAQ</h2>

        <div class="mt-10 space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0c1c] transition"
            :class="openFaq === i ? 'border-blue-500/20' : ''"
          >
            <button
              @click="toggleFaq(i)"
              class="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <span class="font-semibold text-white/90 text-sm sm:text-base">{{ faq.q }}</span>
              <i
                class="fa-solid fa-chevron-down text-blue-400 text-xs transition-transform duration-200 shrink-0 ml-4"
                :class="openFaq === i ? 'rotate-180' : ''"
              ></i>
            </button>
            <Transition name="faq-drop">
              <div v-if="openFaq === i" class="px-6 pb-5">
                <p class="text-sm leading-relaxed text-white/55 border-t border-white/[0.06] pt-4">{{ faq.a }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         FINAL CTA
    ═══════════════════════════════════════ -->
    <section class="px-4 py-24 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
          Ready to see what your<br class="hidden sm:block" />
          <span class="text-blue-400">business is capable of?</span>
        </h2>
        <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
          Apply for a free BID slot. We will review your application and get back to you within 2 to 3 days.
        </p>

        <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            @click="router.push('/contactus')"
            class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 hover:scale-105"
          >
            Apply for Your Free Slot
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <p class="mt-4 text-sm text-white/35">Only 3 slots per batch. June 2026 batch is now open.</p>

        <p class="mt-6 text-sm text-white/40">
          Questions? Message us at
          <a href="mailto:hello@inv8.io" class="text-blue-400 underline underline-offset-2 hover:text-blue-300">hello@inv8.io</a>
          or find us on
          <a href="https://facebook.com/inv8studio" target="_blank" rel="noopener" class="text-blue-400 underline underline-offset-2 hover:text-blue-300">Facebook</a>
        </p>
      </div>
    </section>

  </div>
</template>

<style scoped>
.faq-drop-enter-active,
.faq-drop-leave-active { transition: max-height 0.25s ease, opacity 0.2s ease; max-height: 300px; overflow: hidden; }
.faq-drop-enter-from,
.faq-drop-leave-to     { max-height: 0; opacity: 0; }
</style>
