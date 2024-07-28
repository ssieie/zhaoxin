import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import 'notyf/notyf.min.css';
import "/@/assets/css/style.css";
import "/@/assets/css/animista.css";
import "/@/assets/css/custom.sass";

import notyfPlugin from '/@/utils/notyfPlugin.ts';

const app = createApp(App);

app.use(router).use(notyfPlugin).mount("#app");
