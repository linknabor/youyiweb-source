import Vue from 'vue'
import Router from 'vue-router'

import loading from '@/components/loading'

import repair from '@/pages/repair/index'     //选择报修类型
import chooseRepair from '@/pages/repair/chooseRepair'  //慧生活社区
import submitSuccess from '@/pages/repair/success'  //报修成功页

import zhifu from '@/pages/zhifu/index'     //支付

//我的维修单
import myRepair from '@/pages/myRepair/myrepair' //我的维修单
import orderdetail from '@/pages/myRepair/orderdetail' //维修单详情
import cancel from '@/pages/myRepair/cancel'  //取消订单

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path:'/repair',
      name:'repair',
      component:repair,
      meta:{
        title:'请选择报修类型'
      }
    },
    {
      path:'/submitSuccess',
      name:'submitSuccess',
      component:submitSuccess,
      meta:{
        title:'报修成功'
      }
    },
    {
      path:'/chooseRepair',
      name:'chooseRepair',
      component:chooseRepair,
    },
    {
      path:'/zhifu',
      name:'zhifu',
      component:zhifu
    },
    {
      path: '/myRepair',
      name: 'myRepair',
      component:myRepair
    },
    {
      path: '/orderdetail',
      name: 'orderdetail',
      component: orderdetail
    },{
      path:'/cancel',
      name:'cancel',
      component:cancel,
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
