<script setup lang="ts">
import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import Content from "/@/views/about/components/content.vue";



</script>

<template>
  <div class="bg-base min-h-dvh">
    <div class="sticky top-0 bg-base z-9999 p-b-30px">
      <navigation-bar />
    </div>
    <div class="m-auto header-w p-b-20px md:p-b-60px m-t-20px md:m-t-60px">
      <content />
    </div>
  </div>
</template>

<style scoped>

</style>