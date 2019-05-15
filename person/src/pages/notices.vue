<template>
   <div class="not">
	        <!-- load -->
	        <div class="load6" v-show="shows" id="LoadingBar">
	            <div class="bounce1"></div>
	            <div class="bounce2"></div>
	            <div class="bounce3"></div>
	        </div>

	        <div id="fade" class="black_overlay" v-show="shows">
	        </div>

	        <div id="phoneErro"></div>

	        <!-- <div id="phoneAjax" class="hidden">
	            <img src="http://7xlem4.com2.z0.glb.qiniucdn.com/backed/images/load2.gif" style="width:40px;height40px;vertical-align: middle;">
	        </div> -->
	    <!-- load -->
	    <div id="indexDiv">
	            <div class="mlr15 ptb15 item" v-for="notice in notices" @click="gotoDetail(notice)">
	                <div style="height:35px">
	                    <div class="fl fs15 notice-type">{{notice.noticeTypeStr}}</div>
	                    <div class="fl unread mlr10 plr10" v-show="!notice.readed">未读</div>
	                    <span class="fr fs12" style="color:#888888"><i class="icon time-icon"></i>{{notice.timeStr}}</span>
	                </div>
	                <div>
	                    <div class="menu-link-arrow fs14 notice-content">{{notice.title}}</div>
	                </div>
	            </div>
	    </div>
          
   </div>
</template>

<script>
var vm;
export default {
   data () {
       return {
           shows:true,
           notices:[],

       };
   },
   created() {
       vm=this;
   },
   mounted() {
       vm.query();
   },

   methods: {
       query() {
           var page=1;
           vm.receiveData.getData(vm,"notices/"+page,'res',function(){
                    if(vm.res.success) {
                        vm.notices=vm.res.result;
                        page++;
                        vm.shows=false;
                    }else {
                        vm.notices=[];
                        vm.shows=false;
                    }
                               
                },function() {
                    vm.notices=[];
                    vm.shows=false;
                });
       },
       gotoDetail(notice) {
           vm.read(notice);
             	if(notice.noticeType==1){
        		//订单
                    location.href=vm.config.index.url1+"?#/orderdetail?orderId="+notice.bizId;
                } else if(notice.noticeType==2){
                    //评论
                } else if(notice.noticeType==3){
                    //团购
                } else if(notice.noticeType==4){
                    //系统推送
                } else if(notice.noticeType==5){
                    //预约
                }
       },
       read(notice) {
           vm.receiveData.getData(vm,"notices/read/"+notice.id,'res',function(){
                                
            },function() {
             
            });
            notice.readed=true;
       }
   },

   computed: {},
}
</script>

<style  scoped>
.not {
    background-color: #fffff8;
    padding-bottom: 1px;
}

.load6 {
    margin: 100px auto 0;
    width: 150px;
    top: 25%;
    left: 25%;
    width: 50%;
    text-align: center;
    position: fixed;
    z-index: 1002;
    overflow: auto;
}

.load6>div {
    width: 30px;
    height: 30px;
    background-color: #FF8A00;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.load6 .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}
.load6 .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}
@-webkit-keyframes bouncedelay{
    0%,80%,100%{-webkit-transform:scale(0.0)}
    40%{-webkit-transform:scale(1.0)}}
@keyframes bouncedelay{
    0%,80%,100%{transform:scale(0.0);-webkit-transform:scale(0.0)}
    40%{transform:scale(1.0);-webkit-transform:scale(1.0)}}

.black_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    z-index: 1001;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
}
#phoneErro {
    margin: 100px auto 0;
    top: 25%;
    left: 25%;
    width: 50%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    position: fixed;
    z-index: 1999;
    overflow: auto;
    color: white;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    font-size: 14px;
    display: none;
}
#phoneAjax {
    position: fixed;
    top: 20%;
    left: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-left: -30px;
    text-align: center;
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    z-index: 1998;
    overflow: auto;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}

/* -------- */
.mlr15{margin-left:15px;margin-right:15px}
.ptb15 {padding: 15px 0;}
.item{
				border-bottom: solid 1px #D4CFC8;
            }
.fs15 {
    font-size: 15px;
}   
.notice-type{
				color:#666666
            }
.unread{
				border:#D07100 1px solid;
				border-radius: 2px;
				font-size:12px;
				margin-top: 2px;
				color:#D07100
            }
 .mlr10{margin-left:10px;margin-right:10px}          
 .plr10 {padding: 0 10px;}
 .fs12 {
     font-size: 12px;
 }                  
 .icon {
				display: inline-block;
				width: 12px;
				height: 12px;
				background-repeat: no-repeat;
				background-size: 12px;
				
				margin:5px 2px 0px 0;
			}
.time-icon {
				background-image: url("../assets/images/icon_time_gray.png");
            }
            
.menu-link-arrow {
		 		background-position-y: 15px;
		 		padding-right: 10px;
		 		color: #3b3937;
		 		display: block;
		 		background: url("../assets/images/icon_arrow.png") no-repeat;
		 		background-size: 7px 12px;
		 		background-position: right center;
		 	}
.notice-content{
	  			text-overflow:ellipsis;
		  		overflow: hidden;
		  		white-space:nowrap;
		 	}            
</style>