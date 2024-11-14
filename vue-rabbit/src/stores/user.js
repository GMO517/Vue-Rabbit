// 導入使用者資料相關
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
export const useUserStore = defineStore(
  "user",
  () => {
    // 1.定義管理帳戶資料的state
    const userInfo = ref({});
    // 2.定義獲取接口資料的action函數
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
    };
    // 3.以object格式把state和action return
    return {
      userInfo,
      getUserInfo,
    };
  },
  {
    persist: true,
  }
);
