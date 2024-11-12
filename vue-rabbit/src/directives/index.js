import { useIntersectionObserver } from "@vueuse/core";

//定義懶加載插件
export const lazyLoadingPlugin = {
  install(app) {
    //懶加載指令邏輯
    //定義全局指令

    app.directive("img-lazy", {
      mounted(el, binding) {
        //el = element 指定綁定的對象 img
        //binding = binding.value =後面綁定的值
        // console.log(el, binding.value);

        //isIntersecting:bool 會回傳是否在視口裡面
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          console.log(isIntersecting);
          if (isIntersecting) {
            //進入視口才去給url 才加載
            el.src = binding.value;
            //因為會持續監聽 記得要停止
            //且要用解構賦值接收他才可以
            stop();
          }
        });
      },
    });
  },
};
