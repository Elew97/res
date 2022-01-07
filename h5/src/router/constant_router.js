export const constantRouteMap = [
    {
		path: '/',
		component: () => import('@/views/index.vue'),
        redirect:'/home',
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/home/index')
			},
            {
                path: '/list',
				name: 'list',
				component: () => import('@/views/list/index')
            },
			{
				path: '/about',
				name: 'about',
				component: () => import('@/views/about/index')
			}
		]
	}
		
]