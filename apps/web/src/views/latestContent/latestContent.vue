<script setup lang="ts">

import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import LatestBlock from "/@/views/latestContent/components/latestBlock.vue";
</script>

<template>
  <div class="bg-base min-h-dvh">
    <div class="sticky top-0 bg-base z-9999 p-b-30px">
      <navigation-bar :anim="false" />
    </div>
    <latest-block />
  </div>
</template>

<style scoped>

</style>