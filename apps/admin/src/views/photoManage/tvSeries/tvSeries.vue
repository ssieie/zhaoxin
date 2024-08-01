<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import PageBasic from "/@/components/pageBasic/pageBasic.vue";
import { message } from "ant-design-vue";
import { removeT } from "@blog/utils";
import {PhotoTvSeries, photoTvSeriesApi} from "/src/api/photoApis.ts";
import AddEditModal from "/@/views/photoManage/tvSeries/components/addEditModal.vue";

interface FormState {
  name: string;
  author: string;
}

const formState = reactive<FormState>({
  name: "",
  author: "",
});

const pageLoading = ref(false);

const getList = () => {
  pageLoading.value = true;
  photoTvSeriesApi()
      .list(formState)
      .then((res: RequestResponse<Array<PhotoTvSeries>>) => {
        if (res.status === 200) {
          dataSource.value = removeT<PhotoTvSeries>(res.data);
        }
      })
      .finally(() => {
        pageLoading.value = false;
      });
};

const dataSource = ref([]);

const columns = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "描述",
    dataIndex: "describe",
    key: "describe",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "修改时间",
    dataIndex: "updateTime",
    key: "updateTime",
  },
  {
    title: "操作",
    key: "action",
    width: "150px",
  },
];
const editHandler = (val:PhotoTvSeries) => {
  addEditModalRef.value.open(val.id);
}
const delRecord = (record: PhotoTvSeries) => {
  photoTvSeriesApi()
      .del(record.id)
      .then((res: RequestResponse<string>) => {
        if (res.status === 200) {
          message.success(res.message);
          getList();
        }
      });
};

const addEditModalRef = ref();
const add = () => {
  addEditModalRef.value.open();
};

onMounted(() => {
  getList();
});

</script>

<template>
  <page-basic
      v-model="formState"
      :loading="pageLoading"
      @reset="getList"
      @search="getList"
  >
    <template #formItem>
      <a-form-item label="名称" name="name">
        <a-input placeholder="名称" v-model:value="formState.name"></a-input>
      </a-form-item>
      <a-form-item label="作者" name="author">
        <a-input placeholder="作者" v-model:value="formState.author"></a-input>
      </a-form-item>
    </template>
    <template #btn>
      <a-button @click="add">新增</a-button>
    </template>
    <a-table
        :loading="pageLoading"
        bordered
        sticky
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div class="flex items-center">
            <a-button type="link" @click="editHandler(record)">编辑</a-button>
            <a-popconfirm
                v-if="dataSource.length"
                title="确定删除?"
                @confirm="delRecord(record)"
            >
              <a-button danger type="link">删除</a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </page-basic>
  <add-edit-modal ref="addEditModalRef" @success="getList" />
</template>

<style scoped lang="less">
</style>
