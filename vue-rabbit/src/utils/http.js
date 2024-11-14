import axios from "axios";
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
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
    // 統一錯誤提示
    ElMessage({
      type: "warning",
      message: e.response.data.msg,
    });
    return Promise.reject(e);
  }
);
export default httpInstance;
