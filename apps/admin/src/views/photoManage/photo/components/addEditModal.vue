<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import {
  PhotoCategory,
  PhotoTvSeries,
  photoApi,
  Photo,
} from "/@/api/photoApis.ts";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import type { UploadProps } from "ant-design-vue";
import { commonApi, FileUpload } from "/@/api/common/common.ts";

const props = defineProps({
  categoryList: Array<PhotoCategory>,
  tvSeriesList: Array<PhotoTvSeries>,
});

const emits = defineEmits(["success"]);

const formRef = ref();
const show = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const formState = ref({
  photoCategoryId: "",
  tvSeriesId: "",
  photoUrl: "",
  previewUrl: "",
  author: "Zx",
  width: 0,
  height: 0,
});

const handleOk = () => {
  formRef.value.validate().then(() => {
    if (!formState.value.previewUrl) return message.info('上传图片!')
    if (!formState.value.width) return message.info('处理图片宽高中...')
    confirmLoading.value = true;
    if (isEdit.value) {
      photoApi()
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
      photoApi()
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

  formState.value.photoUrl = "";
  formState.value.previewUrl = "";
};

const isEdit = ref(false);

let recordId = "";
const open = (id?: string) => {
  if (id) {
    recordId = id;
    isEdit.value = true;
    photoApi()
      .details(id)
      .then((res: RequestResponse<Photo>) => {
        if (res.status === 200) {
          formState.value.photoCategoryId = res.data.photoCategoryId;
          formState.value.tvSeriesId = res.data?.tvSeriesId || "";
          formState.value.photoUrl = res.data?.photoUrl || "";
          formState.value.previewUrl = res.data?.previewUrl || "";
          formState.value.author = res.data?.author || "";
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
const getImgInfo = (url: string) => {
  const img = document.createElement("img");
  img.src = url;
  img.onload = function () {
    formState.value.width = img.width;
    formState.value.height = img.height;
  };
};
const customRequest = (v1: any) => {
  if (beforeUpload(v1.file)) {
    loading.value = true;
    const form = new FormData();
    form.append("file", v1.file);
    commonApi()
      .upload(form)
      .then((res: RequestResponse<FileUpload[]>) => {
        if (res.status === 200) {
          getImgInfo(res.data[0].compressUrl);
          formState.value.photoUrl = res.data[0].url;
          formState.value.previewUrl = res.data[0].compressUrl;
        } else {
          message.warning(res.message);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
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
            label="分类"
            name="photoCategoryId"
            :rules="[{ required: true, message: '分类不能为空!' }]"
          >
            <a-select
              placeholder="分类"
              v-model:value="formState.photoCategoryId"
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
        <a-col :span="12">
          <a-form-item
            label="影集"
            name="tvSeriesId"
            :rules="[{ required: true, message: '影集不能为空!' }]"
          >
            <a-select placeholder="影集" v-model:value="formState.tvSeriesId">
              <a-select-option
                v-for="i in props.tvSeriesList"
                :key="i.id"
                :value="i.id"
                >{{ i.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="作者" name="author">
            <a-input placeholder="作者" v-model:value="formState.author" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="照片"
            name="photoUrl"
          >
            <a-upload
              accept=".jpg,.png,.jpeg"
              list-type="picture-card"
              class="custom-uploader"
              :show-upload-list="false"
              :customRequest="customRequest"
            >
              <img
                width="190px"
                style="object-fit: contain"
                v-if="formState.previewUrl"
                :src="formState.previewUrl"
                alt="avatar"
              />
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

<style scoped lang="less">
:deep(.custom-uploader) {
  .ant-upload {
    width: 200px !important;
    height: 200px !important;
  }
}
</style>
