import httpInstance from "@/utils/http";

// 獲取banner圖片

export function getBannerAPI(params = {}) {
  //默認為1 商品為2
  const { distributionSite = "1" } = params;
  return httpInstance({
    url: "/home/banner",
    params: {
      distributionSite,
    },
  });
}

/**
 * @description: 獲取新鮮好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url: "/home/new",
  });
};

/**
 * @description: 獲取人氣推薦
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return httpInstance({
    url: "home/hot",
  });
};

/**
 * @description: 獲取所有商品資料
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: "/home/goods",
  });
};
