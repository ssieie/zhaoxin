<script setup lang="ts">
import { SearchOutlined,UndoOutlined } from '@ant-design/icons-vue';
import { ref,h } from "vue";
const formState = defineModel();

const props = defineProps({
  loading: Boolean,
});

const formRef = ref();

const emit = defineEmits(["search", "reset"]);

const reset = () => {
  formRef.value.resetFields();
  emit("reset");
};

const search = () => {
  emit("search");
};
</script>

<template>
  <div class="h-full wrap flex flex-col gap-20px">
    <div
      class="zx-search flex-initial flex items-center justify-between gap-12px"
    >
      <a-form
        ref="formRef"
        :model="formState"
        layout="inline"
        autocomplete="off"
        class="flex gap-12px"
      >
        <slot name="formItem" />
      </a-form>
      <div class="flex gap-12px self-start">
        <a-button type="primary" @click="search" :loading="loading" :icon="h(SearchOutlined)"
        >搜索
        </a-button>
        <a-button @click="reset" :loading="loading" :icon="h(UndoOutlined)">重置</a-button>
        <slot name="btn" />
      </div>
    </div>
    <div class="flex-1 flex flex-col overflow-y-auto">
      <slot />
    </div>
    <div class="zx-pagination flex-initial flex justify-end">
      <slot name="pagination" />
    </div>
  </div>
</template>

<style scoped lang="sass">
</style>
