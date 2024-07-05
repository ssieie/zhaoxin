<script setup lang="ts">
const toGitPage = () => {
  const url = "https://github.com/ssieie/zhaoxin";
  window.open(url, "_blank");
};
</script>

<template>
  <button
      @click="toGitPage"
      class="i-tabler-brand-github text-26px font-black color-#374151 zx-rotate-center-h dark:color-#d1d5db switch-animation"
  />
</template>

<style scoped>

</style>