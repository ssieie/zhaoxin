import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import viteCompression from 'vite-plugin-compression'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

const pathResolve = (dir: string) => {
    return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
    '/@': pathResolve('./src/'),
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteCompression(),
        VueSetupExtend()
    ],
    base: './',
    resolve: {alias},
    build: {
        outDir: '../../build/web', // 将输出目录设置为 custom-dist
        // 清除console等多余代码
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
    }
})
