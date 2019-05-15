import Vue from 'vue'
import Router from 'vue-router'
import Orders from '@/pages/orders'
import Orderdetail from '@/pages/orderdetail'
import Onsaleorders from '@/pages/onsaleorders'
import Logistice from '@/pages/logistice'
import Comment from '@/pages/comment'
import Grouporders from '@/pages/grouporders'
import RepairPay from '@/pages/repairPay'
import Commentxiu from '@/pages/commentxiu'
import Homeorders from '@/pages/homeorders'
import Homeorderdetail from '@/pages/homeorderdetail'

Vue.use(Router)

let router= new Router({
  // mode:'history',
  routes: [
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        title:'商品订单'
      }
    },
    {
      path: '/orderdetail',
      name: 'orderdetail',
      component: Orderdetail,
      meta: {
        title:'订单详情'
      }
    },
    {
      path: '/logistice',
      name: 'logistice',
      component: Logistice,
      meta: {
        title:'物流信息'
      }
    },
    {
      path: '/onsaleorders',
      name: 'onsaleorders',
      component: Onsaleorders,
      meta: {
        title:'商品订单'
      }
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment,
      meta: {
        title:'评论'
      }
    },
    {
      path: '/grouporders',
      name: 'grouporders',
      component: Grouporders,
      meta: {
        title:'团购订单'
      }
    },
    {
      path: '/repairPay',
      name: 'repairPay',
      component: RepairPay,
    },
    {
      path: '/commentxiu',
      name: 'commentxiu',
      component:Commentxiu,
    },
    {
      path: '/homeorders',
      name: 'homeorders',
      component:Homeorders,
      meta: {
        title:'服务订单'
      }
    },
    {
      path: '/homeorderdetail',
      name: 'homeorderdetail',
      component:Homeorderdetail,
      meta: {
        title:'预约成功'
      }
    },
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