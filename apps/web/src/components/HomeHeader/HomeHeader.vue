<script setup lang="ts">
import NavigationBar from "/src/components/headerComponents/NavigationBar/navigationBar.vue";
import Wave from "/@/components/headerComponents/wave/wave.vue";
</script>

<template>
  <div
    class="h-400px bg-gradient-to-r from-sky-200 to-sky-100 dark:bg-gradient-to-b dark:from-slate-950 dark:to-slate-600 switch-animation relative overflow-hidden"
  >
    <NavigationBar />
    <Wave />
  </div>
</template>

<style scoped></style>
