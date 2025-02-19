import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { createHtmlPlugin } from 'vite-plugin-html';
import UnoCSS from "unocss/vite";
import { fileURLToPath, URL } from 'node:url';

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
      createHtmlPlugin({
        inject: {
          data: {
            injectScript: `
            <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"></script>
          `,
          },
        },
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
      outDir: "../../build/web", // 将输出目录设置为 custom-dist
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
