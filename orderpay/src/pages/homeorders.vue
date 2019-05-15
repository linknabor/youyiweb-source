<template>
   <div class="home">
                <!--没有订单式时显示背景图 -->
        <div class="avatar-wrap rel ov" v-if="groupsNum == 0">
            <div class="filter-img avatar-wrap center-bg"></div>
        </div>
        <!-- 隐藏需要在线支付，但是没有生成订单的   -->
        <div v-for="(item,index) in orders"  >
            <div class="orders-item p15 divider" v-if="!(item.paymentType==1 && item.serviceOrderId==0)">
                <div @click="gotoDetail(item)">
                        <img  class="fl order-picture" :src="itemurl"  alt="">
                    <div class="ov pb10 fs14">服务类型：{{item.productName}}</div>   
                    <div class="ov pb10 fs14">
					    <span class="fl">服务费用：{{item.price}}</span> <span
						class="fr highlight" v-if="item.status==5">已取消</span> <span
						class="fr highlight" v-if="item.status==1">预约成功</span> <span
						class="fr highlight" v-if="item.status==0">未付款</span>
				    </div>
                </div>
                <div class="lite-divider" style="margin-top: 27px"></div>

                <div class="pt15 fs13 group-bottom" style="margin-top: 1px; height: 28px">
				<div class="fl">&nbsp; {{item.createDate | dateformat("YYYY-MM-DD HH:mm")}}</div>
				<!--unpaid-->
				<div v-if="item.status==0" class="fr">
					<div class="lite-btn fs13 fr" @click="orderPay(item)" v-if="item.payStatus==0">付款 </div>
                    <div class="btn-plain fr"
						style="height: 21px; line-height: 21px; margin-right: 10px;"
						@click="orderCancel(item)" v-if="item.payStatus==0">取消
                    </div>
				</div>
			</div>
            </div>
        </div>
       
   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
import { MessageBox } from 'mint-ui';
import dateformat from './filters/datafromat.js'

export default {
   data () {
       return {
           orders:[
            //    {
            //       productName:'家务员',
            //       price:100,
            //       status:0,
            //       createDate:1547089845378,
            //        payStatus:0,
            //        id:'2',
            //        productType:'123',
            //        url:'123',
            //        serviceOrderId:'1542'    
            //    },
            //    {
            //         productName:'月嫂',
            //       price:100,
            //       status:0,
            //       createDate:1547089845378,
            //        payStatus:0,
            //        id:'2',
            //        productType:'123',
            //        url:'123'
            //    },{
            //         productName:'月嫂',
            //       price:100,
            //       status:0,
            //       createDate:1547089845378,
            //        payStatus:0,
            //        id:'2',
            //        productType:'123',
            //        url:'123'
            //    }
           ],
           itemurl:"http://7xnqht.com2.z0.glb.qiniucdn.com/FpGoSGoSsTxUqnliPKFLLvWzU8eL",
           groupsNum:1,
           url:'',
       };
   },
   created() {
       vm=this;
       let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['chooseWXPay'],url);
   },
   mounted() {
    vm.home();
    
   
   },

   components: {},

   methods: {
          //图片
       home() {
            vm.receiveData.getData(vm,"yuyueOrders",'res',function(){
                if(vm.res.success) {
                       vm.orders=vm.res.result;
                     vm.groupsNum = vm.res.result.length;

                }else {
                     alert(vm.res.message== null ?'获取订单信息错误':vm.res.message) 
                }
            });
       },
       //跳转详情
       gotoDetail(order) {
            vm.$router.push({path:'/homeorderdetail',query:{orderId:order.id,productType:order.productType}})
       },
       //付款
       orderPay(order) {
           vm.receiveData.getData(vm,'requestPay/'+order.serviceOrderId,'n',function() {
                  if(vm.n.success) {
                      wx.chooseWXPay({
                        "timestamp":vm.n.result.timestamp,
                        "nonceStr":vm.n.result.nonceStr,
                        "package":vm.n.result.pkgStr,
                        "signType":vm.n.result.signType,
                        "paySign":vm.n.result.signature,
                            success: function (res) {
                                vm.notifyPaySuccess(order);
                              order.status=1;
                              order.payStatus=1;
                            }
                        });
                    }else {
                        alert(vm.n.message==null?"支付请求失败，请稍后重试！":vm.n.message)  
                    }
            })
       },
       //通知
        notifyPaySuccess(order) {
             vm.receiveData.getData(vm,'/notifyPayed/'+order.id,'n',function() {})
        },
       //取消
        orderCancel(order) {
                MessageBox.confirm('确定要取消该服务？').then(action => {
                    if(action == 'confirm') {
                        vm.receiveData.getData(vm,"/cancelOrder/"+order.serviceOrderId,'n',function() {
                            if(vm.n.success) {
                                order.status=5;
                                order.payStatus=2;
                                alert("服务单已取消");
                            }else {
                               alert(vm.n.message==null?"支付取消失败，请稍后重试！":vm.n.message)  
                            }
                        })
                  }
              }).catch(err => {
                  if(err == 'cancel') {

                  }
              })
        },
       

   },

   computed: {
 
   },
    filters:{
        dateformat
    } 
}
</script>

<style  scoped>
.home {
    font-family: "微软雅黑";
    background: #ffffff;
}
/* 没有数据 */
.avatar-wrap {
    height: 10rem;
    text-align: center;
}
.rel {
    position: relative;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
.center-bg {
    background-image: url(../assets/images/bg_orders.jpg) ;
    background-size: cover;
    background-position: center;
}
/* 订单 */
.divider {
	border-bottom: 10px solid #f7f7f2;
}
.p15 {padding: 15px;}
.order-picture {
    width: 75px;
    height: 75px;
    margin-right: 15px;
    border: 1px solid #d4cfc8;
}
.order-pictures {
 width: 75px;
    height: 75px;
    margin-right: 15px;
    /* border: 1px solid #d4cfc8; */
}
.pb10 {padding-bottom: 10px;}
.fs14 {font-size:14px;}
.highlight {
	color: #ff8a00;
}
.lite-divider {
 	border-bottom: 1px solid #d4cfc8;
 	padding-left: 15px;
}
.pt15 { padding-top: 10px;}
.fs13 { font-size:13px;}

.lite-btn  {
    display: inline-block;
	padding: 0 15px;
	color: #fff;
	font-size: 12px;
	height: 23px;
	line-height: 23px;
	background-color: #ff8a00;
	border-radius: 3px;
}
.btn-plain {
    display: inline-block;
    /* padding: 0 20px;
    height: 27px;
    line-height: 27px;*/
    color: #3b3937; 
    border-radius: 3px;
    border: 1px solid #bfbfbf;
}
 .btn-plain {
    margin-right: 10px;
    padding: 0 13px;
    color: #888;
}
</style>