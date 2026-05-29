<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const router = useRouter()
const { observeElements } = useScrollAnimation()

type Category = 'All Insights' | 'Product Insights' | 'inv8 Updates' | 'Ecosystem Insights' | 'Case Studies'

const activeCategory = ref<Category>('All Insights')

const categories: Category[] = ['All Insights', 'Product Insights', 'inv8 Updates', 'Ecosystem Insights', 'Case Studies']

const posts = [
  {
    category: 'Product Insights' as Category,
    categoryIcon: 'fa-solid fa-lightbulb',
    date: 'May 14, 2026',
    title: 'Why Most MVPs Fail Before Launch',
    excerpt: 'Common mistakes startups make—and how to build products users actually need.',
    readTime: '5 min read',
    image: '/images/blog/mvp-fail.jpg',
    slug: 'why-most-mvps-fail-before-launch',
  },
  {
    category: 'inv8 Updates' as Category,
    categoryIcon: 'fa-solid fa-bullhorn',
    date: 'May 8, 2026',
    title: 'inv8 Begins Supporting MSMEs Through Innovation Programs',
    excerpt: "We're partnering with innovation initiatives to help MSMEs digitize and grow sustainably.",
    readTime: '3 min read',
    image: '/images/blog/msme-support.jpg',
    slug: 'inv8-begins-supporting-msmes',
  },
  {
    category: 'Ecosystem Insights' as Category,
    categoryIcon: 'fa-solid fa-globe',
    date: 'Apr 30, 2026',
    title: 'What We Learned From Startup Builders Across Northern Luzon',
    excerpt: 'Key takeaways from recent engagements with founders and innovation ecosystem partners.',
    readTime: '6 min read',
    image: '/images/blog/northern-luzon.jpg',
    slug: 'startup-builders-northern-luzon',
  },
]

const filtered = computed(() =>
  activeCategory.value === 'All Insights'
    ? posts
    : posts.filter((p) => p.category === activeCategory.value)
)

onMounted(() => {
  observeElements('.insights-header')
  observeElements('.insight-card')
})
</script>

<template>
  <section aria-labelledby="insights-heading" class="relative overflow-hidden bg-gray-50 py-24">
    <!-- Dot grid decoration -->
    <div class="pointer-events-none absolute left-4 top-10 grid grid-cols-5 gap-3 opacity-30" aria-hidden="true">
      <span v-for="i in 20" :key="i" class="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
    </div>
    <div class="pointer-events-none absolute right-4 top-10 grid grid-cols-5 gap-3 opacity-30" aria-hidden="true">
      <span v-for="i in 20" :key="i" class="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
    </div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="insights-header mb-12 flex flex-col items-center text-center">
        <p class="text-xs font-bold uppercase tracking-widest text-blue-600">Latest Updates &amp; Insights</p>
        <div class="mt-2 flex items-center gap-2">
          <div class="h-px w-8 bg-blue-600"></div>
          <div class="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
        </div>
        <h2 id="insights-heading" class="mt-4 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
          Ideas. Updates. Impact.
        </h2>
        <p class="mt-4 max-w-xl text-base leading-relaxed text-gray-500">
          Fresh perspectives, company updates, and ecosystem insights from inv8 and the innovation community.
        </p>

        <!-- View all link -->
        <div class="mt-2 self-end">
          <button
            @click="router.push('/insights')"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:gap-2.5"
          >
            View all insights
            <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <!-- Cards -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(post, i) in filtered"
          :key="post.slug"
          class="insight-card group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          :style="`animation-delay: ${i * 0.1}s`"
          @click="router.push(`/insights/${post.slug}`)"
        >
          <!-- Image -->
          <div class="relative overflow-hidden">
            <div class="h-52 bg-gray-900">
              <img
                :src="post.image"
                :alt="post.title"
                class="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                loading="lazy"
                @error="(e) => (e.target as HTMLImageElement).style.opacity = '0'"
              />
            </div>
            <!-- Category badge -->
            <span class="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {{ post.category }}
            </span>
            <!-- Category icon bubble -->
            <div class="absolute bottom-0 right-4 translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
              <i :class="[post.categoryIcon, 'text-sm']" aria-hidden="true"></i>
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col p-6 pt-8">
            <p class="text-xs text-gray-400">{{ post.date }}</p>
            <h3 class="mt-2 text-lg font-black leading-snug text-gray-900 group-hover:text-blue-600 transition-colors">
              {{ post.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-500 flex-1">{{ post.excerpt }}</p>

            <div class="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
              <span class="inline-flex items-center gap-1.5 text-xs text-gray-400">
                <i class="fa-regular fa-clock" aria-hidden="true"></i>
                {{ post.readTime }}
              </span>
              <span class="inline-flex items-center gap-1 text-sm font-bold text-gray-900 group-hover:gap-2 transition-all">
                Read more
                <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Category filters -->
      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="rounded-full px-5 py-2.5 text-sm font-semibold transition"
          :class="activeCategory === cat
            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
            : 'border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-600'"
        >
          {{ cat }}
        </button>
      </div>

    </div>
  </section>
</template>
