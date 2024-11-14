import axios from "axios";
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import router from "@/router";
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

//攔截器

// axios請求攔截器
httpInstance.interceptors.request.use(
  (config) => {
    // 1.從pinia拿取token資料
    const userStore = useUserStore();
    // 2. 按照後端的請求要求拼接token資料
    const token = userStore.userInfo.token;
    if (token) {
      // Authorization 受保護的資料 代表token不會洩漏
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// axios響應式攔截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    // 統一錯誤提示
    ElMessage({
      type: "warning",
      message: e.response.data.msg,
    });

    // 401 token失效處裡
    // 1.清除本地使用者資料
    // 2.跳轉到登入頁
    if (e.response.status === 401) {
      userStore.clearUserInfo();
      router.push("/login");
    }
    return Promise.reject(e);
  }
);
export default httpInstance;
