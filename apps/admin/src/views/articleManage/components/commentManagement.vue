<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import {articleApi, CommentTree} from "/@/api/article.ts";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';

const show = ref<boolean>(false);

const commentList = ref<CommentTree[]>([])

const onContextMenuClick = (treeKey: string, menuKey: string | number) => {
  if (+menuKey===1){
    delConfirm(treeKey)
  }
};
function delConfirm(id:string) {
  Modal.confirm({
    title: '确定删除此评论?',
    icon: createVNode(ExclamationCircleOutlined),
    content: '此操作将会同时删除该评论下的所有回复.',
    async onOk() {
      articleApi().delComment(id).then((res:RequestResponse<string>)=>{
        if (res.status===200){
          message.success(res.message)
          loadComment(recordId)
        }
      }).catch(()=>{
        return console.log('Oops errors!');
      })
    },
    onCancel() {},
  });
}

const handlerCancel = () => {
  commentList.value = []
  show.value = false
};

let recordId = "";
const open = (id?: string) => {
  show.value=true
  if (id) {
    recordId = id;
    loadComment(id)
  }
};

function loadComment(id:string) {
  articleApi()
      .commentList(id)
      .then((res: RequestResponse<Record<'data'|'total', CommentTree[]|any>>) => {
        if (res.status === 200) {
          if (res.data.total>0){
            commentList.value = removeItemProperty(res.data.data)
          }
        }
      });
}

function removeItemProperty(data:any[]) {
  return data.map((obj) => {
    const { item, children } = obj;
    item.title = `${item.name}: ${item.comment}`
    item.key = item.id
    const updatedObj = { ...item, children: null };

    if (Array.isArray(children) && children.length > 0) {
      updatedObj.children = removeItemProperty(children);
    }

    return updatedObj;
  });
}

defineExpose({
  open,
});
</script>

<template>
  <a-modal
    v-model:open="show"
    title="评论管理"
    :maskClosable="false"
    width="70%"
    @cancel="handlerCancel"
    @ok="handlerCancel"
  >
    <a-row :gutter="24">
      <a-tree :tree-data="commentList" :defaultExpandAll="true">
        <template #title="{ key: treeKey, title }">
          <a-dropdown :trigger="['contextmenu']">
            <span>{{ title }}</span>
            <template #overlay>
              <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
                <a-menu-item key="1">删除</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tree>
    </a-row>
  </a-modal>
</template>

<style scoped></style>
