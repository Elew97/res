<template>
  <div class="listContainer">
    <good-list :menus="list"></good-list>
    <!-- <van-list :loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list> -->
  </div>
</template>

<script>
import GoodList from "./childComp/good-list.vue";
export default {
  data() {
    return {
      loading: true,
      finished: false,
      list:[],
    };
  },

  components: {
    GoodList,
  },
  mounted() {
      this.getFoodsData()
  },
  methods: {
    getFoodsData() {
      this.$api.getFoodsList().then((res) => {
        console.log(111111)
        console.log(res)
        this.list = res.data.data;
      });
    },
    // initData() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     for (let i = 0; i < 20; i++) {
    //       this.list.push(i);
    //     }
    //     this.loading = false;
    //     //当finished为ture就不会触发下拉load事件,可根据接口返回是否有数据来设置finished是否为true
    //     //this.finished = true
    //   }, 1000);
    // },
    // //页面初始化时就会加载这个方法
    // onLoad() {
    //   if (this.list.length > 30) {
    //     this.finished = true;
    //   }
    //   this.initData();
    // },
  },
};
</script>
<style lang='less' scoped>
.listContainer {
  /deep/ .van-cell {
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
}
</style>