<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import { PhotoTvSeries, photoTvSeriesApi } from "/@/api/photoApis.ts";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import type { UploadProps } from "ant-design-vue";
import {commonApi} from "/@/api/common/common.ts";

const emits = defineEmits(["success"]);

const formRef = ref();
const show = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const formState = ref({
  name: "",
  coverImage: "",
  author: "",
  describe: "",
});

const handleOk = () => {
  formRef.value.validate().then(() => {
    confirmLoading.value = true;
    if (isEdit.value) {
      photoTvSeriesApi()
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
      photoTvSeriesApi()
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
};

const isEdit = ref(false);

let recordId = "";
const open = (id?: string) => {
  if (id) {
    recordId = id;
    isEdit.value = true;
    photoTvSeriesApi()
      .details(id)
      .then((res: RequestResponse<PhotoTvSeries>) => {
        if (res.status === 200) {
          formState.value.name = res.data.name;
          formState.value.coverImage = res.data.coverImage;
          formState.value.author = res.data.author;
          formState.value.describe = res.data.describe;
        }
      });
  }
  show.value = true;
};

const loading = ref<boolean>(false);
const beforeUpload = (file: UploadProps["fileList"][number]) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传图片格式!");
  }
  const isLt2M = file.size / 1024 / 1024 < 20;
  if (!isLt2M) {
    message.error("图像必须小于 20MB!");
  }
  return isJpgOrPng && isLt2M;
};
const customRequest = (v1:any) => {
  if (beforeUpload(v1.file)){
    loading.value = true;
    const form = new FormData();
    form.append("file", v1.file);
    commonApi()
        .upload(form)
        .then((res: RequestResponse<Record<"url" | "name", string>>) => {
          if (res.status === 200) {
            console.log(res.data)
            formState.value.coverImage = res.data[0].url
          } else {
            message.warning(res.message);
          }
        })
        .finally(() => {
          loading.value = false;
        });
  }
}

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
            label="名称"
            name="name"
            :rules="[{ required: true, message: '名称不能为空!' }]"
          >
            <a-input placeholder="名称" v-model:value="formState.name" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="作者" name="author">
            <a-input placeholder="作者" v-model:value="formState.author" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="描述" name="describe">
            <a-textarea
              v-model:value="formState.describe"
              placeholder="描述"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="封面图" name="coverImage">
            <a-upload
              accept=".jpg,.png,.jpeg"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :customRequest="customRequest"
            >
              <img width="102px" style="object-fit: contain" v-if="formState.coverImage" :src="formState.coverImage" alt="avatar" />
              <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<style scoped></style>
