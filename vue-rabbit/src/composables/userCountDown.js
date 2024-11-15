// 封裝倒數計時功能
import { computed, onUnmounted, ref } from "vue";
import dayjs from "dayjs";

export const useCountDown = () => {
  let timer = null;
  // 1.響應式資料
  const time = ref(0);
  // 格式化時間為 XX分OO秒
  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));
  // 2.開啟倒數的方法
  const start = (currentTime) => {
    // 開始倒計時的邏輯
    // 核心邏輯的編寫: 每隔一秒-1

    // setInterval(callback, delay, ...args)
    // 定時
    timer = setInterval(() => {
      currentTime -= 1;
      time.value = currentTime;
    }, 1000);
  };

  // 組件銷毀時清除計時器
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
  
  return {
    formatTime,
    start,
  };
};
