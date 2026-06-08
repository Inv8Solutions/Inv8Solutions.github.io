<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLanguage } from '@/composables/useLanguage'

defineOptions({ name: 'ContactBodySection' })

const { observeElements } = useScrollAnimation()
const { t } = useLanguage()

const contactInfo = computed(() => [
  {
    icon: 'fa-regular fa-envelope',
    label: t('Email Address', 'Email Address'),
    value: 'inv8design@gmail.com',
  },
  {
    icon: 'fa-brands fa-discord',
    label: t('Community', 'Komunidad'),
    value: 'discord.gg/jngYbhwsa5',
  },
  {
    icon: 'fa-solid fa-location-dot',
    label: t('Location', 'Lokasyon'),
    value: 'Baguio City, Philippines',
  },
])

const services = computed(() => [
  { value: 'ui-ux-design', label: t('UI/UX Design', 'Disenyo ng UI/UX') },
  { value: 'mvp-dev', label: t('MVP Development', 'Pagbuo ng MVP') },
  { value: 'sme-innovation', label: t('Innovation for SMEs', 'Inobasyon para sa mga SME') },
  { value: 'iot-dev', label: t('IoT Development', 'Pagbuo ng IoT') },
  { value: 'pitchdeck', label: t('Pitchdeck Design', 'Disenyo ng Pitchdeck') },
  { value: 'consulting', label: t('Technical Consulting', 'Teknikal na Pagkonsulta') },
  { value: 'other', label: t('Others', 'Iba pa') },
])

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  service: '',
  message: '',
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!form.value.firstName || !form.value.email || !form.value.message) {
    errorMessage.value = t('Please fill in all required fields.', 'Pakipunan ang lahat ng kinakailangang patlang.')
    submitStatus.value = 'error'
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'
  errorMessage.value = ''

  try {
    await addDoc(collection(db, 'inquiries'), {
      name: `${form.value.firstName} ${form.value.lastName}`.trim(),
      email: form.value.email,
      service: form.value.service || null,
      project_details: form.value.message,
      status: 'new',
      created_at: new Date(),
    })

    form.value = { firstName: '', lastName: '', email: '', service: '', message: '' }
    submitStatus.value = 'success'
  } catch (err) {
    console.error(err)
    errorMessage.value = t('Something went wrong. Please try again.', 'May naganap na error. Pakisubukang muli.')
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  observeElements('.contact-left')
  observeElements('.contact-right')
})
</script>

<template>
  <section class="relative overflow-hidden bg-[#03040f] px-4 py-20 sm:px-6 lg:px-8">
    <!-- Blue glow -->
    <div class="pointer-events-none absolute -top-20 right-0 h-[500px] w-[500px] rounded-full opacity-15" style="background: radial-gradient(circle, #3b82f6 0%, transparent 65%);" aria-hidden="true"></div>
    <!-- Grid -->
    <div class="pointer-events-none absolute inset-0" style="background-image: linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px); background-size: 60px 60px;" aria-hidden="true"></div>

    <div class="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

      <!-- Left: headline + contact info -->
      <div class="contact-left space-y-10">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
            {{ t('Get In Touch', 'Makipag-ugnayan') }}
          </div>
          <h2 class="mt-5 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
            {{ t("Let's build something", 'Bumuo tayo ng isang bagay') }}<br />{{ t('great together.', 'na kahanga-hanga nang magkasama.') }}
          </h2>
          <p class="mt-4 max-w-md text-base leading-relaxed text-white/55">
            {{ t("Have a project in mind or want to explore how inv8 can help? Reach out and we'll get back to you within 24 hours.", "Mayroon kang proyektong nasa isip o gusto mong tuklasin kung paano makakatulong ang inv8? Makipag-ugnayan at babalik kami sa iyo sa loob ng 24 na oras.") }}
          </p>
        </div>

        <ul class="space-y-5">
          <li v-for="item in contactInfo" :key="item.label" class="flex items-center gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
              <i :class="[item.icon, 'text-base']" aria-hidden="true"></i>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-white/35">{{ item.label }}</p>
              <p class="mt-0.5 text-sm font-semibold text-white">{{ item.value }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Right: form card -->
      <div class="contact-right">
        <div class="rounded-[28px] border border-white/10 bg-[#0d0f1f] p-8 shadow-2xl shadow-blue-900/20">
          <h3 class="text-xl font-black text-white">{{ t('Send us a message', 'Magpadala sa amin ng mensahe') }}</h3>

          <!-- Status messages -->
          <div v-if="submitStatus === 'success'" class="mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
            <p class="text-sm font-semibold text-green-400">{{ t("Message sent! We'll be in touch soon.", 'Naipadala ang mensahe! Makikipag-ugnayan kami sa iyo sa lalong madaling panahon.') }}</p>
          </div>
          <div v-if="submitStatus === 'error'" class="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <p class="text-sm text-red-400">{{ errorMessage }}</p>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
            <!-- Name row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/50">{{ t('First Name *', 'Panguna *') }}</label>
                <input v-model="form.firstName" type="text" :placeholder="t('Juan', 'Juan')"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500/50 focus:bg-white/8 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                  :disabled="isSubmitting" />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/50">{{ t('Last Name', 'Apelyido') }}</label>
                <input v-model="form.lastName" type="text" placeholder="Dela Cruz"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500/50 focus:bg-white/8 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                  :disabled="isSubmitting" />
              </div>
            </div>

            <!-- Email + Service row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/50">{{ t('Email *', 'Email *') }}</label>
                <input v-model="form.email" type="email" placeholder="juan@company.com"
                  class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500/50 focus:bg-white/8 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                  :disabled="isSubmitting" />
              </div>
              <div>
                <label class="mb-1.5 block text-xs font-semibold text-white/50">{{ t('Service', 'Serbisyo') }}</label>
                <select v-model="form.service"
                  class="w-full rounded-xl border border-white/10 bg-[#0d0f1f] px-4 py-3 text-sm text-white/80 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                  :disabled="isSubmitting">
                  <option value="" class="bg-[#0d0f1f]">{{ t('Select one', 'Pumili ng isa') }}</option>
                  <option v-for="s in services" :key="s.value" :value="s.value" class="bg-[#0d0f1f]">{{ s.label }}</option>
                </select>
              </div>
            </div>

            <!-- Message -->
            <div>
              <label class="mb-1.5 block text-xs font-semibold text-white/50">{{ t('Message *', 'Mensahe *') }}</label>
              <textarea v-model="form.message" rows="4" :placeholder="t('Tell us about your project or idea...', 'Sabihin sa amin ang iyong proyekto o ideya...')"
                class="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500/50 focus:bg-white/8 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                :disabled="isSubmitting"></textarea>
            </div>

            <!-- Submit -->
            <button type="submit"
              class="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isSubmitting">
              {{ isSubmitting ? t('Sending...', 'Ipinapadala...') : t('Send Message', 'Ipadala ang Mensahe') }}
            </button>
          </form>
        </div>
      </div>

    </div>
  </section>
</template>
