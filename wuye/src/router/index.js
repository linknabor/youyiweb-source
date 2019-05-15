import Vue from 'vue'
import Router from 'vue-router'

import bill from '@/components/bill'
import loading from '@/components/loading'
import footer from '@/components/footer' //底部导航

import index from '@/pages/index' //物业首页

import pay from '@/pages/pay/pay' //查询缴费 停车缴费
import payEnquiry from '@/pages/pay/payEnquiry' //缴费查询

import myHouse from '@/pages/house/myHouse'   //我的房屋
import addHouse from '@/pages/house/addHouse' //添加房屋
import bindHouse from '@/pages/house/bindHouse'  //绑定房屋

import suggest from '@/pages/suggest/index'   //意见建议

import news from '@/pages/news/index'        //新闻资讯



Vue.use(Router)

const router= new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component:index,
      meta:{
        title:'社区物业'
      },
    },
    {
      path:'/pay',
      name:'pay',
      component:pay,
      meta:{
        title:'物业缴费'
      }
    },  
    {
      path:'/payEnquiry',
      name:'payEnquiry',
      component:payEnquiry,
      meta:{
        title:'缴费查询'
      }
    },
    {
      path:'/myHouse',
      name: 'myHouse',
      component:myHouse,
      meta:{
        title: '我的房屋'
      }
    },
    {
      path: '/addHouse',
      name: 'addHouse',
      component: addHouse,
      meta:{
        title:'添加房屋'
      }
    },
    {
      path: '/bindHouse/:number',
      name: 'bindHouse',
      component: bindHouse,
      meta:{
        title: '绑定房屋'
      }
    },
    {
      path:'/suggest',
      name:'suggest',
      component:suggest,
      meta:{
        title:'意见建议'
      }
    },
    {
      path:'/news',
      name:'news',
      component:news
    }
  ]
});
//路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数
router.beforeEach((to, from, next) => {
    //动态改变title
    changeTitle(to.meta.title)
    next();
});

//动态改变title
function changeTitle(title) {
    title = title ? title : '友宜物业';
    window.document.title = title;
};

export default router
