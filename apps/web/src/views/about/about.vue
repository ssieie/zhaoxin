<script setup lang="ts">
import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import Content from "/@/views/about/components/content.vue";
import {useThemeChange} from "/@/hooks/useThemeChange/useThemeChange.ts";


const { headerBg } = useThemeChange();
</script>

<template>
  <div class="bg-base min-h-dvh">
    <div class="sticky top-0 z-9999 p-b-30px header switch-animation"
         :class="headerBg ? 'custom-header' : ''"
    >
      <navigation-bar :anim="false" />
    </div>
    <div class="m-auto header-w p-b-20px md:p-b-60px m-t-20px md:m-t-60px">
      <div class="bg-base z-1 text-30px font-700 title-text-base">关于</div>
      <content />
    </div>
  </div>
</template>

<style scoped>

</style>