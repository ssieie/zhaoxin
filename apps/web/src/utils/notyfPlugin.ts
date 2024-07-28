import { Notyf } from "notyf";
import { App } from "vue";

export default {
  install: (app: App) => {
    const notyf = new Notyf({
      position: {
        x: "right",
        y: "top",
      },
    });

    app.config.globalProperties.$notyf = notyf;
  },
};
