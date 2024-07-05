<script setup lang="ts">
import {inject} from "vue";

const { updateLocation } = inject<any>("theme");
</script>

<template>
  <button
      @click="updateLocation"
      class="i-tabler-sun dark:i-tabler-moon text-26px font-black m-r-10px sm:m-r-30px color-#374151 dark:color-#d1d5db switch-animation"
  />
</template>

<style scoped>

</style>