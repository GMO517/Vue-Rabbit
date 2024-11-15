<template>
  <footer class="app_footer">
    <!-- 聯絡我們 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>聯絡我們</dt>
          <dd><i class="iconfont icon-kefu"></i> 在線客服</dd>
          <dd><i class="iconfont icon-question"></i> 問題回饋</dd>
        </dl>
        <!-- <dl>
          <dt>關注我們</dt>
          <dd><i class="iconfont icon-weixin"></i> 公眾號</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl> -->
        <dl>
          <dt>下載APP</dt>
          <dd class="qrcode"><img src="@/assets/images/qrcode.jpg" /></dd>
          <dd class="download">
            <span>掃描QR Code</span>
            <span>立即下載APP</span>
            <a href="javascript:;">點我下載</a>
          </dd>
        </dl>
        <dl>
          <dt>客服電話</dt>
          <dd class="hotline">
            02-1234-5678 <small>週一至週五 8:00-18:00</small>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>價格親民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品質新鮮</span>
          </a>
        </div>
        <!-- 版權資訊 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">關於我們</a>
            <a href="javascript:;">幫助中心</a>
            <a href="javascript:;">售後服務</a>
            <a href="javascript:;">配送與驗收</a>
            <a href="javascript:;">商務合作</a>
            <a href="javascript:;">搜尋推薦</a>
            <a href="javascript:;">友情鏈接</a>
          </p>
          <p>CopyRight © 小兔鮮兒</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;

  .contact {
    background: #fff;

    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }

    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;

      &:first-child {
        padding-left: 13%;
      }

      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }

    dt {
      line-height: 1;
      font-size: 18px;
    }

    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;

      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }

      &:hover {
        .iconfont {
          color: $xtxColor;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }

    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;

      span {
        display: block;
      }

      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: $xtxColor;
      }
    }

    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;

      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }

  .extra {
    background-color: #333;
  }

  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;

    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;

      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }

      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }

  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;

    p {
      line-height: 1;
      margin-bottom: 20px;
    }

    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
