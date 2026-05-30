<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { blogPosts, categories } from '@/data/blogs'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

defineOptions({ name: 'BlogView' })

const router = useRouter()
const { observeElements } = useScrollAnimation()
const selectedCategory = ref('All Posts')

const filtered = computed(() =>
  selectedCategory.value === 'All Posts'
    ? blogPosts
    : blogPosts.filter((p) => p.category === selectedCategory.value),
)

const goToPost = (slug: string) => router.push(`/blog/${slug}`)

onMounted(() => {
  observeElements('.blog-card')
  observeElements('.blog-hero')
})
</script>

<template>
  <div class="min-h-screen bg-[#03040f]">

    <!-- Hero -->
    <section class="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <div
        class="pointer-events-none absolute -top-20 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-20"
        style="background: radial-gradient(circle, #3b82f6 0%, transparent 65%);"
        aria-hidden="true"
      ></div>
      <div class="blog-hero relative mx-auto max-w-3xl text-center">
        <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
          The inv8 Blog
        </div>
        <h1 class="mt-4 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
          Insights on building<br /><span class="text-blue-500">products that matter.</span>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/50">
          Strategy, design, and development perspectives from the team at inv8 Studio.
        </p>
      </div>
    </section>

    <!-- Category filter -->
    <div class="sticky top-[57px] z-40 border-b border-white/10 bg-[#03040f]/90 backdrop-blur-md">
      <div class="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
        <div class="flex gap-2 py-3">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition duration-200"
            :class="selectedCategory === cat
              ? 'bg-blue-600 text-white'
              : 'border border-white/15 text-white/50 hover:border-white/30 hover:text-white'"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

    <!-- Posts grid -->
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p class="mb-6 text-xs text-white/30">{{ filtered.length }} article{{ filtered.length !== 1 ? 's' : '' }}</p>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(post, i) in filtered"
          :key="post.id"
          class="blog-card group flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0f1f] transition duration-300 hover:border-white/20 hover:bg-[#111327]"
          :style="`animation-delay: ${i * 0.06}s`"
          @click="goToPost(post.slug)"
        >
          <!-- Cover image -->
          <div class="relative h-48 overflow-hidden bg-[#080a18]">
            <img
              :src="post.coverImage"
              :alt="post.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0d0f1f] via-transparent to-transparent"></div>
          </div>

          <div class="flex flex-1 flex-col p-6">
            <div class="flex items-center justify-between">
              <span class="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" :class="post.categoryColor">
                {{ post.category }}
              </span>
              <span class="text-[10px] text-white/30">{{ post.readTime }}</span>
            </div>

            <h2 class="mt-4 text-base font-black leading-snug text-white transition group-hover:text-blue-300">
              {{ post.title }}
            </h2>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-white/50">{{ post.excerpt }}</p>

            <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <p class="text-xs font-semibold text-white">{{ post.author }}</p>
                <p class="text-[10px] text-white/35">{{ post.date }}</p>
              </div>
              <div class="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/40 transition group-hover:border-blue-500/50 group-hover:text-blue-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty state -->
      <div v-if="filtered.length === 0" class="py-20 text-center">
        <p class="text-white/30">No articles in this category yet.</p>
      </div>
    </section>

  </div>
</template>
