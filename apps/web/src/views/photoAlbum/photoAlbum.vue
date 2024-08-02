<script setup lang="ts">
import NavigationBar from "/@/components/headerComponents/NavigationBar/navigationBar.vue";
import { ref } from "vue";
import WaterfallFlowPhoto from "/@/views/photoAlbum/components/waterfallFlowPhoto.vue";
import PhotographyCollection from "/@/views/photoAlbum/components/photographyCollection.vue";

const tabsList = [
  { id: 1, flag: "new", name: "照片" },
  { id: 3, flag: "tvSeries", name: "影集" },
];

const currentTab = ref("new");

const changeTab = (flag: string) => {
  currentTab.value = flag;
};
</script>

<template>
  <div class="bg-base min-h-dvh">
    <div class="sticky top-0 z-9999 p-b-30px bg-base switch-animation">
      <navigation-bar :anim="false" />
    </div>
    <div
      class="h-60px sticky top-85px md:top-115px z-2 m-auto header-w bg-base p-b-20px"
    >
      <div
        class="h-full flex items-end gap-26px border-b-solid border-b-1 border-b-#e4e4e7 dark:border-b-#64748b p-b-8px color-#52525b dark:color-#94a3b8 text-16px font-bold switch-animation select-none"
      >
        <span
          v-for="i in tabsList"
          :key="i.id"
          @click="changeTab(i.flag)"
          class="hover:color-#1d4ed8 dark:hover:color-#d1d5db cursor-pointer"
          :class="currentTab === i.flag ? 'ac' : ''"
          >{{ i.name }}</span
        >
      </div>
    </div>
    <div class="m-auto header-w p-b-20px wrapper bg-base title-text-base">
      <waterfall-flow-photo v-show="['new'].includes(currentTab)" />
      <photography-collection v-show="currentTab === 'tvSeries'" />
    </div>
  </div>
</template>

<style scoped lang="less">
.light .ac {
  position: relative;
  color: #1d4ed8;

  &:before {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 2px;
    background: #1d4ed8;
  }
}

.dark .ac {
  position: relative;
  color: #d1d5db;

  &:before {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 2px;
    background: #d1d5db;
  }
}
</style>
