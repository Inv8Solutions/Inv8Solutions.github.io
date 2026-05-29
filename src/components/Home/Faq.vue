<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

defineOptions({
  name: 'FaqSection',
})

const { observeElements } = useScrollAnimation()

type FaqItem = {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: 'What types of projects does inv8 work on?',
    answer:
      'We work on UI/UX design, MVP development, SME innovation systems, and IoT infrastructure. Our focus is building practical, market-ready digital solutions for startups and businesses.',
  },
  {
    question: 'Do you work with early-stage founders with limited budgets?',
    answer:
      'Yes. We prioritize lean, high-impact solutions that help founders validate ideas quickly and scale responsibly.',
  },
  {
    question: 'How do you ensure we’re building the right features?',
    answer:
      'We combine user research, rapid prototyping, and validation sprints to make sure we are aligned with real user needs.',
  },
  {
    question: 'What’s your process for working with SMEs?',
    answer:
      'We collaborate closely with SME stakeholders, define measurable goals, and build modular solutions that fit existing operations.',
  },
  {
    question: 'Do you offer long-term support after the MVP is launched?',
    answer:
      'Absolutely. We can stay on to iterate, scale infrastructure, and provide product leadership as you grow.',
  },
  {
    question: 'Can you help with pitchdeck design or fundraising materials?',
    answer:
      'We regularly support teams with storytelling, pitch collateral, and interactive prototypes that resonate with investors.',
  },
  {
    question: 'How do payments and project timelines work?',
    answer:
      'Engagements are scoped around milestones with transparent pricing and weekly progress checkpoints.',
  },
  {
    question: 'Can we hire inv8 for just design or just development?',
    answer:
      'Yes. We can plug into your team for specialized design, engineering, or end-to-end delivery.',
  },
  {
    question: 'Do you work with clients outside the Philippines?',
    answer:
      'We collaborate with teams globally, working asynchronously and within overlapping hours when needed.',
  },
]

const openIndex = ref<null | number>(0)

const toggleFAQ = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

onMounted(() => {
  observeElements('.faq-section-header')
  observeElements('.faq-item')
})
</script>

<template>
  <section class="bg-[#03040f] px-4 py-24">
    <div class="mx-auto flex max-w-7xl flex-col gap-12 p-4 lg:flex-row lg:items-center lg:gap-16">
      <div class="faq-section-header flex-1 space-y-6">
        <span class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
          FAQ
        </span>
        <div class="space-y-2 mt-4">
          <h2 class="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">Have questions?</h2>
          <p class="text-4xl font-black leading-tight text-white/30 sm:text-5xl">We've got answers.</p>
        </div>
      </div>

      <div class="flex-1 rounded-[40px] border border-white/10 bg-[#0d0f1f] p-6 sm:p-8">
        <ul class="divide-y divide-white/10">
          <li v-for="(faq, index) in faqs" :key="faq.question" class="faq-item py-4 first:pt-0 last:pb-0" :style="`animation-delay: ${index * 0.05}s`">
            <button
              class="flex w-full items-start justify-between gap-6 text-left transition hover:opacity-80"
              type="button"
              @click="toggleFAQ(index)"
            >
              <div class="space-y-2">
                <h4 class="text-base font-semibold text-white sm:text-lg">
                  {{ faq.question }}
                </h4>
                <p v-if="openIndex === index" class="text-sm leading-relaxed text-white/55 sm:text-base">
                  {{ faq.answer }}
                </p>
              </div>
              <span class="ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg font-light text-white/60">
                {{ openIndex === index ? '−' : '+' }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
