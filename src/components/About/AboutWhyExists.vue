<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLanguage } from '@/composables/useLanguage'

const { observeElements } = useScrollAnimation()
const { t } = useLanguage()
const storyImage = '/images/our-story.jpg'

const timeline = computed(() => [
  {
    period: 'Q4 2025',
    title: t('Recognizing the Gap', 'Pagkilala sa Puwang'),
    description: t(
      'We observed recurring challenges across startups, TBIs, universities, and businesses. Great ideas existed, but many lacked the product strategy, validation, and execution needed to succeed.',
      'Naobserbahan namin ang paulit-ulit na mga hamon sa mga startup, TBI, unibersidad, at negosyo. Maraming magagandang ideya, ngunit kulang ang product strategy, validation, at execution para magtagumpay.'
    ),
    icon: 'fa-regular fa-lightbulb',
  },
  {
    period: 'Early 2026',
    title: t('Supporting Builders', 'Suporta sa mga Tagabuo'),
    description: t(
      'We began working with founders, organizations, and ecosystem partners to help transform concepts into structured, actionable product initiatives.',
      'Nagsimula kaming makipagtulungan sa mga founder, organisasyon, at ecosystem partners upang tulungan ang mga konsepto na maging maayos at aksyonableng product initiatives.'
    ),
    icon: 'fa-solid fa-people-group',
  },
  {
    period: '2026',
    title: t('inv8 Studio Launch', 'Paglulunsad ng inv8 Studio'),
    description: t(
      'inv8 was formally established as a product design and development studio dedicated to helping startups and MSMEs build meaningful digital products with confidence.',
      'Pormal na naitatag ang inv8 bilang isang product design at development studio na nakatuon sa pagtulong sa mga startup at MSME na bumuo ng makabuluhang digital na produkto nang may kumpiyansa.'
    ),
    icon: 'fa-solid fa-rocket',
  },
  {
    period: t('Future', 'Hinaharap'),
    title: t('A Trusted Innovation Partner', 'Isang Pinagkakatiwalaang Innovation Partner'),
    description: t(
      'Our vision is to become the innovation partner of choice for founders, businesses, universities, and ecosystem organizations across the Philippines and Southeast Asia.',
      'Ang aming bisyon ay maging piniling innovation partner ng mga founder, negosyo, unibersidad, at ecosystem organizations sa buong Pilipinas at Timog-Silangang Asya.'
    ),
    icon: 'fa-solid fa-mountain-sun',
  },
])

onMounted(() => {
  observeElements('.story-left')
  observeElements('.story-right')
  observeElements('.timeline-item')
  observeElements('.vm-card')
})
</script>

<template>
  <!-- Our Story -->
  <section aria-labelledby="story-heading" class="bg-[#03040f] py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Section label -->
      <div class="story-left mb-14 flex flex-col gap-2">
        <span class="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          {{ t('Our Story', 'Ang Aming Kwento') }}
        </span>
        <h2 id="story-heading" class="text-4xl font-black leading-tight text-white md:text-5xl">
          {{ t('How', 'Paano Nagsimula ang') }} <span class="text-blue-400">inv8</span> {{ t('Started', '') }}
        </h2>
        <div class="h-1 w-10 rounded-full bg-blue-600"></div>
      </div>

      <div class="flex flex-col gap-12 lg:flex-row lg:items-start">

        <!-- Left: Narrative -->
        <div class="story-left animate-delay-100 flex flex-col gap-4 text-sm leading-relaxed text-white/55 lg:w-[40%]">
          <p>{{ t('inv8 started with a simple observation.', 'Ang inv8 ay nagsimula sa isang simpleng obserbasyon.') }}</p>
          <p>{{ t('Across startups, universities, incubators, innovation programs, and growing businesses, there was no shortage of ideas. What was often missing was the structure, product thinking, and execution needed to turn those ideas into real outcomes.', 'Sa mga startup, unibersidad, incubator, innovation program, at lumalagong negosyo, hindi kulang ang mga ideya. Ang madalas na nawawala ay ang istraktura, product thinking, at execution para gawing tunay na resulta ang mga ideyang iyon.') }}</p>
          <p>{{ t('We saw founders building without validation, organizations investing in solutions without clear product direction, and innovation programs producing promising concepts that struggled to move beyond the prototype stage.', 'Nakita namin ang mga founder na nagtatayo nang walang validation, mga organisasyong namumuhunan sa mga solusyon nang walang malinaw na direksyon ng produkto, at mga innovation program na gumagawa ng mga promising na konsepto na nahihirapang lumabas sa yugto ng prototype.') }}</p>
          <p>{{ t('In Q4 2025, we began working with founders, ecosystem builders, and organizations to help bridge this gap.', 'Noong Q4 2025, nagsimula kaming makipagtulungan sa mga founder, ecosystem builder, at organisasyon upang tulungan na tulayin ang agwat na ito.') }}</p>
          <p>{{ t('By 2026, inv8 became a registered product design and development studio focused on helping startups and MSMEs move from ideas to market-ready solutions through strategy, design, and engineering.', 'Sa 2026, naging isang rehistradong product design at development studio ang inv8 na nakatuon sa pagtulong sa mga startup at MSME na lumipat mula sa mga ideya patungo sa market-ready na solusyon sa pamamagitan ng strategy, disenyo, at engineering.') }}</p>
          <p class="font-medium text-white/80">{{ t('Today, we work as a trusted innovation partner — helping organizations reduce uncertainty, accelerate execution, and build products that create real impact.', 'Ngayon, nagtatrabaho kami bilang isang pinagkakatiwalaang innovation partner — tumutulong sa mga organisasyon na bawasan ang kawalan ng katiyakan, mapabilis ang execution, at bumuo ng mga produktong lumilikha ng tunay na epekto.') }}</p>
        </div>

        <!-- Right: Image + Timeline -->
        <div class="story-right flex flex-col gap-6 sm:flex-row lg:w-[60%]">
          <!-- Image -->
          <div class="relative min-h-[380px] overflow-hidden rounded-3xl bg-gray-900 shadow-xl sm:flex-1">
            <img
              :src="storyImage"
              :alt="t('inv8 team working on product strategy', 'Kopohan ng inv8 na nagtatrabaho sa product strategy')"
              class="absolute inset-0 h-full w-full object-cover opacity-80"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-6 text-xs font-black uppercase leading-relaxed tracking-widest text-white/70">
              {{ t('Building', 'Nagtatayo') }}<br />{{ t('Meaningful', 'ng Makabuluhang') }}<br />{{ t('Products.', 'Produkto.') }}<br />{{ t('Creating', 'Lumilikha ng') }}<br />{{ t('Real Impact.', 'Tunay na Epekto.') }}<br />
              <span class="mt-1 block text-sm text-blue-400">inv8</span>
            </div>
          </div>

          <!-- Timeline -->
          <div class="flex flex-col sm:w-56">
            <div
              v-for="(item, i) in timeline"
              :key="item.period"
              class="timeline-item relative flex gap-3"
              :style="'animation-delay: ' + i * 0.1 + 's'"
            >
              <div class="flex flex-col items-center">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-400 shadow-sm">
                  <i :class="[item.icon, 'text-[10px]']" aria-hidden="true"></i>
                </div>
                <div v-if="i < timeline.length - 1" class="mt-1 w-px flex-1 bg-gradient-to-b from-blue-200 to-transparent"></div>
              </div>
              <div class="pb-7">
                <p class="text-[11px] font-bold uppercase tracking-wider text-blue-400">{{ item.period }}</p>
                <p class="mt-0.5 text-sm font-bold text-white">{{ item.title }}</p>
                <p class="mt-1 text-xs leading-relaxed text-white/55">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Vision & Mission -->
  <section aria-label="Vision and Mission" class="bg-[#080a18] py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-10 sm:grid-cols-2 sm:gap-6">

        <div class="vm-card flex items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:bg-white/8">
          <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
            <i class="fa-solid fa-mountain-sun text-xl" aria-hidden="true"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-blue-400">{{ t('Our Vision', 'Ang Aming Bisyon') }}</p>
            <h3 class="mt-2 text-xl font-black leading-snug text-white">
              {{ t('To become the leading product design and development studio for early-stage innovation in the Philippines,', 'Maging nangungunang product design at development studio para sa early-stage innovation sa Pilipinas,') }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-white/55">
              {{ t('empowering founders and businesses to build meaningful, market-ready digital products with clarity, speed, and disciplined execution.', 'na nagbibigay-kapangyarihan sa mga founder at negosyo na bumuo ng makabuluhan, market-ready na digital na produkto nang may kalinawan, bilis, at disiplinadong execution.') }}
            </p>
          </div>
        </div>

        <div class="vm-card animate-delay-100 flex items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:bg-white/8">
          <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
            <i class="fa-solid fa-bullseye text-xl" aria-hidden="true"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-blue-400">{{ t('Our Mission', 'Ang Aming Misyon') }}</p>
            <h3 class="mt-2 text-xl font-black leading-snug text-white">
              {{ t('To transform ideas into practical, user-centered solutions', 'Baguhin ang mga ideya sa praktikal, user-centered na solusyon') }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-white/55">
              {{ t('by integrating strategy, design, and engineering into a lean, evidence-driven process. inv8 delivers market-ready products that help early-stage founders validate their ideas and help businesses modernize with confidence.', 'sa pamamagitan ng pagsasama ng strategy, disenyo, at engineering sa isang lean, evidence-driven na proseso. Naghahatid ang inv8 ng market-ready na mga produkto na tumutulong sa mga early-stage founder na i-validate ang kanilang mga ideya at tulungan ang mga negosyo na mag-modernize nang may kumpiyansa.') }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
