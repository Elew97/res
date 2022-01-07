import router from './router'
router.beforeEach((to,from,next)=>{
    console.log(to)
    // if(localStorage.getItem('token')){
    //     if(to.path=='/login'){
    //         next({ path: "/" });
    //     }
    // }else{
    //     //重新触发的时候回进入到这里,然后直接跳转到登录页
    //     if(to.path=='/login'){
    //         next();
    //     }else{
    //         //第一次会走到这个位置，然后重新触发路由钩子函数beforeEach,
    //         //当重新触发钩子函数的时候这时的to.path已经变为/login
    //         next({path:'/login'})
    //     }
    // }
    next(); //一定要调用next(),否则会造成页面卡死页面
})
