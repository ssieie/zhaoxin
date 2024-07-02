<script setup lang="ts">
import { throttle } from "@blog/utils";
import { onMounted, onUnmounted, ref } from "vue";

const canvasWrap = ref();
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;

const mousemoveHandler = (e: MouseEvent) => {
  console.log(e.x,e.y);
  if (context){
    context.beginPath();
    // context.arc(e.x,e.y, 1.6, 0, 2 * Math.PI);
    // context.fill();
  }
};

const mousemoveHandlerThrottle = throttle(mousemoveHandler, 100);

onMounted(() => {
  canvas = document.createElement("canvas");
  context = canvas.getContext("2d");

  canvas.width = canvasWrap.value.clientWidth;
  canvas.height = canvasWrap.value.clientHeight;

  canvasWrap.value.innerHTML = "";
  // @ts-ignore
  canvasWrap.value.insertBefore(canvas, null);

  window.addEventListener("mousemove", mousemoveHandlerThrottle);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", mousemoveHandlerThrottle);
});
</script>

<template>
  <div
    class="fixed top-0 right-0 bottom-0 left-0 z-9999 pointer-events-none"
    ref="canvasWrap"
  ></div>
</template>

<style scoped></style>
