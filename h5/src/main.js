import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/index.css'
import api from '@/services/index.js'
import './permission.js'
import topBar from '@/components/topBar.vue'
import './assets/icon/iconfont.css'
let app = createApp(App)
app.use(vant)
//将api挂载到vue实例
app.config.globalProperties.$api=api
app.component('van-top-bar',topBar)
app.use(store).use(router).mount('#app')
