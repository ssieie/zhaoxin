import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWebFonts,
} from "unocss";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  presets: [
    presetIcons({
      /* options */
    }),
    presetWebFonts({
      provider: "google", // default provider
      fonts: {
        playwrite: ["Kanit"],
        msz: ["Ma Shan Zheng"],
        cnss: ["Noto Sans SC"],
        nss: ["Noto Serif SC"]
      }
    }),
    presetAttributify({
      /* preset options */
    }),
    presetUno()
    // ...custom presets
  ],
  rules: [
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })]
  ],
  theme: {
    colors: {
      dark: '#09090b', // 暗色主题的背景色
      light: '#ffffff', // 亮色主题的背景色
      primary: '#1E3A8A'
    },
    breakpoints: {
      'xs': '320px',
      'sm': "640px",
      'md-sm': "800px",
      'md': "900px",
      'lg-md': "1000px",
      'lg': "1124px",
      'xl': "1280px",
      '2xl': "1536px"
    }
  },
  shortcuts: {
    "header-w": "max-w-350px sm:max-w-600px md-sm::max-w-800px md:max-w-900px lg-md:max-w-1000px lg:max-w-1100px",
    "switch-animation": "transition duration-350",
    "bg-base": "bg-[#f0f0f0] dark:bg-[#20202a] switch-animation",
    "title-text-base": "text-[#1e293b] dark:text-[#f1f5f9] switch-animation",
    "desc-text-base": "text-[#475569] dark:text-[#e2e8f0] switch-animation",
    "underline-base": "bg-[#64748b] dark:bg-[#f0f0f0] "
  }
});
