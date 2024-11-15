import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// elementPlus按需导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// commonjs 插件來處理不完全支持ESM的模塊
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
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    // 讓Vite處理CommonJS模塊
    commonjs({
      include: [
        // 明確包含 dayjs 及其插件，避免 Rollup 處理錯誤
        "node_modules/.pnpm/dayjs@1.11.4/node_modules/dayjs/**/*.js",
        "node_modules/.pnpm/dayjs@1.11.4/node_modules/dayjs/plugin/**/*.js",
      ],
    }),
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
  optimizeDeps: {
    include: [
      // 明確包含 dayjs 和 element-plus，提高性能和解決導入錯誤
      "element-plus",
      "dayjs",
    ],
  },
});
