import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css"
import 'notyf/notyf.min.css';
import "/@/assets/css/style.css";
import "/@/assets/css/animista.css";
import "/@/assets/css/custom.sass";

const app = createApp(App);

app.use(router).mount("#app");
