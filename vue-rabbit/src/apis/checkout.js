import request from "@/utils/http";
/**
 * 獲取結帳資料
 */
export const getCheckoutInfoAPI = () => {
  return request({
    url: "/member/order/pre",
  });
};
