<script setup lang="ts">
import { commentApi, CommentTree } from "/@/api/comment.ts";
import Publish from "/@/components/BodyWrapper/components/ArticleList/comment/publish.vue";
import { inject, ref } from "vue";
import { CommentType, RequestResponse } from "/@/types/global";
import { Notyf } from "notyf";

const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

interface Props {
  comment: CommentTree;
}

const props = withDefaults(defineProps<Props>(), {
  comment: () => ({}),
});

const replyFlag: any = inject("replyFlag");

const replyHandler = () => {
  if (replyFlag.value === props.comment.item.id) {
    replyFlag.value = "";
  } else {
    replyFlag.value = props.comment.item.id;
  }
};

const publishRef = ref();

const reset = () => {
  publishRef.value.reset();
};
const resetLoading = () => {
  publishRef.value.resetLoading();
};

const emits = defineEmits(['load'])

const postACommentHandler = (val: CommentType) => {
  commentApi()
    .add({
      ...val,
      call: val.call ? "1" : "0",
      pId: props.comment.item.id,
      articleId: +props.comment.item.articleId,
    })
    .then((res: RequestResponse<string>) => {
      if (res.status === 200) {
        replyFlag.value = "";
        notyf.success("发布成功");
        reset();
        emits('load')
      }
    })
    .finally(() => {
      resetLoading();
    });
};
</script>

<template>
  <div
    class="p-t-20px md:p-t-30px border-solid border-t-1 border-b-#e4e4e7 content-wrap"
  >
    <div class="info flex justify-between p-b-16px">
      <span class="font-bold text-16px">{{ props.comment.item.name }}</span>
      <div>
        <span class="font-zqh tracking-2px text-12px p-r-16px">{{
          props.comment.item.createTime?.replace("T", " / ")
        }}</span>
        <span
          v-if="props.comment.depth !== 5"
          @click="replyHandler"
          class="tracking-2px text-12px cursor-pointer reply"
          :class="{ 'reply-ac': replyFlag === props.comment.item.id }"
          >{{ replyFlag === props.comment.item.id ? "取消" : "" }}回复</span
        >
      </div>
    </div>
    <p class="desc-text-base text-14px p-b-20px md:p-b-30px">
      {{ props.comment.item.comment }}
    </p>
    <publish
      style="margin-left: 40px"
      ref="publishRef"
      v-if="props.comment.depth !== 5 && replyFlag === props.comment.item.id"
      :reply-name="props.comment.item.name"
      @post-a-comment="postACommentHandler"
    />
  </div>
</template>

<style scoped lang="less">
.content-wrap {
  &:hover {
    .reply {
      background-color: #0284c7;
      color: #f0f8ff;
    }
  }
}

.reply {
  border-radius: 2px;
  padding: 4px 8px;
  transition: all 0.3s;
}

.reply-ac {
  background-color: #0284c7;
  color: #f0f8ff;
}
</style>
