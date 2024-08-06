<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

const open = ref(false);
const iframeUrl = ref("");
const viewer = (url: string) => {
  iframeUrl.value = url;

  open.value = true;
};

watch(open, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// 确保组件卸载时恢复滚动
onUnmounted(() => {
  document.body.style.overflow = "";
});

defineExpose({
  viewer,
});
</script>

<template>
  <div
    class="fixed top-0 right-0 bottom-0 left-0 z-9999 viewer-wrapper flex items-center justify-center select-none"
    :class="{
      ac: open,
    }"
  >
    <div class="w-80% h-80%">
      <iframe v-if="open" :src="iframeUrl" width="100%" height="100%" style="border:none;" />
    </div>
    <div class="fixed top-20px right-20px">
      <span
        @click="open = false"
        class="inline-block cursor-pointer i-tabler-x text-26px font-black color-#67e8f9 dark:color-#d1d5db switch-animation"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.viewer-wrapper {
  pointer-events: none;
  opacity: 0;
}

.ac {
  visibility: visible;
  pointer-events: auto;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
}

.ac-img {
  animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
</style>
