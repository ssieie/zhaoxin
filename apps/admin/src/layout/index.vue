<template>
  <a-layout
    style="min-height: 100vh"
    id="components-layout-demo-custom-trigger"
  >
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo"></div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        :items="menuCpt"
        @click="handleClick"
      >
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        class="p-24px bg-#fff min-h-280px m-t-24px m-b-24px m-l-16px m-r-16px"
        style="overflow-y: auto; height: calc(100vh - 64px - 48px)"
      >
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, VueElement } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import routes from "/@/router/routes.ts";
import { RouteRecordRaw } from "vue-router";
import type { MenuProps, ItemType } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const selectedKeys = ref<string[]>([]);
const collapsed = ref<boolean>(false);

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: "group",
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

function transformRoutesToItems(routes: Array<RouteRecordRaw>):ItemType[] {
  return routes.map((route) => {
    const { path, meta, children } = route;
    const { title, icon } = meta!;

    // 递归处理子路由
    const transformedChildren = children
      ? transformRoutesToItems(children)
      : undefined;

    // 使用 getItem 构建新的对象
    return getItem(
      title as string, // label
      path as string, // key
      icon, // icon
      transformedChildren, // children
    );
  });
}

const routerArr: Array<RouteRecordRaw> = routes[0].children!;
const menuCpt = computed(() => {
  return transformRoutesToItems(routerArr);
});

const handleClick: MenuProps["onClick"] = (e) => {
  router.push(e.key as string)
};

const route = useRoute();
onMounted(() => {
  selectedKeys.value[0] = route.fullPath as string;
});
</script>
<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 80px;
  background-image: url("../assets/images/logo.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
