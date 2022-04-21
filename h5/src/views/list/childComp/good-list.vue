<template>
	<div class="cascad-menu" ref="cascadMenu">
		<scroll class="left-menu" :data="menus" ref="leftMenu">
			<div>
				<ul class="left-menu-container">
					<li
						class="left-item"
						ref="leftItem"
						:class="{ 'current': currentIndex == index }"
						@click="selectLeft(index, $event)"
						v-for="(menu, index) in menus"
						:key="index"
					>
						<p class="text">{{ menu.name }}</p>
					</li>
				</ul>
			</div>
		</scroll>
		<scroll
			class="right-menu"
			:data="menus"
			ref="rightMenu"
			@scroll="scrollHeight"
			:listenScroll="true"
			:probeType="3"
		>
			<div class="right-menu-container">
				<ul>
					<li class="right-item" ref="rightItem" v-for="(menu, index) in menus" :key="index">
						<div class="title">{{ menu.name }}</div>
						<ul>
							<li v-for="(item, index) in menu.data" :key="index">
								<div class="data-wrapper">
									<div>
										<img :src="item.img_url" class="img" />
									</div>
									<div class="detail">
										<p class="data">{{ item.food_name }}</p>
										<p class="price">￥{{ item.price }}</p>
										<p class="desc">{{ item.description }}</p>
										<p>
											<van-icon
												name="minus"
												class="minus"
												style="background-color: #f7f8fa;"
												@click="edit(item, item.sales, '0')"
											/>
											<input type="number" :value="item.sales" disabled />
											<van-icon class="plus" name="plus" @click="edit(item, item.sales, '1')" />
										</p>
									</div>
									<!-- <div :class="'status--'+item.status" class="collected">
										<span class="iconfont icon-wodeshoucang"></span>
									</div> -->
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</scroll>
		<van-submit-bar class="submit" :price="price * 100" button-text="提交订单" @click="submit" />
	</div>
</template>

<script>
import Scroll from "./scroll.vue";
import {mapState} from "vuex"
export default {
	components: {
		Scroll,
	},
	props: {
		menus: {
			required: true,
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			rightTops: [],
			scrollY: 0,
			leftScrollY: 0,
			foodList: [],
			price: 0,
		};
	},
	computed: {
		currentIndex() {
			// 当用户在滚动时，需要计算当前滚动距离在哪个(右边li块)区间内，并拿到它的 `index`
			const { scrollY, rightTops } = this;
			let index = rightTops.findIndex((height, index) => {
				return scrollY >= rightTops[index] && scrollY < rightTops[index + 1];
			});
			if (scrollY > rightTops[index] + 50) {
				index++;
			}
			return index;
		},
		...mapState(['info'])
	},
	mounted() {
		this.$nextTick(() => {
			this._calculateHeight();
		});
	},
	methods: {
		edit(row, num, type) {
			if (type == "0" && num > 0) {
				row.sales--;
			}
			if (type == "1" && num < 5) {
				row.sales++;
			}
			if (num == 5) {
				this.$toast.fail("最多选择5份");
			}
			this.foodList.push({
				food_num: row.sales,
				price: row.price,
				id: row.id,
				u_id: this.info.u_id,
			});
			this.foodList = this.unique(this.foodList, "id");
			this.price = 0;
			this.foodList.forEach((item) => {
				this.price += item.food_num * item.price;
			});
		},
		//先判断数组中是否存在相同ID的对象，存在用splice(index,1,objs)替换掉
		//不存在直接arr1.push(objs)
		//难点：获取到对应的index
		//最开始的需求是一个对象数组去重，保留后面重复元素
		unique(arr, name) {
			let hash = {};
			return arr.reduce(function (acc, cru, index) {
				if (!hash[cru[name]]) {
					hash[cru[name]] = { index: acc.length };
					acc.push(cru);
				} else {
					acc.splice(hash[cru[name]]["index"], 1, cru);
				}
				return acc;
			}, []);
		},
		//获取当前提交订单时间
		getCurrentTime() {
			let myDate = new Date();
			let currentTime = myDate.getTime(); //获取当前时间
			return currentTime;
		},
		//提交订单
		submit() {
			this.$dialog
				.confirm({
					title: "请确认是否提交订单",
				})
				.then(() => {
					this.$api
						.getOrderList(this.foodList)
						.then((res) => {
							this.$toast.success("提交成功");
						})
						.catch((err) => {
							this.$toast.fail("提交失败");
						});
				}).catch(() => {
					this.$toast.success("取消成功")
				})
		},
		selectLeft(index, event) {
			// 添加`$event`是为了区分原生点击事件还是 better-scroll派发的事件
			if (!event._constructed) {
				return;
			}
			let rightItem = this.$refs.rightItem;
			let el = rightItem[index];
			this.$refs.rightMenu.scrollToElement(el, 300);
		},
		scrollHeight(pos) {
			this.scrollY = Math.abs(Math.round(pos.y));
		},
		_calculateHeight() {
			// 计算右边列表每一块的高度
			let lis = this.$refs.rightItem;
			let height = 0;
			this.rightTops.push(height);
			if (lis) {
				Array.from(lis).forEach((li) => {
					height += li.clientHeight;
					this.rightTops.push(height);
				});
			}
		},
	},
};
</script>

<style scoped>
.cascad-menu {
	display: flex;
	position: absolute;
	top: 100px;
	bottom: 100px;
	width: 100%;
	overflow: hidden;
}
.left-menu {
	width: 160px;
	padding-left: 20px;
	background: #f7f8fa;
}
.text {
	width: 100%;
	line-height: 54px;
}
.current {
	width: 200%;
	background: #fff;
}
.left-menu-container {
	margin-top: 20px;
}
.left-item {
	height: 120px;
	width: 100%;
}

.right-menu {
	flex: 1;
}
.data {
	line-height: 40px;
	height: 40px;
	color: #000;
}
.title {
	border-bottom: 1px solid rgb(235, 232, 232);
	height: 54px;
	line-height: 54px;
	font-weight: 600;
	text-align: center;
}
.right-item {
	height: 100%;
}
.desc {
	font-size: 12px;
	color: #9b9b9b;
}
.price {
	font-size: 36px;
	color: #fd3f31;
}
.data-wrapper {
	border-bottom: 1px solid rgb(235, 232, 232);
	display: flex;
}
input {
	border: none;
	height: 52px;
	width: 52px;
	text-align: center;
	margin: 0 4px;
	background-color: #f2f3f5;
	border-radius: 4px;
}
.img {
	width: 200px;
	height: 200px;
	margin: 10px;
}
.minus,
.plus {
	width: 56px;
	height: 56px;
	line-height: 56px;
	text-align: center;
	background-color: #f2f3f5;
	border-radius: 4px;
}
.detail {
	margin: auto 0;
}
.submit {
	z-index: 9999;
	position: absolute;
	right: 0;
	bottom: 0;
}
.collected{
	margin-top: 20px;
}
.status--1 {
	color: #fd3f31;
}
</style>

