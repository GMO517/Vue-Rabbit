<script setup>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const confirm = () => {
  // console.log("使用者登出");
  // 退出登入邏輯實作
  // 1.清除使用者資料 觸發action
  userStore.clearUserInfo();
  // 2.跳轉回登入頁
  router.push("/login");
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模板渲染 區分登入狀態跟非登入狀態 -->
        <!-- 登入時顯示第一塊 非登入顯示第二塊 -->
        <!-- 以是否有token為判斷依據 -->
        <template v-if="userStore.userInfo.token">
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-user"></i>
              {{ userStore.userInfo.account }}
            </a>
          </li>
          <li>
            <el-popconfirm
              @confirm="confirm"
              title="確認退出嗎？"
              confirm-button-text="確認"
              cancel-button-text="取消"
            >
              <template #reference>
                <a href="javascript:;">退出登錄</a>
              </template>
            </el-popconfirm>
          </li>
          <li>
            <a href="javascript:;" @click="router.push('/member/order')"
              >我的訂單</a
            >
          </li>
          <li>
            <a href="javascript:;" @click="router.push('/member')">會員中心</a>
          </li>
        </template>
        <template v-else>
          <li>
            <a href="javascript:;" @click="$router.push('/login')">請先登錄</a>
          </li>
          <li><a href="javascript:;">幫助中心</a></li>
          <li><a href="javascript:;">關於我們</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
