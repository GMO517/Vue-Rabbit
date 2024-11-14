// 封裝購物車模組
import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessage } from "element-plus";

export const useCartStore = defineStore(
  "cart",
  () => {
    // 1.定義state - cartList
    const cartList = ref([]);

    // 2.定義action - addCart
    const addCart = (goodsInfo) => {
      //商品數量異常處理
      if (goodsInfo.count <= 0) {
        ElMessage.error("商品數量異常");
        return;
      }
      // 添加購物車操作
      // 已添加過 - count +1
      // 沒有添加過 - 直接push
      // 做法:通過匹配傳遞過來的商品對象中的skuId
      // 能不能在cartList中找到, 找到了就是添加過
      const item = cartList.value.find(
        (item) => goodsInfo.skuId === item.skuId
      );
      if (item) {
        //找到了
        item.count += goodsInfo.count;
      } else {
        //沒找到
        cartList.value.push(goodsInfo);
      }
    };
    return {
      cartList,
      addCart,
    };
  },
  {
    persist: true,
  }
);
