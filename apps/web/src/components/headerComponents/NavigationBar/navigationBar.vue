<script setup lang="ts">
import { inject } from "vue";

const { updateLocation } = inject<any>("theme");

const menuList = [
  {
    title: "最新",
  },
  {
    title: "分类",
  },
  {
    title: "事件里程碑",
  },
  {
    title: "小憩",
  },
  {
    title: "还没想好",
  },
];

const toGitPage = () => {
  const url = 'https://github.com/ssieie/zhaoxin';
  window.open(url, '_blank');
}
</script>

<template>
  <div class="h-48px"></div>
  <div class="flex justify-between items-center max-w-1100px m-auto">
    <div class="flex items-center">
      <div class="text-24px font-bold m-r-70px cursor-pointer select-none">
        <span
          class="switch-animation bg-clip-text text-transparent bg-gradient-to-r from-#4433FF to-blue-500 font-playwrite dark:from-sky-200 dark:to-sky-600 focus-in-expand"
        >
          <span class="tracking-4px">Zhao</span> Xin
        </span>
      </div>
      <div
        v-for="(i, idx) in menuList"
        :key="idx"
        class="focus-in-expand color-#0A0C10 text-20px cursor-pointer m-r-34px font-zmx dark:color-#d4d4d8 relative underline-animation-target select-none"
        :style="{
          '--focus-in-expand-animation-delay': (idx + 1) * 0.12 + 's',
        }"
      >
        {{ i.title }}
        <span class="underline-animation underline-base"></span>
      </div>
    </div>
    <div>
      <button
        @click="updateLocation"
        class="i-tabler-sun dark:i-tabler-moon text-26px font-black m-r-30px color-#374151 dark:color-#d1d5db switch-animation"
      />
      <button
          @click="toGitPage"
        class="i-tabler-brand-github text-26px font-black color-#374151 zx-rotate-center-h dark:color-#d1d5db switch-animation"
      />
    </div>
  </div>
</template>

<style scoped></style>
