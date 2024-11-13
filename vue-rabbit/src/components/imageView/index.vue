<script setup>
import { ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";

//props適配圖片列表
defineProps({
  imageList: {
    type: Array,
    default: () => [],
  },
});

// 1.小圖切換大圖顯示
const activeIndex = ref(0);

const enterHandler = (i) => {
  activeIndex.value = i;
};

// 2.獲取滑鼠相對位置
const target = ref(null);
const { elementX, elementY, isOutside } = useMouseInElement(target);

// 3.控制滑塊跟隨滑鼠移動
// 監聽elementX/Y變化, 一旦變化 重新設置left/top
const left = ref(0);
const top = ref(0);

const positionX = ref(0);
const positionY = ref(0);

const effectiveRangeCal = (element, obj) => {
  if (element.value > 100 && element.value < 300) {
    obj.value = element.value - 100;
  }
};

const limitRange = (element, obj) => {
  if (element.value > 300) {
    obj.value = 200;
  }
  if (element.value < 100) {
    obj.value = 0;
  }
};

watch([elementX, elementY], () => {
  // 有效範圍內控制滑塊距離
  if (isOutside.value) return;
  // 橫向
  effectiveRangeCal(elementX, left);

  // 縱向
  effectiveRangeCal(elementY, top);

  // 處理邊界
  limitRange(elementX, left);
  limitRange(elementY, top);

  // 控制大圖的顯示
  positionX.value = -left.value * 2;
  positionY.value = -top.value * 2;
});
</script>

<template>
  <!-- {{ elementX }}-{{ elementY }}-{{ isOutside }} -->
  <div class="goods-image">
    <!-- 左側大圖-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙層小滑塊 -->
      <div
        class="layer"
        v-show="!isOutside"
        :style="{ left: `${left}px`, top: `${top}px` }"
      ></div>
    </div>
    <!-- 小圖列表 -->
    <ul class="small">
      <li
        v-for="(img, i) in imageList"
        :key="i"
        @mouseenter="enterHandler(i)"
        :class="{ active: i === activeIndex }"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大鏡大圖 -->
    <div
      class="large"
      :style="[
        {
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`,
        },
      ]"
      v-show="!isOutside"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景圖:盒子的大小 = 2:1  將來控制背景圖的移動來實現放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 絕對定位 然後跟隨我們鼠標控制left和top屬性就可以讓滑塊移動起來
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
