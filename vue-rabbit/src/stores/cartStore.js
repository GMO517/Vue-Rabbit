// 封裝購物車模組
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "./userStore";
import { convertObjectToTC } from "@/utils/convertText";
import { insertCartAPI, findNewCartListAPI, removeCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    // 1.定義state - cartList
    const cartList = ref([]);

    // 2.定義action - addCart
    const addCart = async (goodsInfo) => {
      if (isLogin.value) {
        //登入時觸發

        //商品數量異常處理
        if (goodsInfo.count <= 0) {
          ElMessage.error("商品數量異常");
          return;
        }
        const { skuId, count } = goodsInfo;
        await insertCartAPI({ skuId, count });
        updateNewList();
      } else {
        //未登入時觸發
        ElMessage.warning("請先登入");
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
      }
    };

    // 從購物車刪除商品
    const removeCart = async (skuId) => {
      if (isLogin.value) {
        // 調用接口實現購物車中的刪除功能
        await removeCartAPI([skuId]);
        updateNewList();
      } else {
        // 1.找到要刪掉項的下標值 - splice

        const idx = cartList.value.findIndex((item) => item.skuId === skuId);
        cartList.value.splice(idx, 1);
        // 2.使用數組的過濾方法 - filter 二選一
        // cartList.value = cartList.value.filter((item) => item.skuId !== skuId);
      }
    };

    // 獲取最新購物車列表action
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = convertObjectToTC(res.result);
    };

    // 單選功能
    const singleCheck = (skuId, selected) => {
      // 通過skuId找到要修改的那一項
      // 然後把他的selected修改為傳過來的selected
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    const allCheck = (selected) => {
      // foreach把cartList中的每一項selected都修改為selected
      cartList.value.forEach((item) => (item.selected = selected));
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

    //是否全選
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    // 3.已選擇商品數量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.count, 0)
    );

    // 4.已選擇商品總價
    const selectedPriceCount = computed(() =>
      Math.round(
        cartList.value
          .filter((item) => item.selected)
          .reduce((total, item) => total + item.count * item.price, 0)
      )
    );

    return {
      cartList,
      addCart,
      removeCart,
      allItemCount,
      allPriceCount,
      isAll,
      selectedCount,
      selectedPriceCount,
      singleCheck,
      allCheck,
    };
  },
  {
    persist: true,
  }
);
