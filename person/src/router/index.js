import Vue from 'vue'
import Router from 'vue-router'
import footer from '@/pages/footer'
import index from '@/pages/index'//首页
import Bindphone from '@/pages/bindphone'//个人信息
import Register from '@/pages/register'//手机注册页
import Coupons from '@/pages/coupons'//我的优惠券
import notices from '@/pages/notices'  //我的消息
import mypublish from '@/pages/mypublish'//我的发布
import threaddetail from '@/pages/threaddetail'//发布详情
import addresses from '@/pages/addresses'  //地址信息


Vue.use(Router)

let router= new Router({
  // mode:'history',
  routes: [
    {
      path:'/',
      name:'index',
      component:index,
      meta: {
        title:'个人中心'
      }
    },
    {
      path:'/register',
      name:'register',
      component:Register,
      meta: {
        title:'用户注册'
      }
    },
    {
      path:'/bindphone',
      name:'bindphone',
      component:Bindphone,
      meta: {
        title:'编辑个人信息'
      }
    },
    {
      path:'/coupons',
      name:'coupons',
      component:Coupons,
      meta:{
        title:'我的现金券'
      }
    }, 
    {
      path:'/notices',
      name:'notices',
      component:notices,
      meta:{
        title:'我的消息'
      }
    },
    {
      path:'/mypublish',
      name:'mypublish',
      component:mypublish,
      meta:{
        title:'我的发布'
      }
    },
    {
      path:'/threaddetail',
      name:'threaddetail',
      component:threaddetail
    },
    {
      path:'/addresses',
      name:'addresses',
      component:addresses,
      meta:{
        title:'地址信息'
      }
    }
 
  ]
})

////路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数
router.beforeEach((to, from, next) => {
  //动态改变title

  changeTitle(to.meta.title);
  next();
});

//动态改变title
function changeTitle(title) {
  title = title ? title : '友宜物业';
  window.document.title = title;
};


export default router
