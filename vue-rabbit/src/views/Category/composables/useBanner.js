//封裝輪播圖相關的程式碼
import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home";

//一般都是用useXXXX
export function useBanner() {
  const bannerList = ref([]);
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: "2",
    });
    // console.log(res);
    bannerList.value = res.result;
  };
  onMounted(() => {
    getBanner();
  });

  return {
    bannerList,
  };
}
