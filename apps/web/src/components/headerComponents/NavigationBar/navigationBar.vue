<script setup lang="ts">
import { ref } from "vue";
import MdScreenMenu from "/@/components/headerComponents/MdScreenMenu/mdScreenMenu.vue";
import { menuList, RouteItem } from "/@/hooks/useMenuList/useMenuList.ts";
import GithubButton from "/@/components/headerComponents/NavigationBar/components/githubButton.vue";
import VolumeButton from "/@/components/headerComponents/NavigationBar/components/volumeButton.vue";
import themeButton from "/src/components/headerComponents/NavigationBar/components/themeButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routerChange = (item: RouteItem) => {
  router.push(item.url)
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
      <div class="text-3xl font-bold m-r-60px cursor-pointer select-none" @click="routerChange({title:'首页',url:'/'})">
        <span
          class="switch-animation color-#1d4ed8 font-playwrite dark:color-sky-200 focus-in-expand"
        >
          Zhao Xin
        </span>
      </div>
      <div
        v-for="(i, idx) in menuList"
        :key="idx"
        @click="routerChange(i)"
        class="hidden md:block self-end focus-in-expand color-#111827 text-16px font-300 cursor-pointer m-r-30px alibbph dark:color-#d4d4d8 relative underline-animation-target select-none"
        :style="{
          '--focus-in-expand-animation-delay': (idx + 1) * 0.12 + 's',
        }"
      >
        {{ i.title }}
        <span class="underline-animation underline-base"></span>
      </div>
    </div>
    <div>
      <theme-button class="hidden md:inline-block" />
      <volume-button class="hidden md:inline-block" />
      <github-button class="hidden md:inline-block" />
      <button
        @click="openMenu"
        class="i-tabler-menu-2 text-26px font-black color-#374151 dark:color-#d1d5db switch-animation inline-block md:hidden"
      />
    </div>
  </div>
  <MdScreenMenu ref="MdScreenMenuRef" />
</template>

<style scoped></style>
