<template>
  <vue3-marquee direction="normal" :pauseOnHover="false" :clone="false" :duration="30">
    <div class="flex items-center gap-10 last:mr-10">
      <div class="rounded-lg shadow-lg">
        <img :src="img1" class="h-96 w-auto rounded-lg object-cover" />
      </div>
      <div class="rounded-lg shadow-lg">
        <img :src="img2" class="h-96 w-auto rounded-lg object-cover" />
      </div>
      <div class="rounded-lg shadow-lg w-48">
        <img :src="img3" class="h-96 w-full rounded-lg object-cover" />
      </div>
      <div class="rounded-lg shadow-lg w-48">
        <img :src="img4" class="h-96 w-full rounded-lg object-cover" />
      </div>
      <div class="rounded-lg shadow-lg">
        <img :src="img5" class="h-96 w-auto rounded-lg object-cover" />
      </div>
    </div>
  </vue3-marquee>
</template>

<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee'
import img1 from '@/assets/introImage1.png'
import img2 from '@/assets/introImage2.png'
import img3 from '@/assets/introImage3.png'
import img4 from '@/assets/introImage4.png'
import img5 from '@/assets/introImage5.png'
</script>
