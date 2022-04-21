<template>
	<div class="index">
		<div class="header-bgc">
			<!-- <img src="@/assets/img/info_bgc.jpg"> -->
			<div class="header-bgc__icon">
				<img src="@/assets/img/icon.jpg" />
			</div>
		</div>
		<div class="middle-content">
			<div class="middle-content__header">
				<div class="left">
					<span class="iconfont icon-goumaijilu"></span>
					<span class="ml10">我的订单</span>
				</div>
				<div class="right">
					<a href="javascript:;" @click.native="viewAll">查看全部订单></a>
				</div>
			</div>
			<div class="middle-content__bottom">
				<div class="content-item" @click.native="paid">
					<div class="icon"><span class="iconfont icon-yifukuan"></span></div>
					<div>已确认</div>
				</div>
				<!-- <div class="content-item">
					<div class="icon"><span class="iconfont icon-pingjia"></span></div>
					<div>待评价</div>
				</div> -->
				<!-- <div class="content-item">
					<div class="icon">icon</div>
					<div>待送餐</div>
				</div> -->
				<div class="content-item" @click.native="unpaid">
					<div class="icon"><span class="iconfont icon-daifukuan"></span></div>
					<div>待确认</div>
				</div>
			</div>
		</div>
		<div class="bottom-content">
			<ul>
				<!-- <li @click.native="collected">
					<div class="bottom-content__left">
						<span class="iconfont icon-wodeshoucang"></span>
						<span class="ml20">已收藏</span>
					</div>
					<div class="bottom-content__right">></div>
				</li> -->
				<!-- <li>
					<div class="bottom-content__left">
						<span>icon</span>
						<span class="ml20">购买记录</span>
					</div>
					<div class="bottom-content__right">></div>
				</li> -->
				<!-- <li @click.native="edit">
					<div class="bottom-content__left">
						<span class="iconfont icon-xiugaigerenxinxi"></span>
						<span class="ml20">修改个人资料</span>
					</div>
					<div class="bottom-content__right">></div>
				</li> -->
				<li>
					<div class="bottom-content__left" @click="exit">
						<span class="iconfont icon-shezhi"></span>
						<span class="ml20">退出登录</span>
					</div>
					<div class="bottom-content__right">></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		};
	},

	components: {},

	mounted() { },

	methods: {
		viewAll(){
			this.$router.push({name:'allOrders'})
		},
		paid(){
			this.$router.push({name:'paid'})
		},
		unpaid(){
			this.$router.push({name:'unpaid'})
		},
		collected(){
			this.$router.push({name:'collected'})
		},
		edit(){
			this.$router.push({name:'EditData'})
		},
		exit(){
			this.$router.push({name:'Login'})
		}
	}
}

</script>
<style lang='less' scoped>
@pos: {
	display: flex;
	justify-content: space-between;
	padding: 20px 40px;
};
.index {
	.header-bgc {
		position: relative;
		background-color: #edeff3;
		width: 100vw;
		height: 25vh;
		// img{
		// 	width: 100vw;
		// 	height: 25vh;
		// 	border-radius: 4px;
		// }
		&__icon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%);
			margin-top: -7.5vw;
			img {
				width: 15vw;
				height: 15vw;
				border-radius: 50%;
			}
		}
	}
	.middle-content {
		margin-top: 40px;
		background-color: #fff;
		&__header {
			@pos();
			border-bottom: 1px solid #edeff3;
		}
		&__bottom {
			height: 20vw;
			@pos();
			align-items: center;
			box-shadow: 5px 5px 5px #edeff3;
			& .content-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				& .icon {
					margin-bottom: 10px;
					text-align: center;
				}
			}
		}
	}
	.bottom-content {
		margin-top: 60px;
		background-color: #fff;
		box-shadow: 5px 5px 5px #edeff3;
		ul li {
			@pos();
			border-bottom: 1px solid #edeff3;
		}
	}
}
</style>