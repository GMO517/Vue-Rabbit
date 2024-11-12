import httpInstance from "@/utils/http";

// 獲取banner圖片

export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
  });
}
