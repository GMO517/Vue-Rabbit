<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";

//觸發獲取導航列表的action
import { useCategoryStore } from "@/stores/category";
import { onMounted } from "vue";
const categoryStore = useCategoryStore();

onMounted(() => categoryStore.getCategory());
</script>

<template>
  <div>
    <!-- 二級路由出口 -->
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <!-- 添加key 破壞路由緩存造成組件覆用的問題 -->
    <!-- 強制銷毀重建 -->
    <!-- 但過於粗暴 請求會跑好幾次 先棄用 -->
    <!-- <RouterView :key="$route.fullPath" /> -->
    <RouterView />
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped></style>
