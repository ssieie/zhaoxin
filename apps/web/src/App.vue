<script setup lang="ts">
import { ref, provide, watch } from "vue";

const theme = ref<string>(localStorage.getItem("theme") || "light-theme");
provide("theme", theme);

watch(
  () => theme.value,
  (newTheme) => {
    console.log(newTheme)
    localStorage.setItem("theme", newTheme);
  },
);
</script>

<template>
  <div :class="theme">
    <router-view />
  </div>
</template>

<style scoped>
</style>
