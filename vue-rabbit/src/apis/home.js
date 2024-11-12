import httpInstance from "@/utils/http";

// 獲取banner圖片

export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
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
