<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

defineOptions({ name: 'BlogPostView' })

const route = useRoute()
const router = useRouter()

type BlogPost = {
  id: string
  title: string
  slug: string
  category: string
  categoryColor: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  authorRole: string
  date: string
  readTime: string
}

import { useTheme } from '@/composables/useTheme'

const post = ref<BlogPost | null>(null)
const relatedPosts = ref<BlogPost[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const { isDark } = useTheme()

const blogVars = computed(() => ({
  '--blog-text-rgb': isDark.value ? '255 255 255' : '15 23 42',
  '--blog-heading-rgb': isDark.value ? '255 255 255' : '15 23 42',
}))

function formatReadTime(raw: unknown) {
  if (typeof raw === 'number') return `${raw} min read`
  if (typeof raw === 'string') return raw
  return ''
}

function mapPost(id: string, data: Record<string, unknown>): BlogPost {
  const textarea = document.createElement('textarea')
  const rawContent = (data.content as string) || ''
  textarea.innerHTML = rawContent
  const normalizedContent = textarea.value || rawContent
  return {
    id,
    title: (data.title as string) || '',
    slug: (data.slug as string) || id,
    category: (data.category as string) || '',
    categoryColor: (data.category_color as string) || 'bg-gray-100 text-gray-600',
    excerpt: (data.excerpt as string) || '',
    content: normalizedContent,
    coverImage: (data.cover_image as string) || '',
    author: (data.author as string) || '',
    authorRole: (data.author_role as string) || '',
    date: (data.date as string) || '',
    readTime: formatReadTime(data.read_time),
  }
}

async function loadPost() {
  const slugParam = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
  if (!slugParam) {
    router.replace('/blog')
    return
  }

  isLoading.value = true
  error.value = null
  post.value = null
  relatedPosts.value = []

  try {
    const docRef = doc(db, 'blogposts', slugParam)
    const snap = await getDoc(docRef)

    let foundId = ''
    let foundData: Record<string, unknown> | null = null

    if (snap.exists()) {
      foundId = snap.id
      foundData = snap.data() as Record<string, unknown>
    } else {
      const q = query(collection(db, 'blogposts'), where('slug', '==', slugParam), limit(1))
      const qsnap = await getDocs(q)
      if (!qsnap.empty) {
        const d = qsnap.docs[0]
        if (d) {
          foundId = d.id
          foundData = d.data() as Record<string, unknown>
        }
      }
    }

    if (!foundData) {
      router.replace('/blog')
      return
    }

    const mapped = mapPost(foundId, foundData)
    post.value = mapped

    if (mapped.category) {
      const relatedQuery = query(
        collection(db, 'blogposts'),
        where('category', '==', mapped.category),
        limit(3),
      )
      const relSnap = await getDocs(relatedQuery)
      relatedPosts.value = relSnap.docs
        .map((d) => mapPost(d.id, d.data() as Record<string, unknown>))
        .filter((p) => p.id !== mapped.id)
        .slice(0, 2)
    }
  } catch (err) {
    console.error('Failed to load blog post', err)
    error.value = 'Failed to load this article.'
  } finally {
    isLoading.value = false
  }
}

const handleRelatedView = (related: BlogPost) => {
  if (related.id) {
    router.push(`/blog/${related.id}`)
  }
}

onMounted(() => {
  loadPost()
})

watch(
  () => route.params.slug,
  () => {
    loadPost()
  },
)
</script>

<template>
  <div v-if="post" class="min-h-screen bg-[#03040f]">

    <!-- Back nav -->
    <div class="sticky top-[57px] z-40 border-b border-white/10 bg-[#03040f]/90 backdrop-blur-md">
      <div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <button
          @click="router.push('/blog')"
          class="inline-flex items-center gap-2 text-xs font-semibold text-white/40 transition hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Back to Blog
        </button>
      </div>
    </div>

    <!-- Header -->
    <header class="mx-auto max-w-3xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
      <span class="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" :class="post.categoryColor">
        {{ post.category }}
      </span>
      <h1 class="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
        {{ post.title }}
      </h1>
      <p class="mt-4 text-base leading-relaxed text-white/50">{{ post.excerpt }}</p>

      <div class="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-sm font-black text-blue-400">
          {{ post.author.charAt(0) }}
        </div>
        <div>
          <p class="text-sm font-bold text-white">{{ post.author }}</p>
          <p class="text-xs text-white/35">{{ post.authorRole }} , inv8 Studio</p>
        </div>
        <div class="ml-auto flex items-center gap-3 text-xs text-white/30">
          <span>{{ post.date }}</span>
          <span class="h-1 w-1 rounded-full bg-white/20"></span>
          <span>{{ post.readTime }}</span>
        </div>
      </div>
    </header>

    <!-- Divider -->
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div class="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
    </div>

    <!-- Article body -->
    <article
      class="blog-content mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8"
      v-html="post.content"
      :style="blogVars"
    ></article>

    <!-- Related posts -->
    <section v-if="relatedPosts.length" class="border-t border-white/10 bg-[#080a18] px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">More in {{ post.category }}</p>
        <div class="grid gap-5 sm:grid-cols-2">
          <article
            v-for="related in relatedPosts"
            :key="related.id"
            class="group flex cursor-pointer flex-col gap-3 rounded-[20px] border border-white/10 bg-[#0d0f1f] p-6 transition duration-300 hover:border-white/20 hover:bg-[#111327]"
            @click="handleRelatedView(related)"
          >
            <span class="w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" :class="related.categoryColor">
              {{ related.category }}
            </span>
            <h3 class="text-sm font-black leading-snug text-white group-hover:text-blue-300">{{ related.title }}</h3>
            <p class="text-xs leading-relaxed text-white/45">{{ related.excerpt }}</p>
            <p class="text-[10px] text-white/30">{{ related.date }} · {{ related.readTime }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-2xl font-black text-white sm:text-3xl">Ready to build something real?</h2>
        <p class="mt-3 text-sm leading-relaxed text-white/50">
          We partner with startups and MSMEs to validate ideas, design great products, and ship them fast.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <button
            @click="router.push('/contactus')"
            class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500 hover:scale-105"
          >
            Start a Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            @click="router.push('/blog')"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 hover:scale-105"
          >
            Read more articles
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.blog-content {
  --blog-text-rgb: 15 23 42;
  --blog-heading-rgb: 15 23 42;
  color: rgba(var(--blog-text-rgb) / 0.75);
}
.blog-content :deep(p) {
  color: rgba(var(--blog-text-rgb) / 0.75);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
}
.blog-content :deep(h1) {
  color: rgb(var(--blog-heading-rgb));
  font-size: 2rem;
  font-weight: 900;
  margin-top: 2.75rem;
  margin-bottom: 1rem;
}
.blog-content :deep(h3) {
  color: rgb(var(--blog-heading-rgb));
  font-size: 1.1rem;
  font-weight: 800;
  margin-top: 2rem;
  margin-bottom: 0.6rem;
}
.blog-content :deep(h2) {
  color: rgb(var(--blog-heading-rgb));
  font-size: 1.25rem;
  font-weight: 900;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
}
.blog-content :deep(ul) {
  color: rgba(var(--blog-text-rgb) / 0.75);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
  list-style: disc;
}
.blog-content :deep(ol) {
  color: rgba(var(--blog-text-rgb) / 0.75);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
  list-style: decimal;
  list-style-position: outside;
}

:global(.dark) .blog-content,
:global(html.dark) .blog-content {
  --blog-text-rgb: 255 255 255;
  --blog-heading-rgb: 255 255 255;
}
.blog-content :deep(li) {
  margin-bottom: 0.4rem;
}
.blog-content :deep(strong) {
  color: rgba(var(--blog-text-rgb) / 0.95);
  font-weight: 700;
}

:global(.dark) .blog-content :deep(p),
:global(.dark) .blog-content :deep(ul),
:global(.dark) .blog-content :deep(ol),
:global(html.dark) .blog-content :deep(p),
:global(html.dark) .blog-content :deep(ul),
:global(html.dark) .blog-content :deep(ol) {
  color: rgba(var(--blog-text-rgb) / 0.75);
}
:global(.dark) .blog-content :deep(strong),
:global(html.dark) .blog-content :deep(strong) {
  color: rgba(var(--blog-text-rgb) / 0.95);
}
</style>
