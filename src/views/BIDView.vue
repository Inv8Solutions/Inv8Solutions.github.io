<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useLanguage } from '@/composables/useLanguage'
import heroImage from '@/assets/hero-image.png'
import { db } from '@/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const { t, lang } = useLanguage()

const router = useRouter()
const { isDark } = useTheme()

const openFaq = ref<number | null>(null)
const toggleFaq = (i: number) => { openFaq.value = openFaq.value === i ? null : i }

// ── Application form ──
const form = ref({
  name: '',
  businessName: '',
  businessType: '',
  otherBusinessType: '',
  teamSize: '',
  painPoint: '',
  isDecisionMaker: '' as 'yes' | 'no' | '',
  contact: '',
})
const formSubmitted = ref(false)
const formError = ref('')
const formLoading = ref(false)

function scrollToApply() {
  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
}

async function submitForm() {
  formError.value = ''
  const otherSelected = form.value.businessType === 'Other' || form.value.businessType === 'Iba pa'
  if (!form.value.name || !form.value.businessName || !form.value.businessType || (otherSelected && !form.value.otherBusinessType) || !form.value.teamSize || !form.value.painPoint || !form.value.isDecisionMaker || !form.value.contact) {
    formError.value = t('Please fill in all fields before submitting.', 'Pakipunan ang lahat ng patlang bago isumite.')
    return
  }
  formLoading.value = true
  try {
    await addDoc(collection(db, 'bid_applications'), {
      name: form.value.name,
      businessName: form.value.businessName,
      businessType: otherSelected
        ? `Other: ${form.value.otherBusinessType}`
        : form.value.businessType,
      teamSize: form.value.teamSize,
      painPoint: form.value.painPoint,
      isDecisionMaker: form.value.isDecisionMaker,
      contact: form.value.contact,
      submittedAt: serverTimestamp(),
    })
    formSubmitted.value = true
  } catch {
    formError.value = t('Something went wrong. Please try again or message us directly.', 'May naganap na error. Pakisubukang muli o makipag-ugnayan sa amin nang direkta.')
  } finally {
    formLoading.value = false
  }
}

const faqs = computed(() => [
  {
    q: t('Is this really free?', 'Libre ba talaga ito?'),
    a: t('Yes. The BID visit and the Innovation Opportunity Report cost you nothing. There is no hidden fee and no obligation to hire inv8 afterward.', 'Oo. Ang BID visit at ang Innovation Opportunity Report ay walang bayad. Walang nakatagong bayad at walang obligasyong kumuha ng inv8 pagkatapos.'),
  },
  {
    q: t('Will you try to sell me something during the visit?', 'Magbebenta ba kayo ng kahit ano sa akin sa panahon ng pagbisita?'),
    a: t('No. The visit is purely for observation and discovery. We are there to understand your business, not to pitch you. If, after the debrief, you want to explore working with us, we will discuss that separately.', 'Hindi. Ang pagbisita ay para lamang sa obserbasyon at pagtuklas. Nandoon kami para maunawaan ang iyong negosyo, hindi para mag-pitch sa iyo. Kung pagkatapos ng debrief ay gusto mong tuklasin ang pakikipagtulungan sa amin, tatalakayin namin iyon nang hiwalay.'),
  },
  {
    q: t('What if I am not tech-savvy?', 'Paano kung hindi ako marunong sa teknolohiya?'),
    a: t('That is exactly who this program is for. You do not need to know anything about technology or digital tools. We will explain everything in plain language and make sure the report is easy to understand.', 'Iyon mismo ang target ng programang ito. Hindi mo kailangang malaman ang anumang bagay tungkol sa teknolohiya o digital na kasangkapan. Ipapaliwanag namin ang lahat sa simpleng wika at titiyakin naming madaling maunawaan ang ulat.'),
  },
  {
    q: t('What kind of opportunities will you find?', 'Anong uri ng pagkakataon ang mahahanap ninyo?'),
    a: t('It depends on your business. Common areas we identify include: reducing time spent on manual tasks, improving how customers find or contact the business, organizing records and inventory, and streamlining how orders or transactions are processed. Every report is specific to what we actually observe.', 'Depende ito sa iyong negosyo. Karaniwang mga lugar na natutukoy namin: pagbabawas ng oras sa mga manu-manong gawain, pagpapabuti ng paraan ng paghahanap o pakikipag-ugnayan ng mga customer sa negosyo, pag-oorganisa ng mga rekord at imbentaryo, at pag-streamline ng pagpoproseso ng mga order o transaksyon.'),
  },
  {
    q: t('What happens after the debrief?', 'Ano ang mangyayari pagkatapos ng debrief?'),
    a: t('You decide. If one of the opportunities in the report is something you want to act on, we can discuss how inv8 can help. If you want to handle it on your own or work with someone else, that is completely fine. The report is yours either way.', 'Ikaw ang magpapasya. Kung ang isa sa mga pagkakataon sa ulat ay gusto mong aksyunan, maaari naming talakayin kung paano makakatulong ang inv8. Kung gusto mong hawakan ito nang mag-isa o makipagtulungan sa ibang tao, ayos lang iyon. Ang ulat ay sa iyo kahit paano.'),
  },
  {
    q: t('How do I know if I will be selected?', 'Paano ko malalaman kung mapipili ako?'),
    a: t('We select businesses based on a few criteria: whether you are the decision-maker, whether your business has a clear operational pain we can help with, and whether the timing and logistics work for both sides. We will let you know within 2 to 3 days of your application.', 'Pinipili namin ang mga negosyo batay sa ilang pamantayan: kung ikaw ang gumagawa ng desisyon, kung ang iyong negosyo ay may malinaw na operational na problema na makakatulong kami, at kung ang timing at logistics ay gumagana para sa magkabilang panig. Ipapaalam namin sa iyo sa loob ng 2 hanggang 3 araw ng iyong aplikasyon.'),
  },
  {
    q: t('What if I am not selected for this batch?', 'Paano kung hindi ako mapili para sa batch na ito?'),
    a: t('We keep strong applications on file for the next batch. You will not need to reapply from scratch.', 'Pinapanatili namin ang mga matibay na aplikasyon para sa susunod na batch. Hindi mo na kailangang mag-apply muli mula sa simula.'),
  },
  {
    q: t('Is this only for businesses in Baguio City proper?', 'Para lamang ba ito sa mga negosyo sa loob ng Baguio City?'),
    a: t('No. We cover the full Baguio-Benguet area, including La Trinidad, Itogon, Tublay, and other parts of Benguet. If your business is further out, reach out and we will check if logistics work.', 'Hindi. Sinasaklaw namin ang buong lugar ng Baguio-Benguet, kabilang ang La Trinidad, Itogon, Tublay, at iba pang bahagi ng Benguet. Kung mas malayo ang iyong negosyo, makipag-ugnayan sa amin at titingnan namin kung gumagana ang logistics.'),
  },
])

const businessTypes = computed(() => lang.value === 'fil' ? [
  'Tindahan o Retail',
  'Pagkain at Inumin',
  'Kooperatibo',
  'Turismo o Tirahan',
  'Klinika o Wellness',
  'Paaralan o Pagsasanay',
  'Serbisyo (salon, repair, atbp.)',
  'Samahan o Asosasyon',
  'Iba pa',
] : [
  'Retail or store',
  'Food and beverage',
  'Cooperative',
  'Tourism or accommodation',
  'Clinic or wellness',
  'School or training center',
  'Services (salon, repair, etc.)',
  'Chamber or association',
  'Other',
])

const teamSizes = computed(() => lang.value === 'fil' ? [
  'Ako lang',
  '2 hanggang 5 tao',
  '6 hanggang 20 tao',
  '21 hanggang 50 tao',
  'Mahigit 50',
] : [
  'Just me',
  '2 to 5 people',
  '6 to 20 people',
  '21 to 50 people',
  'More than 50',
])

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
            {{ t('June 2026 Batch · Now Open', 'Batch ng Hunyo 2026 · Bukas Na') }}
          </span>

          <!-- Headline -->
          <h1
            class="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-5xl transition-colors duration-300"
            :class="isDark ? 'text-white' : 'text-gray-900'"
          >
            {{ t('We visit your business.', 'Bibisita kami sa iyong negosyo.') }}<br />
            <span class="text-blue-500">{{ t('You get a free', 'Makakatanggap ka ng libreng') }}<br />{{ t('improvement plan.', 'plano ng pagpapabuti.') }}</span>
          </h1>

          <!-- First description -->
          <p
            class="mt-5 text-base leading-relaxed max-w-md transition-colors duration-300"
            :class="isDark ? 'text-white/60' : 'text-gray-600'"
          >
            {{ t("We'll take a close look at how your business operates and identify practical ways to save time, improve workflows, and better serve your customers.", 'Masusing titingnan namin kung paano gumagana ang iyong negosyo at tutukuyin ang mga praktikal na paraan para makatipid ng oras, mapabuti ang mga daloy ng trabaho, at mas mahusay na mapagsilbihan ang iyong mga customer.') }}
          </p>

          <!-- Blue rule -->
          <div class="my-5 w-10 border-t-2 border-blue-500"></div>

          <!-- Second description -->
          <p
            class="text-base leading-relaxed max-w-md transition-colors duration-300"
            :class="isDark ? 'text-white/60' : 'text-gray-600'"
          >
            {{ t('Receive a personalized report with clear recommendations, estimated costs, and next steps. Yours to keep, whether you work with us or not.', 'Makatanggap ng personalisadong ulat na may malinaw na rekomendasyon, tinatayang gastos, at susunod na hakbang. Sa iyo ito, kahit magtrabaho ka sa amin o hindi.') }}
          </p>

          <!-- CTA -->
          <button
            @click="scrollToApply()"
            class="mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 hover:scale-105 w-fit"
          >
            <i class="fa-solid fa-calendar-days text-base"></i>
            {{ t('Apply for a Free Slot', 'Mag-apply para sa Libreng Slot') }}
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
              {{ t('No obligation. No sales pressure.', 'Walang obligasyon. Walang presyon sa pagbebenta.') }}
            </div>
            <div
              class="flex items-center gap-3 text-sm transition-colors duration-300"
              :class="isDark ? 'text-white/50' : 'text-gray-500'"
            >
              <i class="fa-solid fa-users text-blue-500 w-5 text-center"></i>
              {{ t('Only 3 businesses are selected per batch.', '3 negosyo lamang ang napipili sa bawat batch.') }}
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
              >{{ t("What you'll get:", 'Makukuha mo:') }}</p>
              <div class="mt-2 space-y-1.5">
                <div
                  v-for="item in [
                    t('On-site visit and discovery', 'On-site na pagbisita at pagtuklas'),
                    t('Your Improvement Plan (delivered in 5 days)', 'Ang iyong Plano ng Pagpapabuti (maihahatid sa loob ng 5 araw)'),
                    t('Walkthrough and Q&A session', 'Walkthrough at Q&A session'),
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
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('What Is the BID Program?', 'Ano ang Programang BID?') }}</p>
            <h2 class="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              {{ t('A free business check-up for', 'Isang libreng pagsusuri ng negosyo para sa') }}
              <span class="text-blue-500"> {{ t('Baguio-Benguet businesses.', 'mga negosyo sa Baguio-Benguet.') }}</span>
            </h2>

            <!-- Definition pill -->
            <div class="mt-6 flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
              <i class="fa-solid fa-book-open text-blue-400 text-sm shrink-0"></i>
              <p class="text-sm text-white/80 leading-snug">
                {{ t('BID stands for', 'Ang BID ay nangangahulugang') }} <span class="font-bold text-blue-400">Business Innovation Discovery.</span>
              </p>
            </div>

            <!-- Description -->
            <p class="mt-5 text-base leading-relaxed text-white/60">
              {{ t("It's a free on-site business assessment where the inv8 team visits your business, observes how things work, and identifies practical ways to improve operations, save time, and reduce day-to-day frustrations.", 'Ito ay isang libreng on-site na pagsusuri ng negosyo kung saan bibisita ang koponan ng inv8 sa iyong negosyo, magsusuri kung paano gumagana ang mga bagay, at tutukuyin ang mga praktikal na paraan para mapabuti ang mga operasyon, makatipid ng oras, at mabawasan ang pang-araw-araw na mga frustrasyon.') }}
            </p>

            <!-- 4 process items -->
            <div class="mt-8 space-y-5">
              <div
                v-for="item in [
                  { icon: 'fa-solid fa-clock',            title: t('We visit your business.', 'Bibisita kami sa iyong negosyo.'),                                       sub: t('We spend 1.5 to 2 hours on-site, observe your operations, and ask the right questions.', 'Gumagugol kami ng 1.5 hanggang 2 oras on-site, sinisiyasat ang iyong mga operasyon, at nagtatanong ng tamang mga tanong.') },
                  { icon: 'fa-solid fa-magnifying-glass', title: t('We identify opportunities.', 'Tutukuyin namin ang mga pagkakataon.'),                               sub: t('We look for areas causing delays, manual work, inefficiencies, or missed opportunities.', 'Naghahanap kami ng mga lugar na nagdudulot ng pagkaantala, manu-manong trabaho, hindi kahusayan, o napalampas na mga pagkakataon.') },
                  { icon: 'fa-solid fa-file-lines',       title: t('You receive a personalized Improvement Plan.', 'Makakatanggap ka ng personalisadong Plano ng Pagpapabuti.'), sub: t('Within 5 days, you will receive a clear, jargon-free report with practical recommendations, cost estimates, and next steps.', 'Sa loob ng 5 araw, makakatanggap ka ng malinaw, simpleng ulat na may praktikal na rekomendasyon, tinatayang gastos, at susunod na hakbang.') },
                  { icon: 'fa-solid fa-check',            title: t('You decide what is next.', 'Ikaw ang magpapasya ng susunod.'),                                       sub: t('The report is yours to keep, whether you work with inv8 or not.', 'Ang ulat ay sa iyo, kahit magtrabaho ka sa inv8 o hindi.') },
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
                <span class="font-bold text-blue-400">{{ t('It is free.', 'Libre ito.') }}</span> {{ t('And it is for businesses right here in Baguio-Benguet.', 'At ito ay para sa mga negosyo dito sa Baguio-Benguet.') }}
              </p>
            </div>
          </div>

          <!-- ── Right: What You Can Expect ── -->
          <div class="rounded-2xl border border-white/[0.07] bg-[#0a0c1c] p-6 self-start">
            <p class="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5">{{ t('What You Can Expect', 'Ano ang Maaasahan Mo') }}</p>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              <div
                v-for="stat in [
                  { icon: 'fa-solid fa-clock',          value: t('2 Hours', '2 Oras'),   label: t('On-site business visit', 'On-site na pagbisita sa negosyo'),         sub: t('We spend time at your business.', 'Gumagugol kami ng oras sa iyong negosyo.') },
                  { icon: 'fa-solid fa-calendar-days',  value: t('5 Days', '5 Araw'),    label: t('Receive your Improvement Plan', 'Makatanggap ng iyong Plano ng Pagpapabuti'), sub: t('We deliver your report within 5 working days.', 'Inihahain namin ang iyong ulat sa loob ng 5 araw ng trabaho.') },
                  { icon: 'fa-solid fa-peso-sign',      value: '₱0',                     label: t('No cost to participate', 'Walang bayad para lumahok'),                sub: t('100% free with no hidden fees.', '100% libre na walang nakatagong bayad.') },
                  { icon: 'fa-solid fa-lightbulb',      value: '3',                      label: t('Recommendations', 'Mga Rekomendasyon'),                              sub: t('Practical opportunities for improvement in every report.', 'Praktikal na pagkakataon para sa pagpapabuti sa bawat ulat.') },
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

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HOW BID WORKS
    ═══════════════════════════════════════ -->
    <section class="px-4 pb-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <div class="rounded-2xl border border-white/[0.07] bg-[#0a0c1c] p-8">
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-8">{{ t('How BID Works', 'Paano Gumagana ang BID') }}</p>

          <!-- Steps with arrows -->
          <div class="grid grid-cols-2 gap-6 sm:flex sm:items-start sm:justify-between sm:gap-2">
            <div
              v-for="(step, i) in [
                { icon: 'fa-solid fa-store',            n: '1', title: t('We Visit', 'Bibisita Kami'),     desc: t('We come to your business and meet with you and your team.', 'Pupunta kami sa iyong negosyo at makikipagkita sa iyo at sa iyong koponan.') },
                { icon: 'fa-solid fa-magnifying-glass', n: '2', title: t('We Observe', 'Magsusuri Kami'),  desc: t('We observe how things work, ask questions, and take note of what we see.', 'Sinisiyasat namin kung paano gumagana ang mga bagay, nagtatanong, at nagrerehistro ng aming nakikita.') },
                { icon: 'fa-solid fa-file-lines',       n: '3', title: t('We Report', 'Mag-uulat Kami'),   desc: t('You receive a personalized Improvement Plan within 5 days.', 'Makakatanggap ka ng personalisadong Plano ng Pagpapabuti sa loob ng 5 araw.') },
                { icon: 'fa-solid fa-rocket',           n: '4', title: t('You Decide', 'Ikaw ang Magpapasya'), desc: t('Use the recommendations to improve your business in your own way and at your own pace.', 'Gamitin ang mga rekomendasyon para mapabuti ang iyong negosyo sa iyong sariling paraan at sa iyong sariling bilis.') },
              ]"
              :key="step.n"
              class="flex sm:flex-1 sm:items-start"
            >
              <!-- Step item -->
              <div class="flex flex-col items-center text-center w-full">
                <div class="flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/30 bg-[#111528] text-blue-400">
                  <i :class="[step.icon, 'text-xl']"></i>
                </div>
                <p class="mt-3 text-sm font-bold text-white leading-snug">{{ step.n }}. {{ step.title }}</p>
                <p class="mt-1.5 text-xs text-white/45 leading-relaxed max-w-[140px]">{{ step.desc }}</p>
              </div>

              <!-- Arrow between steps (desktop only) -->
              <div v-if="i < 3" class="hidden sm:flex items-start pt-7 px-2 shrink-0">
                <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-white/25">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- No-obligation footer -->
          <div class="mt-8 border-t border-white/[0.06] pt-6 flex items-start gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
              <i class="fa-solid fa-shield-halved text-base"></i>
            </div>
            <div>
              <p class="font-bold text-white leading-snug">{{ t('No obligation. No sales pressure.', 'Walang obligasyon. Walang presyon sa pagbebenta.') }}</p>
              <p class="mt-1 text-sm text-white/50 leading-relaxed">{{ t("Our goal is to share useful insights. If you need help implementing the recommendations, we'll be here when you're ready.", 'Ang aming layunin ay magbahagi ng kapaki-pakinabang na mga kaalaman. Kung kailangan mo ng tulong sa pagpapatupad ng mga rekomendasyon, nandito kami kapag handa ka na.') }}</p>
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
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('Who This Is For', 'Para Kanino Ito') }}</p>

            <!-- Headline -->
            <h2 class="mt-4 text-3xl font-black leading-snug text-white sm:text-4xl">
              {{ t('Made for business owners who know things can', 'Para sa mga may-ari ng negosyo na alam na may mas magagawang') }}
              <span class="text-blue-500"> {{ t('run better.', 'pagpapabuti.') }}</span>
            </h2>

            <!-- Description -->
            <p class="mt-5 text-base leading-relaxed text-white/60">
              {{ t('The BID Program is designed for Baguio-Benguet businesses that are already operating and looking for practical ways to improve their day-to-day operations.', 'Ang Programang BID ay dinisenyo para sa mga negosyo sa Baguio-Benguet na tumatakbo na at naghahanap ng mga praktikal na paraan para mapabuti ang kanilang pang-araw-araw na mga operasyon.') }}
            </p>
            <p class="mt-3 text-base leading-relaxed text-white/60">
              {{ t("You don't need a website, digital tools, or technical knowledge to participate.", 'Hindi mo kailangan ng website, digital na kasangkapan, o teknikal na kaalaman para lumahok.') }}
            </p>

            <!-- Blue rule -->
            <div class="my-6 w-10 border-t-2 border-blue-500"></div>

            <!-- Good fit checklist -->
            <p class="mb-4 text-base font-bold text-white">{{ t('Are you a good fit?', 'Akma ka ba?') }}</p>
            <div class="space-y-3">
              <div
                v-for="item in [
                  t('Your business has been operating for at least 1 year', 'Ang iyong negosyo ay tumatakbo na ng hindi bababa sa 1 taon'),
                  t('You have 3 to 50 people on your team', 'Mayroon kang 3 hanggang 50 tao sa iyong koponan'),
                  t('You want to improve how your business runs', 'Gusto mong mapabuti kung paano tumatakbo ang iyong negosyo'),
                  t('You are the owner or decision-maker', 'Ikaw ang may-ari o ang gumagawa ng desisyon'),
                  t('You are based in Baguio City or anywhere in Benguet', 'Nakabase ka sa Baguio City o kahit saan sa Benguet'),
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
                {{ t('We keep it simple. No complicated forms.', 'Simple lang. Walang kumplikadong form.') }}<br />{{ t('Just answer a few questions to apply.', 'Sagutin lang ang ilang katanungan para mag-apply.') }}
              </p>
            </div>
          </div>

          <!-- ── Right column ── -->
          <div class="space-y-5">

            <!-- Businesses we work with -->
            <div class="rounded-2xl border border-white/[0.07] bg-[#0a0c1c] p-6">
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 mb-5">{{ t('Businesses We Commonly Work With', 'Mga Negosyong Karaniwang Kasama Namin') }}</p>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="biz in [
                    { icon: 'fa-solid fa-store',           label: t('Retail Stores', 'Mga Tindahan'),                    desc: t('Sari-sari stores, boutiques, convenience stores, and more', 'Sari-sari store, boutique, convenience store, at iba pa') },
                    { icon: 'fa-solid fa-mug-hot',         label: t('Cafés & Restaurants', 'Mga Café at Restaurant'),    desc: t('Cafés, dine-in restaurants, fast food, and bakeries', 'Café, dine-in restaurant, fast food, at panaderia') },
                    { icon: 'fa-solid fa-suitcase-rolling', label: t('Hotels & Tourism', 'Hotel at Turismo'),            desc: t('Guesthouses, homestays, travel and tour operators', 'Guesthouse, homestay, travel at tour operator') },
                    { icon: 'fa-solid fa-kit-medical',     label: t('Clinics & Wellness', 'Klinika at Wellness'),        desc: t('Clinics, dental practices, spas, and wellness centers', 'Klinika, dental, spa, at wellness center') },
                    { icon: 'fa-solid fa-graduation-cap',  label: t('Schools & Training Centers', 'Paaralan at Pagsasanay'), desc: t('Private schools, tutorial centers, and training providers', 'Pribadong paaralan, tutorial center, at training provider') },
                    { icon: 'fa-solid fa-people-group',    label: t('Cooperatives & Associations', 'Kooperatibo at Asosasyon'), desc: t('Co-ops, transport groups, and member-based orgs', 'Co-op, transport group, at member-based na organisasyon') },
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
                    <p class="text-sm font-bold text-white leading-snug">{{ t('Service-Based Businesses', 'Mga Negosyong Nakabatay sa Serbisyo') }}</p>
                    <p class="mt-0.5 text-xs leading-relaxed text-white/45">{{ t('Construction, repair services, salons, laundry, printing, logistics, and other service providers', 'Konstruksyon, serbisyo sa pagkukumpuni, salon, laundry, printing, logistics, at iba pang tagapagbigay ng serbisyo') }}</p>
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
                <p class="font-bold text-white text-base">{{ t('This Program Is Not For', 'Hindi Para sa Programang Ito') }}</p>
              </div>
              <div class="space-y-3">
                <div v-for="item in [
                  t('Businesses that have not started operating yet', 'Mga negosyong hindi pa nagsisimula ng operasyon'),
                  t('Business ideas that are still in the planning stage', 'Mga ideya sa negosyo na nasa yugto pa ng pagpaplano'),
                  t('Individuals looking for employment or training', 'Mga indibidwal na naghahanap ng trabaho o pagsasanay'),
                ]" :key="item" class="flex items-start gap-3">
                  <i class="fa-solid fa-xmark text-red-400 mt-0.5 shrink-0 w-4 text-center"></i>
                  <span class="text-sm text-white/65">{{ item }}</span>
                </div>
              </div>
              <div class="mt-5 border-t border-white/[0.06] pt-4">
                <p class="text-sm leading-relaxed text-white/45">
                  {{ t('The BID Program focuses on real operating businesses so we can observe actual workflows, identify challenges, and provide practical recommendations.', 'Ang Programang BID ay nakatuon sa mga tunay na gumaganang negosyo para makapag-obserba kami ng aktwal na mga daloy ng trabaho, matukoy ang mga hamon, at makapagbigay ng mga praktikal na rekomendasyon.') }}
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
              <p class="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">{{ t('Limited Slots Per Batch', 'Limitadong Slot sa Bawat Batch') }}</p>
              <h2 class="mt-3 text-2xl font-black text-white sm:text-3xl">{{ t('Each batch is limited to 3 businesses.', 'Ang bawat batch ay limitado sa 3 negosyo.') }}</h2>
              <p class="mt-4 max-w-lg text-base leading-relaxed text-white/60">
                {{ t('This is intentional. We want to give each visit the time and attention it deserves, and we want the report to be genuinely useful — not rushed.', 'Ito ay sinadya. Nais naming ibigay sa bawat pagbisita ang oras at atensyong nararapat dito, at nais naming ang ulat ay tunay na kapaki-pakinabang — hindi nagmamadali.') }}
              </p>
              <p class="mt-3 text-sm text-white/50">
                {{ t('Applications are reviewed before slots are confirmed. Not everyone who applies will be selected for the current batch, but we keep strong applications on file for the next one.', 'Ang mga aplikasyon ay sinusuri bago kumpirmahin ang mga slot. Hindi lahat ng nag-apply ay mapipili para sa kasalukuyang batch, ngunit pinapanatili namin ang mga matibay na aplikasyon para sa susunod.') }}
              </p>
            </div>
            <div class="flex flex-col items-start gap-3 sm:items-end sm:shrink-0">
              <button
                @click="scrollToApply()"
                class="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-amber-400 hover:scale-105 shadow-lg shadow-amber-500/20"
              >
                {{ t('Apply Now — June 2026 Batch', 'Mag-apply Ngayon — Batch ng Hunyo 2026') }}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <p class="text-xs text-amber-400/70">{{ t('Slots are limited. Applications close once the batch is full.', 'Limitado ang mga slot. Magsasara ang mga aplikasyon kapag puno na ang batch.') }}</p>
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
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('Why inv8?', 'Bakit inv8?') }}</p>
            <h2 class="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              {{ t('Local knowledge.', 'Lokal na kaalaman.') }}<br />
              {{ t('Practical recommendations.', 'Praktikal na rekomendasyon.') }}<br />
              <span class="text-blue-500">{{ t('No unnecessary complexity.', 'Walang hindi kinakailangang komplikasyon.') }}</span>
            </h2>

            <div class="mt-10 space-y-0 divide-y divide-white/[0.06]">
              <div
                v-for="pillar in [
                  {
                    icon: 'fa-solid fa-mountain-sun',
                    title: t('We understand local businesses.', 'Naiintindihan namin ang mga lokal na negosyo.'),
                    body: t('We work with businesses, cooperatives, schools, and organizations across Baguio and Benguet. By spending time on the ground, we understand how local businesses operate and what challenges they face.', 'Nagtatrabaho kami kasama ang mga negosyo, kooperatibo, paaralan, at organisasyon sa buong Baguio at Benguet. Sa pamamagitan ng paggugol ng oras sa larangan, naiintindihan namin kung paano gumagana ang mga lokal na negosyo at kung anong mga hamon ang kinakaharap nila.'),
                  },
                  {
                    icon: 'fa-solid fa-bullseye',
                    title: t('We recommend what makes sense.', 'Inirerekomenda namin ang makatuwiran.'),
                    body: t('We are not interested in recommending expensive systems or complicated technology for the sake of it. We focus on solutions that save time, reduce manual work, improve customer experience, and support business growth.', 'Hindi kami interesado sa pag-rekomenda ng mga mahal na sistema o kumplikadong teknolohiya para lang dito. Nakatuon kami sa mga solusyong nakakatipid ng oras, nagbabawas ng manu-manong trabaho, nagpapabuti ng karanasan ng customer, at sumusuporta sa paglago ng negosyo.'),
                  },
                  {
                    icon: 'fa-solid fa-handshake',
                    title: t('We earn trust by doing good work.', 'Kinukuha namin ang tiwala sa pamamagitan ng paggawa ng mabuting trabaho.'),
                    body: t('The BID Program is our way of getting to know local businesses and sharing useful recommendations before asking for anything in return.', 'Ang Programang BID ay ang aming paraan ng pagkilala sa mga lokal na negosyo at pagbabahagi ng mga kapaki-pakinabang na rekomendasyon bago humingi ng kahit anong kapalit.'),
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
              <p class="text-lg font-bold text-blue-400">{{ t('What We Bring', 'Ano ang Dala Namin') }}</p>
            </div>

            <!-- Service list -->
            <div class="divide-y divide-white/[0.06]">
              <div
                v-for="svc in [
                  { icon: 'fa-solid fa-pen-ruler',    title: t('Product & Service Design', 'Disenyo ng Produkto at Serbisyo'),    desc: t('We help design better experiences for your customers and team.', 'Tinutulungan namin na magdisenyo ng mas magandang karanasan para sa iyong mga customer at koponan.') },
                  { icon: 'fa-solid fa-display',      title: t('Websites & Digital Platforms', 'Mga Website at Digital Platform'), desc: t('Modern, secure, and easy-to-manage websites and systems.', 'Makabago, ligtas, at madaling pamahalaan na mga website at sistema.') },
                  { icon: 'fa-solid fa-gears',        title: t('Business Process Automation', 'Awtomatikong Proseso ng Negosyo'), desc: t('We help reduce manual work and improve day-to-day operations.', 'Tinutulungan namin na mabawasan ang manu-manong trabaho at mapabuti ang pang-araw-araw na mga operasyon.') },
                  { icon: 'fa-solid fa-chart-bar',    title: t('Internal Tools & Dashboards', 'Mga Panloob na Kasangkapan'),      desc: t('Tools that help you track, manage, and make better decisions.', 'Mga kasangkapan na tumutulong sa iyong subaybayan, pamahalaan, at gumawa ng mas magandang desisyon.') },
                  { icon: 'fa-solid fa-wifi',         title: t('IoT & Smart Systems', 'IoT at Matalinong Sistema'),              desc: t('Solutions that connect devices and automate physical processes.', 'Mga solusyong nagkokonekta ng mga device at nag-o-automate ng mga pisikal na proseso.') },
                  { icon: 'fa-solid fa-location-dot', title: t('Local, On-Site Collaboration', 'Lokal, On-Site na Pakikipagtulungan'), desc: t('We visit your business and work closely with your team.', 'Bibisita kami sa iyong negosyo at makikipagtulungan nang malapit sa iyong koponan.') },
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
                <span class="font-bold text-blue-400">{{ t('One team', 'Isang koponan') }}</span> {{ t('that can help identify opportunities and support implementation when needed.', 'na makakatulong sa pagtukoy ng mga pagkakataon at suporta sa pagpapatupad kapag kinakailangan.') }}
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
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('Questions You Might Have', 'Mga Tanong na Maaaring Mayroon Ka') }}</p>
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
         APPLICATION FORM
    ═══════════════════════════════════════ -->
    <section id="apply" class="px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">

        <!-- Header -->
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('Apply for a Slot', 'Mag-apply ng Slot') }}</p>
        <h2 class="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
          {{ t('Tell us about', 'Sabihin mo sa amin ang') }}<br /><span class="text-blue-500">{{ t('your business.', 'iyong negosyo.') }}</span>
        </h2>
        <p class="mt-4 text-base leading-relaxed text-white/55">
          {{ t('This takes less than 3 minutes. We review every application personally and get back to you within 2 to 3 days.', 'Mas mababa sa 3 minuto ito. Sinusuri namin ang bawat aplikasyon nang personal at sumasagot sa loob ng 2 hanggang 3 araw.') }}
        </p>

        <!-- Success state -->
        <div v-if="formSubmitted" class="mt-10 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-8 text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
            <i class="fa-solid fa-check text-xl"></i>
          </div>
          <h3 class="mt-4 text-xl font-black text-white">{{ t('Application received!', 'Natanggap ang aplikasyon!') }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-white/60">
            {{ t("We'll review your application and reach out within 2 to 3 days via the contact you provided. Thank you for applying.", 'Susuriin namin ang iyong aplikasyon at makikipag-ugnayan sa loob ng 2 hanggang 3 araw sa pamamagitan ng contact na ibinigay mo. Salamat sa pag-apply.') }}
          </p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submitForm" class="mt-10 space-y-6">

          <!-- Grid: Name + Business Name -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <!-- Field 1: Name -->
            <div>
              <label class="block text-sm font-bold text-white/80 mb-2">{{ t('Your name', 'Iyong pangalan') }}</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="e.g. Maria Santos"
                class="w-full rounded-xl border border-white/10 bg-[#0d0f1f] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

            <!-- Field 2: Business Name -->
            <div>
              <label class="block text-sm font-bold text-white/80 mb-2">{{ t('What is your business called?', 'Ano ang pangalan ng iyong negosyo?') }}</label>
              <input
                v-model="form.businessName"
                type="text"
                placeholder="e.g. Santis Bakery"
                class="w-full rounded-xl border border-white/10 bg-[#0d0f1f] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
          </div>

          <!-- Field 3: Business Type -->
          <div>
            <label class="block text-sm font-bold text-white/80 mb-3">{{ t('What kind of business do you run?', 'Anong uri ng negosyo ang pinapatakbo mo?') }}</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="type in businessTypes"
                :key="type"
                type="button"
                @click="form.businessType = type"
                class="rounded-full border px-4 py-2 text-xs font-semibold transition"
                :class="form.businessType === type
                  ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:text-white/80'"
              >{{ type }}</button>
            </div>

            <!-- "Other" text input -->
            <Transition name="faq-drop">
              <div v-if="form.businessType === 'Other' || form.businessType === 'Iba pa'" class="mt-3">
                <input
                  v-model="form.otherBusinessType"
                  type="text"
                  :placeholder="t('Please describe your business type…', 'Ilarawan ang uri ng iyong negosyo…')"
                  autofocus
                  class="w-full rounded-xl border border-blue-500/30 bg-[#0d0f1f] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>
            </Transition>
          </div>

          <!-- Field 4: Team Size -->
          <div>
            <label class="block text-sm font-bold text-white/80 mb-3">{{ t('How many people work in your business?', 'Ilang tao ang nagtatrabaho sa iyong negosyo?') }}</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in teamSizes"
                :key="size"
                type="button"
                @click="form.teamSize = size"
                class="rounded-full border px-4 py-2 text-xs font-semibold transition"
                :class="form.teamSize === size
                  ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:text-white/80'"
              >{{ size }}</button>
            </div>
          </div>

          <!-- Field 5: Pain Point -->
          <div>
            <label class="block text-sm font-bold text-white/80 mb-1">{{ t('What is the one thing in your business you wish ran smoother?', 'Ano ang isang bagay sa iyong negosyo na sana ay mas maayos ang pagtatakbo?') }}</label>
            <p class="text-xs text-white/35 mb-2">{{ t('2 to 3 sentences is enough. Be as specific as you can.', '2 hanggang 3 pangungusap na lang. Maging tiyak hangga maaari.') }}</p>
            <textarea
              v-model="form.painPoint"
              rows="4"
              :placeholder="t('e.g. We manually encode all our orders into a spreadsheet every day and it takes about 2 hours. We keep making errors and sometimes miss orders entirely.', 'hal. Manu-mano naming ini-encode ang lahat ng aming mga order sa spreadsheet araw-araw at tumatagal ng mga 2 oras. Palagi kaming nagkakamali at minsan ay napalampas ang mga order.')"
              class="w-full rounded-xl border border-white/10 bg-[#0d0f1f] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 resize-none"
            ></textarea>
          </div>

          <!-- Field 6: Decision Maker -->
          <div>
            <label class="block text-sm font-bold text-white/80 mb-3">{{ t('Are you the owner or manager who makes decisions for the business?', 'Ikaw ba ang may-ari o manager na gumagawa ng mga desisyon para sa negosyo?') }}</label>
            <div class="flex gap-3">
              <button
                type="button"
                @click="form.isDecisionMaker = 'yes'"
                class="flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition"
                :class="form.isDecisionMaker === 'yes'
                  ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:text-white/80'"
              >
                <i class="fa-solid fa-check text-xs"></i> {{ t('Yes', 'Oo') }}
              </button>
              <button
                type="button"
                @click="form.isDecisionMaker = 'no'"
                class="flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition"
                :class="form.isDecisionMaker === 'no'
                  ? 'border-red-500/60 bg-red-500/10 text-red-400'
                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:text-white/80'"
              >
                <i class="fa-solid fa-xmark text-xs"></i> {{ t('No', 'Hindi') }}
              </button>
            </div>
            <p v-if="form.isDecisionMaker === 'no'" class="mt-2 text-xs text-white/40">
              {{ t("That's okay — you can still apply. We may ask to connect with the decision-maker before confirming the slot.", 'Okay lang iyan — maaari ka pa ring mag-apply. Maaaring humingi kami na makipag-ugnayan sa decision-maker bago kumpirmahin ang slot.') }}
            </p>
          </div>

          <!-- Field 7: Contact -->
          <div>
            <label class="block text-sm font-bold text-white/80 mb-1">{{ t('What is the best way to reach you?', 'Ano ang pinakamabuting paraan para makipag-ugnayan sa iyo?') }}</label>
            <p class="text-xs text-white/35 mb-2">{{ t('Facebook name, Messenger link, or mobile number — whichever you check most.', 'Facebook name, Messenger link, o mobile number — alinman ang madalas mong sinisigurado.') }}</p>
            <input
              v-model="form.contact"
              type="text"
              :placeholder="t('e.g. m.me/mariasantos or 09xx-xxx-xxxx', 'hal. m.me/mariasantos o 09xx-xxx-xxxx')"
              class="w-full rounded-xl border border-white/10 bg-[#0d0f1f] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          <!-- Error message -->
          <p v-if="formError" class="text-sm text-red-400 flex items-center gap-2">
            <i class="fa-solid fa-circle-exclamation"></i> {{ formError }}
          </p>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="formLoading"
            class="w-full rounded-xl bg-blue-600 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <i v-if="formLoading" class="fa-solid fa-spinner animate-spin"></i>
            <i v-else class="fa-solid fa-paper-plane"></i>
            {{ formLoading ? t('Submitting…', 'Isinusumite…') : t('Submit My Application', 'Isumite ang Aking Aplikasyon') }}
          </button>

          <p class="text-center text-xs text-white/30">
            {{ t('We review every application personally. No spam, no pressure.', 'Personal naming sinusuri ang bawat aplikasyon. Walang spam, walang presyon.') }}
          </p>

        </form>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         FINAL CTA
    ═══════════════════════════════════════ -->
    <section class="px-4 py-24 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
          {{ t('Ready to see what your', 'Handa ka na bang malaman kung ano ang') }}<br class="hidden sm:block" />
          <span class="text-blue-400">{{ t('business is capable of?', 'kaya ng iyong negosyo?') }}</span>
        </h2>
        <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
          {{ t('Apply for a free BID slot. We will review your application and get back to you within 2 to 3 days.', 'Mag-apply para sa libreng BID slot. Susuriin namin ang iyong aplikasyon at babalik sa iyo sa loob ng 2 hanggang 3 araw.') }}
        </p>

        <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            @click="scrollToApply()"
            class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 hover:scale-105"
          >
            {{ t('Apply for Your Free Slot', 'Mag-apply para sa Iyong Libreng Slot') }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <p class="mt-4 text-sm text-white/35">{{ t('Only 3 slots per batch. June 2026 batch is now open.', '3 slot lamang sa bawat batch. Ang batch ng Hunyo 2026 ay bukas na.') }}</p>

        <p class="mt-6 text-sm text-white/40">
          {{ t('Questions? Message us at', 'May tanong? Makipag-ugnayan sa amin sa') }}
          <a href="mailto:hello@inv8.io" class="text-blue-400 underline underline-offset-2 hover:text-blue-300">hello@inv8.io</a>
          {{ t('or find us on', 'o hanapin kami sa') }}
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
