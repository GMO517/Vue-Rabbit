import request from "@/utils/http";

export const getDetail = (id) => {
  return request({
    url: "/goods",
    params: {
      id,
    },
  });
};
/**
 * 獲取熱門商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小時熱銷榜，2代表周熱銷榜
 * @param {Number} limit - 獲取的個數
 */
export const fetchHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return request({
    url: "/goods/hot",
    params: {
      id,
      type,
      limit,
    },
  });
};
