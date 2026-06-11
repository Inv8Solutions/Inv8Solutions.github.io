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
        <div class="vs-animate mb-14 text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
            {{ t('Who It\'s For', 'Para Kanino Ito') }}
          </span>
          <h2 class="mt-4 text-4xl font-black text-white md:text-5xl">
            {{ t('Are you the right fit?', 'Ikaw ba ang tamang kandidato?') }}
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-base text-white/50">
            {{ t('If you are solving a meaningful problem and committed to execution, we would love to hear your story.', 'Kung naglulusog ka ng makabuluhang problema at nakatuon sa execution, gusto naming marinig ang iyong kwento.') }}
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="item in audiences"
            :key="item.title"
            class="vs-animate flex flex-col gap-4 rounded-3xl border border-white/8 bg-white/4 p-7 transition hover:border-blue-500/30 hover:bg-white/6"
          >
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <i :class="[item.icon, 'text-base']" aria-hidden="true"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">{{ item.title }}</h3>
              <p class="mt-1.5 text-xs leading-relaxed text-white/50">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- Closing qualifier line -->
        <p class="vs-animate mt-12 text-center text-sm font-medium text-white/40">
          {{ t(
            'We evaluate opportunities carefully. We only partner when we genuinely believe we can create meaningful long-term value together.',
            'Maingat naming sinusuri ang mga oportunidad. Nakikipagtulungan lamang kami kapag tunay kaming naniniwala na maaari kaming lumikha ng makabuluhang pangmatagalang halaga nang magkasama.'
          ) }}
        </p>
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

    <!-- ── Why inv8 Venture Studio ────────────────────────────────────────── -->
    <section class="relative overflow-hidden bg-[#03040f] py-24">
      <div class="pointer-events-none absolute inset-0 opacity-30" style="background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,130,246,0.12) 0%, transparent 70%);" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div class="vs-animate mb-10">
          <span class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
            {{ t('Why inv8', 'Bakit inv8') }}
          </span>
        </div>

        <h2 class="vs-animate text-4xl font-black leading-tight text-white md:text-5xl">
          {{ t('Most founders face a difficult choice.', 'Karamihan sa mga founder ay nahaharap sa isang mahirap na pagpili.') }}
        </h2>

        <div class="vs-animate animate-delay-100 mt-10 grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-white/55">
            <i class="fa-solid fa-building-columns mb-3 text-2xl text-red-400/50"></i>
            <p class="font-semibold text-white/70">{{ t('Hire an expensive agency', 'Mag-hire ng mahal na ahensya') }}</p>
            <p class="mt-1 text-xs leading-relaxed">{{ t('High cost, low alignment. You pay regardless of outcome.', 'Mataas na gastos, mababang pagkakaayon. Nagbabayad ka anuman ang resulta.') }}</p>
          </div>
          <div class="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 text-sm text-white/55">
            <i class="fa-solid fa-user-group mb-3 text-2xl text-yellow-400/50"></i>
            <p class="font-semibold text-white/70">{{ t('Find a technical co-founder', 'Humanap ng technical co-founder') }}</p>
            <p class="mt-1 text-xs leading-relaxed">{{ t('Hard to find, harder to align. Takes months with no guarantee.', 'Mahirap hanapin, mas mahirap i-align. Tumatagal ng mga buwan nang walang garantiya.') }}</p>
          </div>
          <div class="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 text-sm text-white/55">
            <i class="fa-solid fa-person-digging mb-3 text-2xl text-orange-400/50"></i>
            <p class="font-semibold text-white/70">{{ t('Build alone for months', 'Magtayo nang mag-isa sa loob ng mga buwan') }}</p>
            <p class="mt-1 text-xs leading-relaxed">{{ t('Slow, isolating, and easy to build the wrong thing.', 'Mabagal, nag-iisa, at madaling magtayo ng maling bagay.') }}</p>
          </div>
        </div>

        <div class="vs-animate animate-delay-200 mt-10 rounded-3xl border border-blue-500/25 bg-blue-500/8 p-10">
          <div class="flex h-14 w-14 mx-auto mb-6 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <i class="fa-solid fa-bolt text-xl"></i>
          </div>
          <h3 class="text-2xl font-black text-white">{{ t('inv8 provides an alternative.', 'Nagbibigay ang inv8 ng alternatibo.') }}</h3>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/55">
            {{ t(
              'You gain access to a team that combines product thinking, design, engineering, and execution under one roof — with incentives aligned to your success from day one.',
              'Makakakuha ka ng access sa isang team na pinagsasama ang product thinking, disenyo, engineering, at execution sa iisang lugar — na may mga insentibong naka-align sa iyong tagumpay mula sa simula.'
            ) }}
          </p>
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
