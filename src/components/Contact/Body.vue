<script setup lang="ts">
defineOptions({
  name: 'ContactBodySection',
})

const contactMethods = [
  {
    id: 'email',
    title: 'Email Us',
    description: "Drop us a line and we'll get back within 24 hours",
    actionLabel: 'hello@inv8.studio',
  },
  {
    id: 'call',
    title: 'Schedule a Call',
    description: 'Book a free 30-minute consultation',
    actionLabel: 'View availability →',
  },
  {
    id: 'response',
    title: 'Response Time',
    description: 'We typically respond to all inquiries within 24 hours during business days',
    actionLabel: 'Weekdays · 9am - 6pm',
  },
]

const formFields = [
  { id: 'name', label: 'Your Name *', type: 'text', placeholder: 'John Doe' },
  { id: 'email', label: 'Email Address *', type: 'email', placeholder: 'john@company.com' },
  { id: 'company', label: 'Company Name', type: 'text', placeholder: 'Your Company' },
  {
    id: 'service',
    label: 'Service Interested In *',
    type: 'text',
    placeholder: 'Select a service',
  },
  { id: 'budget', label: 'Estimated Budget', type: 'text', placeholder: 'Select budget range' },
  {
    id: 'timeline',
    label: 'Project Timeline',
    type: 'text',
    placeholder: 'When do you want to start?',
  },
]
</script>

<template>
  <section class="bg-white px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div class="space-y-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Start a Conversation
          </p>
          <h2 class="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
            Have a project in mind?
          </h2>
          <p class="mt-3 text-base text-gray-500 sm:text-lg">
            We'd love to hear about it. Share your vision, and we'll help you bring it to life.
          </p>
        </div>

        <div class="space-y-4">
          <article
            v-for="method in contactMethods"
            :key="method.id"
            class="rounded-[32px] border border-gray-200 bg-white p-5 shadow-[0_15px_45px_rgba(15,23,42,0.06)] sm:p-6"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  class="h-5 w-5"
                >
                  <path
                    d="M4 8l8 5 8-5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    v-if="method.id === 'email'"
                  />
                  <path
                    v-else-if="method.id === 'call'"
                    d="M6 8.5c2 4 5.5 7.5 9.5 9.5l2.2-2.2a1 1 0 011-.24l3.3.82a1 1 0 01.74 1v3.62a1 1 0 01-.82.98A18 18 0 013 5.08 1 1 0 013.98 4h3.63a1 1 0 011 .75l.82 3.3a1 1 0 01-.25 1z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path v-else d="M12 8v4l3 3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ method.title }}</h3>
                <p class="text-sm text-gray-500">{{ method.description }}</p>
                <p class="mt-1 text-sm font-semibold text-blue-600">{{ method.actionLabel }}</p>
              </div>
            </div>
          </article>
        </div>

        <div
          class="rounded-[32px] bg-gray-900 p-6 text-white shadow-[0_25px_70px_rgba(15,23,42,0.45)] sm:p-8"
        >
          <h3 class="text-xl font-semibold">What to Expect</h3>
          <ul class="mt-5 space-y-3 text-sm text-gray-200">
            <li class="flex items-start gap-3">
              <span
                class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs"
                >✓</span
              >
              Initial consultation to understand your needs and goals
            </li>
            <li class="flex items-start gap-3">
              <span
                class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs"
                >✓</span
              >
              Project scope definition and timeline estimation
            </li>
            <li class="flex items-start gap-3">
              <span
                class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs"
                >✓</span
              >
              Transparent pricing with no hidden fees
            </li>
            <li class="flex items-start gap-3">
              <span
                class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs"
                >✓</span
              >
              Detailed proposal with clear deliverables
            </li>
          </ul>
        </div>
      </div>

      <div
        class="rounded-[40px] border border-gray-100 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-8"
      >
        <h3 class="text-2xl font-semibold text-gray-900">Send us a message</h3>
        <p class="mt-2 text-sm text-gray-500">
          Fill out the form below and we'll be in touch soon.
        </p>

        <form class="mt-8 space-y-5">
          <div v-for="field in formFields" :key="field.id" class="space-y-2">
            <label :for="field.id" class="text-sm font-medium text-gray-700">{{
              field.label
            }}</label>
            <input
              :id="field.id"
              :type="field.type"
              :placeholder="field.placeholder"
              class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div class="space-y-2">
            <label for="project-details" class="text-sm font-medium text-gray-700"
              >Tell us about your project *</label
            >
            <textarea
              id="project-details"
              rows="4"
              placeholder="Describe your project, goals, and any specific requirements..."
              class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            ></textarea>
          </div>

          <button
            type="button"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/60 transition hover:bg-blue-700"
          >
            Send Message
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M5 12h14" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
