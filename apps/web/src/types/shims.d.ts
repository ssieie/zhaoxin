import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare module "@vue/runtime-dom" {
  interface HTMLAttributes extends AttributifyAttributes {}
}

declare global {
  interface Window {
    MathJax: Record<typesetPromise, any>;
  }
}
