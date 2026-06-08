<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLanguage } from '@/composables/useLanguage'

defineOptions({
  name: 'FaqSection',
})

const { observeElements } = useScrollAnimation()
const { t } = useLanguage()

const faqs = computed(() => [
  {
    question: t('What types of projects does inv8 work on?', 'Anong uri ng mga proyekto ang ginagawa ng inv8?'),
    answer: t(
      'We work on UI/UX design, MVP development, SME innovation systems, and IoT infrastructure. Our focus is building practical, market-ready digital solutions for startups and businesses.',
      'Nagtatrabaho kami sa UI/UX design, pagbuo ng MVP, mga sistema ng inobasyon para sa SME, at imprastraktura ng IoT. Ang aming pokus ay ang pagbuo ng mga praktikal, handa sa merkado na digital na solusyon para sa mga startup at negosyo.',
    ),
  },
  {
    question: t('Do you work with early-stage founders with limited budgets?', 'Nagtatrabaho ba kayo kasama ang mga early-stage na founder na may limitadong badyet?'),
    answer: t(
      'Yes. We prioritize lean, high-impact solutions that help founders validate ideas quickly and scale responsibly.',
      'Oo. Inuuna namin ang mga lean, mataas na epektong solusyon na tumutulong sa mga founder na mabilis na mapatunayan ang mga ideya at mapalago nang responsable.',
    ),
  },
  {
    question: t("How do you ensure we're building the right features?", 'Paano ninyo titiyakin na nagtatayo kami ng tamang mga feature?'),
    answer: t(
      'We combine user research, rapid prototyping, and validation sprints to make sure we are aligned with real user needs.',
      'Pinagsasama namin ang pananaliksik ng gumagamit, mabilis na prototyping, at mga validation sprint upang matiyak na nakahanay kami sa tunay na mga pangangailangan ng gumagamit.',
    ),
  },
  {
    question: t("What's your process for working with SMEs?", 'Ano ang inyong proseso para sa pakikipagtulungan sa mga SME?'),
    answer: t(
      'We collaborate closely with SME stakeholders, define measurable goals, and build modular solutions that fit existing operations.',
      'Malapit kaming nakikipagtulungan sa mga stakeholder ng SME, nagtatakda ng nasusukat na mga layunin, at nagtatayo ng mga modular na solusyon na angkop sa kasalukuyang mga operasyon.',
    ),
  },
  {
    question: t('Do you offer long-term support after the MVP is launched?', 'Nag-aalok ba kayo ng pangmatagalang suporta pagkatapos ilunsad ang MVP?'),
    answer: t(
      'Absolutely. We can stay on to iterate, scale infrastructure, and provide product leadership as you grow.',
      'Tiyak. Maaari kaming manatili upang mag-iterate, mapalawak ang imprastraktura, at magbigay ng pamumuno sa produkto habang lumalago kayo.',
    ),
  },
  {
    question: t('Can you help with pitchdeck design or fundraising materials?', 'Makakatulong ba kayo sa disenyo ng pitchdeck o mga materyales sa fundraising?'),
    answer: t(
      'We regularly support teams with storytelling, pitch collateral, and interactive prototypes that resonate with investors.',
      'Regular naming sinusuportahan ang mga koponan sa storytelling, pitch collateral, at mga interactive na prototype na tumutugma sa mga mamumuhunan.',
    ),
  },
  {
    question: t('How do payments and project timelines work?', 'Paano gumagana ang mga pagbabayad at timeline ng proyekto?'),
    answer: t(
      'Engagements are scoped around milestones with transparent pricing and weekly progress checkpoints.',
      'Ang mga pakikipag-ugnayan ay nakabalangkas sa paligid ng mga milestone na may malinaw na pagpepresyo at lingguhang mga checkpoint ng pag-unlad.',
    ),
  },
  {
    question: t('Can we hire inv8 for just design or just development?', 'Maaari ba kaming kumuha ng inv8 para sa disenyo lamang o pagbuo lamang?'),
    answer: t(
      'Yes. We can plug into your team for specialized design, engineering, or end-to-end delivery.',
      'Oo. Maaari kaming sumali sa inyong koponan para sa espesyalisadong disenyo, inhinyeriya, o end-to-end na paghahatid.',
    ),
  },
  {
    question: t('Do you work with clients outside the Philippines?', 'Nagtatrabaho ba kayo kasama ang mga kliyente sa labas ng Pilipinas?'),
    answer: t(
      'We collaborate with teams globally, working asynchronously and within overlapping hours when needed.',
      'Nakikipagtulungan kami sa mga koponan sa buong mundo, nagtatrabaho nang asynchronously at sa loob ng magkakapatong na oras kapag kinakailangan.',
    ),
  },
])

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
          <h2 class="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">{{ t('Have questions?', 'Mayroon kang mga tanong?') }}</h2>
          <p class="text-4xl font-black leading-tight text-white/30 sm:text-5xl">{{ t("We've got answers.", 'Mayroon kaming mga sagot.') }}</p>
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
