<script setup lang="ts">
import HomeHeader from "/@/components/HomeHeader/HomeHeader.vue";
import BodyWrapper from "/@/components/BodyWrapper/bodyWrapper.vue";
import ScrollToTop from "/@/components/ScrollToTop/scrollToTop.vue";
</script>

<template>
  <div class="bg-white dark:bg-dark switch-animation min-h-dvh">
    <HomeHeader />
    <BodyWrapper />
    <ScrollToTop />
  </div>
</template>

<style scoped></style>