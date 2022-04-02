export const constantRouteMap = [
	{
		path: '/',
		component: () => import('@/views/index.vue'),
		redirect: '/home',
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
		component: () => import('../register.vue')
	  },
	  {
		path: '/login',
		name: 'Login',
		component: () => import('../login.vue')
	  },
	  {
		path: '/edit-data',
		name: 'EditData',
		component: () => import('@/views/about/edit-data.vue')
	},

]