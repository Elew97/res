import axios from './config/axios_config.js'

function getUserInfo(params) {
    return axios({
        url:'/service/user/save',
        method:"get",
        params
    })
}
function getOrderList(data){
    return axios({
        url:'/api/users/order',
        method:"post",
        data
    })
}
function getFoodsList(data){
    return axios({
        url:'/api/foods/submenu',
        method:"post",
        data
    })
}
function getOrderDetail(data){
    return axios({
        url:'/api/users/orderDetail',
        method:"post",
        data
    })
}
//取消订单
function cancelOrder(data){
    return axios({
        url:'/api/users/orderDel',
        method:"post",
        data
    })
}
function userLogin(data){
    return axios({
        url:'/api/admin/login',
        method:"post",
        data
    })
}
function userRegister(data){
    return axios({
        url:'/api/admin/register',
        method:"post",
        data
    })
}
export default{
    getUserInfo,
    getOrderList,
    getFoodsList,
    getOrderDetail,
    cancelOrder,
    userLogin,
    userRegister
}

