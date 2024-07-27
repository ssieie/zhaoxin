<template>
  <MdPreview
    class="markdown-body switch-animation"
    :editorId="id"
    :modelValue="content"
    style="background: unset"
    preview-theme="github"
    code-theme="github"
    :theme="themeCpt"
  />
</template>

<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { computed, inject } from "vue";

const props = defineProps({
  id: String,
  content: String,
});

const { theme }: any = inject("theme");

const themeCpt = computed(() => {
  return theme.value;
});
</script>
