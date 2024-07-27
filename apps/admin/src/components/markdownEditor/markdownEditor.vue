<script setup lang="ts">
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const model = defineModel()
</script>

<template>
  <MdEditor class="md-editor" v-model="model" />
</template>

<style scoped>
.md-editor{
  height: 100%;
  overflow-y: auto;
}
</style>