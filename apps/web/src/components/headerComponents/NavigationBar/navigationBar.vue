<script setup lang="ts">
import { inject, ref } from "vue";
import MdScreenMenu from "/@/components/headerComponents/MdScreenMenu/mdScreenMenu.vue";
import { menuList } from "/@/hooks/useMenuList/useMenuList.ts";

const { updateLocation } = inject<any>("theme");

const toGitPage = () => {
  const url = "https://github.com/ssieie/zhaoxin";
  window.open(url, "_blank");
};

const MdScreenMenuRef = ref();
const openMenu = () => {
  MdScreenMenuRef.value.open();
};
</script>

<template>
  <div class="h-18px sm:h-48px"></div>
  <div class="flex justify-between items-center m-auto header-w">
    <div class="flex items-center">
      <div class="text-4xl font-bold m-r-60px cursor-pointer select-none">
        <span
          class="switch-animation bg-clip-text text-transparent bg-gradient-to-r from-#1d4ed8 to-#60a5fa font-playwrite dark:from-sky-200 dark:to-sky-600 focus-in-expand"
        >
          Zhao Xin
        </span>
      </div>
      <div
        v-for="(i, idx) in menuList"
        :key="idx"
        class="hidden md:block self-end focus-in-expand color-#000 text-16px font-medium cursor-pointer m-r-30px font-nss dark:color-#d4d4d8 relative underline-animation-target select-none"
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
        class="i-tabler-sun dark:i-tabler-moon text-26px font-black m-r-10px sm:m-r-30px color-#374151 dark:color-#d1d5db switch-animation"
      />
      <button
        @click="toGitPage"
        class="i-tabler-brand-github text-26px font-black m-r-10px sm:m-r-30px color-#374151 zx-rotate-center-h dark:color-#d1d5db switch-animation"
      />
      <button
        @click="openMenu"
        class="i-tabler-menu-2 text-26px font-black color-#374151 dark:color-#d1d5db switch-animation inline-block md:hidden"
      />
    </div>
  </div>
  <MdScreenMenu ref="MdScreenMenuRef" />
</template>

<style scoped></style>