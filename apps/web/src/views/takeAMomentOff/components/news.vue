<script setup lang="ts">
import { onMounted, ref } from "vue";
import { otherApi } from "/@/api/other.ts";

const imgSrc = ref("");

onMounted(() => {
  otherApi()
    .news()
    .then((res: Blob) => {
      imgSrc.value = URL.createObjectURL(res);
    });
});
</script>

<template>
  <div class="wrap w-full h-full">
    <img alt="" :src="imgSrc" />
  </div>
</template>

<style scoped lang="less">
.wrap{
  overflow-y: auto;
}
</style>
