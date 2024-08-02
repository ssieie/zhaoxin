<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import PageBasic from "/@/components/pageBasic/pageBasic.vue";
import { message } from "ant-design-vue";
import type { UnwrapRef } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { removeT } from "@blog/utils";
import {PhotoCategory, photoCategoryApi} from "/src/api/photoApis.ts";

interface FormState {
  categoryName: string;
}

const formState = reactive<FormState>({
  categoryName: "",
});

const pageLoading = ref(false);

const getList = () => {
  pageLoading.value = true;
  photoCategoryApi()
      .list(formState)
      .then((res: RequestResponse<Array<PhotoCategory>>) => {
        if (res.status === 200) {
          dataSource.value = removeT<PhotoCategory>(res.data);
        }
      })
      .finally(() => {
        pageLoading.value = false;
      });
};

const dataSource = ref<PhotoCategory[]>([]);

const columns = [
  {
    title: "分类名称(可编辑)",
    dataIndex: "categoryName",
    key: "categoryName",
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
    width: "120px",
  },
];

const categoryFormState = reactive<Record<"categoryName", string>>({
  categoryName: "",
});

const delRecord = (record: PhotoCategory) => {
  photoCategoryApi()
      .del(record.id)
      .then((res: RequestResponse<string>) => {
        if (res.status === 200) {
          message.success(res.message);
          getList();
        }else {
          message.warning(res.message);
        }
      });
};

onMounted(() => {
  getList();
});

const categoryFormRef = ref();
const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

// 新增
const showModal = () => {
  open.value = true;
};
const handleOk = () => {
  categoryFormRef.value.validate().then(() => {
    confirmLoading.value = true;
    photoCategoryApi()
        .add(categoryFormState)
        .then((res: RequestResponse<string>) => {
          if (res.status === 200) {
            message.success(res.message);
            open.value = false;
            handlerCancel();
            getList();
          }
        })
        .finally(() => {
          confirmLoading.value = false;
        });
  });
};
const handlerCancel = () => {
  categoryFormRef.value.resetFields();
};

// 修改
const editableData: UnwrapRef<Record<number, PhotoCategory>> = reactive({});
const save = (key: string) => {
  photoCategoryApi()
      .update(editableData[key])
      .then((res: RequestResponse<string>) => {
        if (res.status === 200) {
          message.success(res.message);
        }
      });
  Object.assign(
      dataSource.value.filter((item) => key === item.id)[0],
      editableData[key],
  );
  delete editableData[key];
};
const edit = (key: string) => {
  editableData[key] = JSON.parse(
      JSON.stringify(dataSource.value.filter((item) => key === item.id)[0]),
  );
};
</script>

<template>
  <page-basic
      v-model="formState"
      :loading="pageLoading"
      @reset="getList"
      @search="getList"
  >
    <template #formItem>
      <a-form-item label="分类名称" name="categoryName">
        <a-input placeholder="分类名称" v-model:value="formState.categoryName"></a-input>
      </a-form-item>
    </template>
    <template #btn>
      <a-button @click="showModal">新增</a-button>
    </template>
    <a-table
        :loading="pageLoading"
        bordered
        sticky
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'categoryName'">
          <div class="editable-cell">
            <div
                v-if="editableData[record.id]"
                class="editable-cell-input-wrapper flex items-center gap-4px"
            >
              <a-input
                  v-model:value="editableData[record.id].categoryName"
                  @pressEnter="save(record.id)"
              />
              <check-outlined
                  class="editable-cell-icon-check"
                  @click="save(record.id)"
              />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || " " }}
              <edit-outlined
                  class="editable-cell-icon"
                  @click="edit(record.id)"
              />
            </div>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-popconfirm
              v-if="dataSource.length"
              title="确定删除?"
              @confirm="delRecord(record)"
          >
            <span class="color-red cursor-pointer">删除</span>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </page-basic>
  <a-modal
      v-model:open="open"
      title="新增"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handlerCancel"
  >
    <a-form
        ref="categoryFormRef"
        :model="categoryFormState"
        name="basic"
        autocomplete="off"
    >
      <a-form-item
          label="分类名称"
          name="categoryName"
          :rules="[{ required: true, message: 'Please input categoryName!' }]"
      >
        <a-input v-model:value="categoryFormState.categoryName" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped lang="less">
.editable-cell {
  position: relative;

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 28px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
