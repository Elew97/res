export const constantRouteMap = [

	{
		path:'/',
		component:()=> import('@/views/login.vue'),
		redirect:'/login'
	},
	{
		path: '/index',
		component: () => import('@/views/index.vue'),
		index: 'index',
		children: [{
				path: '/home',
				name: 'home',
				component: () => import('@/views/home/index'),
			},
			{
				path: '/list',
				name: 'list',
				component: () => import('@/views/list/index')
			},
			{
				path: '/about',
				name: 'about',
				component: () => import('@/views/about/index'),
			},
			{
				path: '/orderDetail',
				name: 'orderDetail',
				component: () => import('@/views/home/homeChildren/order-detail.vue')
			}

		]
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/register.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login.vue')
	},
	{
		path: '/edit-data',
		name: 'EditData',
		component: () => import('@/views/about/edit-data.vue')
	},
	{
		path: '/allOrders',
		name: 'allOrders',
		component: () => import('@/views/about/all-orders.vue')
	},
	{
		path: '/paid',
		name: 'paid',
		component: () => import('@/views/about/paid.vue')
	},
	{
		path: '/unpaid',
		name: 'unpaid',
		component: () => import('@/views/about/unpaid.vue')
	},
	{
		path: '/collected',
		name: 'collected',
		component: () => import('@/views/about/collected.vue')
	},

]