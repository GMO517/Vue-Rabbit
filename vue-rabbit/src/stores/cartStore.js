// 封裝購物車模組
import { defineStore } from "pinia";
import { computed, ref } from "vue";
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

    // 從購物車刪除商品
    const removeCart = (skuId) => {
      // 1.找到要刪掉項的下標值 - splice

      const idx = cartList.value.findIndex((item) => item.skuId === skuId);
      cartList.value.splice(idx, 1);
      // 2.使用數組的過濾方法 - filter 二選一
      // cartList.value = cartList.value.filter((item) => item.skuId !== skuId);
    };

    // 計算商品總和
    // 1.總數 所有項的count之和
    // reduce((累加器,當前項) => 累加器 + 當前項.count, 起始值 = 0)
    const allItemCount = computed(() =>
      cartList.value.reduce((total, item) => total + item.count, 0)
    );
    // 2.總價 所有項的count * price的和
    const allPriceCount = computed(() =>
      Math.round(
        cartList.value.reduce(
          (total, item) => total + item.count * item.price,
          0
        )
      )
    );
    return {
      cartList,
      addCart,
      removeCart,
      allItemCount,
      allPriceCount,
    };
  },
  {
    persist: true,
  }
);