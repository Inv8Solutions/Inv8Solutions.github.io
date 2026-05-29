<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AboutHero from '@/components/About/AboutHero.vue'
import AboutWhyExists from '@/components/About/AboutWhyExists.vue'
import AboutProblems from '@/components/About/AboutProblems.vue'
import AboutProcess from '@/components/About/AboutProcess.vue'
import AboutCommunity from '@/components/About/AboutCommunity.vue'

const originalTitle = document.title
const originalDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? ''
const originalOgDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? ''

onMounted(() => {
  document.title = 'About Us — inv8 Studio | Product Design & Development Philippines'

  const setMeta = (sel: string, attr: string, val: string) => {
    document.querySelector(sel)?.setAttribute(attr, val)
  }

  setMeta('meta[name="description"]', 'content',
    'Learn how inv8 Studio helps founders, SMEs, and organizations in the Philippines move from idea to market-ready digital products through strategy, design, and engineering.')
  setMeta('meta[property="og:title"]', 'content',
    'About Us — inv8 Studio | Product Design & Development Philippines')
  setMeta('meta[property="og:description"]', 'content',
    'inv8 Studio is a product design and development studio helping founders and businesses build meaningful digital products with clarity, speed, and disciplined execution.')
  setMeta('meta[property="og:url"]', 'content', 'https://www.inv8.io/about')

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = 'https://www.inv8.io/about'
})

onUnmounted(() => {
  document.title = originalTitle
  const setMeta = (sel: string, attr: string, val: string) => {
    document.querySelector(sel)?.setAttribute(attr, val)
  }
  setMeta('meta[name="description"]', 'content', originalDesc)
  setMeta('meta[property="og:title"]', 'content', originalOgTitle)
  setMeta('meta[property="og:description"]', 'content', originalOgDesc)
  setMeta('meta[property="og:url"]', 'content', 'https://www.inv8.io/')
})
</script>

<template>
  <main id="about-page" aria-label="About inv8 Studio">
    <AboutHero />
    <AboutWhyExists />
    <AboutProblems />
    <AboutProcess />
    <AboutCommunity />
  </main>
</template>
