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
  <section aria-labelledby="insights-heading" class="relative overflow-hidden bg-[#03040f] py-24">
    <!-- Blue glow left -->
    <div class="pointer-events-none absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full opacity-10" style="background: radial-gradient(circle, #3b82f6 0%, transparent 70%);" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="insights-header mb-12 flex flex-col items-center text-center">
        <div class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
          Latest Updates &amp; Insights
        </div>
        <h2 id="insights-heading" class="mt-5 text-4xl font-black leading-tight text-white md:text-5xl">
          Ideas. Updates. Impact.
        </h2>
        <p class="mt-4 max-w-xl text-base leading-relaxed text-white/50">
          Fresh perspectives, company updates, and ecosystem insights from inv8 and the innovation community.
        </p>
        <div class="mt-3">
          <button
            @click="router.push('/blog')"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
          >
            View all articles
            <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <!-- Cards -->
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(post, i) in filtered"
          :key="post.slug"
          class="insight-card group flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0f1f] transition duration-300 hover:border-white/20 hover:bg-[#111327]"
          :style="`animation-delay: ${i * 0.1}s`"
          @click="router.push(`/insights/${post.slug}`)"
        >
          <!-- Image -->
          <div class="relative h-48 overflow-hidden bg-[#080a18]">
            <img
              :src="post.image"
              :alt="post.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
              @error="(e) => (e.target as HTMLImageElement).style.opacity = '0'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0d0f1f] via-transparent to-transparent"></div>
            <span class="absolute left-4 top-4 rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-300 backdrop-blur-sm">
              {{ post.category }}
            </span>
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col p-6">
            <p class="text-[10px] text-white/35">{{ post.date }}</p>
            <h3 class="mt-2 text-base font-black leading-snug text-white transition-colors group-hover:text-blue-300">
              {{ post.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-white/50">{{ post.excerpt }}</p>

            <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span class="inline-flex items-center gap-1.5 text-xs text-white/35">
                <i class="fa-regular fa-clock" aria-hidden="true"></i>
                {{ post.readTime }}
              </span>
              <span class="inline-flex items-center gap-1 text-sm font-semibold text-white/50 transition-all group-hover:gap-2 group-hover:text-blue-400">
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
            ? 'bg-blue-600 text-white'
            : 'border border-white/15 text-white/50 hover:border-white/30 hover:text-white'"
        >
          {{ cat }}
        </button>
      </div>

    </div>
  </section>
</template>
