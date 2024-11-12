// utils/convertText.js
import { tify, sify } from "chinese-conv";

// 單一字串轉換
export function convertToTC(text) {
  return tify(text); // 使用 chinese-conv 的 tify 轉換簡體到繁體
}

// 遞迴轉換物件或陣列中所有字串
export function convertObjectToTC(data) {
  if (typeof data === "string") {
    return tify(data); // 字串直接轉換
  } else if (Array.isArray(data)) {
    return data.map((item) => convertObjectToTC(item)); // 遞迴處理陣列
  } else if (typeof data === "object" && data !== null) {
    const convertedObject = {};
    for (const key in data) {
      convertedObject[key] = convertObjectToTC(data[key]); // 遞迴處理物件屬性
    }
    return convertedObject;
  }
  return data; // 非字串或物件時，原樣返回
}
