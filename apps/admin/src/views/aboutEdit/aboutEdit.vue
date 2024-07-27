<script setup lang="ts">
import MarkdownEditor from "/@/components/markdownEditor/markdownEditor.vue";
import {ref} from "vue";

const content = ref('# asdasd')

const btnLoading = ref(false)

const save = () => {
  console.log(content.value)
}

</script>

<template>
  <div class="h-full">
    <div style="height: calc(100% - 60px);">
      <markdown-editor v-model="content" />
    </div>
    <div class="h-60px flex items-end justify-end">
      <a-button size="large" type="primary" :loading="btnLoading" @click="save">保存</a-button>
    </div>
  </div>
</template>

<style scoped>

</style>