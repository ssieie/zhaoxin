<script setup lang="ts">
import HomeHeader from "/@/components/HomeHeader/HomeHeader.vue";
import BodyWrapper from "/@/components/BodyWrapper/bodyWrapper.vue";
import ScrollToTop from "/@/components/ScrollToTop/scrollToTop.vue";
import Footer from "/@/components/Footer/footer.vue";
</script>

<template>
  <div class="bg-#f5f5f4 dark:bg-dark switch-animation min-h-dvh">
    <HomeHeader />
    <BodyWrapper />
    <Footer />
    <ScrollToTop />
  </div>
</template>

<style scoped>

</style>