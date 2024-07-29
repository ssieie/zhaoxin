<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import PageBasic from "/@/components/pageBasic/pageBasic.vue";
import { message } from "ant-design-vue";
import type { UnwrapRef } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { removeT } from "@blog/utils";
import { Introduce, introduceApi } from "/@/api/introduce.ts";

interface FormState {
  text: string;
}

const formState = reactive<FormState>({
  text: "",
});

const pageLoading = ref(false);

const getList = () => {
  pageLoading.value = true;
  introduceApi()
    .list(formState)
    .then((res: RequestResponse<Array<Introduce>>) => {
      if (res.status === 200) {
        dataSource.value = removeT<Introduce>(res.data);
      }
    })
    .finally(() => {
      pageLoading.value = false;
    });
};

const dataSource = ref<Array<Introduce>>([]);

const columns = [
  {
    title: "描述",
    dataIndex: "text",
    key: "text",
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

const delRecord = (record: Introduce) => {
  if (record.add) {
    dataSource.value = dataSource.value.filter((item) => item.id !== record.id);
  } else {
    introduceApi()
      .del(record.id)
      .then((res: RequestResponse<string>) => {
        if (res.status === 200) {
          message.success(res.message);
          getList();
        }
      });
  }
};

onMounted(() => {
  getList();
});

const count = computed(() => dataSource.value.length + 1);
const handleAdd = () => {
  const newData: Introduce = {
    id: `${count.value}`,
    text: "",
    add: true,
  };
  dataSource.value.push(newData);
};

// 修改
const editableData: UnwrapRef<Record<number, Introduce>> = reactive({});
const save = (key: string) => {
  if (editableData[key].add) {
    if (editableData[key].text){
      introduceApi()
          .add(editableData[key])
          .then((res: RequestResponse<string>) => {
            if (res.status === 200) {
              editableData[key].add = false;
              message.success(res.message);
              Object.assign(
                  dataSource.value.filter((item) => key === item.id)[0],
                  res.data,
              );
              delete editableData[key];
            }
          });
    }
  } else {
    introduceApi()
      .update({
        id:editableData[key].id,
        text:editableData[key].text,
      })
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
  }
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
      <a-form-item label="描述" name="text">
        <a-input placeholder="描述" v-model:value="formState.text"></a-input>
      </a-form-item>
    </template>
    <template #btn>
      <a-button @click="handleAdd">新增</a-button>
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
        <template v-if="column.dataIndex === 'text'">
          <div class="editable-cell">
            <div
              v-if="editableData[record.id]"
              class="editable-cell-input-wrapper flex items-center gap-4px"
            >
              <a-input
                v-model:value="editableData[record.id].text"
                @pressEnter="save(record.id)"
              />
              <check-outlined
                class="editable-cell-icon-check"
                @click="save(record.id)"
              />
            </div>
            <div v-else class="editable-cell-text-wrapper flex items-center">
              <span>{{ text || " " }}</span>
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
