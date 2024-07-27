<script setup lang="ts">
import MarkdownEditor from "/@/components/markdownEditor/markdownEditor.vue";
import { onMounted, ref } from "vue";
import { aboutApi } from "/src/api/about.ts";
import { message } from "ant-design-vue";

const content = ref("");

const btnLoading = ref(false);

const save = () => {
  btnLoading.value = true;
  aboutApi()
    .updateAbout({
      content: content.value,
    })
    .then((res: RequestResponse<string>) => {
      if (res.status === 200) {
        message.success(res.message);
      }
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

const refresh = () => {
  btnLoading.value = true;
  aboutApi()
    .about()
    .then((res: RequestResponse<string>) => {
      if (res.status === 200) {
        message.success(res.message);
        content.value = res.data;
      }
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

onMounted(() => {
  refresh();
});
</script>

<template>
  <div class="h-full">
    <div style="height: calc(100% - 60px)">
      <markdown-editor v-model="content" />
    </div>
    <div class="h-60px flex items-end justify-end">
      <a-button
        size="large"
        class="m-r-20px"
        :loading="btnLoading"
        @click="refresh"
        >刷新
      </a-button>
      <a-button size="large" type="primary" :loading="btnLoading" @click="save"
        >保存
      </a-button>
    </div>
  </div>
</template>

<style scoped></style>
