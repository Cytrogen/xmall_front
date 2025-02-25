<script>
export default {
  props: ['goods']
};
</script>

<template>
  <el-row class="good-item">
    <el-col>
      <el-card :body-style="{ padding: 0 }">
        <div class="good-img">
          <a>
            <img :src="goods.productImageBig" alt="" />
          </a>
        </div>
        <h6 class="good-title">{{goods.productName}}</h6>
        <h3 class="sub-title ellipsis">{{goods.subTitle}}</h3>
        <div class="good-price pr">
          <div class="ds pa">
            <a href="">
              <el-button type="default" size="medium">查看详情</el-button>
            </a>
            <a href="">
              <el-button type="primary" size="medium">加入购物车</el-button>
            </a>
          </div>
          <p>
            <span style="font-size: 14px">￥</span>
            {{Number(goods.salePrice).toFixed(2)}}
          </p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/mixin";
@import "../assets/style/theme";

.good-item {
  background: #fff;
  width: 25%;
  transition: all .5s;
  height: 430px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;

    .good-price p {
      display: none;
    }

    .ds {
      display: flex;
    }
  }

  .ds {
    @extend %block-center;
    width: 100%;
    display: none;
  }

  .good-img {
    img {
      margin: 50px auto 10px;
      @include wh(206px);
      display: block;
    }
  }

  .good-price {
    margin: 15px 0;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #d44d44;
    font-family: Arial, serif;
    font-size: 18px;
    font-weight: 700;
  }

  .good-title {
    line-height: 1.2;
    font-size: 16px;
    color: #424242;
    margin: 0 auto;
    padding: 0 14px;
    text-align: center;
    overflow: hidden;
  }

  h3 {
    text-align: center;
    line-height: 1.2;
    font-size: 12px;
    color: #d0d0d0;
    padding: 10px;
  }
}
</style>