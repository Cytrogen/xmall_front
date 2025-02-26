<template>
  <div class="goods">
    <div class="nav">
      <div class="w">
        <a @click="handleSort(i)" :class="{active: i === isIndex}" href="javascript:;" v-for="(navItem, i) in navList" :key="i">{{navItem.title}}</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min" />
          <span style="margin: 0 5px">-</span>
          <input type="number" placeholder="价格" v-model="max" />
          <el-button type="primary" size="small" style="margin-left: 10px" @click="reset">确定</el-button>
        </div>
      </div>
    </div>

    <div class="img-item">
      <div class="goods-box w">
        <mall-goods v-for="goods in allGoods" :key="goods.id" :goods="goods" />
      </div>
      <div class="w">
        <el-pagination
          style="float: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[8, 20, 40, 80]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MallGoods from "@/components/MallGoods.vue";
export default {
  components: {
    MallGoods
  },
  data() {
    return {
      max: "",
      min: "",
      navList: [
        {title: "综合排序"},
        {title: "价格由低到高"},
        {title: "价格由高到低"}
      ],
      isIndex: 0,
      currentPage: 1,
      pageSize: 20,
      sort: "",
      total: 0,
      allGoods: []
    };
  },
  created() {
    this.getAllGoods();
  },
  methods: {
    priceSort(v) {
      this.sort = v;
      this.getAllGoods();
    },
    reset() {
      this.currentPage = 1;
      this.sort = "";
      this.getAllGoods();
    },
    handleSort(i) {
      this.isIndex = i;

      switch (i) {
        // 综合排序
        case 0:
          this.reset();
          break;
        // 从低到高
        case 1:
          this.priceSort(1);
          break;
        // 从高到低
        case 2:
          this.priceSort(-1);
          break;
        default:
          break;
      }
    },
    async getAllGoods() {
      const url = this.$route.query.cid ?
          `/api/goods/allGoods?page=${this.currentPage}&size=${this.pageSize}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}&cid=${this.$route.query.cid}` :
          `/api/goods/allGoods?page=${this.currentPage}&size=${this.pageSize}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}`;
      try {
        const res = await this.$http.get(url);
        this.allGoods = res.data.data;
        this.total = res.data.total;
      } catch (error) {
        console.log(error);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页：${val}`);
    }
  },
  watch: {
    $route: "getAllGoods"
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/mixin";
@import "../../assets/style/theme";

.nav {
  height: 60px;
  line-height: 60px;

  > div {
    display: flex;
    align-items: center;

    a {
      padding: 0 15px;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;

      &.active {
        color: #5683EA;
      }

      &:hover {
        color: #5683EA;
      }
    }

    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }

    input + input {
      margin-left: 10px;
    }
  }

  .price-interval {
    padding: 0 15px;
    @extend %block-center;

    input[type=number] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.goods-box {
  > div {
    float: left;
    border: 1px solid #efefef;
  }
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;

  .no-data{
    align-self: center;
  }
}

.img-item{
  display: flex;
  flex-direction: column;
}

.el-pagination{
  align-self: flex-end;
  margin: 3vw 10vw 2vw;
}

.section {
  padding-top: 8vw;
  margin-bottom: -5vw;
  width: 1218px;
  align-self: center;
}

.recommend {
  display: flex;

  > div {
    flex: 1;
    width: 25%;
  }
}
</style>
