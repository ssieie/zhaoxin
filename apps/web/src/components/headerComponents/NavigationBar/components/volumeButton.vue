<script setup lang="ts">
import {ref} from "vue";
import {changeMute, triggerSoundEffect} from "@blog/utils";
import b from "/@/assets/audio/down.mp3";
import a from "/@/assets/audio/item-pick-up-38258.mp3";

const isItSilent = ref(window.localStorage.getItem("isItSilent") || "no");

const changeVolume = (val: string) => {
  isItSilent.value = val;
  changeMute(val);
  switch (val) {
    case "yes":
      triggerSoundEffect(b, true);
      break;
    case "no":
      triggerSoundEffect(a, true);
      break;
    default:
      break;
  }
};
</script>

<template>
  <div>
    <button
        @click="changeVolume('yes')"
        v-show="isItSilent === 'no'"
        class="i-tabler-volume text-26px font-black m-r-10px sm:m-r-30px color-#374151 dark:color-#d1d5db switch-animation"
    />
    <button
        @click="changeVolume('no')"
        v-show="isItSilent === 'yes'"
        class="i-tabler-volume-off text-26px font-black m-r-10px sm:m-r-30px color-#374151 dark:color-#d1d5db switch-animation"
    />
  </div>
</template>

<style scoped>

</style>