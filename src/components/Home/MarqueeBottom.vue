<template>
  <vue3-marquee direction="reverse" :pauseOnHover="false" :clone="false" :duration="30">
    <div class="flex items-center gap-10 last:mr-10 my-10">
      <div class="rounded-lg shadow-lg">
        <img :src="img6" class="h-96 w-auto rounded-lg object-cover" />
      </div>
      <div class="rounded-lg shadow-lg">
        <img :src="img7" class="h-96 w-auto rounded-lg object-cover" />
      </div>
      <div class="rounded-lg shadow-lg w-48">
        <img :src="img8" class="h-96 w-full rounded-lg object-cover" />
      </div>
      <div class="rounded-lg shadow-lg">
        <img :src="img9" class="h-96 w-full rounded-lg object-cover" />
      </div>
      <div class="rounded-lg shadow-lg">
        <img :src="img10" class="h-96 w-auto rounded-lg object-cover" />
      </div>
    </div>
  </vue3-marquee>
</template>

<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee'
import img6 from '@/assets/introImage6.png'
import img7 from '@/assets/introImage7.png'
import img8 from '@/assets/introImage8.png'
import img9 from '@/assets/introImage9.png'
import img10 from '@/assets/introImage10.png'
</script>
