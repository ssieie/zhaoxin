<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Uhuhuh from "/@/components/headerComponents/PointFollow/pointFollow.ts";

const { theme }: any = inject("theme");

const pointFollowRef = ref(null);
let uhuhuh: Uhuhuh | null = null;

watch(
  () => theme.value,
  () => {
    if (uhuhuh) uhuhuh.default();
  },
);

onMounted(() => {
  uhuhuh = new Uhuhuh(430, 230, pointFollowRef.value!);
  uhuhuh.render();
});

onBeforeUnmount(() => {
  if (uhuhuh) {
    uhuhuh.destroy();
  }
});
</script>

<template>
  <div class="max-w-1100px h-300px m-auto pointer-events-none relative z-1">
    <div
      class="absolute right-0 -bottom-6 w-430px h-230px"
      ref="pointFollowRef"
    ></div>
  </div>
</template>

<style scoped></style>
