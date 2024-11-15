import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// elementPlus按需导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 使用AutoImport自動導入ElementPlus
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // 使用Components自動導入Vue組件，並且支持ElementPlus
    Components({
      resolvers: [
        // 1. 配置elementPlus採用sass樣式配色系統
        ElementPlusResolver({ importStyle: "sass" }),
      ],
    }),
    commonjs(), // 讓Vite處理CommonJS模塊
  ],
  resolve: {
    // 配置路徑別名，@ 指向 src 目錄
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2. 自動導入定制化樣式文件，進行樣式覆蓋
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      },
    },
  },
  base: "/Vue-Rabbit/",
});
