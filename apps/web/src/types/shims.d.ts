import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare module "@vue/runtime-dom" {
  interface HTMLAttributes extends AttributifyAttributes {}
}

declare global {
  interface Window {
    MathJax: Record<typesetPromise, any>;
  }
}


// 正常工作。
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $notyf: any
  }
}