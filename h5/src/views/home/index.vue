<template>
  <div class="homeContainer">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
	  style="margin:10px; border-radius:4px;" 
    >
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div
      class="orderDetail"
      v-for="(item,index) in orderList"
      :key="index"
    >
      <div class="orderDetail-item">
        <div>
          <span>时光餐馆</span>.
          <span>{{item.food_name}}</span>
        </div>
        <div><span>已确认</span></div>
      </div>
      <div class="orderDetail-img">
        <img
          :src="item.img_url"
          class="img"
        >
        <div>
          <div><span class="symbolStyle">￥</span><span class="priceStyle">{{item.price}}</span></div>
          <div class="numStyle">共{{item.order_num}}件</div>
        </div>
      </div>
	  <div class="viewDetail" @click="detail">查看详情</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      orderList: [],
    };
  },
  mounted() {
    this.getOrderData();
  },
  methods: {
    getOrderData() {
      this.$api.getOrderDetail({ id: 1 }).then((res) => {
        console.log(res);
        this.orderList = res.data.data;
      });
    },
	detail(){
		console.log(1);
	},
    to() {
      this.$router.push({
        path: "/about",
      });
    },
  },
};
</script>
<style lang="less">
.homeContainer {
  .my-swipe .van-swipe-item {
    height: 400px;
    color: #fff;
    background-color: #39a9ed;
  }
  .van-grid {
    margin-top: 20px;
  }
}
.img {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  margin-top: 10px;
}
.orderDetail {
  margin: 20px;
  background-color: #f7f8fa;
  border-radius: 8px;
  padding: 20px;
  position: relative;
}
.orderDetail-item {
  display: flex;
  justify-content: space-between;
}
.orderDetail-img {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.symbolStyle {
  font-size: 40px;
  font-weight: 700;
}
.numStyle {
//   font-size: 12px;
  color: #9b9b9b;
}
.priceStyle{
	font-size: 48px;
	font-weight: 700;
}
.viewDetail{
	position: absolute;
	right: 20px;
	bottom: 20px;
	color: #1989fa;
}
</style>