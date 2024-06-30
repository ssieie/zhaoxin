import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "/@/assets/css/style.css";

const app = createApp(App);

app.use(router).mount("#app");
