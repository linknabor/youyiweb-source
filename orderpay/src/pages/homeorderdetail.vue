<template>
   <div>
        <div class="adorder">
            <div class="order-number fs13 plr15">订单编号&nbsp;{{order.orderNo}}</div>
                <div class="p15">
                    <img class="fl order-picture" :src="orderurl" />
                    <div class="ov pb15 fs14">服务类型：{{order.productName}}</div>
                    <div class="ov pb15 fs14">服务费用：{{order.price}}</div>
                </div>
        
        <div class="section-title">订单信息</div>
        <div class="bottom-info divider">
            <div class="item">
                <label>服务地址</label><span class="value">{{order.address}}</span>
            </div>
            <div class="item">
                <label>其他需求</label><span class="value">{{order.memo}}</span>
            </div>
            <div class="item">
                <label>手机号</label><span class="value">{{order.tel}}</span>
            </div>
      </div>
        <div class="section-title">预约状态</div>
        <div class="bottom-info divider">
            <div class="item">
                <span class="highlight" v-if="order.status==1">预约成功</span>
                <span class="highlight" v-if="order.status==0">等待付款</span>
                <span class="highlight" v-if="order.status==5">预约取消</span>
            </div>
      </div>
        <div class="section-title">支付方式</div>
        <div class="bottom-info divider">
                <div class="item">
                    <span class="highlight" v-if="order.paymentType==0">线下支付</span>
                    <span class="highlight" v-if="order.paymentType==1">微信支付</span>
                </div>
        </div>
        <div class="section-title" v-if="order.paymentType==1">支付状态</div>
      <div class="bottom-info divider" v-if="order.paymentType==1">
            <div class="item">
                <span class="highlight" v-if="order.payStatus==0">未支付</span>
                <span class="highlight" v-if="order.payStatus==1">支付成功</span>
                <span class="highlight" v-if="order.payStatus==2">未支付</span>
                <span class="highlight" v-if="order.payStatus==3">退款中</span>
                <span class="highlight" v-if="order.payStatus==4">已退款</span>
            </div>
      </div>
        <div class="p15 order-item divider" v-if="order.payStatus==0 && order.paymentType==1">
                <div class="section-title" style="padding-left: 0px;">订单状态</div>
                <div class="pt15 fs13" style="height:28px;margin-top: 8px;">
                    <div class="lite-btn fs13 fr" @click="orderPay(order)">付款</div>
                    <div class="btn-plain fr" style="height:23px;line-height: 23px;" @click="orderCancel(order)">取消</div>
                </div>
        </div>

        <div v-if="order.payStatus==1">
            <!-- fasuper-->
            <div v-if="productType==1">
                <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
                    <div class="item">
                        <label>预约时间</label><span class="value">{{orderaddinfo.expectedTime}}</span>
                    </div>
                    <div class="item">
                        <label>车辆信息</label><span class="value">{{orderaddinfo.brandName}}&nbsp;{{orderaddinfo.modelName}}&nbsp;{{orderaddinfo.colour}}&nbsp;{{orderaddinfo.modelName}}&nbsp;{{orderaddinfo.plateProvince}}{{orderaddinfo.plateNumber}}</span>
                    </div>
                    <div class="item">
                        <label>服务状态</label>
                        <span class="value" v-if="orderaddinfo.serviceStatus==0">未服务</span>
                        <span class="value" v-if="orderaddinfo.serviceStatus==1">已服务</span>
                    </div>
                </div>
            </div>
            <!-- fasuper-->
            <div v-if="productType==2">
                    <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
                        <div class="item">
                            <label>配送时间</label><span class="value">{{orderaddinfo.expectedTime}}</span>
                        </div>
                        <div class="item">
                            <label>服务状态</label>
                            <span class="value" v-if="orderaddinfo.serviceStatus==0">未配送</span>
                            <span class="value" v-if="orderaddinfo.serviceStatus==1">已配送</span>
                        </div>
                        <div class="item" v-if="orderaddinfo.serviceStatus==1">
                            <div style="margin-bottom:10px;">
                               <label>物流公司</label><span class="value">{{orderaddinfo.logisticName}}</span>
                            </div>
                            <div style="margin-bottom:10px;">
                              <label>物流单号</label><span class="value">{{orderaddinfo.logisticNo}}</span>
                            </div>
                            <div class="lite-btn fs13 fr" style="margin-right: 10px;" v-if="order.status==5" @click="checkLogisics(orderaddinfo)">查看物流</div>
                        </div>
                    </div>
        </div>
            <div v-if="productType==10">
                    <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
                        <div class="item">
                            <label>配送时间</label><span class="value">{{orderaddinfo.expectedTime}}</span>
                        </div>
                        <div class="item">
                            <label>服务状态</label>
                            <span class="value" v-if="orderaddinfo.serviceStatus==0">未配送</span>
                            <span class="value" v-if="orderaddinfo.serviceStatus==1">已配送</span>
                        </div>
                        <div class="item" v-if="orderaddinfo.serviceStatus==1">
                            <div style="margin-bottom:10px;">
                               <label>物流公司</label><span class="value">{{orderaddinfo.logisticName}}</span>
                            </div>
                            <div style="margin-bottom:10px;">
                              <label>物流单号</label><span class="value">{{orderaddinfo.logisticNo}}</span>
                            </div>
                            <div class="lite-btn fs13 fr" style="margin-right: 10px;" v-if="order.status==5" @click="checkLogisics(orderaddinfo)">查看物流</div>
                        </div>
                    </div>
        </div>
            <div v-if="productType==12">
                    <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
                        <div class="item">
                            <label>配送时间</label><span class="value">{{orderaddinfo.expectedTime}}</span>
                        </div>
                        <div class="item">
                            <label>服务状态</label>
                            <span class="value" v-if="orderaddinfo.serviceStatus==0">未配送</span>
                            <span class="value" v-if="orderaddinfo.serviceStatus==1">已配送</span>
                        </div>
                        <div class="item" v-if="orderaddinfo.serviceStatus==1">
                            <div style="margin-bottom:10px;">
                               <label>物流公司</label><span class="value">{{orderaddinfo.logisticName}}</span>
                            </div>
                            <div style="margin-bottom:10px;">
                              <label>物流单号</label><span class="value">{{orderaddinfo.logisticNo}}</span>
                            </div>
                            <div class="lite-btn fs13 fr" style="margin-right: 10px;" v-if="order.status==5" @click="checkLogisics(orderaddinfo)">查看物流</div>
                        </div>
                    </div>
        </div>
             <div v-if="productType==11">
                    <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
                        <div class="item">
                            <label>配送时间</label><span class="value">{{orderaddinfo.expectedTime}}</span>
                        </div>
                        <div class="item">
                            <label>服务状态</label>
                            <span class="value" v-if="orderaddinfo.serviceStatus==0">未配送</span>
                            <span class="value" v-if="orderaddinfo.serviceStatus==1">已配送</span>
                        </div>
                    </div>
        </div>
            <!--胡雅口腔-->
            <div v-if="productType==3">
                <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
                    <div class="item">
                        <label>门诊部名称</label><span class="value">{{orderaddinfo.clinicName}}</span>
                    </div>
                    <div class="item">        
                        <label>门诊部地址</label><span class="value">{{orderaddinfo.clinicAddr}}</span>
                    </div>
                    <div class="item">
                        <label>门诊部电话</label><span class="value">{{orderaddinfo.clinicTel}}</span>
                    </div>
                    <div class="item">
                        <label>顾客名称</label><span class="value">{{orderaddinfo.customerName}}</span>
                    </div>
                    <div class="item">
                        <label>顾客电话</label><span class="value">{{orderaddinfo.customerTel}}</span>
                    </div>
                    <div class="item">
                        <label>服务状态</label>
                        <span class="value" v-if="orderaddinfo.serviceStatus==0">未服务</span>
                        <span class="value" v-if="orderaddinfo.serviceStatus==1">已服务</span>
                    </div>
          </div>
        </div>
            <!--白富美-->
            <div v-if="productType==4">
                    <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
                        <div class="item">
                            <label>预约时间段</label>
                            <span class="value" v-if="orderaddinfo.timeFrame==0">上午</span>
                            <span class="value" v-if="orderaddinfo.timeFrame==1">下午</span>
                            <span class="value" v-if="orderaddinfo.timeFrame==3">晚上</span>
                        </div>
                        <div class="item">
                            <label>服务状态</label>
                            <span class="value" v-if="orderaddinfo.serviceStatus==0">未服务</span>
                            <span class="value" v-if="orderaddinfo.serviceStatus==1">已服务</span>
                        </div>
                    </div>
        </div>
        </div>   

        <!-- ayilaile -->
        <div v-if="productType==5">
            <div class="bottom-info divider">
                <div class="item">
                    <label>用工时间</label><span class="value">{{order.workTime}}</span>
                </div>
                <div class="item" v-if="!(order.strWorkFrequency==null)">
                    <label>用工频次</label><span class="value">{{order.strWorkFrequency}}</span>
                </div>
            </div>
        </div>
        <div v-if="productType==7">
            <div class="bottom-info divider">
                <div class="item">
                    <label>颜色</label><span class="value">{{order.colour}}</span>
                </div>
            </div>
      </div>
        </div>
    </div> 
</template>

<script>
let vm;
import { MessageBox } from 'mint-ui';
import wx from 'weixin-js-sdk';

export default {
   data () {
       return {
           orderAddInfos:[
        //        {
        //        expectedTime:'2019-1-3',
        //        brandName:'五菱宏光国产神车',
        //        modelName:'XTT',
        //        colour:'紫色',
        //        plateProvince:'湖北',
        //        plateNumber:'911',
        //        serviceStatus:'1',
        //        logisticName:'asd123',
        //        logisticNo:'321dsa',
        //        clinicName:'皮家洼诊所',
        //        clinicAddr:'皮家洼',
        //        clinicTel:'120',
        //        customerName:'123',
        //        customerTel:'12345',
        //        timeFrame:'0',
              
        //    }
        ],
           order:{
                //  orderNo:'12345455',
                //  productName:'天空套',
                //  price:'122',
                //  address:'皮家洼',
                //  memo:'111',
                //  tel:'654321',
                //  status:5,
                //  paymentType:1,
                //  payStatus:1,
                //  workTime:'333',
                //  strWorkFrequency:'111',
                //  colour:'紫色',
               },
            orderurl:"http://7xnqht.com2.z0.glb.qiniucdn.com/FpGoSGoSsTxUqnliPKFLLvWzU8eL",
            orderId:this.$route.query.orderId,   
            productType:this.$route.query.productType || 0,//0:阿姨来了；1：尚匠洗车；2；flowerPlus

       };
   },
   created() {
       vm=this;
       let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['chooseWXPay'],url);
   },
   mounted() {
        vm.query();
   },

   components: {},

   methods: {

       query() {
            vm.receiveData.getData(vm,"yuyueOrders/"+vm.orderId,'res',function(){
                if(vm.res.success) {
                       vm.order =vm.res.result;
                       
                    if(vm.order == null || vm.order.id == null){
                         MessageBox.confirm('获取订单补充信息信息失败，返回服务首页！').then(action => {
                             location.href=vm.config.orderpay_homeorderdetail.url1;
                         }).catch(err => {
                            if(err == 'cancel') {

                            }
                        })   
                    }else{
                        queryAddInfo();
                    }
                }else {
                    MessageBox.confirm('获取订单补充信息信息失败，返回服务首页！').then(action => {
                             location.href=vm.config.orderpay_homeorderdetail.url1;
                         }).catch(err => {
                            if(err == 'cancel') {

                            }
                        })
                }
            });
       },
       queryAddInfo() {
           vm.receiveData.getData(vm,"yuyueOrders/"+vm.productType+"/"+vm.orderId,'res',function(){
                if(vm.res.success) {
                     vm.orderAddInfos = vm.res.result;
                    if(vm.orderAddInfos == null){
                           MessageBox.confirm('获取订单补充信息信息失败，返回服务首页！').then(action => {
                             location.href=vm.config.orderpay_homeorderdetail.url1;
                         }).catch(err => {
                            if(err == 'cancel') {

                            }
                        })
                    }    
                }else {
                   MessageBox.confirm('获取订单补充信息信息失败，返回服务首页！').then(action => {
                             location.href=vm.config.orderpay_homeorderdetail.url1;
                         }).catch(err => {
                            if(err == 'cancel') {

                            }
                        })
                }
           });
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
       //查看物流
       checkLogisics(order) {
            var  logisticName = escape(order.logisticName);
            vm.$router.push({path:'/logistice',query:{com:logisticName, nu:order.logisticNo}})
       }
   },

   computed: {},
}
</script>

<style  scoped>
.adorder {
    width:100%;
    height:100%;
    background-color:#fff;
}
/* 头部 */
.fs13 {
    font-size: 13px;
}
.plr15 {
    padding: 0 15px;
}
.order-number {
    display: inline-block;
    margin-top: 15px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #d4cfc8;
    color: #a6937c;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.p15 {
    padding: 15px;
}
.order-picture {
    width: 75px;
    height: 75px;
    margin-right: 15px;
    border: 1px solid #d4cfc8;
}
.fs14 {
    font-size: 14px;
}
.pb15 {
    padding-bottom: 15px;
}
.ov {
    overflow: hidden;
    /* padding: 1px; */
}
.section-title {
    display: block;
    font-size: 13px;
    color: #a6937c;;
    padding-top: 15px;
    padding-bottom: 7px;
    border-bottom: 1px solid #d4cfc8;
}
.divider {
    border-bottom: 10px solid #f7f7f2;
}
.bottom-info {
      padding: 20px 15px 5px 15px;
}
.item {
      overflow: hidden;
      margin-bottom: 15px;
      font-size: 13px;
      color: #666;
}
label {
    display: inline-block;
    width: 75px;
}
label:after {
    content: " :";
}
.value {
    float: right;
    display: block;
    margin-left: 15px;
    color: #a6937c;
    width: 200px;
}
.highlight {
    color: #ff8a00;
}
.order-item .btn-plain, .order-item .lite-btn {
    height: 23px;
    line-height: 23px;
}
.lite-btn {
  display: inline-block;
  padding: 0 15px;
  color: #fff;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  background-color: #ff8a00;
    border-radius: 3px;
    margin-left: 10px;
}
.pt15 {padding-top:15px}
.btn-plain {
  display: inline-block;
  padding: 0 15px;
  height: 27px;
  line-height: 27px;
  color: #3b3937;
  border-radius: 3px;
  border: 1px solid #bfbfbf;
}
</style>