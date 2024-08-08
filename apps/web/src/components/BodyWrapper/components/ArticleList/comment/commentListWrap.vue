<script lang="ts" setup>
import CommentWrap from "./commentWrap.vue";
import { CommentTree } from "/@/api/comment.ts";

interface Props {
  comment: CommentTree;
  children: CommentTree[];
}

const props = withDefaults(defineProps<Props>(), {
  comment: () => ({}),
  children: () => [],
});

const emits = defineEmits(['load'])

</script>

<template>
  <div>
    <comment-wrap :comment="props.comment" @load="emits('load')" />
    <div v-if="props.children.length" :style="{ marginLeft: '40px' }">
      <CommentListWrap
        v-for="child in children"
        :key="child.item.id"
        :comment="child"
        :children="child.children || []"
      />
    </div>
  </div>
</template>