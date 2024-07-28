<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import { Article, articleApi } from "/@/api/article.ts";
import { Category } from "/@/api/category.ts";
import MarkdownEditor from "/@/components/markdownEditor/markdownEditor.vue";

const props = defineProps({
  categoryList: Array<Category>,
});

const emits = defineEmits(["success"]);

const formRef = ref();
const show = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const formState = ref({
  cId: "",
  cName: "",
  title: "",
  describe: "",
  text: "",
});

const fullCName = (val: number) => {
  formState.value.cName = props.categoryList.find(
    (v) => v.id === val,
  ).categoryName;
};

const handleOk = () => {
  formRef.value.validate().then(() => {
    confirmLoading.value = true;
    if (isEdit.value) {
      articleApi()
        .update({
          ...formState.value,
          id: recordId,
        })
        .then((res: RequestResponse<string>) => {
          if (res.status === 200) {
            message.success(res.message);
            show.value = false;
            handlerCancel();
            emits("success");
          }
        })
        .finally(() => {
          confirmLoading.value = false;
        });
    } else {
      articleApi()
        .add(formState.value)
        .then((res: RequestResponse<string>) => {
          if (res.status === 200) {
            message.success(res.message);
            show.value = false;
            handlerCancel();
            emits("success");
          }
        })
        .finally(() => {
          confirmLoading.value = false;
        });
    }
  });
};
const handlerCancel = () => {
  isEdit.value = false;
  formRef.value.resetFields();
  formState.value.text = ''
};

const isEdit = ref(false);

let recordId = "";
const open = (id?: string) => {
  if (id) {
    recordId = id;
    isEdit.value = true;
    articleApi()
      .details(id)
      .then((res: RequestResponse<Article>) => {
        if (res.status === 200) {
          formState.value.cId = res.data.cId;
          formState.value.cName = res.data.cName;
          formState.value.title = res.data.title;
          formState.value.describe = res.data.describe;
          formState.value.text = res.data.text;
        }
      });
  }
  show.value = true;
};

defineExpose({
  open,
});
</script>

<template>
  <a-modal
    v-model:open="show"
    :title="isEdit ? '编辑' : '新增'"
    :confirm-loading="confirmLoading"
    :maskClosable="false"
    width="70%"
    @ok="handleOk"
    @cancel="handlerCancel"
  >
    <a-form ref="formRef" :model="formState" name="basic" autocomplete="off">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item
            label="标题"
            name="title"
            :rules="[{ required: true, message: '标题不能为空!' }]"
          >
            <a-input placeholder="标题" v-model:value="formState.title" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="分类"
            name="cId"
            :rules="[{ required: true, message: '分类不能为空!' }]"
          >
            <a-select
              @select="fullCName"
              placeholder="分类"
              v-model:value="formState.cId"
            >
              <a-select-option
                v-for="i in props.categoryList"
                :key="i.id"
                :value="i.id"
                >{{ i.categoryName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="简介"
            name="describe"
            :rules="[{ required: true, message: '简介不能为空!' }]"
          >
            <a-textarea
              v-model:value="formState.describe"
              placeholder="简介"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider orientation="center">正文</a-divider>
      <a-row :gutter="24" class="h-800px">
        <markdown-editor v-model="formState.text" />
      </a-row>
    </a-form>
  </a-modal>
</template>

<style scoped></style>
