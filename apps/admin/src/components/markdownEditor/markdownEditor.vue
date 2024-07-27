<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const model = defineModel();
</script>

<template>
  <MdEditor class="custom-editor" v-model="model" />
</template>

<style scoped lang="sass">
.custom-editor
  height: 100%
  overflow-y: auto

  :deep(.md-editor-toolbar-right)
    div:last-of-type
      display: none !important
</style>
