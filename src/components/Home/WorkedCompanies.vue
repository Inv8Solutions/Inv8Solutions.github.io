<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import acornLogo from '@/assets/Acorn.png'
import artistHubLogo from '@/assets/ArtistHub.png'
import bentoBasketLogo from '@/assets/BentoBasket.png'
import forensicLensLogo from '@/assets/ForensicLens.png'
import layer2Logo from '@/assets/layer2.png'
import retasifyLogo from '@/assets/Retasify.png'
import trapiHausLogo from '@/assets/TrapiHaus.png'

interface Company {
  name: string
  image?: string
  logo_url?: string
  fromSupabase?: boolean
}

const FALLBACK_COMPANIES: Company[] = [
  { name: 'Retasify', image: retasifyLogo },
  { name: 'TrapiHaus', image: trapiHausLogo },
  { name: 'Acorn', image: acornLogo },
  { name: 'BentoBasket', image: bentoBasketLogo },
  { name: 'ForensicLens', image: forensicLensLogo },
  { name: 'ArtistHub', image: artistHubLogo },
  { name: 'Layer2', image: layer2Logo },
]

const companies = ref<Company[]>(FALLBACK_COMPANIES)

const { observeElements } = useScrollAnimation()

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, logo_url, order')
      .order('order', { ascending: true })
    if (!error && data && data.length > 0) {
      companies.value = data.map((d: any) => ({ name: d.name || '', logo_url: d.logo_url || '', fromSupabase: true }))
    }
  } catch { /* fall through to keep hardcoded defaults */ }
  observeElements('.company-logo')
})
</script>

<template>
  <section class="bg-[#03040f] py-14 border-t border-white/5">
    <div class="mx-auto w-full max-w-8xl px-4">
      <div class="text-center">
        <h2 class="text-xs font-semibold uppercase tracking-[0.35em] text-white/30">
          Companies we&apos;ve worked with
        </h2>
        <div
          class="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>

      <div
        class="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-x-12 gap-y-8 items-center justify-items-center max-w-4xl mx-auto"
      >
        <div
          v-for="(company, index) in companies"
          :key="company.name"
          class="company-logo flex items-center justify-center"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <img
            :src="company.fromSupabase ? company.logo_url : company.image"
            :alt="`${company.name} logo`"
            class="h-8 w-auto object-contain opacity-30 brightness-0 invert transition hover:opacity-70 hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </section>
</template>
