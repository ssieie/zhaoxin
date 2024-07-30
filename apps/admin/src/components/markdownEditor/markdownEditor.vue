<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { commonApi } from "/@/api/common/common.ts";

const model = defineModel();

const onUploadImg = async (
  files: Array<File>,
  callback: (
    urls:
      | string[]
      | {
          url: string;
          alt: string;
          title: string;
        }[],
  ) => void,
) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append("file", file);

        commonApi()
          .upload(form)
          .then((res: RequestResponse<Record<"url" | "name", string>>) => {
            if (res.status === 200) {
              rev(res.data);
            } else {
              rej(res.message);
            }
          })
          .catch((err) => {
            rej(err);
          });
      });
    }),
  );

  callback(
    res.flat(Infinity).map((item: any) => ({
      url: item.url,
      alt: item.name,
      title: item.name,
    })),
  );
};
</script>

<template>
  <MdEditor
    class="custom-editor"
    v-model="model"
    preview-theme="github"
    :toolbars-exclude="['github']"
    @onUploadImg="onUploadImg"
  />
</template>

<style scoped lang="sass">
.custom-editor
  height: 100%
  overflow-y: auto
</style>
