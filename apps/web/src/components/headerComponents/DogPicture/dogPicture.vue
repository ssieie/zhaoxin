<script setup lang="ts">
import { computed, inject } from "vue";

const { theme }: any = inject("theme");

const dogUri = computed(() => {
  return theme.value === "light" ? "dog-pic-light" : "dog-pic-dark";
});
</script>

<template>
  <div
    class="header-w h-300px m-auto pointer-events-none relative z-3 -translate-y-300px hidden sm:block"
  >
    <div class="dog-pic w-166px h-200px absolute right-0 bottom-0" :class="dogUri"></div>
  </div>
</template>

<style scoped lang="sass">
.dog-pic-light
  background: url("../../../assets/images/dog.png") no-repeat 100% 100%

.dog-pic-dark
  background: url("../../../assets/images/dog-dark.png") no-repeat 100% 100%

.dog-pic
  background-size: contain
  z-index: 1
</style>
