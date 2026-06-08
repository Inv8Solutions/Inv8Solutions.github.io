<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLanguage } from '@/composables/useLanguage'

defineOptions({
  name: 'ContactHeroSection',
})

const { observeElements } = useScrollAnimation()
const { t } = useLanguage()

onMounted(() => {
  observeElements('.contact-hero-content')
})
</script>

<template>
  <section class="bg-[#f7f7f8] px-4 py-16 sm:px-6 lg:px-8">
    <div
      class="contact-hero-content mx-auto max-w-7xl rounded-[48px] border border-gray-100 bg-white px-6 py-16 text-center shadow-[0_35px_100px_rgba(15,23,42,0.08)] sm:px-10"
    >
      <div
        class="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-1.5 text-sm font-medium text-blue-600 animate-fade-in-up"
      >
        <span class="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
        {{ t('Contact Us', 'Makipag-ugnayan sa Amin') }}
      </div>

      <h1 class="text-3xl font-semibold text-gray-900 sm:text-4xl animate-fade-in-up animate-delay-200">
        {{ t('Let us build something', 'Bumuo tayo ng isang bagay') }}
        <span class="block text-blue-600">{{ t('Amazing Together', 'na Kahanga-hanga Nang Magkasama') }}</span>
      </h1>

      <p class="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg animate-fade-in-up animate-delay-400">
        {{ t('Have a project in mind? We would love to hear about it. Share your vision, and we will help you bring it to life.', 'Mayroon kang proyektong nasa isip? Gusto naming marinig ito. Ibahagi ang iyong bisyon, at tutulungan ka naming gawin itong katotohanan.') }}
      </p>
    </div>
  </section>
</template>
