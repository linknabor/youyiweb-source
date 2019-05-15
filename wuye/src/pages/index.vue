<style scoped>
.wuye{font-family: PingFangSC-Regular;width: 100%;height:100%;
      background-color:#e5e2dd;font-size: 14px;text-align: center}
a{color: #000;opacity: 0.7;}	
.address{padding: 14px;background-color: #f7f7f9;font-family: "微软雅黑";
    font-size: 14px;color: #000000;text-align: center;}
.city{float: left;}
.xiaoqu{padding-right: 32px;font-size:16px;font-weight: bold;}
.section_divider{border-bottom: 10px solid #e5e2dd;}
.jiugongge{width: 100%;height: 208px;background-color: white;}
.jgg_li{float: left;width:calc((100% / 3) - 4px);height: 104px; text-align: center;letter-spacing: 1.31px;font-size: 16px;font-family:PingFangSC-Regular;
	border: 1px solid #efefef}
.jgg_li:nth-child(1){border-left:none;}
.jgg_li:nth-child(3){border-right: none;}
.jgg_li:nth-child(4){border-left: none;}
.jgg_li:nth-child(6){border-right: none;}
.jgg_img{margin: 15px auto 3px;}
.jgg_img img{width: 54px;}
.jgg-span{color: black;}

.inner{width: 100%;height: 350px;overflow: hidden; background-color: white;}
.inner1{width: 80%;height: 20px; margin:15px auto 15px;line-height: 20px;}
.spanl{font-size: 18px;letter-spacing: 1.38px;}
.spanr{font-size: 12px;letter-spacing: 1.12px;opacity: 0.5;color: #171717;padding-top: 3px;}
.title_li{width: 86%;height: 100px;overflow: hidden;margin: 0 auto;position: relative;}
/* .title_li div{float: left;} */
.title_img{width: 30%;height:86px;position: absolute;margin-left: 0;margin-top: 7px}
.title_img img{width: 100%;height:100%;margin:auto;}
.title_news{font-size: 14px; width: 70%;height: 85px; text-align: left;position: absolute;margin-left: 30%;margin-top:7px;}
.title_news span{padding: 0 20px;color: black;}
.xiaxian{height:1px;width:100%;background-color:#ccc; margin-top: 7px;}
p{padding: 0 20px;color: #565252;letter-spacing: 1.14px;overflow: hidden;
    display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
    overflow: hidden;height: 34px;line-height: 17px;}
h6{text-align: right; padding: 0 15px;font-size: 11px;color:rgba(0,0,0,0.63);letter-spacing: 0.9px;}
</style>
<template>
	<div  class="wuye">
		<div class="address" v-show="user.xiaoquName">
	        <span class="city" >{{user.city}}</span>
	        <span class="xiaoqu">{{user.xiaoquName}}</span>
	    </div>
	    <div class="section_divider"></div>
	    <div class="jiugongge">
            <ul>
                <li class="jgg_li" >
                    <router-link :to="{path:'/pay',query:{id:'a'}}">
                        <div class="jgg_img">
                            <img src="../assets/images/icon_shequ_wuyejiaofei_03.png" alt="">
                        </div>
                        <span class="jgg-span">物业缴费</span>
                    </router-link>
                </li>
                <li class="jgg_li" >    
                    <router-link :to="{path:'/pay',query:{id:'c'}}">
                        <div class="jgg_img">
                            <img src="../assets/images/tingche@2x.png" alt="">
                        </div>
                        <span class="jgg-span">停车缴费</span>
                    </router-link>
                </li>
                <li class="jgg_li" >
                    <router-link to="/payEnquiry">
                        <div class="jgg_img">
                            <img src="../assets/images/icon_shequ_jiaofeichaxun_03.png" alt="">
                        </div>
                        <span class="jgg-span">缴费查询</span>
                    </router-link>
                </li>
                <li class="jgg_li" >
                    <router-link to="/myHouse">
                        <div class="jgg_img">
                            <img src="../assets/images/icon_shequ_woshiyezhu_03.png" alt="">
                        </div>
                        <span class="jgg-span">我是业主</span>
                    </router-link>
                </li>
                <li class="jgg_li" >
                    <router-link :to="{path:'/suggest',query:{category:'9'}}">
                        <div class="jgg_img">
                            <img src="../assets/images/yijian@2x.png" alt="">
                        </div>
                        <span class="jgg-span">业主意见</span>
                    </router-link>
                </li>
                <li class="jgg_li" >
                    <a :href="this.config.wuye_index.url1">
                        <div class="jgg_img">
                            <img src="../assets/images/weixiu@2x.png" alt="">
                        </div>
                        <span class="jgg-span">便民维修</span>
                    </a>    
                	<!-- </router-link> -->
                </li>
            </ul>
        </div>
        <div class="section_divider"></div> 
        <div class="inner">
          <div class="inner1">
            <span class="spanl fl"><strong>社区资讯</strong></span>
            <span class="spanr fr">更多&gt;</span>
          </div>
          <ul class="title_ul"> 
            <li class="title_li" v-for="(news,index) in messageData" :key="index">
              <div v-on:click="href(news.id)">
                <div class="title_img"> 
                  <img v-bind:src="news.smallImage" alt="">
                </div>
                <div class="title_news">
                  <p>{{news.summary}}</p>
                  <!-- <span>…</span> -->
                  <br>
                  
                  <!-- <h6 style="margin-top:10px;">生活百科</h6> -->
                </div>
                <div class="xiaxian"></div>
              </div>                        
            </li>
          </ul>
        </div>
		<div style="width: 100%;height: 90px;background: white"></div>
		<foot></foot>
	</div>
</template>
<script>
    let vm;
	import foot from '../components/footer.vue'
	export default {
		components:{
			foot
		},
		data(){
			return {
				user: {
                    city:"上海市",
                    xiaoquName:"友宜物业"
                },
				selected: '1',
				items1:'',
				messageData:''
			}
		},
		beforeCreate(){//刷新页面
			
		},
		created(){
            vm = this;
		},
		watch:{
			
		},
		mounted(){
			// this.initSession4Test();
            this.initUserInfo();
		},
		methods:{
			//模仿线上用户信息
			//105/747/384
		  	initSession4Test(){
		  		let _this = this;
				let url = '/initSession4Test/105';
				_this.receiveData.getData(_this,url,'Data',function(){
					_this.message();
				});
			},
            initUserInfo(){
                let n = "GET",
                    a = "userInfo",
                    i = null,
                    e = function(n) {
                        // console.log(JSON.stringify(n));
                        vm.user = n.result;
                        vm.user.city = n.result.city;
                        vm.user.xiaoquName=n.result.xiaoquName;
                        vm.message();
                    },
                    r = function() { 

                    };
                this.common.invokeApi(n, a, i, null, e, r);
            },
			message(){
				// let _this = this;
				let page = 0;
				let url = 'messages/'+page;
				vm.receiveData.getData(vm,url,'res',function(){
					console.log(vm.res);
					vm.messageData = vm.res.result;
				})
			},
			href(mid){
	          if(mid==15){
	               window.location.href="http://mp.weixin.qq.com/s?__biz=MzA3Njk4ODgwMA==&mid=406333448&idx=1&sn=9b318dec9225d8fc1ce28b7a52007773#rd";
	             }else if(mid==16){
	               window.location.href="http://mp.weixin.qq.com/s?__biz=MzA3Njk4ODgwMA==&mid=407927486&idx=1&sn=c1f51214b1947b1b222af9a18e5593d6#rd";
	             }else if(mid==17){
	               window.location.href="http://mp.weixin.qq.com/s?__biz=MzA3Njk4ODgwMA==&mid=410063784&idx=1&sn=558b520c28f984ad7c0ed2a6ef692faf#rd";
	               }else{
                    this.$router.push({
                        path:'/news',
                        query:{
                            messageId:mid
                        }
                    })
	             }
	        },

		}
	}
</script>