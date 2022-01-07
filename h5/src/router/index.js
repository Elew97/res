import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import {constantRouteMap} from './constant_router.js'
const router = createRouter({
	scrollBehavior: () => ({ y: 0 }),//每次切换路由回到页面最顶部
	history: createWebHashHistory(),
	routes:constantRouteMap
})

export default router
