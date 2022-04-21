<template>
	<div class="all-orders">
		<div class="all-orders-back">
			<van-icon name="arrow-left" @click.native="backRegister" />
		</div>
		<div v-if="orderList.length<=0" class="note">
			<span>暂无数据</span>
		</div>
		<div class="orderDetail" v-for="(item, index) in orderList" :key="index" v-else>
			<div class="orderDetail-item">
				<div>
					<span>时光餐馆</span>.
					<span>{{ item.food_name }}</span>
				</div>
				<div>
					<span :class="'status--' + item.status">{{ item.status == '1' ? '已确认' : '未确认' }}</span>
				</div>
			</div>
			<div class="orderDetail-img">
				<img :src="item.img_url" class="img" />
				<div>
					<div>
						<span class="symbolStyle">￥</span>
						<span class="priceStyle">{{ item.totalPrice }}</span>
					</div>
					<div class="numStyle">共{{ item.order_num }}件</div>
				</div>
			</div>
			<div class="viewDetail">
				<van-button type="primary" size="mini" @click="cancel(item)" :disabled="item.status == '1'">取消订单
				</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
	data() {
		return {
			orderList: [],
		}
	},
	computed: {
		...mapState(['info'])
	},
	mounted() {
		this.getOrderData()
	},
	methods: {
		backRegister() {
			this.$router.back()
		},
		getOrderData() {
			this.$api.getOrderDetail({ id: this.info.u_id }).then((res) => {
				res.data.data.forEach((item) => {
					item.totalPrice = item.order_num * item.order_price
				})
				this.orderList = res.data.data;
			});
		},
		cancel(item) {
			this.$dialog.confirm({
				title: '确认取消订单？'
			}).then(() => {
				this.$api.cancelOrder({ id: item.o_id }).then((res) => {
					this.$toast.success("取消成功");
					this.getOrderData()
				}).catch(() => {
					this.$toast.error("取消失败");
				})
			}).catch(() => { });
		},
	}
}
</script>

<style scoped lang="less">
.all-orders-back {
	margin: 20px;
	font-size: 4vh;
}
.note{
	font-weight: 800;
	font-size: 4vh;
	display: flex;
	justify-content: center;
}
.img {
	width: 200px;
	height: 200px;
	border-radius: 8px;
	margin-top: 10px;
}

.orderDetail {
	margin: 20px;
	background-color: #fff;
	border-radius: 8px;
	padding: 20px;
	position: relative;
	box-shadow: 5px 5px 5px #fff;
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

.priceStyle {
	font-size: 48px;
	font-weight: 700;
}

.viewDetail {
	position: absolute;
	right: 20px;
	bottom: 20px;
	color: #1989fa;
}

.status--0 {
	color: #fd3f31;
}

.status--1 {
	color: #1989fa;
}
</style>