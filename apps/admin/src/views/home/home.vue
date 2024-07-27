<script setup lang="ts">

import {commonApi} from "/@/api/common/common.ts";

const test = async () => {
   await commonApi().health()
}

</script>

<template>
  <div @click="test">home</div>
</template>

<style scoped>

</style>