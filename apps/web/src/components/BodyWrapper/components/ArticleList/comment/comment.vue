<script setup lang="ts">
import Publish from "/@/components/BodyWrapper/components/ArticleList/comment/publish.vue";
import { CommentType } from "/@/types/global";
import { ref } from "vue";
import { CommentRes } from "/@/api/comment.ts";

interface Props {
  commentList: CommentRes[];
}

const props = withDefaults(defineProps<Props>(), {
  commentList: () => [],
});

const emit = defineEmits(["postAComment"]);
const publishRef = ref();

const reset = () => {
  publishRef.value.reset();
};
const resetLoading = () => {
  publishRef.value.resetLoading();
};

defineExpose({
  reset,
  resetLoading,
});
</script>

<template>
  <div class="">
    <div
      class="title text-20px md:text-26px font-bold m-t-10px md:m-t-20px m-b-10px md:m-b-20px p-b-20px md:p-b-30px border-solid border-b-2 border-b-#e4e4e7"
    >
      {{props.commentList.length}} 评论
    </div>
    <publish
      ref="publishRef"
      @post-a-comment="(val: CommentType) => emit('postAComment', val)"
    />
  </div>
</template>

<style scoped lang="less"></style>
