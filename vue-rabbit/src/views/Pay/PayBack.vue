<script setup>
import { getOrderAPI } from "@/apis/pay";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { convertObjectToTC } from "@/utils/convertText";

const orderInfo = ref({});
const route = useRoute();
const getOrderInfo = async () => {
  const res = await getOrderAPI(route.query.orderId);
  orderInfo.value = convertObjectToTC(res.result);
};
onMounted(() => {
  getOrderInfo();
});
</script>

<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 付款結果 -->
      <div class="pay-result">
        <!-- 路由參數獲取到的是字串不是boolean -->
        <!-- 所以要 === "true" -->
        <span
          class="iconfont icon-queren2 green"
          v-if="$route.query.payResult === 'true'"
        ></span>
        <span class="iconfont icon-shanchu red" v-else></span>
        <p class="tit">
          付款成功{{ $route.query.payResult === "true" ? "成功" : "失敗" }}
        </p>
        <p class="tip">我們將儘快為您發貨，收貨期間請保持手機暢通</p>
        <p>付款方式：<span>支付宝</span></p>
        <p>
          付款金額：<span> ${{ Math.round(orderInfo.payMoney) }} </span>
        </p>
        <div class="btn">
          <el-button type="primary" style="margin-right: 20px"
            >查看訂單</el-button
          >
          <el-button>進入首頁</el-button>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          溫馨提示：小兔鮮兒不會以訂單異常、系統升級為由要求您點擊任何網址鏈接進行退款操作，請保護資產、謹慎操作。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;

  > .iconfont {
    font-size: 100px;
  }

  .green {
    color: #1dc779;
  }

  .red {
    color: $priceColor;
  }

  .tit {
    font-size: 24px;
  }

  .tip {
    color: #999;
  }

  p {
    line-height: 40px;
    font-size: 16px;
  }

  .btn {
    margin-top: 50px;
  }

  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
