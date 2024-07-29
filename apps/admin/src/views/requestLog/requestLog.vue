<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import PageBasic from "/@/components/pageBasic/pageBasic.vue";
import { removeT } from "@blog/utils";
import { commonApi, RequestLog } from "/@/api/common/common.ts";

interface FormState {
  uri: string;
  method: string;
}

const formState = reactive<FormState>({
  uri: "",
  method: "",
});

const pageLoading = ref(false);

const getList = () => {
  pageLoading.value = true;
  commonApi()
    .requestLog({
      ...formState,
      page: page.value,
    })
    .then((res: RequestResponse<RequestLog>) => {
      if (res.status === 200) {
        dataSource.value = removeT<RequestLog>(res.data.data, ["time"]);
        page.value.total = res.data.total
      }
    })
    .finally(() => {
      pageLoading.value = false;
    });
};

const dataSource = ref<Array<RequestLog>>([]);

const columns = [
  {
    title: "Uri",
    dataIndex: "uri",
    key: "uri",
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "UserAgent",
    dataIndex: "userAgent",
    key: "userAgent",
  },
  {
    title: "IpAddress",
    dataIndex: "ipAddress",
    key: "ipAddress",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
];

const page = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

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
      <a-form-item label="Uri" name="uri">
        <a-input placeholder="Uri" v-model:value="formState.uri"></a-input>
      </a-form-item>
      <a-form-item label="Method" name="method">
        <a-select
          placeholder="Method"
          style="width: 183px"
          v-model:value="formState.method"
        >
          <a-select-option value="GET">GET</a-select-option>
          <a-select-option value="POST">POST</a-select-option>
          <a-select-option value="PUT">PUT</a-select-option>
          <a-select-option value="DELETE">DELETE</a-select-option>
        </a-select>
      </a-form-item>
    </template>
    <a-table
      :loading="pageLoading"
      bordered
      sticky
      :dataSource="dataSource"
      :columns="columns"
      :pagination="false"
    >
    </a-table>
    <template #pagination>
      <a-pagination
        v-model:current="page.page"
        v-model:pageSize="page.pageSize"
        show-size-changer
        :total="page.total"
        @change="getList"
        :show-total="total => `Total ${total}`"
      />
    </template>
  </page-basic>
</template>

<style scoped lang="less"></style>
