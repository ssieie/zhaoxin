<template>
  <CustomMdPreview id="about-zx" :content="text" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import CustomMdPreview from "/@/components/mdPreview/customMdPreview.vue";
import { aboutApi } from "/@/api/about.ts";

const text = ref("");

onMounted(() => {
  aboutApi()
    .about()
    .then((res) => {
      if (res.status === 200) {
        text.value = res.data;
      }
    });
});
</script>

<style scoped></style>
