<template>
   <div class="ind"> 
        <div class="avatar-wrap rel ov">
            <div class=" menu-person-link-white" @click="gotoEdit">
                <img class="avatar center-bg" :src="user.headimgurl" style="border: 2px solid white; float: left;">
                <span class="avatar-info" style="float: left;overflow: hidden;width: 60%;">
                <div class="name fs16">{{user.name}}</div>
                <div class="fs14">常住小区&nbsp;{{user.city}}&nbsp;{{user.xiaoqu}} </div>
                </span>
            </div> 
        </div>
        <div id="point-list" class="div_bottom clearfix">
            <div class="point-item-wrap" >
                <div class="point-item">
                    <div class="point-info fs16">{{user.zhima}}</div>
                    <div class="point-title fs14">我的芝麻</div>
                </div>
            </div>
            <div class="point-item-wrap" >
                <div class="point-item">
                    <div class="point-info fs16">{{user.lvdou}}</div>
                    <div class="point-title fs14">我的绿豆</div>
                </div>
            </div>
            <div class="point-item-wrap">
                <div class="point-item" @click="coupons">
                    <div class="point-info fs16">{{user.couponCount}}</div>
                    <div class="point-title fs14">我的现金劵</div>
                </div>
            </div>
            
        </div>
        <div class="tab">
            <a :href="this.config.person_index.url1+'?#/onsaleorders'">
                <div class="inner">
                    <div class="div-img">
                        <img src="../assets/images/icon_person_tehui.png" alt="">
                    </div> 
                    <p class="tab-text">商品订单</p>
                </div>
            </a>
            <a :href="this.config.person_index.url1+'?#/grouporders'">
                <div class="inner">
                    <div class="div-img">
                        <img src="../assets/images/icon_person_tuangou.png" alt="">
                    </div> 
                    <p class="tab-text">团购订单</p>
                </div>
            </a>
            <a :href="this.config.person_index.url1+'?#/homeorders'">
                <div class="inner">
                    <div class="div-img">
                        <img src="../assets/images/icon_person_yuyue.png" alt="">
                    </div> 
                    <p class="tab-text">服务订单</p>
                </div>
            </a>
        </div>
        <div style="width: 100%;height: 10px;background: #eee;"></div>
        <div class="info-wrap" style="overflow:hidden; clear: both;">
            <a :href="this.config.person_index.url2+'?#/myrepair'" class="input-wrap menu-person-link lite-divider">
                <span class="input-info lf30 fs16">我的维修单</span>
                <span class="fr fs14 left_color">查看维修单&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </a>
            <router-link to='notices'>
                <div class="input-wrap menu-person-link lite-divider">
                        <span class="input-info lf30 fs16">我的消息</span>
                    <span class="fr fs14 left_color">查看消息&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    
                </div>
            </router-link>
            <router-link to='mypublish'>
                <div class="input-wrap menu-person-link lite-divider">
                    <span class="input-info lf30 fs16">我的发布</span>
                    <span class="fr fs14 left_color">查看发布&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
            </router-link>

        </div>
        <div class="info-wrap">
            <a :href="this.config.person_index.url3" class="input-wrap menu-person-link lite-divider ">
                <span class="input-info lf30 fs16">我是业主</span>
                <span class="fr fs14 left_color">绑定房屋&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </a>
            <router-link to="addresses">
                <div @click="gotoAddress" class="input-wrap menu-person-link lite-divider ">
                    <span class="input-info lf30 fs16">常用地址</span>
                    <span class="fr fs14 left_color">收货地址&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div> 
            </router-link>
                    
       </div>
        <div class="info-wrap" style="border-bottom: none;">
            <a :href="'tel:'+user.officeTel" v-show="user.officeTel!==null && user.officeTel!==''"  class="input-wrap menu-person-link lite-divider special-link ">
                <span class="input-info lf30 fs16">小区电话</span>
                <span class="fr fs14 left_color">{{user.officeTel}}</span>
            </a>
            <a href="tel:021-50876295" class="input-wrap menu-person-link lite-divider special-link ">
                <span class="input-info lf30 fs16">客服电话</span>
                <span class="fr fs14 left_color">021-50876295</span>
            </a>
            
        </div>
        <div class="bottom-info divider" style="text-align: center; display: block;">
            <div class="divider highlight" style="text-align: center;width:100%;font-size:16px">长按关注友宜物业，尊享更多服务和商品</div>
            <img style="width: 200px;" src="../assets/images/qrcode_youyi.jpg">
            <!-- <img style="width: 200px;" src="http://7xkdq7.com1.z0.glb.clouddn.com/hexieshequ.jpg"> -->
       </div>
        <foot class="contetn"></foot>
   </div>
</template>

<script>
let vm;
import foot from './footer.vue'
import wx from 'weixin-js-sdk';
export default {
    data () {
        return {
            user: {
                headimgurl:"",/**默认头像*/
                name:"",
                level:"",
                zhima:"0",
                lvdou:"0",
                couponCount:0,
                officeTel:0
            },
        };
    },
    created() {
        vm=this;
        // 请求接口获取 后台返回的 微信配置项
        let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['onMenuShareTimeline','onMenuShareAppMessage'],url); 
    },
    mounted() {

        // this.initSession4Test();
        this.User();
        this.updateCouponStatus();
    },
    components: {
        foot
    },
    methods: {
        //模仿线上用户信息
            // 105/747/384
        initSession4Test(){
            let url ='/initSession4Test/105';
                vm.receiveData.getData(vm,url,'Data',function(){
                    
            });
        },
        User() {
            //获取页面数据
            let n = "GET",
                a = "userInfo",
                i = null,
                d=function() {
               
                },
                e = function(n){
                        vm.user = n.result;
                        vm.user.headimgurl= ""!=n.result.name|| n.result?n.result.headimgurl:Config.C("user_info").avatar;
                        vm.user.name= "" != n.result.name ? n.result.name:Config.C("user_info").nickname;
                        vm.user.level= Config.C("user_level")[n.result.level];
                },
                r = function(){
                    vm.user={};
                    // vm.user.headimgurl =Config.C("user_info").avatar,
                    // vm.user.name = Config.C("user_info").nickname,
                    // vm.user.level = Config.C("user_info").levelname
                };
            this.common.invokeApi(n,a,i,d,e,r);
            
        },
        //更新红包状态
        updateCouponStatus(){
	
            var n = "GET",
                a = "updateCouponStatus",
                i = null,
                e = function(n) {
                    console.log(JSON.stringify(n));
                },
                r = function() {

                };
            vm.common.invokeApi(n, a, i, null, e, r)
        },
        //点击头像
        gotoEdit() {
            if(vm.common.hasRegister()) {
                this.$router.push({path:'/bindphone'})
            }else {
                this.$router.push({path:'/register'})
            }
        },
        //现金券
        coupons() {
            vm.$router.push({path:'/coupons'})
        },
        gotoAddress() {
            if(vm.common.hasRegister()){
                 vm.$router.push({path:'/addresses'})
        	} else {
                this.$router.push({path:'/register'})
        	}
        }
    },
    computed: {},
}
</script>

<style  scoped>
.contetn {
  padding-bottom:72px;
}
.tab{height:90px;width: 100%; }
.inner{width:33.3%;float: left;height: 100%;}
.div-img{width:34px;height: 34px;margin:10px auto 15px; }
.div-img img{width: 100%;height: 100%;}
.tab-text{text-align: center;color: #3b3937;font-size: 14px;}
.ind {
    background-color:#fffff8;
}
.avatar-wrap {
    height: 1.74rem;
    background-color: #FF8A00;
}
.rel {
    position: relative;
}
.ov {
    overflow: hidden;
    /*padding: 1px;*/
}
/* 头部 */
.menu-person-link-white {
    display: block;
    background: url(../assets/images/icon_person_arrow.png) no-repeat;
    background-size: 7px 14px;
    height: 1.5rem;
    margin-right: 10px;
    background-position: right 36px;
}
.avatar-wrap span {
    display: inline-block;
    vertical-align: middle;
}
.avatar {
    margin: 15px;
}
.center-bg {
    background-size: cover;
    background-position: center;
}
.avatar {
    height: 60px;
    width: 60px;
    /* margin: 15px 20px; */
    border-radius: 50%;
    overflow: hidden;
}
.avatar-info {
    color: #fff;
}
.name {
    margin-top: 25px;
    margin-bottom: 10px;
}
.fs16 {
    font-size: 16px;
}
.fs14 {
    font-size: 14px;
}
#point-list {
    width: 100%;
    height: 80px;
    background: #ff8a00;
    color: white;
}
.div_bottom {
    /* position: absolute; */
    /* bottom: 0; */
}
.left_color {
    color: #999999;
}
#point-list .point-item-wrap {
    margin-top: 0.2rem;
    width: 33%;
    float: left;
    position: relative;
}
#point-list .point-item-wrap .point-item {
    border-radius: 2px;
    -webkit-border-radius: 2px;
    /* height: 40px; */
    margin: 6px 4px 4px 0;
    display: block;
}
#point-list .point-item-wrap .point-item .point-info {
    /* color: white; */
    text-align: center;
}
#point-list .point-item-wrap .point-item .point-title {
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
    /* color: white; */
}
/* 全部订单 */
.info-wrap {
    padding-left: 8px;
    padding-right: 10px;
    color: #3b3937;
    padding-bottom: 0;
    border-bottom: 10px solid #eeeeee;
}
.info-wrap {
    padding:0  4px;
    /* border-bottom: 5px solid #f9f9e9; */
    font-size: 12px;
    /* color: #3b3937; */
}
.section-title, .lite-divider {
    border-bottom: 1px solid #f2f2f2;
}
#module-list{
    width:100%
}
#module-list .module-item-wrap{
    margin-top: 1rem;
    width:33%;
    float:left;
    border-bottom: 10px solid #eeeeee;
    position:relative
}
#module-list .module-item-wrap .module-item {
    border-radius:2px;
    -webkit-border-radius:2px;
    height:7rem;
    margin:0 4px 4px 0;
    display:block;
}
#module-list .module-item-wrap .module-item .module-info {
    font-size:20px;
    /*margin-left: 9rem;*/
    margin-right: 5rem;
    margin-top: 16px;
    color: #dfdbd4
}

#module-list .module-item-wrap .module-item  {
    font-size:16px;
    margin-top: 10px;
    color: #3b3937
}

.module-title{
    text-align: center;
    margin-top: 10px;
    color: #3b3937  
}

#module-list .module-item-wrap .module-item  {
    margin-top:10px;
    display:block;
    width:100%;
    height:6rem;
    background-position:50% 0;
    background-size:42px;
    background-repeat:no-repeat
}
.module-logo{
    margin-top:-5px;
    display:block;
    height:34px;
    background-position:50% 0;
    background-size:34px;
    background-repeat:no-repeat
}

.menu-person-link {
    padding-right: 1rem;
    color: #3b3937;
}
.input-wrap {
    overflow: hidden;
    line-height: 1rem;
}
.section-title, .lite-divider {
    /* border-bottom: 1px solid #d4cfc8; */
    padding-left: 15px;
}
.menu-person-link {
    display: block;
    background: url(../assets/images/icon_arrow.png) no-repeat;
    background-size: 7px 14px;
    background-position: right center;
    padding-right: 15px;
}
.bottom-info {
    padding: 20px 15px 5px 15px;
}
.divider {
    border-bottom: 10px solid #f7f7f2;
}
.highlight {
    color: #ff8a00;
}
.divider {
    border-bottom: 10px solid #f7f7f2;
}
.special-link {
    padding-right: 0;
    background: none;
}
</style>