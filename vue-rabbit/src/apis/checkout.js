import request from "@/utils/http";
/**
 * 獲取結帳資料
 */
export const getCheckoutInfoAPI = () => {
  return request({
    url: "/member/order/pre",
  });
};

// 建立訂單
export const createOrderAPI = (data) => {
  return request({
    url: "/member/order",
    method: "POST",
    data,
  });
};
