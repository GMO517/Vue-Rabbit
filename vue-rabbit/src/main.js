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

import { useIntersectionObserver } from "@vueuse/core";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

//定義全局指令

app.directive("img-lazy", {
  mounted(el, binding) {
    //el = element 指定綁定的對象 img
    //binding = binding.value =後面綁定的值
    // console.log(el, binding.value);

    //isIntersecting:bool 會回傳是否在視口裡面
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      // console.log(isIntersecting);
      if (isIntersecting) {
        //進入視口才去給url 才加載
        el.src = binding.value;
      }
    });
  },
});
