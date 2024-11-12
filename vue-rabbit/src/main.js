// import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//引入初始化樣式文件
import "@/styles/common.scss";

//測試接口函數
// import { getCategory } from "./apis/testAPI";
// getCategory().then((res) => {
//   console.log(res);
// });
//引入懶加載指令插件
import { lazyLoadingPlugin } from "@/directives";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(lazyLoadingPlugin);
app.mount("#app");
