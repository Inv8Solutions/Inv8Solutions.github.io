<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLanguage } from '@/composables/useLanguage'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'

const router = useRouter()
const { observeElements } = useScrollAnimation()
const { t } = useLanguage()

// ── Application Form ──────────────────────────────────────────────────────────
const form = ref({
  name: '',
  email: '',
  company: '',
  website: '',
  stage: '',
  problem: '',
  traction: '',
  partnershipType: '',
  message: '',
})

const formLoading = ref(false)
const formStatus = ref<'idle' | 'success' | 'error'>('idle')
const formError = ref('')

const stageOptions = computed(() => [
  { value: 'idea', label: t('Idea stage — concept not yet built', 'Ideya pa lamang — hindi pa naitayo') },
  { value: 'prototype', label: t('Prototype — early version exists', 'Prototype — mayroon nang maagang bersyon') },
  { value: 'mvp', label: t('MVP — live but pre-revenue', 'MVP — live na ngunit wala pang kita') },
  { value: 'early-revenue', label: t('Early revenue — growing', 'Maaga pang kita — lumalagong') },
  { value: 'scaling', label: t('Scaling — ready to grow fast', 'Scaling — handa nang lumago nang mabilis') },
])

const partnershipOptions = computed(() => [
  { value: 'equity', label: t('Equity partnership', 'Partnership sa equity') },
  { value: 'revenue-share', label: t('Revenue-sharing agreement', 'Kasunduan sa revenue-sharing') },
  { value: 'hybrid', label: t('Hybrid model', 'Hybrid na modelo') },
  { value: 'open', label: t('Open to discussion', 'Bukas para sa talakayan') },
])

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || !form.value.problem || !form.value.stage) {
    formError.value = t('Please fill in all required fields.', 'Mangyaring punan ang lahat ng kinakailangang field.')
    formStatus.value = 'error'
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    formError.value = t('Please enter a valid email address.', 'Mangyaring maglagay ng wastong email address.')
    formStatus.value = 'error'
    return
  }

  formLoading.value = true
  formStatus.value = 'idle'
  formError.value = ''

  try {
    await addDoc(collection(db, 'venture_applications'), {
      ...form.value,
      submitted_at: new Date(),
      status: 'pending',
    })
    formStatus.value = 'success'
    form.value = { name: '', email: '', company: '', website: '', stage: '', problem: '', traction: '', partnershipType: '', message: '' }
  } catch {
    formError.value = t('Something went wrong. Please try again.', 'May naganap na error. Subukan muli.')
    formStatus.value = 'error'
  } finally {
    formLoading.value = false
  }
}

// ── Static data ───────────────────────────────────────────────────────────────
const offerings = computed(() => [
  {
    icon: 'fa-solid fa-compass-drafting',
    title: t('Product Strategy', 'Estratehiya sa Produkto'),
    description: t(
      'Validate your idea, define the right product, and reduce costly mistakes before you build.',
      'I-validate ang iyong ideya, tukuyin ang tamang produkto, at bawasan ang mga mamahaling pagkakamali bago magtayo.'
    ),
  },
  {
    icon: 'fa-solid fa-pen-ruler',
    title: t('Design & Engineering', 'Disenyo at Inhinyeriya'),
    description: t(
      'Build market-ready MVPs and polished digital products with a full product team behind you.',
      'Bumuo ng market-ready na MVP at mga polished na digital na produkto na may buong product team sa likod mo.'
    ),
  },
  {
    icon: 'fa-solid fa-chart-line',
    title: t('Go-To-Market Support', 'Suporta sa Go-To-Market'),
    description: t(
      'Craft positioning, messaging, and launch strategies that resonate with your target market.',
      'Lumikha ng positioning, mensahe, at mga estratehiya sa paglulunsad na tumutugon sa iyong target na merkado.'
    ),
  },
  {
    icon: 'fa-solid fa-handshake',
    title: t('Long-Term Partnership', 'Pangmatagalang Partnership'),
    description: t(
      'Work with a partner invested in your success — not just a vendor delivering a project.',
      'Makipagtulungan sa isang partner na namumuhunan sa iyong tagumpay — hindi lamang isang vendor na naghahatid ng proyekto.'
    ),
  },
])

const audiences = computed(() => [
  {
    icon: 'fa-solid fa-rocket',
    title: t('Early-Stage Startups', 'Mga Early-Stage na Startup'),
    description: t('Pre-seed and seed founders who need a product team without the overhead of hiring one.', 'Mga pre-seed at seed na founder na nangangailangan ng product team nang walang gastos ng pag-hire.'),
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: t('University Spin-offs', 'Mga University Spin-off'),
    description: t('Research teams and academic innovators ready to commercialize their work.', 'Mga research team at academic innovator na handang i-commercialize ang kanilang gawa.'),
  },
  {
    icon: 'fa-solid fa-lightbulb',
    title: t('Validated Idea Founders', 'Mga Founder na May Validated na Ideya'),
    description: t('Founders who have done the groundwork and are ready to build and launch.', 'Mga founder na nagawa na ang groundwork at handa nang magtayo at maglunsad.'),
  },
  {
    icon: 'fa-solid fa-building',
    title: t('New Digital Ventures', 'Mga Bagong Digital na Venture'),
    description: t('Established businesses launching a new digital product or internal innovation project.', 'Mga established na negosyo na naglulunsad ng bagong digital na produkto o panloob na innovation project.'),
  },
])

const partnershipModels = computed(() => [
  {
    icon: 'fa-solid fa-percent',
    label: t('Equity Partnership', 'Equity Partnership'),
    description: t(
      'We contribute product strategy, design, and development in exchange for an equity stake. Aligned incentives from day one.',
      'Nag-aambag kami ng product strategy, disenyo, at development kapalit ng equity stake. Naka-align na mga insentibo mula sa simula.'
    ),
  },
  {
    icon: 'fa-solid fa-arrow-right-arrow-left',
    label: t('Revenue Sharing', 'Revenue Sharing'),
    description: t(
      'We invest our execution capacity and share in a percentage of revenue generated. No large upfront cost for you.',
      'Namumuhunan kami ng aming execution capacity at nagbabahagi ng porsyento ng kita. Walang malaking upfront na gastos para sa iyo.'
    ),
  },
  {
    icon: 'fa-solid fa-sliders',
    label: t('Hybrid Model', 'Hybrid na Modelo'),
    description: t(
      'A combination of reduced fees, equity, and revenue share tailored to the specific opportunity and stage.',
      'Isang kombinasyon ng mas mababang bayad, equity, at revenue share na naka-tailor sa tiyak na oportunidad at yugto.'
    ),
  },
])

const steps = computed(() => [
  {
    step: '01',
    icon: 'fa-solid fa-file-pen',
    title: t('Apply', 'Mag-apply'),
    description: t('Submit your application and tell us about the problem you are solving, your team, and where you are today.', 'Isumite ang iyong aplikasyon at sabihin sa amin ang tungkol sa problemang iyong niresolba, ang iyong koponan, at kung nasaan ka ngayon.'),
  },
  {
    step: '02',
    icon: 'fa-solid fa-magnifying-glass-chart',
    title: t('Evaluate', 'Suriin'),
    description: t('We evaluate the opportunity, team, market potential, and strategic fit. Not every application moves forward.', 'Sinusuri namin ang oportunidad, koponan, potensyal ng merkado, at strategic fit. Hindi lahat ng aplikasyon ay sumusulong.'),
  },
  {
    step: '03',
    icon: 'fa-solid fa-handshake',
    title: t('Partnership Design', 'Disenyo ng Partnership'),
    description: t('If there is alignment, we design a partnership model that works for both sides — equity, revenue share, hybrid, or project-based.', 'Kung may pagkakaayon, nagdidisenyo kami ng modelo ng partnership na gumagana para sa magkabilang panig — equity, revenue share, hybrid, o project-based.'),
  },
  {
    step: '04',
    icon: 'fa-solid fa-rocket',
    title: t('Build & Launch', 'Itayo at Ilunsad'),
    description: t('Our team works alongside you to validate, design, build, and launch the venture. Together, we aim for impact.', 'Ang aming koponan ay nagtatrabaho kasabay mo upang i-validate, idisensyo, itayo, at ilunsad ang venture. Sama-sama, naglalayong lumikha ng epekto.'),
  },
])

onMounted(() => {
  observeElements('.vs-animate')
})
</script>

<template>
  <main class="bg-[#03040f]">

    <!-- ── Hero ──────────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden bg-[#03040f] pb-28 pt-20">
      <!-- Grid bg -->
      <div class="pointer-events-none absolute inset-0" style="background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 60px 60px;" aria-hidden="true"></div>
      <!-- Glow -->
      <div class="pointer-events-none absolute -top-24 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-15" style="background: radial-gradient(circle, #3b82f6 0%, transparent 65%);" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div class="vs-animate mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
          {{ t('inv8 Venture Studio', 'inv8 Venture Studio') }}
        </div>

        <h1 class="vs-animate animate-delay-100 text-5xl font-black leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
          {{ t('We Build Startups', 'Nagtatayo Kami ng mga') }}<br />
          <span class="text-blue-500">{{ t('With Founders', 'Startup Kasama ang mga Founder') }}</span>
        </h1>

        <p class="vs-animate animate-delay-200 mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/55">
          {{ t(
            'Not every founder has the resources to build a product, hire a team, or find the right technical co-founder. inv8 Venture Studio partners with ambitious founders and innovators to turn promising ideas into real businesses — through flexible equity and revenue-sharing models.',
            'Hindi lahat ng founder ay may resources para magtayo ng produkto, mag-hire ng team, o makahanap ng tamang technical co-founder. Ang inv8 Venture Studio ay nakikipagtulungan sa mga ambisyosong founder at innovator upang gawing tunay na negosyo ang mga promising na ideya — sa pamamagitan ng flexible na equity at revenue-sharing na mga modelo.'
          ) }}
        </p>

        <div class="vs-animate animate-delay-300 mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#apply"
            class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:scale-105 hover:bg-blue-500"
          >
            <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
            {{ t('Apply Now', 'Mag-apply Na') }}
          </a>
          <a
            href="#how-it-works"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white transition hover:scale-105 hover:bg-white/10"
          >
            {{ t('See How It Works', 'Tingnan Kung Paano Gumagana') }}
            <i class="fa-solid fa-arrow-down fa-xs" aria-hidden="true"></i>
          </a>
        </div>

        <!-- Social proof strip -->
        <div class="vs-animate animate-delay-400 mt-14 flex flex-wrap items-center justify-center gap-10 border-t border-white/10 pt-10 text-center">
          <div>
            <p class="text-3xl font-black text-white">100%</p>
            <p class="mt-1 text-xs font-medium uppercase tracking-widest text-white/40">{{ t('Execution-Focused', 'Nakatuon sa Execution') }}</p>
          </div>
          <div class="hidden h-8 w-px bg-white/10 sm:block"></div>
          <div>
            <p class="text-3xl font-black text-white">{{ t('Strategy', 'Estratehiya') }}</p>
            <p class="mt-1 text-xs font-medium uppercase tracking-widest text-white/40">{{ t('Design + Engineering', 'Disenyo + Inhinyeriya') }}</p>
          </div>
          <div class="hidden h-8 w-px bg-white/10 sm:block"></div>
          <div>
            <p class="text-3xl font-black text-blue-400">{{ t('PH + SEA', 'PH + SEA') }}</p>
            <p class="mt-1 text-xs font-medium uppercase tracking-widest text-white/40">{{ t('Focus Markets', 'Mga Target na Merkado') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Execution Gap ─────────────────────────────────────────────────── -->
    <section class="bg-[#080a18] py-24">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <!-- Header -->
        <div class="vs-animate mb-14 text-center">
          <div class="mb-4 flex items-center justify-center gap-3">
            <div class="h-px w-10 bg-blue-500/50"></div>
            <span class="text-xs font-bold uppercase tracking-widest text-blue-400">{{ t('The Execution Gap', 'Ang Execution Gap') }}</span>
            <div class="h-px w-10 bg-blue-500/50"></div>
          </div>
          <h2 class="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
            {{ t('Most founders are experts', 'Karamihan sa mga founder ay') }}<br />
            {{ t('in the problem.', 'eksperto sa problema.') }}<br />
            <span class="text-blue-400">{{ t('Not in building products.', 'Hindi sa pagtatayo ng mga produkto.') }}</span>
          </h2>
          <p class="mx-auto mt-5 max-w-xl text-base text-white/50">
            {{ t('You understand your customers. You understand the opportunity.', 'Naiintindihan mo ang iyong mga customer. Naiintindihan mo ang oportunidad.') }}<br />
            {{ t('But turning an idea into a scalable product requires a completely different set of skills.', 'Ngunit ang pag-convert ng isang ideya sa isang scalable na produkto ay nangangailangan ng ganap na ibang hanay ng mga kasanayan.') }}
          </p>
        </div>

        <!-- 3 Panels -->
        <div class="vs-animate grid overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-3" style="background: #0a0c1a;">

          <!-- Panel 1 — You know the problem -->
          <div class="relative flex flex-col border-b border-white/8 lg:border-b-0 lg:border-r">
            <!-- Photo with layered gradient -->
            <div class="relative h-64 shrink-0 overflow-hidden">
              <img
                src="/images/venture-panel-1.jpg"
                alt="Founder doing customer research"
                class="absolute inset-0 h-full w-full object-cover object-[center_30%] transition-transform duration-700 hover:scale-105"
              />
              <!-- Dark vignette + bottom fade -->
              <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(10,12,26,0.25) 0%, rgba(10,12,26,0) 40%, rgba(10,12,26,0.85) 100%);"></div>
              <!-- Step number overlaid bottom-left of photo -->
              <div class="absolute bottom-4 left-5 flex items-center gap-2.5">
                <div class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-400 bg-[#0a0c1a]/80 text-[11px] font-black text-blue-300 backdrop-blur-sm" style="box-shadow: 0 0 12px rgba(59,130,246,0.5);">01</div>
                <span class="text-[11px] font-bold uppercase tracking-widest text-white/50">{{ t('The Founder', 'Ang Founder') }}</span>
              </div>
            </div>

            <!-- Arrow connector (desktop) -->
            <div class="absolute right-0 top-32 z-10 hidden -translate-y-1/2 translate-x-1/2 lg:flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/50 bg-[#0a0c1a] text-blue-400 text-xs shadow-lg" style="box-shadow: 0 0 12px rgba(59,130,246,0.35);">
              <i class="fa-solid fa-chevron-right"></i>
            </div>

            <!-- Content -->
            <div class="flex-1 px-7 py-6">
              <h3 class="text-xl font-black tracking-tight text-white">{{ t('You know the problem.', 'Alam mo ang problema.') }}</h3>
              <div class="mt-2.5 h-[3px] w-10 rounded-full bg-blue-500"></div>
              <ul class="mt-5 space-y-3.5">
                <li v-for="point in [
                  t('You\'ve identified a real problem.', 'Natukoy mo na ang tunay na problema.'),
                  t('You\'ve spoken with customers.', 'Nakausap mo na ang mga customer.'),
                  t('You know there is an opportunity worth pursuing.', 'Alam mong may oportunidad na sulit na harapin.'),
                ]" :key="point" class="flex items-start gap-3 text-sm leading-relaxed text-white/55">
                  <i class="fa-solid fa-circle-check mt-0.5 shrink-0 text-blue-400 text-base"></i>
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Panel 2 — Technical questions begin -->
          <div class="relative flex flex-col border-b border-white/8 lg:border-b-0 lg:border-r">
            <div class="relative h-64 shrink-0 overflow-hidden">
              <img
                src="/images/venture-panel-2.jpg"
                alt="Founder overwhelmed by technical decisions"
                class="absolute inset-0 h-full w-full object-cover object-[center_20%] transition-transform duration-700 hover:scale-105"
              />
              <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(10,12,26,0.25) 0%, rgba(10,12,26,0) 40%, rgba(10,12,26,0.85) 100%);"></div>
              <div class="absolute bottom-4 left-5 flex items-center gap-2.5">
                <div class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-400 bg-[#0a0c1a]/80 text-[11px] font-black text-blue-300 backdrop-blur-sm" style="box-shadow: 0 0 12px rgba(59,130,246,0.5);">02</div>
                <span class="text-[11px] font-bold uppercase tracking-widest text-white/50">{{ t('The Gap', 'Ang Agwat') }}</span>
              </div>
            </div>

            <div class="absolute right-0 top-32 z-10 hidden -translate-y-1/2 translate-x-1/2 lg:flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/50 bg-[#0a0c1a] text-blue-400 text-xs shadow-lg" style="box-shadow: 0 0 12px rgba(59,130,246,0.35);">
              <i class="fa-solid fa-chevron-right"></i>
            </div>

            <div class="flex-1 px-7 py-6">
              <h3 class="text-xl font-black tracking-tight text-white">{{ t('Then the technical questions begin.', 'Pagkatapos ay nagsisimula ang mga teknikal na tanong.') }}</h3>
              <div class="mt-2.5 h-[3px] w-10 rounded-full bg-blue-500"></div>
              <ul class="mt-5 space-y-3.5">
                <li v-for="q in [
                  t('What should be built first?', 'Ano ang dapat itayo muna?'),
                  t('Who should build it?', 'Sino ang dapat magtayo nito?'),
                  t('How do you validate before spending too much?', 'Paano mo iva-validate bago gumastos nang masyadong malaki?'),
                  t('How do you manage developers when you\'re not technical?', 'Paano mo papamahalaan ang mga developer kung hindi ka teknikal?'),
                ]" :key="q" class="flex items-start gap-3 text-sm leading-relaxed text-white/55">
                  <i class="fa-regular fa-circle-question mt-0.5 shrink-0 text-white/35 text-base"></i>
                  {{ q }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Panel 3 — That's where we come in -->
          <div class="relative flex flex-col bg-[#0c0f25]">
            <div class="relative h-64 shrink-0 overflow-hidden">
              <img
                src="/images/venture-panel-3.jpg"
                alt="inv8 team collaborating with founders"
                class="absolute inset-0 h-full w-full object-cover object-[center_25%] transition-transform duration-700 hover:scale-105"
              />
              <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(10,12,26,0.2) 0%, rgba(10,12,26,0) 35%, rgba(10,12,26,0.88) 100%);"></div>
              <!-- inv8 brand badge -->
              <div class="absolute right-4 top-4 rounded-lg border border-blue-500/40 bg-blue-600/20 px-2.5 py-1 backdrop-blur-sm">
                <span class="text-xs font-black tracking-wider text-blue-300">inv8</span>
              </div>
              <div class="absolute bottom-4 left-5 flex items-center gap-2.5">
                <div class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-400 bg-[#0a0c1a]/80 text-[11px] font-black text-blue-300 backdrop-blur-sm" style="box-shadow: 0 0 12px rgba(59,130,246,0.5);">03</div>
                <span class="text-[11px] font-bold uppercase tracking-widest text-white/50">{{ t('The Solution', 'Ang Solusyon') }}</span>
              </div>
            </div>

            <div class="flex-1 px-7 py-6">
              <h3 class="text-xl font-black tracking-tight text-white">{{ t("That's where we come in.", 'Doon kami pumapasok.') }}</h3>
              <div class="mt-2.5 h-[3px] w-10 rounded-full bg-blue-500"></div>
              <p class="mt-5 text-sm leading-relaxed text-white/55">
                {{ t('inv8 Venture Studio gives founders access to product strategy, UX design, engineering, and execution support under one roof.', 'Ang inv8 Venture Studio ay nagbibigay sa mga founder ng access sa product strategy, UX design, engineering, at execution support sa iisang lugar.') }}
              </p>
              <p class="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/8 px-4 py-3 text-sm font-semibold leading-relaxed text-white/80">
                {{ t('So you can focus on solving the problem while we help build the product.', 'Para makapag-focus ka sa paglulusog ng problema habang tinutulungan ka naming itayo ang produkto.') }}
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>

    <!-- ── What We Bring ──────────────────────────────────────────────────── -->
    <section class="bg-[#080a18] py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="vs-animate mb-14 text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
            {{ t('What We Bring', 'Ano ang Aming Dalang') }}
          </span>
          <h2 class="mt-4 text-4xl font-black text-white md:text-5xl">
            {{ t('More than a vendor.', 'Higit pa sa isang vendor.') }}<br />
            <span class="text-blue-400">{{ t('A founding partner.', 'Isang founding partner.') }}</span>
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-base text-white/50">
            {{ t('We are not just building software. We are helping build companies.', 'Hindi lang kami nagtatayo ng software. Tumutulong kami sa pagtatayo ng mga kumpanya.') }}
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="item in offerings"
            :key="item.title"
            class="vs-animate group rounded-3xl border border-white/8 bg-white/4 p-7 transition hover:border-blue-500/30 hover:bg-white/6"
          >
            <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10 text-blue-400">
              <i :class="[item.icon, 'text-lg']" aria-hidden="true"></i>
            </div>
            <h3 class="text-base font-bold text-white">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-white/50">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Who It's For ───────────────────────────────────────────────────── -->
    <section class="bg-[#03040f] py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <!-- Header -->
        <div class="vs-animate mb-14 text-center">
          <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
            {{ t("Who It's For", 'Para Kanino Ito') }}
          </div>
          <h2 class="text-5xl font-black leading-tight tracking-tight text-white md:text-6xl">
            {{ t('Are you the', 'Ikaw ba ang') }}
            <span class="text-blue-400">{{ t('right fit?', 'tamang kandidato?') }}</span>
          </h2>
          <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/50">
            {{ t('If you are solving a meaningful problem and committed to execution,', 'Kung naglulusog ka ng makabuluhang problema at nakatuon sa execution,') }}<br />
            {{ t('we would love to hear your story.', 'gusto naming marinig ang iyong kwento.') }}
          </p>
        </div>

        <!-- 4 Audience Cards -->
        <div class="vs-animate grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <!-- Card 1: Early-Stage Startups -->
          <div class="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c1a] transition hover:border-blue-500/30">
            <div class="relative h-52 overflow-hidden">
              <img src="/images/Earlystage.png" alt="Early-Stage Startups" class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(10,12,26,0.1) 0%, rgba(10,12,26,0.7) 100%);"></div>
            </div>
            <!-- Content -->
            <div class="p-5">
              <div class="mb-3 flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white text-sm shadow-lg shadow-blue-900/40">
                  <i class="fa-solid fa-rocket"></i>
                </div>
                <h3 class="text-base font-black text-white">{{ t('Early-Stage Startups', 'Mga Early-Stage na Startup') }}</h3>
              </div>
              <p class="text-sm leading-relaxed text-white/50">{{ t('Pre-seed and seed founders who need a product team without the overhead of hiring one.', 'Mga pre-seed at seed na founder na nangangailangan ng product team nang walang gastos ng pag-hire.') }}</p>
            </div>
          </div>

          <!-- Card 2: University Spin-offs -->
          <div class="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c1a] transition hover:border-blue-500/30">
            <div class="relative h-52 overflow-hidden">
              <img src="/images/research.png" alt="University Spin-offs" class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(10,12,26,0.1) 0%, rgba(10,12,26,0.7) 100%);"></div>
            </div>
            <div class="p-5">
              <div class="mb-3 flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white text-sm shadow-lg shadow-blue-900/40">
                  <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <h3 class="text-base font-black text-white">{{ t('University Spin-offs', 'Mga University Spin-off') }}</h3>
              </div>
              <p class="text-sm leading-relaxed text-white/50">{{ t('Research teams and academic innovators ready to commercialize their work.', 'Mga research team at academic innovator na handang i-commercialize ang kanilang gawa.') }}</p>
            </div>
          </div>

          <!-- Card 3: Validated Idea Founders -->
          <div class="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c1a] transition hover:border-blue-500/30">
            <div class="relative h-52 overflow-hidden">
              <img src="/images/validatedidea.png" alt="Validated Idea Founders" class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(10,12,26,0.1) 0%, rgba(10,12,26,0.7) 100%);"></div>
            </div>
            <div class="p-5">
              <div class="mb-3 flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white text-sm shadow-lg shadow-blue-900/40">
                  <i class="fa-solid fa-lightbulb"></i>
                </div>
                <h3 class="text-base font-black text-white">{{ t('Validated Idea Founders', 'Mga Founder na May Validated na Ideya') }}</h3>
              </div>
              <p class="text-sm leading-relaxed text-white/50">{{ t('Founders who have done the groundwork and are ready to build and launch.', 'Mga founder na nagawa na ang groundwork at handa nang magtayo at maglunsad.') }}</p>
            </div>
          </div>

          <!-- Card 4: New Digital Ventures -->
          <div class="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c1a] transition hover:border-blue-500/30">
            <div class="relative h-52 overflow-hidden">
              <img src="/images/venture.png" alt="New Digital Ventures" class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(10,12,26,0.1) 0%, rgba(10,12,26,0.7) 100%);"></div>
            </div>
            <div class="p-5">
              <div class="mb-3 flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white text-sm shadow-lg shadow-blue-900/40">
                  <i class="fa-solid fa-building"></i>
                </div>
                <h3 class="text-base font-black text-white">{{ t('New Digital Ventures', 'Mga Bagong Digital na Venture') }}</h3>
              </div>
              <p class="text-sm leading-relaxed text-white/50">{{ t('Established businesses launching a new digital product or internal innovation project.', 'Mga established na negosyo na naglulunsad ng bagong digital na produkto o panloob na innovation project.') }}</p>
            </div>
          </div>
        </div>


      </div>
    </section>

    <!-- ── Partnership Models ─────────────────────────────────────────────── -->
    <section class="bg-[#080a18] py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="vs-animate mb-14 text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
            {{ t('Partnership Models', 'Mga Modelo ng Partnership') }}
          </span>
          <h2 class="mt-4 text-4xl font-black text-white md:text-5xl">
            {{ t('Flexible by design.', 'Flexible sa disenyo.') }}
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-base text-white/50">
            {{ t('Every venture is different. We tailor the partnership to fit the opportunity — not the other way around.', 'Ang bawat venture ay natatangi. Inaangkop namin ang partnership para tumugma sa oportunidad — hindi kabaligtaran.') }}
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div
            v-for="model in partnershipModels"
            :key="model.label"
            class="vs-animate rounded-3xl border border-white/8 bg-white/4 p-8 transition hover:border-blue-500/30 hover:bg-white/6"
          >
            <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10 text-blue-400">
              <i :class="[model.icon, 'text-lg']" aria-hidden="true"></i>
            </div>
            <h3 class="text-lg font-bold text-white">{{ model.label }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-white/50">{{ model.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Why inv8 ────────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden bg-[#03040f] py-24">
      <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%);" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <!-- Header -->
        <div class="vs-animate mb-14 text-center">
          <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
            {{ t('Why inv8', 'Bakit inv8') }}
          </div>
          <h2 class="text-6xl font-black leading-none tracking-tight text-white md:text-7xl">
            {{ t('Why inv', 'Bakit inv') }}<span class="text-blue-400">8</span>?
          </h2>
          <p class="mt-4 text-lg font-semibold text-white/70">{{ t('Built for founders. Designed for flexibility.', 'Itinayo para sa mga founder. Dinisenyo para sa flexibility.') }}</p>
          <p class="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/45">
            {{ t('We help founders move from idea to market through product strategy, design, and development while keeping partnerships practical, founder-friendly, and aligned for long-term success.', 'Tinutulungan namin ang mga founder na lumipat mula sa ideya patungo sa merkado sa pamamagitan ng product strategy, disenyo, at development habang pinapanatiling praktikal, founder-friendly, at naka-align ang mga partnership para sa pangmatagalang tagumpay.') }}
          </p>
        </div>

        <!-- 4 Cards -->
        <div class="vs-animate grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <!-- Card 1: Flexible Partnership Models -->
          <div class="flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c1a] transition hover:border-blue-500/30">
            <!-- Illustration -->
            <div class="relative flex h-52 items-center justify-center overflow-hidden" style="background: radial-gradient(ellipse 90% 70% at 50% 60%, rgba(30,64,175,0.25) 0%, rgba(10,12,26,0) 70%), linear-gradient(160deg, #0c1138 0%, #07091a 100%);">
              <div class="relative flex items-center justify-center">
                <!-- Puzzle pieces -->
                <div class="relative">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1">
                    <div class="h-8 w-8 rounded-lg border border-blue-400/40 bg-blue-600/30" style="clip-path: polygon(0 0, 70% 0, 70% 40%, 85% 40%, 85% 60%, 70% 60%, 70% 100%, 0 100%);">
                      <div class="h-full w-full" style="background: linear-gradient(135deg, rgba(96,165,250,0.4), rgba(37,99,235,0.2));"></div>
                    </div>
                    <div class="h-8 w-8 rounded-lg border border-blue-300/30 bg-blue-500/20" style="clip-path: polygon(30% 0, 100% 0, 100% 100%, 30% 100%, 30% 60%, 15% 60%, 15% 40%, 30% 40%);">
                      <div class="h-full w-full" style="background: linear-gradient(135deg, rgba(147,197,253,0.3), rgba(59,130,246,0.15));"></div>
                    </div>
                  </div>
                  <!-- Handshake icon in glowing circle -->
                  <div class="flex h-20 w-20 items-center justify-center rounded-full border border-blue-400/25 bg-blue-900/30" style="box-shadow: 0 0 30px rgba(59,130,246,0.3), inset 0 0 20px rgba(59,130,246,0.1);">
                    <i class="fa-solid fa-handshake text-3xl text-blue-300" style="filter: drop-shadow(0 0 8px rgba(147,197,253,0.6));"></i>
                  </div>
                  <!-- Orbit ring -->
                  <div class="absolute inset-[-10px] rounded-full border border-dashed border-blue-500/20 animate-spin" style="animation-duration: 12s;"></div>
                </div>
              </div>
            </div>
            <!-- Content -->
            <div class="flex flex-1 flex-col p-5">
              <div class="mb-3 flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white text-sm shadow-lg shadow-blue-900/40">
                  <i class="fa-solid fa-handshake"></i>
                </div>
                <h3 class="text-sm font-black leading-tight text-white">{{ t('1. Flexible Partnership Models', '1. Flexible na Mga Modelo ng Partnership') }}</h3>
              </div>
              <div class="mb-3 h-0.5 w-8 rounded-full bg-blue-600"></div>
              <p class="flex-1 text-xs leading-relaxed text-white/50">{{ t('Every startup is different. Whether it\'s project-based, revenue-sharing, hybrid, or selective equity partnerships, we structure engagements around what makes sense for the venture and the founder.', 'Ang bawat startup ay natatangi. Iniistraktura namin ang mga pakikipagtulungan sa paligid ng kung ano ang makatuwiran para sa venture at sa founder.') }}</p>
              <p class="mt-3 text-xs font-semibold text-blue-400">{{ t('No one-size-fits-all approach.', 'Walang one-size-fits-all na diskarte.') }}</p>
            </div>
          </div>

          <!-- Card 2: Founder-Friendly Equity -->
          <div class="flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c1a] transition hover:border-blue-500/30">
            <div class="relative flex h-52 items-center justify-center overflow-hidden" style="background: radial-gradient(ellipse 90% 70% at 50% 60%, rgba(30,64,175,0.2) 0%, rgba(10,12,26,0) 70%), linear-gradient(160deg, #0c1138 0%, #07091a 100%);">
              <div class="relative flex items-center gap-4">
                <!-- Document card -->
                <div class="rounded-xl border border-white/10 bg-[#0f1545]/90 p-3 shadow-xl shadow-blue-900/30 w-28">
                  <div class="mb-2 flex items-center gap-2">
                    <div class="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                      <i class="fa-solid fa-user text-[8px] text-white/50"></i>
                    </div>
                    <div class="text-[9px] font-bold uppercase tracking-wider text-white/60 leading-tight">FOUNDER<br/>OWNERSHIP</div>
                  </div>
                  <div class="space-y-1">
                    <div class="h-1 rounded-full bg-white/15 w-full"></div>
                    <div class="h-1 rounded-full bg-white/10 w-3/4"></div>
                    <div class="h-1 rounded-full bg-white/10 w-5/6"></div>
                  </div>
                  <div class="mt-2 h-px bg-white/10"></div>
                  <div class="mt-1.5 text-[8px] text-white/30 italic">~ ~ ~</div>
                </div>
                <!-- Pie chart -->
                <div class="relative flex h-14 w-14 items-center justify-center">
                  <svg viewBox="0 0 36 36" class="h-14 w-14 -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="transparent" stroke="#1e3a8a" stroke-width="5"/>
                    <circle cx="18" cy="18" r="14" fill="transparent" stroke="#3b82f6" stroke-width="5" stroke-dasharray="60 40" stroke-linecap="round" style="filter: drop-shadow(0 0 4px rgba(59,130,246,0.6));"/>
                  </svg>
                  <span class="absolute text-[9px] font-black text-blue-300">60%</span>
                </div>
              </div>
            </div>
            <div class="flex flex-1 flex-col p-5">
              <div class="mb-3 flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white text-sm shadow-lg shadow-blue-900/40">
                  <i class="fa-solid fa-chart-pie"></i>
                </div>
                <h3 class="text-sm font-black leading-tight text-white">{{ t('2. Founder-Friendly Equity', '2. Founder-Friendly na Equity') }}</h3>
              </div>
              <div class="mb-3 h-0.5 w-8 rounded-full bg-blue-600"></div>
              <p class="flex-1 text-xs leading-relaxed text-white/50">{{ t('Many venture studios take significant ownership from day one. We believe founders should retain meaningful ownership of what they build. When equity is involved, our goal is alignment, not control.', 'Maraming venture studio ang kumukuha ng malaking ownership mula sa simula. Naniniwala kami na dapat panatilihin ng mga founder ang makabuluhang ownership ng kanilang naitayo.') }}</p>
            </div>
          </div>

          <!-- Card 3: Strategy, Design & Engineering -->
          <div class="flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c1a] transition hover:border-blue-500/30">
            <div class="relative flex h-52 items-center justify-center overflow-hidden" style="background: radial-gradient(ellipse 90% 70% at 50% 60%, rgba(30,64,175,0.2) 0%, rgba(10,12,26,0) 70%), linear-gradient(160deg, #0c1138 0%, #07091a 100%);">
              <!-- Strategy → Design → Dev flow -->
              <div class="flex items-center gap-2">
                <div class="flex flex-col items-center gap-1.5">
                  <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-[#0f1545]/80" style="box-shadow: 0 0 15px rgba(59,130,246,0.2);">
                    <i class="fa-solid fa-lightbulb text-2xl text-blue-300" style="filter: drop-shadow(0 0 6px rgba(147,197,253,0.5));"></i>
                  </div>
                  <span class="text-[9px] font-bold uppercase tracking-wider text-white/40">{{ t('Strategy', 'Estratehiya') }}</span>
                </div>
                <!-- Arrow -->
                <div class="flex flex-col items-center gap-1 mt-[-16px]">
                  <div class="h-px w-5 bg-gradient-to-r from-blue-500 to-blue-400"></div>
                  <i class="fa-solid fa-caret-right text-blue-400 text-[10px] -ml-1 -mt-0.5"></i>
                </div>
                <div class="flex flex-col items-center gap-1.5">
                  <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-[#120f45]/80" style="box-shadow: 0 0 15px rgba(139,92,246,0.2);">
                    <i class="fa-solid fa-display text-2xl text-purple-300" style="filter: drop-shadow(0 0 6px rgba(196,181,253,0.5));"></i>
                  </div>
                  <span class="text-[9px] font-bold uppercase tracking-wider text-white/40">{{ t('Design', 'Disenyo') }}</span>
                </div>
                <!-- Arrow -->
                <div class="flex flex-col items-center gap-1 mt-[-16px]">
                  <div class="h-px w-5 bg-gradient-to-r from-purple-400 to-teal-400"></div>
                  <i class="fa-solid fa-caret-right text-teal-400 text-[10px] -ml-1 -mt-0.5"></i>
                </div>
                <div class="flex flex-col items-center gap-1.5">
                  <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-500/30 bg-[#0b1a1a]/80" style="box-shadow: 0 0 15px rgba(20,184,166,0.2);">
                    <i class="fa-solid fa-code text-2xl text-teal-300" style="filter: drop-shadow(0 0 6px rgba(94,234,212,0.5));"></i>
                  </div>
                  <span class="text-[9px] font-bold uppercase tracking-wider text-white/40">{{ t('Dev', 'Dev') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-1 flex-col p-5">
              <div class="mb-3 flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white text-sm shadow-lg shadow-blue-900/40">
                  <i class="fa-solid fa-people-group"></i>
                </div>
                <h3 class="text-sm font-black leading-tight text-white">{{ t('3. Strategy, Design & Engineering Under One Roof', '3. Strategy, Disenyo at Engineering sa Iisang Lugar') }}</h3>
              </div>
              <div class="mb-3 h-0.5 w-8 rounded-full bg-blue-600"></div>
              <p class="flex-1 text-xs leading-relaxed text-white/50">{{ t('Most founders end up coordinating agencies, freelancers, designers, and developers. We bring product strategy, UX design, and engineering together in one team.', 'Karamihan sa mga founder ay nagko-coordinate ng mga ahensya, freelancer, designer, at developer. Pinagsasama namin ang product strategy, UX design, at engineering sa isang team.') }}</p>
              <p class="mt-3 text-xs font-semibold text-blue-400">{{ t('Fewer handoffs. Faster execution. Better decisions.', 'Mas kaunting handoff. Mas mabilis na execution. Mas magagandang desisyon.') }}</p>
            </div>
          </div>

          <!-- Card 4: Built for Early-Stage Ventures -->
          <div class="flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c1a] transition hover:border-blue-500/30">
            <div class="relative flex h-52 items-center justify-center overflow-hidden" style="background: radial-gradient(ellipse 90% 70% at 50% 60%, rgba(30,64,175,0.25) 0%, rgba(10,12,26,0) 70%), linear-gradient(160deg, #0c1138 0%, #07091a 100%);">
              <div class="relative flex items-center gap-4">
                <!-- Rocket -->
                <div class="relative">
                  <div class="flex h-20 w-14 items-end justify-center">
                    <i class="fa-solid fa-rocket text-4xl text-blue-200 -rotate-12" style="filter: drop-shadow(0 0 12px rgba(147,197,253,0.7));"></i>
                  </div>
                  <!-- Flame/glow -->
                  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 h-8 w-4 rounded-full blur-md" style="background: radial-gradient(ellipse, rgba(251,146,60,0.6) 0%, rgba(59,130,246,0.3) 60%, transparent 100%);"></div>
                  <!-- Stars -->
                  <div class="absolute -top-2 -right-2 h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse"></div>
                  <div class="absolute top-2 -left-3 h-1 w-1 rounded-full bg-white/40 animate-pulse" style="animation-delay:0.5s"></div>
                  <div class="absolute -top-4 left-2 h-1 w-1 rounded-full bg-blue-300/60 animate-pulse" style="animation-delay:1s"></div>
                </div>
                <!-- Validate checklist -->
                <div class="rounded-xl border border-white/10 bg-[#0f1545]/90 px-3 py-2 shadow-xl text-[10px]">
                  <div class="mb-1 text-[8px] font-bold uppercase tracking-widest text-white/40">VALIDATE</div>
                  <div v-for="item in ['Problem', 'Solution', 'Market', 'Traction']" :key="item" class="flex items-center gap-1.5 py-0.5">
                    <i class="fa-solid fa-check text-blue-400 text-[8px]"></i>
                    <span class="text-white/60">{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-1 flex-col p-5">
              <div class="mb-3 flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white text-sm shadow-lg shadow-blue-900/40">
                  <i class="fa-solid fa-rocket"></i>
                </div>
                <h3 class="text-sm font-black leading-tight text-white">{{ t('4. Built for Early-Stage Ventures', '4. Itinayo para sa Early-Stage na Venture') }}</h3>
              </div>
              <div class="mb-3 h-0.5 w-8 rounded-full bg-blue-600"></div>
              <p class="flex-1 text-xs leading-relaxed text-white/50">{{ t('We specialize in helping founders navigate uncertainty. Our approach is lean, evidence-driven, and focused on validation before overbuilding — helping startups conserve resources and reach the market faster.', 'Dalubhasa kami sa pagtulong sa mga founder na mag-navigate ng kawalan ng katiyakan. Ang aming diskarte ay lean, evidence-driven, at nakatuon sa validation bago mag-overbuild.') }}</p>
            </div>
          </div>
        </div>

        <!-- Bottom banner -->
        <div class="vs-animate mt-6 overflow-hidden rounded-2xl border border-white/8 bg-[#0a0c1a]">
          <div class="flex flex-col gap-6 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
            <!-- Left -->
            <div class="flex items-center gap-5">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-600/20 text-blue-400 text-2xl">
                <i class="fa-regular fa-star" style="filter: drop-shadow(0 0 6px rgba(96,165,250,0.5));"></i>
              </div>
              <div>
                <p class="text-base font-bold text-white">{{ t("We're not just a service provider.", 'Hindi lang kami isang service provider.') }}</p>
                <p class="text-base font-bold text-blue-400">{{ t("We're your venture-building partner.", 'Kami ang iyong venture-building partner.') }}</p>
              </div>
            </div>
            <!-- Divider -->
            <div class="hidden h-12 w-px bg-white/10 sm:block"></div>
            <!-- Right -->
            <div class="flex items-center gap-6">
              <div>
                <p class="text-sm text-white/55">{{ t('We care about your success as much as you do.', 'Nagmamalasakit kami sa iyong tagumpay tulad mo.') }}</p>
                <p class="mt-0.5 text-sm font-bold text-white">{{ t('Let\'s build something meaningful — together.', 'Magtayo tayo ng isang bagay na may kahulugan — nang magkasama.') }}</p>
              </div>
              <!-- Growth arrow SVG -->
              <div class="hidden sm:block shrink-0">
                <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="4,44 20,34 36,26 52,14 68,6" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 4px rgba(59,130,246,0.6));"/>
                  <circle cx="68" cy="6" r="3" fill="#3b82f6" style="filter: drop-shadow(0 0 4px rgba(59,130,246,0.8));"/>
                  <polyline points="62,6 68,6 68,12" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ── How It Works ───────────────────────────────────────────────────── -->
    <section id="how-it-works" class="bg-[#080a18] py-24">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <!-- Header -->
        <div class="vs-animate mb-16 text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            {{ t('How It Works', 'Paano Gumagana') }}
          </span>
          <h2 class="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
            {{ t('A Selective Path to', 'Isang Mapiling Landas tungo sa') }}<br />
            {{ t('Building Together', 'Pagtatatayo Nang Magkasama') }}
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-base text-white/50">
            {{ t(
              'Every venture begins with a conversation. We evaluate opportunities carefully and only move forward when there is strong alignment on vision, commitment, and potential.',
              'Ang bawat venture ay nagsisimula sa isang pag-uusap. Maingat naming sinusuri ang mga oportunidad at sumusulong lamang kapag may malakas na pagkakaayon sa bisyon, commitment, at potensyal.'
            ) }}
          </p>
        </div>

        <!-- Timeline connector + step numbers (desktop) -->
        <div class="vs-animate relative hidden lg:block mb-6">
          <!-- Line -->
          <div class="absolute top-1/2 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-[2px] -translate-y-1/2" style="background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%); box-shadow: 0 0 10px rgba(59,130,246,0.6);"></div>
          <!-- Dots between -->
          <div class="absolute top-1/2 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] -translate-y-1/2 flex justify-between px-[12.5%]">
            <div v-for="n in 3" :key="n" class="h-2 w-2 rounded-full bg-blue-400 opacity-60" style="box-shadow: 0 0 6px rgba(59,130,246,0.8);"></div>
          </div>
          <!-- Step bubbles -->
          <div class="grid grid-cols-4">
            <div v-for="(step, i) in steps" :key="step.step" class="flex justify-center">
              <div
                class="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-500 bg-[#080a18] text-sm font-black text-white shadow-lg"
                style="box-shadow: 0 0 20px rgba(59,130,246,0.5);"
              >
                <span class="text-blue-300">{{ step.step }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step cards -->
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(step, i) in steps"
            :key="step.step"
            class="vs-animate relative rounded-2xl border border-white/8 bg-[#0d0f1f] p-7 transition hover:border-blue-500/40 hover:bg-[#0f1125]"
            :style="'animation-delay:' + i * 0.1 + 's'"
          >
            <!-- Mobile step number -->
            <div class="mb-4 flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-blue-500/60 bg-blue-500/10 text-xs font-black text-blue-300">
              {{ step.step }}
            </div>

            <!-- Icon -->
            <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <i :class="[step.icon, 'text-xl']" aria-hidden="true"></i>
            </div>

            <h3 class="text-base font-bold text-white">{{ step.title }}</h3>
            <!-- Underline accent -->
            <div class="mt-2 h-0.5 w-8 rounded-full bg-blue-600"></div>
            <p class="mt-3 text-sm leading-relaxed text-white/50 text-center">{{ step.description }}</p>

            <!-- Arrow connector (desktop, not last) -->
            <div
              v-if="i < steps.length - 1"
              class="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:flex h-6 w-6 items-center justify-center rounded-full border border-blue-500/40 bg-[#0d0f1f] text-blue-400 text-xs"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>

        <!-- Bottom banner -->
        <div class="vs-animate mt-8 flex flex-col items-center gap-6 rounded-2xl border border-white/8 bg-[#0d0f1f] px-8 py-6 sm:flex-row sm:justify-between">
          <div class="flex items-center gap-5">
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-400 text-2xl">
              <i class="fa-solid fa-shield-check"></i>
            </div>
            <p class="text-base font-bold text-white">
              {{ t('We build a few ventures exceptionally well.', 'Nagtatayo kami ng iilan ngunit napakahusay na venture.') }}
            </p>
          </div>
          <div class="flex items-center gap-5">
            <p class="max-w-xs text-sm text-white/45 sm:text-right">
              {{ t('Our focus is on long-term partnerships and creating meaningful value for founders and the communities we serve.', 'Ang aming pokus ay sa pangmatagalang partnership at paglikha ng makabuluhang halaga para sa mga founder at komunidad na aming pinaglilingkuran.') }}
            </p>
            <div class="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/8 text-blue-400 text-xl">
              <i class="fa-solid fa-people-group"></i>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Application Form ───────────────────────────────────────────────── -->
    <section id="apply" class="bg-[#03040f] py-24">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div class="vs-animate mb-12 text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
            {{ t('Apply Now', 'Mag-apply Na') }}
          </span>
          <h2 class="mt-4 text-4xl font-black text-white md:text-5xl">
            {{ t('Let\'s build something', 'Magtayo tayo ng isang bagay') }}<br />
            <span class="text-blue-400">{{ t('meaningful.', 'na may kahulugan.') }}</span>
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-base text-white/50">
            {{ t(
              'Tell us about your venture. We review every application and respond within 5 business days.',
              'Sabihin sa amin ang tungkol sa iyong venture. Sinusuri namin ang bawat aplikasyon at sumasagot sa loob ng 5 araw na trabaho.'
            ) }}
          </p>
        </div>

        <!-- Success banner -->
        <div
          v-if="formStatus === 'success'"
          class="vs-animate mb-8 flex items-start gap-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-5"
        >
          <i class="fa-solid fa-circle-check mt-0.5 text-xl text-green-400"></i>
          <div>
            <p class="font-bold text-green-300">{{ t('Application submitted!', 'Naisumite na ang aplikasyon!') }}</p>
            <p class="mt-1 text-sm text-green-300/70">{{ t('Thank you for applying. We will review your submission and reach out within 5 business days.', 'Salamat sa pag-apply. Susuriin namin ang iyong submission at makikipag-ugnayan sa loob ng 5 araw na trabaho.') }}</p>
          </div>
        </div>

        <!-- Error banner -->
        <div
          v-if="formStatus === 'error'"
          class="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4"
        >
          <i class="fa-solid fa-circle-exclamation mt-0.5 text-red-400"></i>
          <p class="text-sm text-red-300">{{ formError }}</p>
        </div>

        <form
          v-if="formStatus !== 'success'"
          @submit.prevent="handleSubmit"
          class="space-y-6 rounded-3xl border border-white/8 bg-white/4 p-8 md:p-10"
        >
          <!-- About you -->
          <div>
            <p class="mb-4 text-xs font-bold uppercase tracking-widest text-blue-400">{{ t('About You', 'Tungkol sa Iyo') }}</p>
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/60">{{ t('Full Name', 'Buong Pangalan') }} <span class="text-red-400">*</span></label>
                <input
                  v-model="form.name"
                  type="text"
                  :placeholder="t('Juan dela Cruz', 'Juan dela Cruz')"
                  :disabled="formLoading"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/60">{{ t('Email Address', 'Email Address') }} <span class="text-red-400">*</span></label>
                <input
                  v-model="form.email"
                  type="email"
                  :placeholder="t('you@example.com', 'ikaw@halimbawa.com')"
                  :disabled="formLoading"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/60">{{ t('Company / Startup Name', 'Pangalan ng Kumpanya / Startup') }}</label>
                <input
                  v-model="form.company"
                  type="text"
                  :placeholder="t('e.g. Acme Labs', 'hal. Acme Labs')"
                  :disabled="formLoading"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/60">{{ t('Website or Deck Link', 'Website o Deck Link') }}</label>
                <input
                  v-model="form.website"
                  type="url"
                  :placeholder="t('https://yourstartup.com', 'https://yonegosyo.com')"
                  :disabled="formLoading"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div class="h-px bg-white/8"></div>

          <!-- About your venture -->
          <div>
            <p class="mb-4 text-xs font-bold uppercase tracking-widest text-blue-400">{{ t('About Your Venture', 'Tungkol sa Iyong Venture') }}</p>
            <div class="space-y-5">
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/60">{{ t('Current Stage', 'Kasalukuyang Yugto') }} <span class="text-red-400">*</span></label>
                <select
                  v-model="form.stage"
                  :disabled="formLoading"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled class="bg-gray-900">{{ t('Select your current stage', 'Piliin ang iyong kasalukuyang yugto') }}</option>
                  <option v-for="opt in stageOptions" :key="opt.value" :value="opt.value" class="bg-gray-900">{{ opt.label }}</option>
                </select>
              </div>

              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/60">{{ t('What problem are you solving?', 'Anong problema ang iyong niresolba?') }} <span class="text-red-400">*</span></label>
                <textarea
                  v-model="form.problem"
                  rows="4"
                  :placeholder="t('Describe the problem, who faces it, and why it matters.', 'Ilarawan ang problema, sino ang nararamdaman nito, at kung bakit mahalaga ito.')"
                  :disabled="formLoading"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/60">{{ t('Any traction so far? (optional)', 'Mayroon ka bang traction sa ngayon? (opsyonal)') }}</label>
                <textarea
                  v-model="form.traction"
                  rows="2"
                  :placeholder="t('Users, signups, pilots, revenue, partnerships — anything that shows momentum.', 'Mga gumagamit, sign-up, pilot, kita, partnership — anumang nagpapakita ng momentum.')"
                  :disabled="formLoading"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/60">{{ t('Preferred Partnership Model', 'Gustong Modelo ng Partnership') }}</label>
                <select
                  v-model="form.partnershipType"
                  :disabled="formLoading"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled class="bg-gray-900">{{ t('Select a preference', 'Pumili ng kagustuhan') }}</option>
                  <option v-for="opt in partnershipOptions" :key="opt.value" :value="opt.value" class="bg-gray-900">{{ opt.label }}</option>
                </select>
              </div>

              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/60">{{ t('Anything else you want us to know?', 'Mayroon pa bang ibang gusto mong sabihin sa amin?') }}</label>
                <textarea
                  v-model="form.message"
                  rows="3"
                  :placeholder="t('Team background, timeline, what you need most...', 'Background ng team, timeline, kung ano ang pinaka-kailangan mo...')"
                  :disabled="formLoading"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="formLoading"
            class="w-full rounded-full bg-blue-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span v-if="formLoading">
              <i class="fa-solid fa-spinner fa-spin mr-2"></i>
              {{ t('Submitting...', 'Isinusumite...') }}
            </span>
            <span v-else>
              <i class="fa-solid fa-paper-plane mr-2"></i>
              {{ t('Submit Application', 'Isumite ang Aplikasyon') }}
            </span>
          </button>

          <p class="text-center text-xs text-white/30">
            {{ t('We review every application personally. No bots, no auto-rejections.', 'Personal naming sinusuri ang bawat aplikasyon. Walang bot, walang auto-rejection.') }}
          </p>
        </form>
      </div>
    </section>

    <!-- ── Final CTA ──────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden bg-blue-600 py-20">
      <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%);" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p class="vs-animate text-xs font-bold uppercase tracking-widest text-blue-200/70">inv8 Venture Studio</p>
        <h2 class="vs-animate mt-3 text-4xl font-black leading-tight text-white md:text-5xl">
          {{ t('Ready to build something', 'Handa ka nang magtayo ng isang bagay') }}<br />
          {{ t('the world needs?', 'na kailangan ng mundo?') }}
        </h2>
        <p class="vs-animate mx-auto mt-5 max-w-xl text-base text-blue-100/70">
          {{ t('Apply to inv8 Venture Studio and let\'s explore whether we are the right partners for your venture.', 'Mag-apply sa inv8 Venture Studio at tuklasin kung kami ang tamang partner para sa iyong venture.') }}
        </p>
        <div class="vs-animate mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#apply"
            class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-600 shadow-lg transition hover:scale-105 hover:bg-blue-50"
          >
            <i class="fa-solid fa-paper-plane"></i>
            {{ t('Apply to inv8 Venture Studio', 'Mag-apply sa inv8 Venture Studio') }}
          </a>
          <button
            @click="router.push('/contactus')"
            class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white transition hover:scale-105 hover:bg-white/20"
          >
            {{ t('Ask us a question', 'Magtanong sa amin') }}
          </button>
        </div>
      </div>
    </section>

  </main>
</template>
