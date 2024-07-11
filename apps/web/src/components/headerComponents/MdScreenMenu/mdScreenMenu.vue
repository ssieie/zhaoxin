<script setup lang="ts">
import { useMenu } from "/@/hooks/useMenuList/useMenuList.ts";
import { ref } from "vue";
import VolumeButton from "/@/components/headerComponents/NavigationBar/components/volumeButton.vue";
import GithubButton from "/@/components/headerComponents/NavigationBar/components/githubButton.vue";
import themeButton from "/src/components/headerComponents/NavigationBar/components/themeButton.vue";

const { menuList, menuChange } = useMenu();

const menuOpen = ref(false);

const closeMenu = () => {
  menuOpen.value = false;
};
const open = () => {
  menuOpen.value = true;
};

defineExpose({
  open,
});
</script>

<template>
  <Transition name="fade">
    <div
      v-if="menuOpen"
      class="fixed top-0 left-0 right-0 bottom-0 z-3 bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(0,0,0,0.1)]"
    >
      <div
        class="fixed top-0 left-0 right-0 h-auto flex flex-col items-center p-t-30px p-b-20px bg-white dark:bg-#153448 scale-in-ver-top switch-animation"
      >
        <div
          v-for="(i, idx) in menuList"
          :key="idx"
          @click="menuChange('push', i, idx, closeMenu)"
          class="m-6px focus-in-expand color-#111827 text-16px font-400 cursor-pointer alibbph dark:color-#d4d4d8 select-none underline-animation-target"
          :style="{
            '--focus-in-expand-animation-delay': (idx + 1) * 0.12 + 's',
          }"
        >
          {{ i.title }}
          <span
            class="underline-animation underline-base"
            :class="{ 'underline-animation-active': i.isActive }"
          ></span>
        </div>
        <div
          class="h-6px w-full bg-#f5f5f5 dark:bg-#334155 switch-animation m-b-10px m-t-10px"
        ></div>
        <div class="flex">
          <theme-button />
          <volume-button />
          <github-button />
        </div>
        <button
          @click="closeMenu"
          class="i-tabler-x text-26px font-black color-#374151 dark:color-#d1d5db switch-animation m-t-10px"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 350ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
