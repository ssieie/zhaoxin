<template>
  <MdPreview :editorId="id" :modelValue="content" style="background: unset" />
</template>

<script setup>
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

const props = defineProps({
  id: String,
  content: String,
});
</script>
