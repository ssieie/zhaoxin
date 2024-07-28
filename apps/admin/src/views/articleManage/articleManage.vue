<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import PageBasic from "/@/components/pageBasic/pageBasic.vue";
import { message } from "ant-design-vue";
import { removeT } from "@blog/utils";
import AddEditModal from "/@/views/articleManage/components/addEditModal.vue";
import {Article, articleApi} from "/@/api/article.ts";
import {Category, categoryApi} from "/@/api/category.ts";

interface FormState {
  title: string;
  cId: number;
  describe: string;
}

const formState = reactive<FormState>({
  title: "",
  cId: undefined,
  describe: "",
});

const pageLoading = ref(false);

const getList = () => {
  pageLoading.value = true;
  articleApi()
    .list(formState)
    .then((res: RequestResponse<Array<Article>>) => {
      if (res.status === 200) {
        dataSource.value = removeT<Article>(res.data);
      }
    })
    .finally(() => {
      pageLoading.value = false;
    });
};

const dataSource = ref([]);

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "分类",
    dataIndex: "cName",
    key: "cName",
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
    width: "180px",
  },
];

const delRecord = (record: Article) => {
  articleApi()
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

const editHandler = (val:Article) => {
  addEditModalRef.value.open(val.id);
}

const categoryList = ref<Array<Category>>([]);
onMounted(() => {
  categoryApi()
    .list({ categoryName: "" })
    .then((res: RequestResponse<Array<Category>>) => {
      if (res.status === 200) {
        categoryList.value = res.data;
      }
    });
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
      <a-form-item label="标题" name="title">
        <a-input placeholder="标题" v-model:value="formState.title"></a-input>
      </a-form-item>
      <a-form-item label="分类" name="cId">
        <a-select
            placeholder="分类"
            style="width: 183px"
            v-model:value="formState.cId"
        >
          <a-select-option v-for="i in categoryList" :key="i.id" :value="i.id">{{i.categoryName}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="描述" name="describe">
        <a-input placeholder="描述" v-model:value="formState.describe"></a-input>
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
  <add-edit-modal ref="addEditModalRef" @success="getList" :category-list="categoryList" />
</template>

<style scoped lang="less"></style>