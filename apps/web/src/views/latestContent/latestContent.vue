<script setup lang="ts">
import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import LatestBlock from "/@/views/latestContent/components/latestBlock.vue";
import { useThemeChange } from "/@/hooks/useThemeChange/useThemeChange.ts";

const { headerBg } = useThemeChange();
</script>

<template>
  <div class="bg-base min-h-dvh">
    <div
      class="sticky top-0 z-9999 p-b-30px header switch-animation"
      :class="headerBg ? 'custom-header' : ''"
    >
      <navigation-bar :anim="false" />
    </div>
    <latest-block />
  </div>
</template>

<style scoped></style>