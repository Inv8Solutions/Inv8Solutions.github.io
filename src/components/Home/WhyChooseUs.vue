<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLanguage } from '@/composables/useLanguage'

defineOptions({
  name: 'WhyChooseUs',
})

const { observeElements } = useScrollAnimation()
const { t } = useLanguage()

const reasons = computed(() => [
  {
    title: t('Evidence-Driven Approach', 'Pamamaraang Batay sa Ebidensya'),
    description: t('We validate assumptions early, turning insights into stronger product decisions.', 'Maaga naming pinapatunayan ang mga pagpapalagay, ginagawang mas matibay na mga desisyon sa produkto ang mga kaalaman.'),
    icon: 'fa-solid fa-chart-line',
  },
  {
    title: t('Integrated Design & Engineering', 'Pinagsanib na Disenyo at Inhinyeriya'),
    description: t('UX, frontend, and backend work together from day one for seamless execution.', 'Ang UX, frontend, at backend ay nagtatrabaho nang magkasama mula sa unang araw para sa maayos na pagpapatupad.'),
    icon: 'fa-solid fa-layer-group',
  },
  {
    title: t('Lean and Fast Delivery', 'Mabilis at Mahusay na Paghahatid'),
    description: t('We focus on essentials, helping you launch faster without unnecessary complexity.', 'Nakatuon kami sa mga esensyal, tinutulungan kang maglunsad nang mas mabilis nang walang hindi kinakailangang komplikasyon.'),
    icon: 'fa-solid fa-rocket',
  },
  {
    title: t('User-Centered Solutions', 'Mga Solusyong Nakasentro sa Gumagamit'),
    description: t('Every product is crafted around real needs, ensuring intuitive and meaningful experiences.', 'Bawat produkto ay ginawa sa paligid ng tunay na mga pangangailangan, tinitiyak ang intuitive at makabuluhang mga karanasan.'),
    icon: 'fa-solid fa-users',
  },
  {
    title: t('Modern, Scalable Technology', 'Modernong, Napapalawak na Teknolohiya'),
    description: t('We use a reliable, future-ready tech stack built for performance and long-term growth.', 'Gumagamit kami ng maaasahan, handa sa hinaharap na tech stack na itinayo para sa pagganap at pangmatagalang paglago.'),
    icon: 'fa-solid fa-microchip',
  },
  {
    title: t('Built for Real-World Impact', 'Itinayo para sa Tunay na Epekto'),
    description: t("Whether it's an MVP, SME system, or IoT solution, we design products that perform where it matters most.", 'Maging MVP, sistema ng SME, o solusyon sa IoT, nagdidisenyo kami ng mga produktong gumaganap kung saan ito pinaka-mahalaga.'),
    icon: 'fa-solid fa-globe',
  },
])

onMounted(() => {
  observeElements('.reason-card')
})
</script>

<template>
  <section class="relative overflow-hidden bg-[#03040f] px-4 py-24">
    <!-- Blue glow -->
    <div class="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-10" style="background: radial-gradient(circle, #3b82f6 0%, transparent 70%);" aria-hidden="true"></div>

    <div class="mx-auto max-w-5xl space-y-10 text-center">
      <div class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
        <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
        {{ t('Why Choose Us', 'Bakit Kami') }}
      </div>
      <div class="space-y-2 mt-4">
        <h2 class="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
          {{ t('We deliver clarity, speed, and disciplined', 'Naghahatid kami ng kalinawan, bilis, at disiplinadong') }}
        </h2>
        <p class="text-4xl font-black leading-tight text-white/30 md:text-5xl">
          {{ t('execution in every product we build.', 'pagpapatupad sa bawat produktong itinayo namin.') }}
        </p>
      </div>
    </div>

    <div class="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(reason, index) in reasons"
        :key="reason.title"
        class="reason-card rounded-[24px] border border-white/10 bg-[#0d0f1f] px-7 py-6 text-left transition duration-300 hover:border-white/20 hover:bg-[#111327]"
        :style="`animation-delay: ${index * 0.1}s`"
      >
        <div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
          <i :class="`${reason.icon} text-sm`"></i>
        </div>
        <h3 class="text-base font-black text-white">{{ reason.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-white/50">{{ reason.description }}</p>
      </article>
    </div>
  </section>
</template>
