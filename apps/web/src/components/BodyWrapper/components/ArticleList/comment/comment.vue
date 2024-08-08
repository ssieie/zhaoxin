<script setup lang="ts">
import Publish from "/@/components/BodyWrapper/components/ArticleList/comment/publish.vue";
import commentListWrap from "/@/components/BodyWrapper/components/ArticleList/comment/commentListWrap.vue";
import { CommentType, RequestResponse } from "/@/types/global";
import { provide, ref } from "vue";
import { commentApi, CommentTree } from "/@/api/comment.ts";
import { Notyf } from "notyf";
import { addTreeDataDepthFlag } from "@blog/utils";

const replyFlag = ref("");

provide("replyFlag", replyFlag);

const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

const commentList = ref<CommentTree[]>([]);

const publishRef = ref();

const commentTotal = ref("");

const reset = () => {
  publishRef.value.reset();
};
const resetLoading = () => {
  publishRef.value.resetLoading();
};

let articleId = "";
const load = (id: string) => {
  articleId = id;
  commentApi()
    .get(id)
    .then((res: RequestResponse<Record<"data" | "total", any>>) => {
      if (res.status === 200) {
        addTreeDataDepthFlag(res.data.data, "children", 1);
        commentTotal.value = res.data.total;
        commentList.value = res.data.data as CommentTree[];
      }
    });
};

const refreshComment = () => {
  load(articleId);
};

const postACommentHandler = (val: CommentType) => {
  if (articleId) {
    commentApi()
      .add({
        ...val,
        call: val.call ? "1" : "0",
        articleId: +articleId,
      })
      .then((res: RequestResponse<string>) => {
        if (res.status === 200) {
          notyf.success("发布成功");
          reset();
          load(articleId);
        }
      })
      .finally(() => {
        resetLoading();
      });
  } else {
    notyf.success("文章ID不存在");
    resetLoading();
  }
};

defineExpose({
  load,
});
</script>

<template>
  <div class="">
    <div
      class="title text-20px md:text-26px font-bold m-t-10px md:m-t-20px m-b-20px md:m-b-30px"
    >
      {{ commentTotal }} 评论
    </div>

    <publish
      v-if="!replyFlag"
      ref="publishRef"
      @post-a-comment="postACommentHandler"
    />

    <comment-list-wrap
      @load="refreshComment"
      v-for="item in commentList"
      :key="item.item.id"
      :comment="item"
      :children="item.children || []"
    />
  </div>
</template>

<style scoped lang="less"></style>
