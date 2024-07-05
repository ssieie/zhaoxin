<script setup lang="ts">
import NavigationBar from "/src/components/headerComponents/NavigationBar/navigationBar.vue";
import Wave from "/@/components/headerComponents/wave/wave.vue";
import DogPicture from "/@/components/headerComponents/DogPicture/dogPicture.vue";
import PointFollow from "/src/components/headerComponents/PointFollow/pointFollow.vue";
</script>

<template>
  <div
    class="h-300px sm:h-400px bg-gradient-to-r from-#bae6fd to-#dcfce7 dark:bg-gradient-to-b dark:from-slate-950 dark:to-slate-800 switch-animation relative overflow-hidden"
  >
    <NavigationBar />
    <Wave />
    <PointFollow />
    <DogPicture />
  </div>
</template>

<style scoped></style>
