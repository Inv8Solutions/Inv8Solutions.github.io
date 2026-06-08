<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLanguage } from '@/composables/useLanguage'

defineOptions({ name: 'ReferralView' })

const { observeElements } = useScrollAnimation()
const { t } = useLanguage()

onMounted(() => {
  observeElements('.referral-hero')
  observeElements('.referral-section')
})

const steps = computed(() => [
  {
    number: '01',
    title: t('Make the introduction', 'Gumawa ng pagpapakilala'),
    body: t('Know a founder who needs help building their product? An organization planning an innovation program? A small business that needs a better website? Fill out our referral form and tell us who you have in mind. That is all it takes to get started.', 'Kilala mo ba ang isang founder na nangangailangan ng tulong sa pagbuo ng kanilang produkto? Isang organisasyong nagpaplano ng innovation program? Isang maliit na negosyo na nangangailangan ng mas magandang website? Punan ang aming referral form at sabihin sa amin kung sino ang iyong iniisip. Iyon na ang kailangan para makapagsimula.'),
    icon: 'fa-solid fa-handshake',
  },
  {
    number: '02',
    title: t('We reach out and close the project', 'Makikipag-ugnayan kami at isasara ang proyekto'),
    body: t('We take it from there. We will reach out to your contact, understand what they need, and if it is a good fit, we move forward with the project. We treat every referral with the same care and respect you would.', 'Aayusin na namin ang natitira. Makikipag-ugnayan kami sa iyong contact, mauunawaan ang kanilang pangangailangan, at kung angkop, magpapatuloy kami sa proyekto. Tinatrato namin ang bawat referral nang may parehong pag-iingat at paggalang na gagawin mo.'),
    icon: 'fa-solid fa-comments',
  },
  {
    number: '03',
    title: t('You earn your commission', 'Kikita ka ng iyong komisyon'),
    body: t('Once the project is confirmed and the first payment is received, your commission is released. No chasing. No waiting forever. We keep it straightforward because that is how we want to do business.', 'Kapag nakumpirma na ang proyekto at natanggap na ang unang bayad, ilalabas na ang iyong komisyon. Walang pag-abala. Walang walang katapusang paghihintay. Simple lang ang proseso dahil ganyan ang gusto naming makipagnegosyo.'),
    icon: 'fa-solid fa-circle-check',
  },
])

const trustPoints = computed(() => [
  t('We will always be honest with your contact. If we are not the right fit for what they need, we will tell them and point them in the right direction. Your reputation matters to us as much as our own.', 'Palagi kaming magiging tapat sa iyong contact. Kung hindi kami angkop sa kanilang pangangailangan, sasabihin namin ito at ituturo sila sa tamang direksyon. Ang iyong reputasyon ay kasinghalaga sa amin ng aming sarili.'),
  t('Commissions are paid via GCash or bank transfer within 7 days of the first client payment.', 'Ang mga komisyon ay binabayaran sa pamamagitan ng GCash o bank transfer sa loob ng 7 araw ng unang bayad ng kliyente.'),
  t('There is no contract or formal agreement required to participate. Your referral form submission is enough.', 'Walang kinakailangang kontrata o pormal na kasunduan para lumahok. Ang iyong pagsusumite ng referral form ay sapat na.'),
  t('We reserve the right to decline projects that are not the right fit. In those cases, no commission is earned, but we will always explain why.', 'Nakalaan sa amin ang karapatang tanggihan ang mga proyektong hindi angkop. Sa mga ganitong kaso, walang komisyon na kikitain, ngunit palagi naming ipapaliwanag kung bakit.'),
])

const form = ref({
  yourName: '',
  yourEmail: '',
  yourPhone: '',
  referralName: '',
  referralContact: '',
  needsDescription: '',
  howHeard: '',
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const scrollToForm = () => {
  document.querySelector('#referral-form')?.scrollIntoView({ behavior: 'smooth' })
}

const resetForm = () => {
  form.value = {
    yourName: '',
    yourEmail: '',
    yourPhone: '',
    referralName: '',
    referralContact: '',
    needsDescription: '',
    howHeard: '',
  }
  errorMessage.value = ''
}

const handleSubmit = async () => {
  if (!form.value.yourName.trim() || !form.value.yourEmail.trim() || !form.value.referralName.trim() || !form.value.referralContact.trim()) {
    errorMessage.value = t('Please fill in all required fields.', 'Pakipunan ang lahat ng kinakailangang patlang.')
    submitStatus.value = 'error'
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.yourEmail)) {
    errorMessage.value = t('Please enter a valid email address.', 'Pakipasok ang isang wastong email address.')
    submitStatus.value = 'error'
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'
  errorMessage.value = ''

  try {
    await addDoc(collection(db, 'referrals'), {
      your_name: form.value.yourName,
      your_email: form.value.yourEmail,
      your_phone: form.value.yourPhone || null,
      referral_name: form.value.referralName,
      referral_contact: form.value.referralContact,
      needs_description: form.value.needsDescription || null,
      how_heard: form.value.howHeard || null,
      status: 'new',
      created_at: new Date(),
    })
    resetForm()
    submitStatus.value = 'success'
  } catch {
    errorMessage.value = t('Something went wrong. Please try again or email us directly.', 'May naganap na error. Pakisubukang muli o mag-email sa amin nang direkta.')
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen w-full bg-[#03040f]">

    <!-- ── HERO ─────────────────────────────────────────────── -->
    <section class="referral-hero relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <!-- Grid background -->
      <div
        class="pointer-events-none absolute inset-0"
        style="background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 60px 60px;"
        aria-hidden="true"
      ></div>
      <!-- Glows -->
      <div class="pointer-events-none absolute -top-20 right-0 h-[600px] w-[600px] rounded-full opacity-20" style="background: radial-gradient(circle, #3b82f6 0%, transparent 65%);" aria-hidden="true"></div>
      <div class="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full opacity-10" style="background: radial-gradient(circle, #6366f1 0%, transparent 70%);" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-4xl text-center">
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
          {{ t('Referral Program', 'Programang Referral') }}
        </div>

        <h1 class="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-6xl">
          {{ t('Know someone we should work with?', 'Kilala mo ba ang isang taong dapat naming tulungan?') }}<br />
          <span class="text-blue-500">{{ t('We will take care of them.', 'Aayusin namin sila.') }}<br />{{ t('And we will take care of you.', 'At aayusin din namin kayo.') }}</span>
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          {{ t('When you refer someone to inv8 Studio and they become a client, you earn 5 to 10% of the project value. No limits, no complicated rules. Just a simple thank you for making the right introduction.', 'Kapag nagreferral ka ng isang tao sa inv8 Studio at naging kliyente sila, kikita ka ng 5 hanggang 10% ng halaga ng proyekto. Walang limitasyon, walang kumplikadong patakaran. Isang simpleng pasasalamat lamang para sa tamang pagpapakilala.') }}
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            @click="scrollToForm"
            class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:scale-105 hover:bg-blue-500"
          >
            {{ t('Refer Someone Now', 'Mag-refer Ngayon') }}
            <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </button>
        </div>

        <!-- Quick stats -->
        <div class="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
            <p class="text-2xl font-black text-blue-400">5–10%</p>
            <p class="mt-1 text-xs text-white/45">{{ t('Commission rate', 'Rate ng komisyon') }}</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
            <p class="text-2xl font-black text-blue-400">{{ t('No cap', 'Walang limitasyon') }}</p>
            <p class="mt-1 text-xs text-white/45">{{ t('On referrals', 'Sa mga referral') }}</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
            <p class="text-2xl font-black text-blue-400">{{ t('7 days', '7 araw') }}</p>
            <p class="mt-1 text-xs text-white/45">{{ t('Payout timeline', 'Timeline ng bayad') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── HOW IT WORKS ────────────────────────────────────── -->
    <section class="referral-section px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('Process', 'Proseso') }}</p>
        <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
          {{ t('Simple by design. Here is how it works.', 'Simple sa disenyo. Narito kung paano ito gumagana.') }}
        </h2>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div
            v-for="(step, i) in steps"
            :key="step.number"
            class="relative rounded-[20px] border border-white/10 bg-[#0a0c1c] p-8"
          >
            <!-- Step number -->
            <p class="text-5xl font-black leading-none text-white/[0.06]">{{ step.number }}</p>
            <!-- Icon -->
            <div class="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <i :class="[step.icon, 'text-base']" aria-hidden="true"></i>
            </div>
            <h3 class="mt-5 text-lg font-black leading-snug text-white">{{ step.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-white/50">{{ step.body }}</p>
            <!-- Connector arrow (hidden on last) -->
            <div v-if="i < steps.length - 1" class="absolute -right-3 top-1/2 hidden -translate-y-1/2 md:block">
              <div class="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#03040f] text-white/20">
                <i class="fa-solid fa-chevron-right text-[10px]" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── COMMISSION DETAILS ─────────────────────────────── -->
    <section class="referral-section px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <div class="grid gap-8 lg:grid-cols-2">
          <!-- Left: details -->
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('Earnings', 'Kita') }}</p>
            <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{{ t('What you earn', 'Ano ang kikitain mo') }}</h2>
            <p class="mt-4 text-base leading-relaxed text-white/55">
              {{ t('Your commission is based on the total project value.', 'Ang iyong komisyon ay batay sa kabuuang halaga ng proyekto.') }}
            </p>

            <div class="mt-8 space-y-4">
              <div class="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0a0c1c] p-5">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 text-sm font-black">5%</div>
                <div>
                  <p class="font-bold text-white">{{ t('Projects up to ₱100,000', 'Mga proyektong hanggang ₱100,000') }}</p>
                  <p class="mt-1 text-sm text-white/50">{{ t('You earn 5% of the total project value.', 'Kikita ka ng 5% ng kabuuang halaga ng proyekto.') }}</p>
                </div>
              </div>
              <div class="flex items-start gap-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300 text-sm font-black">10%</div>
                <div>
                  <p class="font-bold text-white">{{ t('Projects above ₱100,000', 'Mga proyektong higit sa ₱100,000') }}</p>
                  <p class="mt-1 text-sm text-white/50">{{ t('You earn 10% of the total project value.', 'Kikita ka ng 10% ng kabuuang halaga ng proyekto.') }}</p>
                </div>
              </div>
            </div>

            <p class="mt-6 text-sm text-white/40">
              {{ t('There is no cap on how many people you can refer. Every successful referral counts.', 'Walang limitasyon sa bilang ng taong maaari mong i-refer. Bawat matagumpay na referral ay binibilang.') }}
            </p>
          </div>

          <!-- Right: examples -->
          <div class="flex flex-col justify-center">
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-white/30">{{ t('Examples', 'Mga Halimbawa') }}</p>
            <div class="mt-6 space-y-4">
              <div class="rounded-2xl border border-white/10 bg-[#0a0c1c] p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-white/50">{{ t('Project value', 'Halaga ng proyekto') }}</p>
                    <p class="mt-1 text-2xl font-black text-white">₱50,000</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-white/50">{{ t('You earn', 'Kikita ka ng') }}</p>
                    <p class="mt-1 text-2xl font-black text-blue-400">₱2,500</p>
                  </div>
                </div>
                <div class="mt-4 h-px w-full bg-white/5"></div>
                <p class="mt-3 text-xs text-white/30">{{ t('5% commission rate applies', '5% rate ng komisyon ang naaangkop') }}</p>
              </div>

              <div class="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-white/50">{{ t('Project value', 'Halaga ng proyekto') }}</p>
                    <p class="mt-1 text-2xl font-black text-white">₱200,000</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-white/50">{{ t('You earn', 'Kikita ka ng') }}</p>
                    <p class="mt-1 text-2xl font-black text-blue-400">₱20,000</p>
                  </div>
                </div>
                <div class="mt-4 h-px w-full bg-blue-500/10"></div>
                <p class="mt-3 text-xs text-blue-400/50">{{ t('10% commission rate applies', '10% rate ng komisyon ang naaangkop') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── WHO CAN REFER ───────────────────────────────────── -->
    <section class="referral-section px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <div class="rounded-[24px] border border-white/10 bg-[#0a0c1c] px-8 py-12 lg:px-12">
          <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('Eligibility', 'Pagiging Karapat-dapat') }}</p>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {{ t('Anyone can be a referral partner.', 'Sinuman ay maaaring maging referral partner.') }}
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-relaxed text-white/55">
            {{ t('You do not need to be a designer, a developer, or work in tech. If you know someone who could use our help, you qualify.', 'Hindi mo kailangang maging designer, developer, o nagtatrabaho sa tech. Kung kilala mo ang isang taong kailangan ng aming tulong, karapat-dapat ka.') }}
          </p>

          <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="group in [t('Past clients who had a great experience.', 'Mga dating kliyenteng nagkaroon ng magandang karanasan.'), t('Freelancers and creatives who want to add value to their network.', 'Mga freelancer at creative na gustong magdagdag ng halaga sa kanilang network.'), t('Community organizers, mentors, and ecosystem builders.', 'Mga community organizer, mentor, at ecosystem builder.'), t('Friends, colleagues, and anyone in between.', 'Mga kaibigan, katrabaho, at sinumang nasa pagitan.')]" :key="group" class="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                <i class="fa-solid fa-check text-[10px] text-blue-400" aria-hidden="true"></i>
              </div>
              <p class="text-sm leading-snug text-white/60">{{ group }}</p>
            </div>
          </div>

          <p class="mt-8 text-sm font-semibold text-white/70">
            {{ t('If you believe in what we do, we want you in our corner.', 'Kung naniniwala ka sa aming ginagawa, gusto ka naming kasama.') }}
          </p>
        </div>
      </div>
    </section>

    <!-- ── WHAT WE WORK ON ────────────────────────────────── -->
    <section class="referral-section px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('Good fits', 'Mga Angkop') }}</p>
        <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
          {{ t('Who are good referrals for inv8?', 'Sino ang mga magandang referral para sa inv8?') }}
        </h2>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-white/55">
          {{ t('Here are the kinds of people and organizations we love to work with:', 'Narito ang mga uri ng tao at organisasyong gustong-gusto naming makipagtulungan:') }}
        </p>

        <div class="mt-10 space-y-4">
          <div
            v-for="(item, i) in [
              { icon: 'fa-solid fa-rocket', label: t('Founders', 'Mga Founder'), body: t('Founders who have an idea and need help building their first product or getting their pitch ready.', 'Mga founder na may ideya at kailangan ng tulong sa pagbuo ng kanilang unang produkto o paghahanda ng kanilang pitch.') },
              { icon: 'fa-solid fa-building-columns', label: t('Organizations & LGUs', 'Mga Organisasyon at LGU'), body: t('Organizations, LGUs, and universities that want to run innovation programs, workshops, or startup competitions.', 'Mga organisasyon, LGU, at unibersidad na gustong magpatakbo ng mga innovation program, workshop, o startup competition.') },
              { icon: 'fa-solid fa-store', label: t('MSMEs & Social Enterprises', 'Mga MSME at Social Enterprise'), body: t('Small businesses and social enterprises that need a better website, a stronger digital presence, or help figuring out their next move.', 'Maliliit na negosyo at social enterprise na nangangailangan ng mas magandang website, mas malakas na digital presence, o tulong sa pag-alam ng susunod nilang hakbang.') },
            ]"
            :key="item.label"
            class="flex items-start gap-5 rounded-2xl border border-white/10 bg-[#0a0c1c] p-6"
          >
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <i :class="[item.icon, 'text-base']" aria-hidden="true"></i>
            </div>
            <div>
              <p class="font-bold text-white">{{ item.label }}</p>
              <p class="mt-1 text-sm leading-relaxed text-white/50">{{ item.body }}</p>
            </div>
          </div>
        </div>

        <div class="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 px-6 py-5">
          <p class="text-sm leading-relaxed text-blue-300/80">
            <i class="fa-solid fa-lightbulb mr-2 text-blue-400" aria-hidden="true"></i>
            {{ t('If you are not sure whether your contact is a good fit, refer them anyway. We will figure it out together.', 'Kung hindi ka sigurado kung angkop ang iyong contact, i-refer mo pa rin sila. Aalamin natin ito nang magkasama.') }}
          </p>
        </div>
      </div>
    </section>

    <!-- ── REFERRAL FORM ───────────────────────────────────── -->
    <section id="referral-form" class="referral-section px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('Get started', 'Magsimula') }}</p>
        <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
          {{ t('Make your referral', 'Gawin ang iyong referral') }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-white/55">
          {{ t('Fill in the details below and we will take it from there. We will never share your information or your contact information with anyone outside inv8.', 'Punan ang mga detalye sa ibaba at aayusin na namin ang natitira. Hindi namin kailanman ibabahagi ang iyong impormasyon o impormasyon ng iyong contact sa sinuman sa labas ng inv8.') }}
        </p>

        <form class="mt-10 space-y-5" @submit.prevent="handleSubmit">
          <!-- Feedback banners -->
          <div v-if="submitStatus === 'error'" class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <p class="text-sm text-red-400">{{ errorMessage }}</p>
          </div>
          <div v-if="submitStatus === 'success'" class="rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
            <p class="text-sm text-green-400">{{ t('Thank you! We received your referral and will follow up within 48 hours.', 'Salamat! Natanggap namin ang iyong referral at makikipag-ugnayan kami sa loob ng 48 oras.') }}</p>
          </div>

          <!-- About you -->
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-white/30 pt-2">{{ t('About you', 'Tungkol sa iyo') }}</p>

          <div class="grid gap-5 sm:grid-cols-2">
            <div class="space-y-2">
              <label class="text-sm font-medium text-white/60">{{ t('Your name', 'Iyong pangalan') }} <span class="text-blue-400">*</span></label>
              <input
                v-model="form.yourName"
                type="text"
                placeholder="Juan dela Cruz"
                :disabled="isSubmitting"
                class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-white/60">{{ t('Your email address', 'Iyong email address') }} <span class="text-blue-400">*</span></label>
              <input
                v-model="form.yourEmail"
                type="email"
                placeholder="juan@example.com"
                :disabled="isSubmitting"
                class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-white/60">{{ t('Your contact number', 'Iyong numero ng contact') }} <span class="text-white/30">({{ t('optional', 'opsyonal') }})</span></label>
            <input
              v-model="form.yourPhone"
              type="tel"
              placeholder="+63 917 000 0000"
              :disabled="isSubmitting"
              class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          <!-- About referral -->
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-white/30 pt-4">{{ t('About your referral', 'Tungkol sa iyong referral') }}</p>

          <div class="grid gap-5 sm:grid-cols-2">
            <div class="space-y-2">
              <label class="text-sm font-medium text-white/60">{{ t('Name of the person or organization', 'Pangalan ng tao o organisasyon') }} <span class="text-blue-400">*</span></label>
              <input
                v-model="form.referralName"
                type="text"
                :placeholder="t('Their name or org name', 'Kanilang pangalan o pangalan ng org')"
                :disabled="isSubmitting"
                class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-white/60">{{ t('Their email or contact number', 'Kanilang email o numero ng contact') }} <span class="text-blue-400">*</span></label>
              <input
                v-model="form.referralContact"
                type="text"
                placeholder="email@example.com or +63 9XX XXX XXXX"
                :disabled="isSubmitting"
                class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-white/60">{{ t('What do they need help with?', 'Ano ang kailangan nilang tulong?') }}</label>
            <textarea
              v-model="form.needsDescription"
              rows="4"
              :placeholder="t('Tell us as much or as little as you know...', 'Sabihin sa amin ang gaano karami o kaunting alam mo...')"
              :disabled="isSubmitting"
              class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
            ></textarea>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-white/60">{{ t('How did you hear about our referral program?', 'Paano mo nalaman ang aming referral program?') }}</label>
            <input
              v-model="form.howHeard"
              type="text"
              :placeholder="t('A friend, social media, past project...', 'Isang kaibigan, social media, nakaraang proyekto...')"
              :disabled="isSubmitting"
              class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          <button
            type="submit"
            :disabled="isSubmitting || submitStatus === 'success'"
            class="w-full rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span v-if="isSubmitting">{{ t('Sending...', 'Ipinapadala...') }}</span>
            <span v-else-if="submitStatus === 'success'">{{ t('Referral Sent!', 'Naipadala ang Referral!') }}</span>
            <span v-else>{{ t('Send My Referral', 'Ipadala ang Aking Referral') }}</span>
          </button>

          <p class="text-center text-xs leading-relaxed text-white/30">
            {{ t('We will follow up with you within 48 hours to let you know we have reached out to your contact. You will be kept in the loop every step of the way.', 'Makikipag-ugnayan kami sa iyo sa loob ng 48 oras upang ipaalam na nakipag-ugnayan na kami sa iyong contact. Ipapaalam sa iyo ang bawat hakbang.') }}
          </p>
        </form>
      </div>
    </section>

    <!-- ── TRUST SECTION ──────────────────────────────────── -->
    <section class="referral-section px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <div class="rounded-[24px] border border-white/10 bg-[#0a0c1c] px-8 py-12 lg:px-12">
          <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">{{ t('Transparency', 'Transparency') }}</p>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {{ t('A few things we want you to know.', 'Ilang bagay na gusto naming malaman mo.') }}
          </h2>

          <div class="mt-10 space-y-6">
            <div
              v-for="(point, i) in trustPoints"
              :key="i"
              class="flex items-start gap-5"
            >
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-xs font-black text-blue-400">
                {{ i + 1 }}
              </div>
              <p class="text-base leading-relaxed text-white/60">{{ point }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CLOSING ─────────────────────────────────────────── -->
    <section class="referral-section relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true"></div>
      <div class="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-10" style="background: radial-gradient(circle, #3b82f6 0%, transparent 70%);" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-3xl text-center">
        <h2 class="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
          {{ t('The best partnerships', 'Ang pinakamahusay na pakikipagtulungan') }}<br />
          <span class="text-blue-500">{{ t('start with a conversation.', 'ay nagsisimula sa isang pag-uusap.') }}</span>
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55">
          {{ t('Have questions about the program before you refer? We are happy to talk it through. Reach out and we will get back to you within 24 hours.', 'Mayroon kang mga tanong tungkol sa programa bago ka mag-refer? Masaya kaming makipag-usap. Makipag-ugnayan at babalik kami sa iyo sa loob ng 24 na oras.') }}
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            @click="scrollToForm"
            class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:scale-105 hover:bg-blue-500"
          >
            {{ t('Refer Someone Now', 'Mag-refer Ngayon') }}
            <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </button>
          <a
            href="mailto:inv8design@gmail.com"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/10"
          >
            {{ t('Ask us a question', 'Magtanong sa amin') }}
            <i class="fa-solid fa-envelope text-xs" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>
