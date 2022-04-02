import axios from 'axios'
import apiConfig from './api_config.js'
import { Toast } from 'vant'
export default function axiosSerivce(options){
    //创建实例
    return new Promise((resolve,reject)=>{
        const axiosSerivce = axios.create({
            baseURL:apiConfig.baseURL,
            headers:apiConfig.headers,
            withCredentials:apiConfig.withCredentials,//解决cookie时，跨域问题
            timeout:apiConfig.timeout//超时时间
        })
        //请求拦截
        axiosSerivce.interceptors.request.use(
            config=>{
                //可以在header添加一些东西，比如下面的token,
                // const adminToken = Cookies.get('admin-token');
                // if (adminToken) {
                //     config.headers['Authorization'] = adminToken
                // }
                //打包的时候去掉代理
                //config.url= process.env.NODE_ENV=='development'? config.url: config.url.replace('/service','')
                return config
            },
            err=>{
                Toast.fail("请求超时!");
                return Promise.reject(err)
            }
        )
        //响应拦截
        axiosSerivce.interceptors.response.use(
            response=>{
                //console.log(response)
                Toast.clear()
                //根据自己的响应结果的数据结构进行判断
                if(response.status!=200){
                    Toast.fail(response.msg)
                    return
                }
                return Promise.resolve(response)
            },
            err=>{
                if(!err.response){
                    return Promise.reject(err); // 返回接口返回的错误信息
                }
                //根据后端返回的状态码进行判断
                switch (err.response.status) {
                    case 401:
                        err.message = '登录超时';
                        //跳转到登录
                        //window.location.href = 'login'
                    case 404:
                        err.message = `请求地址出错: ${err.response.config.url}`;
                        Toast.fail(err.message)
                        break;
                    case 500:
                        err.message = "服务器内部错误";
                        break;
                    case 502:
                        //清除本地缓存，比如token
                        //跳转到登录
                        //window.location.href = 'login'
                        break;
                }
                return Promise.reject(err); // 返回接口返回的错误信息
            }
        )
        //调用请求处理方法
        axiosSerivce(options).then(res=>{
            resolve(res)
            return false
        }).catch(err=>{
            reject(err)
        })
    })
   
}

