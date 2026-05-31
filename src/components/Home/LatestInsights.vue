<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore'
import { db } from '@/firebase'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const router = useRouter()
const { observeElements } = useScrollAnimation()

type BlogPostCard = {
  id: string
  category: string
  date: string
  title: string
  excerpt: string
  readTime: string
  image: string
  slug: string
}

const activeCategory = ref('All Insights')
const posts = ref<BlogPostCard[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const categories = computed(() => {
  const unique = Array.from(new Set(posts.value.map((p) => p.category).filter(Boolean)))
  return ['All Insights', ...unique]
})

const filtered = computed(() =>
  activeCategory.value === 'All Insights'
    ? posts.value
    : posts.value.filter((p) => p.category === activeCategory.value)
)

const handlePostView = (post: BlogPostCard) => {
  if (post.id) {
    router.push(`/blog/${post.id}`)
  } else {
    router.push('/blog')
  }
}

async function fetchLatestPosts() {
  isLoading.value = true
  error.value = null
  try {
    const q = query(collection(db, 'blogposts'), orderBy('created_at', 'desc'), limit(3))
    const snap = await getDocs(q)
    posts.value = snap.docs.map((d) => {
      const data = d.data() as Record<string, unknown>
      const readTimeRaw = data.read_time
      const readTime = typeof readTimeRaw === 'number'
        ? `${readTimeRaw} min read`
        : typeof readTimeRaw === 'string'
        ? readTimeRaw
        : ''

      return {
        id: d.id,
        category: (data.category as string) || '',
        date: (data.date as string) || '',
        title: (data.title as string) || '',
        excerpt: (data.excerpt as string) || '',
        readTime,
        image: (data.cover_image as string) || (data.coverImage as string) || '',
        slug: (data.slug as string) || '',
      }
    })
  } catch (err) {
    console.error('Failed to load blogposts', err)
    error.value = 'Failed to load posts.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchLatestPosts()
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
          @click="handlePostView(post)"
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
                {{ post.readTime || '—' }}
              </span>
              <button
                type="button"
                class="inline-flex items-center gap-1 text-sm font-semibold text-white/50 transition-all group-hover:gap-2 group-hover:text-blue-400"
                @click.stop="handlePostView(post)"
              >
                Read more
                <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
              </button>
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
