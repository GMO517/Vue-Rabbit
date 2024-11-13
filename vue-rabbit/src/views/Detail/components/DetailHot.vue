<script setup>
import { ref, onMounted, computed } from "vue";
import { fetchHotGoodsAPI } from "@/apis/detail";
import { useRoute } from "vue-router";
import { convertObjectToTC } from "@/utils/convertText";
//設計props參數 用於適配不同title和資料

const props = defineProps({
  hotType: {
    type: Number,
  },
});
//適配title  1-24hr 2-week
//這裡是枚舉寫法
const TYPEMAP = {
  1: "本日熱門",
  2: "本週熱門",
};

const title = computed(() => TYPEMAP[props.hotType]);

//以24小時熱門榜獲取資料
const hotList = ref([]);
const route = useRoute();
const getHotList = async () => {
  const res = await fetchHotGoodsAPI({
    id: route.params.id,
    type: props.hotType,
  });
  hotList.value = convertObjectToTC(res.result);
};
onMounted(() => getHotList());
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品區塊 -->
    <RouterLink
      to="/"
      class="goods-item"
      v-for="item in hotList"
      :key="item.id"
    >
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">${{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
