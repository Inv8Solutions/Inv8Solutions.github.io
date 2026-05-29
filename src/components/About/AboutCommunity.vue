<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

interface GalleryPhoto {
  id: string
  url: string
  caption?: string
}

const photos = ref<GalleryPhoto[]>([])
const loadingPhotos = ref(true)
const { observeElements } = useScrollAnimation()

const communityFeatures = [
  { icon: 'fa-regular fa-comments', title: 'Product Feedback Lounge', description: 'Get direct, actionable feedback on your product from builders and founders.' },
  { icon: 'fa-solid fa-calendar-week', title: 'Weekly Build Updates', description: 'Share what you are working on, what is blocked, and what you shipped.' },
  { icon: 'fa-solid fa-graduation-cap', title: 'Open to Student Builders', description: 'For students and early builders who want to go beyond projects and build real products.' },
  { icon: 'fa-regular fa-clock', title: 'Office Hours with inv8', description: 'Join sessions where we answer product, design, and startup questions.' },
]

onMounted(async () => {
  observeElements('.community-header')
  observeElements('.gallery-section')
  observeElements('.discord-cta')

  try {
    const q = query(collection(db, 'community_gallery'), orderBy('order', 'asc'))
    const snap = await getDocs(q)
    photos.value = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryPhoto, 'id'>) }))
  } catch {
    // gallery stays empty
  } finally {
    loadingPhotos.value = false
  }
})
</script>

<template>
  <section aria-labelledby="community-heading" class="bg-[#03040f] py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="community-header mb-14 text-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
          <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          Our Journey
        </span>
        <h2 id="community-heading" class="mt-5 text-4xl font-black leading-tight text-white md:text-5xl">
          Working with builders<br class="hidden sm:block" /> across the community
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/55">
          From workshops to community events, these moments show how ideas move forward through collaboration and execution.
        </p>
      </div>

      <!-- Gallery -->
      <div class="gallery-section mb-20">
        <div v-if="loadingPhotos" class="flex justify-center py-16">
          <div class="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" role="status" aria-label="Loading gallery"></div>
        </div>

        <div v-else-if="photos.length" class="columns-2 gap-4 sm:columns-3 lg:columns-4">
          <figure
            v-for="photo in photos"
            :key="photo.id"
            class="mb-4 break-inside-avoid overflow-hidden rounded-2xl"
          >
            <img
              :src="photo.url"
              :alt="photo.caption || 'Community event photo'"
              class="w-full object-cover transition duration-500 hover:scale-105"
              loading="lazy"
            />
          </figure>
        </div>

        <div v-else class="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10 py-20 text-gray-400">
          <i class="fa-regular fa-images text-4xl" aria-hidden="true"></i>
          <p class="mt-3 text-sm font-semibold">No photos yet</p>
          <p class="mt-1 text-xs">Add photos from Admin Panel → Community Gallery</p>
        </div>
      </div>

      <!-- Discord CTA -->
      <div class="discord-cta overflow-hidden rounded-3xl bg-[#03040f]">
        <div class="flex flex-col gap-10 p-10 md:flex-row md:items-start md:p-14">

          <!-- Left -->
          <div class="md:w-2/5">
            <p class="text-xs font-bold uppercase tracking-widest text-blue-400">Community</p>
            <h3 class="mt-3 text-3xl font-black leading-tight text-white md:text-4xl">
              Join the Inv8<br />Community
            </h3>
            <p class="mt-4 text-sm leading-relaxed text-white/55">
              A space for founders, developers, designers, and students who are building something. Ask questions, share progress, get feedback, and connect with builders across the Inv8 Community.
            </p>
            <a
              href="https://discord.gg/jngYbhwsa5"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:bg-indigo-500 hover:scale-105"
            >
              <i class="fa-brands fa-discord" aria-hidden="true"></i>
              Join Discord Server
            </a>
          </div>

          <!-- Right: feature list -->
          <div class="flex-1 grid sm:grid-cols-2 gap-5">
            <div
              v-for="feature in communityFeatures"
              :key="feature.title"
              class="flex items-start gap-3 rounded-2xl border border-white/5 bg-[#0d0f1f]/[0.04] p-5"
            >
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/100/15 text-blue-400">
                <i :class="[feature.icon, 'text-sm']" aria-hidden="true"></i>
              </div>
              <div>
                <p class="text-sm font-bold text-white">{{ feature.title }}</p>
                <p class="mt-1 text-xs leading-relaxed text-white/50">{{ feature.description }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
