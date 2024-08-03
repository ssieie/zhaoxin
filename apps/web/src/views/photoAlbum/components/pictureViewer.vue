<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

const open = ref(false);
const imgUrl = ref("");
const imgWidth = ref(0);
const imgHeight = ref(0);
const viewer = (url: Record<"width" | "height" | "url", any>) => {
  imgUrl.value = url.url;

  const maxWidth = document.body.clientWidth * 0.7;
  const maxHeight = document.body.clientHeight * 0.7;

  const widthRatio = maxWidth / url.width; // 宽度缩放比例
  const heightRatio = maxHeight / url.height; // 高度缩放比例

  if (maxHeight - url.height > maxWidth - url.width) {
    imgWidth.value = url.width * widthRatio;
    imgHeight.value = url.height * widthRatio;
  } else {
    imgWidth.value = url.width * heightRatio;
    imgHeight.value = url.height * heightRatio;
  }

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
    <img
      :src="imgUrl"
      :width="imgWidth"
      :height="imgHeight"
      alt="Image"
      :class="{
        'ac-img': open,
      }"
    />
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
