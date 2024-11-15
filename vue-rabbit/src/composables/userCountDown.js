// 封裝倒數計時功能
import { computed, ref } from "vue";
import { useIntervalFn } from "@vueuse/core";

export const useCountDown = () => {
  let timer = null;
  // 1.響應式資料
  const time = ref(0);

  // 格式化時間為 XX分OO秒
  const formatTime = computed(() => {
    const minutes = Math.floor(time.value / 60)
      .toString()
      .padStart(2, "0"); // 計算分鐘並補齊 2 位數
    const seconds = (time.value % 60).toString().padStart(2, "0"); // 計算秒數並補齊 2 位數
    return `${minutes}分${seconds}秒`;
  });

  // 2.開啟倒數的方法
  const start = (currentTime) => {
    // 透過 useIntervalFn 來實現倒數計時
    time.value = currentTime;

    // 每秒更新一次倒數時間
    timer = useIntervalFn(() => {
      if (time.value > 0) {
        time.value -= 1;
      } else {
        timer.stop(); // 當倒數結束時停止計時器
      }
    }, 1000);

    timer.start(); // 啟動計時器
  };

  return {
    formatTime,
    start,
  };
};
