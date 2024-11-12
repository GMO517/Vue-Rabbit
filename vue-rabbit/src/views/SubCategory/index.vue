<script setup>
import { getCategoryFilterAPI } from "@/apis/category";
import { getSubCategoryAPI } from "@/apis/category";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { convertObjectToTC } from "@/utils/convertText";
import GoodsItem from "../Home/components/GoodsItem.vue";

// 獲取麵包屑導航列數據
const categoryData = ref({});
const route = useRoute();
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id);
  categoryData.value = convertObjectToTC(res.result);
};

// 獲取基礎列表數據渲染
const goodsList = ref([]);
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime",
});

const getGoodsList = async () => {
  const res = await getSubCategoryAPI(reqData.value);
  goodsList.value = convertObjectToTC(res.result.items);
};

// tab切換時callback
const tabChange = () => {
  // console.log("切換了", reqData.value.sortField);
  reqData.value.page = 1; //記得要Reset一下
  getGoodsList();
};

// 加載更多
const disabled = ref(false);
const load = async () => {
  console.log("加載更多參數了");
  //獲取下一頁的資料
  reqData.value.page++;
  const res = await getSubCategoryAPI(reqData.value);

  //使用展開運算子拼接數組
  //等同於C# List.AddRange()
  goodsList.value = [...goodsList.value, ...res.result.items];

  //加載完畢 停止監聽
  if (res.result.items.length === 0) {
    console.log("資料加載完畢 停止");
    disabled.value = true;
  }
};

onMounted(() => {
  getCategoryData();
  getGoodsList();
});
</script>

<template>
  <div class="container">
    <!-- 麵包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: `/category/${categoryData.parentId}` }"
        >
          {{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ categoryData.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人氣" name="orderNum"></el-tab-pane>
        <el-tab-pane label="評論最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        class="body"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
      >
        <!-- 商品列表 -->
        <GoodsItem v-for="goods in goodsList" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

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

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
