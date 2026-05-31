<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

defineOptions({ name: 'ReferralView' })

const { observeElements } = useScrollAnimation()

onMounted(() => {
  observeElements('.referral-hero')
  observeElements('.referral-section')
})

const steps = [
  {
    number: '01',
    title: 'Make the introduction',
    body: 'Know a founder who needs help building their product? An organization planning an innovation program? A small business that needs a better website? Fill out our referral form and tell us who you have in mind. That is all it takes to get started.',
    icon: 'fa-solid fa-handshake',
  },
  {
    number: '02',
    title: 'We reach out and close the project',
    body: 'We take it from there. We will reach out to your contact, understand what they need, and if it is a good fit, we move forward with the project. We treat every referral with the same care and respect you would.',
    icon: 'fa-solid fa-comments',
  },
  {
    number: '03',
    title: 'You earn your commission',
    body: 'Once the project is confirmed and the first payment is received, your commission is released. No chasing. No waiting forever. We keep it straightforward because that is how we want to do business.',
    icon: 'fa-solid fa-circle-check',
  },
]

const trustPoints = [
  'We will always be honest with your contact. If we are not the right fit for what they need, we will tell them and point them in the right direction. Your reputation matters to us as much as our own.',
  'Commissions are paid via GCash or bank transfer within 7 days of the first client payment.',
  'There is no contract or formal agreement required to participate. Your referral form submission is enough.',
  'We reserve the right to decline projects that are not the right fit. In those cases, no commission is earned, but we will always explain why.',
]

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
    errorMessage.value = 'Please fill in all required fields.'
    submitStatus.value = 'error'
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.yourEmail)) {
    errorMessage.value = 'Please enter a valid email address.'
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
    errorMessage.value = 'Something went wrong. Please try again or email us directly.'
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
          Referral Program
        </div>

        <h1 class="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-6xl">
          Know someone we should work with?<br />
          <span class="text-blue-500">We will take care of them.<br />And we will take care of you.</span>
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          When you refer someone to inv8 Studio and they become a client, you earn 5 to 10% of the project value. No limits, no complicated rules. Just a simple thank you for making the right introduction.
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            @click="scrollToForm"
            class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:scale-105 hover:bg-blue-500"
          >
            Refer Someone Now
            <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </button>
        </div>

        <!-- Quick stats -->
        <div class="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
            <p class="text-2xl font-black text-blue-400">5–10%</p>
            <p class="mt-1 text-xs text-white/45">Commission rate</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
            <p class="text-2xl font-black text-blue-400">No cap</p>
            <p class="mt-1 text-xs text-white/45">On referrals</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
            <p class="text-2xl font-black text-blue-400">7 days</p>
            <p class="mt-1 text-xs text-white/45">Payout timeline</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── HOW IT WORKS ────────────────────────────────────── -->
    <section class="referral-section px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Process</p>
        <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Simple by design. Here is how it works.
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
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Earnings</p>
            <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">What you earn</h2>
            <p class="mt-4 text-base leading-relaxed text-white/55">
              Your commission is based on the total project value.
            </p>

            <div class="mt-8 space-y-4">
              <div class="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0a0c1c] p-5">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 text-sm font-black">5%</div>
                <div>
                  <p class="font-bold text-white">Projects up to ₱100,000</p>
                  <p class="mt-1 text-sm text-white/50">You earn 5% of the total project value.</p>
                </div>
              </div>
              <div class="flex items-start gap-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300 text-sm font-black">10%</div>
                <div>
                  <p class="font-bold text-white">Projects above ₱100,000</p>
                  <p class="mt-1 text-sm text-white/50">You earn 10% of the total project value.</p>
                </div>
              </div>
            </div>

            <p class="mt-6 text-sm text-white/40">
              There is no cap on how many people you can refer. Every successful referral counts.
            </p>
          </div>

          <!-- Right: examples -->
          <div class="flex flex-col justify-center">
            <p class="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Examples</p>
            <div class="mt-6 space-y-4">
              <div class="rounded-2xl border border-white/10 bg-[#0a0c1c] p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-white/50">Project value</p>
                    <p class="mt-1 text-2xl font-black text-white">₱50,000</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-white/50">You earn</p>
                    <p class="mt-1 text-2xl font-black text-blue-400">₱2,500</p>
                  </div>
                </div>
                <div class="mt-4 h-px w-full bg-white/5"></div>
                <p class="mt-3 text-xs text-white/30">5% commission rate applies</p>
              </div>

              <div class="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-white/50">Project value</p>
                    <p class="mt-1 text-2xl font-black text-white">₱200,000</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-white/50">You earn</p>
                    <p class="mt-1 text-2xl font-black text-blue-400">₱20,000</p>
                  </div>
                </div>
                <div class="mt-4 h-px w-full bg-blue-500/10"></div>
                <p class="mt-3 text-xs text-blue-400/50">10% commission rate applies</p>
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
          <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Eligibility</p>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Anyone can be a referral partner.
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-relaxed text-white/55">
            You do not need to be a designer, a developer, or work in tech. If you know someone who could use our help, you qualify.
          </p>

          <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="group in ['Past clients who had a great experience.', 'Freelancers and creatives who want to add value to their network.', 'Community organizers, mentors, and ecosystem builders.', 'Friends, colleagues, and anyone in between.']" :key="group" class="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                <i class="fa-solid fa-check text-[10px] text-blue-400" aria-hidden="true"></i>
              </div>
              <p class="text-sm leading-snug text-white/60">{{ group }}</p>
            </div>
          </div>

          <p class="mt-8 text-sm font-semibold text-white/70">
            If you believe in what we do, we want you in our corner.
          </p>
        </div>
      </div>
    </section>

    <!-- ── WHAT WE WORK ON ────────────────────────────────── -->
    <section class="referral-section px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Good fits</p>
        <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Who are good referrals for inv8?
        </h2>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-white/55">
          Here are the kinds of people and organizations we love to work with:
        </p>

        <div class="mt-10 space-y-4">
          <div
            v-for="(item, i) in [
              { icon: 'fa-solid fa-rocket', label: 'Founders', body: 'Founders who have an idea and need help building their first product or getting their pitch ready.' },
              { icon: 'fa-solid fa-building-columns', label: 'Organizations & LGUs', body: 'Organizations, LGUs, and universities that want to run innovation programs, workshops, or startup competitions.' },
              { icon: 'fa-solid fa-store', label: 'MSMEs & Social Enterprises', body: 'Small businesses and social enterprises that need a better website, a stronger digital presence, or help figuring out their next move.' },
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
            If you are not sure whether your contact is a good fit, refer them anyway. We will figure it out together.
          </p>
        </div>
      </div>
    </section>

    <!-- ── REFERRAL FORM ───────────────────────────────────── -->
    <section id="referral-form" class="referral-section px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Get started</p>
        <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Make your referral
        </h2>
        <p class="mt-4 text-base leading-relaxed text-white/55">
          Fill in the details below and we will take it from there. We will never share your information or your contact's information with anyone outside inv8.
        </p>

        <form class="mt-10 space-y-5" @submit.prevent="handleSubmit">
          <!-- Feedback banners -->
          <div v-if="submitStatus === 'error'" class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <p class="text-sm text-red-400">{{ errorMessage }}</p>
          </div>
          <div v-if="submitStatus === 'success'" class="rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
            <p class="text-sm text-green-400">Thank you! We received your referral and will follow up within 48 hours.</p>
          </div>

          <!-- About you -->
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-white/30 pt-2">About you</p>

          <div class="grid gap-5 sm:grid-cols-2">
            <div class="space-y-2">
              <label class="text-sm font-medium text-white/60">Your name <span class="text-blue-400">*</span></label>
              <input
                v-model="form.yourName"
                type="text"
                placeholder="Juan dela Cruz"
                :disabled="isSubmitting"
                class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-white/60">Your email address <span class="text-blue-400">*</span></label>
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
            <label class="text-sm font-medium text-white/60">Your contact number <span class="text-white/30">(optional)</span></label>
            <input
              v-model="form.yourPhone"
              type="tel"
              placeholder="+63 917 000 0000"
              :disabled="isSubmitting"
              class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          <!-- About referral -->
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-white/30 pt-4">About your referral</p>

          <div class="grid gap-5 sm:grid-cols-2">
            <div class="space-y-2">
              <label class="text-sm font-medium text-white/60">Name of the person or organization <span class="text-blue-400">*</span></label>
              <input
                v-model="form.referralName"
                type="text"
                placeholder="Their name or org name"
                :disabled="isSubmitting"
                class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-white/60">Their email or contact number <span class="text-blue-400">*</span></label>
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
            <label class="text-sm font-medium text-white/60">What do they need help with?</label>
            <textarea
              v-model="form.needsDescription"
              rows="4"
              placeholder="Tell us as much or as little as you know..."
              :disabled="isSubmitting"
              class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
            ></textarea>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-white/60">How did you hear about our referral program?</label>
            <input
              v-model="form.howHeard"
              type="text"
              placeholder="A friend, social media, past project..."
              :disabled="isSubmitting"
              class="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          <button
            type="submit"
            :disabled="isSubmitting || submitStatus === 'success'"
            class="w-full rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span v-if="isSubmitting">Sending...</span>
            <span v-else-if="submitStatus === 'success'">Referral Sent!</span>
            <span v-else>Send My Referral</span>
          </button>

          <p class="text-center text-xs leading-relaxed text-white/30">
            We will follow up with you within 48 hours to let you know we have reached out to your contact. You will be kept in the loop every step of the way.
          </p>
        </form>
      </div>
    </section>

    <!-- ── TRUST SECTION ──────────────────────────────────── -->
    <section class="referral-section px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <div class="rounded-[24px] border border-white/10 bg-[#0a0c1c] px-8 py-12 lg:px-12">
          <p class="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Transparency</p>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            A few things we want you to know.
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
          The best partnerships<br />
          <span class="text-blue-500">start with a conversation.</span>
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55">
          Have questions about the program before you refer? We are happy to talk it through. Reach out and we will get back to you within 24 hours.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            @click="scrollToForm"
            class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:scale-105 hover:bg-blue-500"
          >
            Refer Someone Now
            <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </button>
          <a
            href="mailto:inv8design@gmail.com"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/10"
          >
            Ask us a question
            <i class="fa-solid fa-envelope text-xs" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>
