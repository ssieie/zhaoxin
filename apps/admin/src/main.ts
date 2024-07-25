import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:uno.css";
import 'ant-design-vue/dist/reset.css';
import "highlight.js/styles/atom-one-dark.css";
import "/@/assets/css/style.sass";

const app = createApp(App);

app.use(router).mount("#app");
