//封裝分類數據的相關程式碼
import { onBeforeRouteUpdate } from "vue-router";
import { getCategoryAPI } from "@/apis/category";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { convertObjectToTC } from "@/utils/convertText";

export function useCategory() {
  const categoryData = ref({});
  const route = useRoute();
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    categoryData.value = convertObjectToTC(res.result);
    // console.log(categoryData.value);
  };

  onMounted(() => {
    getCategory();
  });

  // 目標:路由參數變化的時候 可以把分類API重新發送請求
  onBeforeRouteUpdate((to) => {
    // console.log("路由變化");
    getCategory(to.params.id);
  });

  //也可以用watch監聽路由變化去更新資料
  // watch(
  //   () => route.params.id,
  //   (newId) => {
  //     getCategory(newId);
  //   }
  // );
  return {
    categoryData,
  };
}
