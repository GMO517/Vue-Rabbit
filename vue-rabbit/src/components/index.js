//  把component中的所有組件都全局化註冊
//  通過插件的方式
import ImageView from "./ImageView/index.vue";
import Sku from "./XtxSku/index.vue";

export const componentPlugin = {
  install(app) {
    // app.component('組件名字','組件配置對象')
    app.component("XtxImageView", ImageView);
    app.component("XtxSku", Sku);
  },
};
