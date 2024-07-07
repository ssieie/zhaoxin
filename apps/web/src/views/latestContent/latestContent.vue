<script setup lang="ts">

import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import LatestBlock from "/@/views/latestContent/components/latestBlock.vue";
</script>

<template>
  <div class="bg-#f5f5f4 dark:bg-#020617 switch-animation min-h-dvh">
    <div class="sticky top-0 bg-#f5f5f4 dark:bg-#020617 switch-animation z-9999 p-b-30px">
      <navigation-bar />
    </div>
    <latest-block />
  </div>
</template>

<style scoped>

</style>