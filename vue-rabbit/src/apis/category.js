import request from "@/utils/http";

export function getCategoryAPI(id) {
  return request({
    url: "/category",
    params: {
      id,
    },
  });
}

/**
 * @description: 獲取二級分類列表數據
 * @param {*} id 分類id
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return request({
    url: "/category/sub/filter",
    params: {
      id,
    },
  });
};
