<template>
  <div class="desc-text-base" ref="test" v-html="sanitizedContent"></div>
</template>

<script lang="ts" setup>
import { Marked } from "marked";
import DOMPurify from "dompurify";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { onMounted, ref } from "vue";

const code = ref(`
# 12d

123123

\`\`\`javascript
const test = 'test'
\`\`\`

$$
l \\perp \\beta ,l \\subset \\alpha \\Rightarrow \\alpha \\perp \\beta
$$


`);

const test = ref("");
const sanitizedContent = ref("");
const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);
sanitizedContent.value = DOMPurify.sanitize(marked.parse(code.value) as string);

onMounted(() => {
  window.MathJax.typesetPromise([test.value]);
});
</script>
