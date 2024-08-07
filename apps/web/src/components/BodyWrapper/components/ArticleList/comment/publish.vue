<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Notyf } from "notyf";
import { CommentType } from "/@/types/global";
import {validateEmail} from "@blog/utils";

const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

const loading = ref(false);
const formData = ref<CommentType>({
  name: "",
  email: "",
  comment: "",
  call: true,
  token: "",
});

const emit = defineEmits(["postAComment"]);

const postAComment = () => {
  if (!formData.value.name) return notyf.error("名称为必填项!");
  if (!validateEmail(formData.value.email)) return notyf.error("邮箱格式不正确!");
  if (!formData.value.comment) return notyf.error("评论为必填项!");
  if (!formData.value.token) return notyf.error("未完成真人验证!");

  emit("postAComment", formData.value);
  loading.value = true
};

onMounted(() => {
  turnstile.ready(function () {
    turnstile.render("#myTurnstile", {
      sitekey: "0x4AAAAAAAgpOSYAXQ-LujDf",
      callback: function (token: string) {
        formData.value.token = token;
      },
    });
  });
});

const reset = () => {
  loading.value = false
  formData.value.name = ''
  formData.value.email = ''
  formData.value.comment = ''
  formData.value.token = ''
  formData.value.call = true

  turnstile.reset("#myTurnstile")
}
const resetLoading = () => {
  loading.value = false
}

defineExpose({
  reset,
  resetLoading,
})
</script>

<template>
  <div>
    <div
      class="text-18px md:text-20px font-600 p-t-10px md:p-t-10px p-b-10px md:p-b-20px"
    >
      留下评论
    </div>
    <div class="text-14px color-#71717a dark:color-#a1a1aa switch-animation">
      您的电子邮箱地址不会被公开。 必填项已用 * 标注
    </div>
    <div
      class="comment-flag-wrap flex justify-between gap-30px m-t-30px m-b-20px flex-col md:flex-row"
    >
      <div class="info relative flex-1">
        <input
          v-model="formData.name"
          type="text"
          required
          class="bg-base switch-animation"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label class="color-#71717a dark:color-#f1f5f9"
          >名称 <span class="color-red">*</span></label
        >
      </div>
      <div class="info relative flex-1">
        <input
          v-model="formData.email"
          type="text"
          required
          class="bg-base switch-animation"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label class="color-#71717a dark:color-#f1f5f9"
          >邮箱 <span class="color-red">*</span></label
        >
      </div>
    </div>
    <div class="flex gap-8px items-center">
      <input
        v-model="formData.call"
        type="checkbox"
        value="call"
        id="call"
        name="call"
      />
      <label
        for="call"
        class="select-none cursor-pointer text-14px color-#3f3f46 dark:color-#a1a1aa switch-animation"
      >
        如果有人回复我的评论，请通过电子邮件通知我。
      </label>
    </div>
    <div
      class="comment-flag-wrap flex justify-between gap-30px m-t-20px m-b-20px flex-col md:flex-row"
    >
      <div class="info relative flex-1">
        <textarea
          v-model="formData.comment"
          type="text"
          rows="4"
          required
          class="bg-base switch-animation"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label
          class="color-#71717a dark:color-#f1f5f9"
          style="top: 8px; left: 10px"
          >添加评论 <span class="color-red">*</span></label
        >
      </div>
    </div>
    <div id="myTurnstile"></div>
    <div
      @click="postAComment"
      class="m-t-10px text-14px select-none cursor-pointer bg-#0ea5e9 color-#fff rounded-4px inline-block p-t-6px p-b-6px p-l-14px p-r-14px"
    >
      <div class="flex gap-4px items-center">
        <i
          v-show="loading"
          class="i-tabler-loader text-16px font-black color-#fff switch-animation inline-block loading-icon"
        ></i>
        <span>发布评论</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.comment-flag-wrap {
  input,
  textarea {
    width: 100%;
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    border: none;
    border-bottom: 1px solid #e4e4e7;
  }

  input,
  textarea:focus {
    outline: none;
  }

  textarea {
    border: 1px solid #e4e4e7;
    border-radius: 4px;
    padding: 6px 10px;
  }

  /* LABEL ======================================= */

  label {
    font-size: 14px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  /* active state */

  input:focus ~ label,
  input:valid ~ label {
    top: -20px;
    font-size: 14px;
    color: #5264ae;
  }

  textarea:focus ~ label,
  textarea:valid ~ label {
    font-size: 12px;
    opacity: 0;
  }

  /* BOTTOM BARS ================================= */

  .bar {
    position: relative;
    display: block;
    width: 100%;
  }

  .bar:before,
  .bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 0;
    position: absolute;
    background: #5264ae;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }

  /* active state */

  input:focus ~ .bar:before,
  input:focus ~ .bar:after {
    width: 50%;
  }

  /* HIGHLIGHTER ================================== */

  .highlight {
    position: absolute;
    height: 60%;
    width: 200px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  /* active state */

  input:focus ~ .highlight {
    -webkit-animation: inputHighlighter 0.3s ease;
    -moz-animation: inputHighlighter 0.3s ease;
    animation: inputHighlighter 0.3s ease;
  }
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}

@-moz-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}

@keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}

.loading-icon {
  animation: rotate 2s infinite linear;
}

@-webkit-keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-moz-keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
