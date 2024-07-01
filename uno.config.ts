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
        playwrite: ["Playwrite IT Moderna"],
        msz: ["Ma Shan Zheng"],
        zmx: ["Zhi Mang Xing"]
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
      xxs: "0px",
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1600px"
    }
  },
  shortcuts: {
    "switch-animation": "transition duration-350",
    "bg-base": "bg-[#f0f0f0] dark:bg-[#20202a] switch-animation",
    "text-base": "text-[#20202a] dark:text-[#f0f0f0] switch-animation",
    "underline-base": "bg-[#64748b] dark:bg-[#f0f0f0] "
  }
});
