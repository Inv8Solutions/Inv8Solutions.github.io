<template>
  <vue3-marquee direction="left" :pause-on-hover="true" :clone="true">
    <!-- Grid Layout -->
    <div class="grid grid-cols-5 grid-rows-1 gap-4">
      <div class="rounded-lg w-full h-fit shadow-lg">
        <img src="../assets/introImage1.png" alt="Intro" class="w-full h-96 object-cover" />
      </div>

      <div class="rounded-lg w-full h-fit shadow-lg">
        <img
          src="../assets/introImage2.png"
          alt="Intro2"
          class="w-full h-96 object-cover rounded-lg"
        />
      </div>
      <div class="rounded-lg shadow-lg h-96">
        <img
          src="../assets/introImage3.png"
          alt="Intro3"
          class="w-full h-96 object-contain rounded-lg"
        />
      </div>
      <div class="rounded-lg shadow-lg h-96">
        <img
          src="../assets/introImage4.png"
          alt="Intro4"
          class="w-full h-96 object-contain rounded-lg"
        />
      </div>
      <div class="rounded-lg w-full h-fit shadow-lg">
        <img
          src="../assets/introImage5.png"
          alt="Intro5"
          class="w-full h-96 object-cover rounded-lg"
        />
      </div>
    </div>
  </vue3-marquee>
</template>

<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee'
</script>

<style scoped></style>
