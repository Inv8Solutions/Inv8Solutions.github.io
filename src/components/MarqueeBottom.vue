<template>
  <vue3-marquee direction="reverse" :pauseOnHover="false" :clone="false" :duration="30">
    <div class="flex items-center gap-10 last:mr-10 my-10">
      <div class="rounded-lg shadow-lg">
        <img src="../assets/introImage6.png" class="h-96 w-auto rounded-lg object-cover" />
      </div>

      <div class="rounded-lg shadow-lg">
        <img src="../assets/introImage7.png" class="h-96 w-auto rounded-lg object-cover" />
      </div>

      <!-- narrow container for phone screenshots -->
      <div class="rounded-lg shadow-lg w-48">
        <img src="../assets/introImage8.png" class="h-96 w-full rounded-lg object-cover" />
      </div>

      <div class="rounded-lg shadow-lg">
        <img src="../assets/introImage9.png" class="h-96 w-full rounded-lg object-cover" />
      </div>

      <div class="rounded-lg shadow-lg">
        <img src="../assets/introImage10.png" class="h-96 w-auto rounded-lg object-cover" />
      </div>
    </div>
  </vue3-marquee>
</template>

<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee'
</script>
