<script setup lang="ts">
import { ref, provide, watch } from "vue";

const theme = ref<string>(localStorage.getItem("theme") || "light");

const updateLocation = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};

provide("theme", {
  theme,
  updateLocation,
});

watch(
  () => theme.value,
  (newTheme) => {
    localStorage.setItem("theme", newTheme);
  },
);
</script>

<template>
  <div :class="theme">
    <router-view />
  </div>
</template>

<style scoped></style>
