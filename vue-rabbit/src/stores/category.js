import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/layout";
import { convertObjectToTC } from "@/utils/convertText";

export const useCategoryStore = defineStore("category", () => {
  // state 導航列表資料
  const categoryList = ref([]);
  // action 獲取導航資料的方法
  const getCategory = async () => {
    const res = await getCategoryAPI();
    categoryList.value = convertObjectToTC(res.result);
  };

  return {
    categoryList,
    getCategory,
  };
});
