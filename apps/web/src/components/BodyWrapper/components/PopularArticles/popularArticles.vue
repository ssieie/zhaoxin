<script setup lang="ts"></script>

<template>
  <div class="h-auto md:sticky md:top-30px">
    <div class="flex items-center m-b-16px md:m-b-40px">
      <span
        class="inline-block i-tabler-christmas-tree text-26px font-black color-#06b6d4 dark:color-#67e8f9 switch-animation"
      ></span>
      <span
        class="font-cnss p-l-4px color-#06b6d4 dark:color-#67e8f9 tracking-2px switch-animation"
        >热门内容</span
      >
    </div>
    <div
      v-for="(i, idx) in 10"
      :style="{
        '--focus-in-expand-animation-delay': (idx + 1) * 0.16 + 's',
      }"
      class="text-16px title-text-base m-b-10px select-none relative fade-in-top"
    >
      <span class="text-shadow-drop-right-h cursor-pointer title-wrap"
        >标题 - {{ i }}</span
      >
      <span
        class="absolute title-arrow i-tabler-arrow-right text-24px color-#1d4ed8 dark:color-#3b82f6 switch-animation"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="sass">
.title-wrap
  &:hover + .title-arrow
    left: -30px


.title-arrow
  left: -40px
  top: 1px
  transition: all .1s ease-in-out
</style>
