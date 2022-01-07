
export default{
    baseURL:process.env.VUE_APP_ENV,//请求地址
    headers:{'Content-Type':'application/json;charset=utf-8'},
    withCredentials:true,//解决cookie时，跨域问题
    timeout:5000//超时时间
}