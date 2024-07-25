import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import UnoCSS from "unocss/vite";
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd()) || {};
  env.VITE_USER_NODE_ENV = process.env.VITE_USER_NODE_ENV || "";
  return {
    plugins: [
      vue(),
      viteCompression(),
      VueSetupExtend(),
      UnoCSS(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    base: "./",
    resolve: {
      alias: {
        '/@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: env.VITE_PORT as unknown as number,
      open: env.VITE_OPEN === "true",
      proxy: {},
    },
    build: {
      outDir: "../../build/admin",
      // 清除console等多余代码
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
});