<script setup lang="ts">
import { ref, provide, watch } from "vue";
import MouseStars from "/@/components/MouseStars/mouseStars.vue";
import {triggerSoundEffect} from "@blog/utils";
import a from '/@/assets/audio/click-button-140881.mp3'
import b from '/@/assets/audio/light-switch-81967.mp3'

const theme = ref<string>(localStorage.getItem("theme") || "light");

const updateLocation = () => {
  if (theme.value === "light") {
    theme.value = "dark";
    triggerSoundEffect(b)
  } else {
    theme.value = "light";
    triggerSoundEffect(a)
  }
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
    <MouseStars />
  </div>
</template>

<style scoped></style>
