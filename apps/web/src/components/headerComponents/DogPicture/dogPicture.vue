<script setup lang="ts">
import {computed, inject, ref} from "vue";
import {triggerSoundEffect} from "@blog/utils";
import a from '/@/assets/audio/dog-bark-179915.mp3'

const { theme }: any = inject("theme");

const vibrate = ref(false)
const barking = () => {
  vibrate.value = true
  triggerSoundEffect(a)
  setTimeout(()=>{
    vibrate.value = false
  },320)
}

const dogUri = computed(() => {
  let classList = theme.value === "light" ? "dog-pic-light" : "dog-pic-dark";
  return vibrate.value ? `${classList} vibrate-1` : classList
});
</script>

<template>
  <div
    class="header-w h-300px m-auto pointer-events-none relative z-3 -translate-y-300px hidden sm:block"
  >
    <div class="dog-pic w-166px h-200px absolute right-0 bottom-0 pointer-events-auto cursor-help" :class="dogUri" @dblclick="barking"></div>
  </div>
</template>

<style scoped lang="sass">
.dog-pic-light
  background: url("../../../assets/images/dog.png") no-repeat 100% 100%

.dog-pic-dark
  background: url("../../../assets/images/dog-dark.png") no-repeat 100% 100%

.dog-pic
  background-size: contain
  z-index: 1
</style>
