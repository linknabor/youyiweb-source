<template>
   <div class="main">
	   <div id="phoneAjax" v-show="showp"> 
			<img src="../../assets/images/loading.gif" style="width:40px;height:40px;vertical-align: middle;">
		</div>
        <mt-navbar id="navBar"  v-model="selected">
	    	<mt-tab-item id="a">账单缴费</mt-tab-item>
	    	<mt-tab-item id="b">物业缴费</mt-tab-item>
			<mt-tab-item id="c">停车缴费</mt-tab-item>
	    	
	    </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="a">
                <!-- 账单缴费开始-->
                <div class="lite-divider">
                    <input placeholder="输入账单号可快速缴费" class="hidden-input" style="text-align:left;" v-model="stmtId">
                    <div class="scan-icon" @click="show"></div>
                </div>
                <mt-button class="subBtn" size="large" @click.native="submit" >提交</mt-button>
            <mt-loadmore 
			  	:bottomMethod="quickloadBottom" 
			  	:auto-fill = "false"
			  	:bottomAllLoaded = "quickisLastPage"
			  	ref="loadmore1"
				@bottom-status-change="handleBottomChange"
			  	>
			  		<Bill :bill-info="quickBillInfo"  @itemClick="itemClick"></Bill>

				<div slot="bottom" class="mint-loadmore-bottom">
					<!-- :class="{ 'is-rotate ': bottomStatus === 'drop' }" -->
					<span v-show="bottomStatus !== 'loading'" >上拉刷新</span>
					<span v-show="bottomStatus === 'loading'">
						<mt-spinner type="snake"></mt-spinner>
					</span>
				</div>	 

			</mt-loadmore>
            <div style="width:100%;height:1.2rem;"></div>
            <div class="btn-fixed" v-show="zhangdan">
	    		<div class="fl select-btn" v-show="quan1" :class="{allSelected:quickAllselect}"   @click="allSelect(quickBillInfo,'quickAllselect')">全选&nbsp;</div>
	    		<div class="pay"   @click="pay('quickBillInfo','quickAllPrice','quickAllselect')">
	    			我要缴费
	    			<span>
	    				￥{{quickAllPrice}}
	    			</span>
	    		</div>
    		</div> 
                <!-- 账单缴费结束 -->
            </mt-tab-container-item>
            
             <!-- 物业缴费 -->
            <mt-tab-container-item id="b">
              <mt-loadmore 
			  	:bottomMethod="loadBottom" 
			  	:auto-fill = "false"
			  	:bottomAllLoaded = "bisLastPage"
			  	ref = "loadmore2"
				  @bottom-status-change="handleBottomChange"
			  	>
			  		<Bill :bill-info="billInfo" @itemClick="itemClick"></Bill>

				<div slot="bottom" class="mint-loadmore-bottom">
					<!-- :class="{ 'is-rotate ': bottomStatus === 'drop' }" -->
					<span v-show="bottomStatus !== 'loading'" >上拉刷新</span>
					<span v-show="bottomStatus === 'loading'">
						<mt-spinner type="snake"></mt-spinner>
					</span>
				</div>	 

			 	</mt-loadmore>
			 	<div style="width:100%;height:1.2rem;"></div>
		    	<div class="btn-fixed">
		    		<div class="fl select-btn" v-show="quan2" :class="{allSelected:bAllSelect }" @click="allSelect(billInfo,'bAllSelect')">全选&nbsp;</div>
		    		<div class="pay" @click="pay('billInfo','allPrice','bAllSelect')">
		    			我要缴费
		    			<span>
		    				￥{{allPrice}}
		    			</span>
		    		</div>
        		</div>
            </mt-tab-container-item>
			
			<mt-tab-container-item id="c">
				<!-- 停车缴费开始 -->
				  <mt-loadmore 
				  	:bottomMethod="carLoadBottom" 
				  	:auto-fill = "false"
				  	:bottomAllLoaded = "carisLastPage"
					  ref="loadmore"
				  >
				  	<div style="line-height: 20px;padding-top: 7px;" v-show="hint!=''">		
				  		<span class="fs15 highlight" >{{hint}}</span>
					</div>
				  	<Bill :bill-info="carBillInfo" @itemClick="itemClick"></Bill>
				  </mt-loadmore>
				  <div style="widtt:100%;height:1.2rem;"></div>
				  	<div class="btn-fixed">
			    		<div class="fl select-btn" v-show="quan" :class="{allSelected:carAllselect }" @click="allSelect(carBillInfo,'carAllselect')">全选&nbsp;</div>
			    		<div class="pay" @click="pay('carBillInfo','carAllPrice','carAllselect')">
			    			我要缴费
			    			<span>
			    				￥{{carAllPrice}}
			    			</span>
			    		</div>
	        		</div>
				<!-- 停车缴费结束 -->
			</mt-tab-container-item>
        </mt-tab-container>
   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
import Bill from '../../components/bill.vue' 
import { Loadmore} from 'mint-ui';
import { Spinner } from 'mint-ui';
export default {
   data () {
       return {
           stmtId:'',//快捷缴费 扫描出来的账单号
           selected:this.$route.query.id, //选项卡 默认选中
		   quickisLastPage:false,//快捷缴费是否为最后一页
		   queryisLastPage:false,
           bisLastPage:false,//物业是否为最后一页
           url : '/billList',
	  	   params : {
	  			startDate:'',
	  			endDate:'',
	  			payStatus: '02', //写死
	  			currentPage : 1, //页码
	  			totalCount : 0, //第几条开始
            },
            carisLastPage:false,//停车缴费是否最后一页
			carAllselect:false,//停车缴费全选
			carBillInfo:[],//停车缴费数据
			carBillPage :1, //停车缴费页码
			quan:false,
           quickBillpage:1,  
		   billPage :1, // 物业缴费页码 
		   queryBillPage:1,//查询页码
           quickBillInfo:[],//快捷查询数据
		   billInfo:[],//物业缴费
		   queryBillInfo : [],//查询缴费数据
           reduceMode :1,//减免金额的方式
           pay_least_month:0,//月份
           quickAllselect:false,//快速缴费全选
		   bAllSelect:false,//物业缴费全选
		   queryAllselect:false,//查询全选
		   quan1:false,
		   quan2:false,
		   quan3:false,
		   permit_skip_pay:'1',
		   showp:false,
		   zhangdan:false,
		   bottomStatus:'',
		   hint:'',
		   cartotalCountNormal:0,
       };
   },
    created(){
	  	vm = this;
	  },
   mounted() {
	     //微信配置
		this.common.checkRegisterStatus();
	  	let url = location.href.split('#')[0]
		vm.receiveData.wxconfig(vm,wx,['scanQRCode'],url);
		
       	//请求物业缴费首屏数据
	  	vm.receiveData.getData(vm, vm.url, 'data',function(){
	  		if(vm.data.result!=null){
	  			vm.billInfo = vm.data.result.bill_info;//物业缴费
		  		vm.carBillInfo = vm.data.result.car_bill_info;//停车缴费
				vm.pay_least_month = vm.data.result.pay_least_month;
				vm.reduceMode = vm.data.result.reduce_mode;//减免方式
				vm.permit_skip_pay=vm.data.result.permit_skip_pay;//判断跳跃付款 
				vm.cartotalCountNormal = vm.data.result.car_bill_info;
				if (vm.cartotalCountNormal==0) {
					vm.hint = "缴纳停车费需要先绑定房屋哦。  请在  “社区物业-->我是业主” 中进行绑定。"
				}
	  		}else{
	  			vm.hint = "缴纳停车费需要先绑定房屋哦。  请在  “社区物业-->我是业主” 中进行绑定。";
	  			vm.billInfo=[];
	  		}
          },vm.params);
          //查询缴费 小区数据
	  	// vm.receiveData.getData(vm,'/getSect','sectList',function(){
			 //  vm.sectList = vm.sectList.result;
			 //  vm.sectList.unshift({id:'0',name:'请选择'})
			 
	  	// });
   },
   components: {
       Bill
   },
   methods: {
	    handleBottomChange(status) {
			  vm.bottomStatus= status
		  },
       	//调用微信扫一扫接口, 成功 数据返回到stmtId,显示在input上
	  	show(){
	  		console.log('打开扫一扫');
	  	 	vm.receiveData.scan(vm,wx,'stmtId');
          },
          //快捷查询提交
          submit() {
            if(vm.stmtId == "" || vm.stmtId.length != 18){
	  			alert('请输入正确账单号');
	  			return ;
	  		}
			// vm.showp=true;
	  		vm.quickBillpage = 1;
	  		let url = "quickPayBillList/"+vm.stmtId+"/"+vm.quickBillpage+"/"+vm.params.totalCount;
	  		vm.receiveData.getData(
	  			vm,
	  			url,
	  			'quickData',
	  			function(){
	  				if( vm.quickData.result && vm.quickData.result.bill_info.length>0){
						vm.zhangdan=true;
						vm.quickBillInfo = vm.quickData.result.bill_info;
						vm.reduceMode = vm.quickData.result.reduce_mode;
						vm.pay_least_month = vm.quickData.result.pay_least_month;
						vm.permit_skip_pay=vm.quickData.result.permit_skip_pay;//判断跳跃付款
						
	  				}else{
	  					alert('未查询到数据')
					  }
					// vm.showp=false;
	  			}
	  		)
          },
        ///点击某个选中按钮 params1:被点击按钮的下标 params2:被点击按钮所属的数组
        itemClick(index,b) {
            let len = b.length;
	  		if (b[index].pay_status!="02") {
	  			return;
              }
              
            //permit_skip_pay  0允许  1不允许
			if(vm.permit_skip_pay == '1') {
				if(b[index].selected){//选中状态下
					for(let i=index;i< len;i++){
						//后面的全部取消选中
						vm.$set(b[i],'selected',false);	
					}
					//某一个点击了取消后全选消失
					vm.bAllSelect = false;
					vm.queryAllselect=false;
					vm.quickAllselect=false;
					//    console.log(vm.bAllSelect)
				}else{//未选中状态下，前面全部选中
					for(let j=index;j >= 0;j--){//
						vm.$set(b[j],'selected',true);	
						
					}
				}
			}else if(vm.permit_skip_pay == '0'){
				if(b[index].selected){//选中状态下
					vm.$set(b[index],'selected',false);	
					//某一个点击了取消后全选消失
					vm.bAllSelect = false;
					vm.queryAllselect=false;
					vm.quickAllselect=false;
					//    console.log(vm.bAllSelect)
				}else{//未选中状态下，前面全部选中
						vm.$set(b[index],'selected',true);	
					}
			}
          },
        //快捷缴费上拉加载数据
        quickloadBottom(){
			setTimeout(()=>{ 
            //临时接收的数组
	  		let tempArr = null;
	  		//页码加1
	  		vm.quickBillpage +=1;
  			let url = "quickPayBillList/"+vm.stmtId+"/"+vm.quickBillpage+"/"+vm.params.totalCount;
	  		//请求接口数据
	  		vm.receiveData.getData(
	  			vm,
	  			url,
	  			'pageData3',
	  			function(){
	  				tempArr = vm.pageData3.result.bill_info;
	  				if( tempArr && tempArr.length > 0){
	  					vm.quickBillInfo =vm.quickBillInfo.concat(tempArr) //快捷缴费
	  					vm.quickAllselect = false;
	  				}else{
						  vm.quickisLastPage = true;
						  vm.quan1=true;
	  				}
	  			})
			  this.$refs.loadmore1.onBottomLoaded();  	
			 },1500)   
        },
        //物业下拉加载
        loadBottom() {
			setTimeout(()=>{ 
            		//临时接收的数组
  			let tempArr = null;
	  		//页码自增 
	  		vm.billPage += 1;
			vm.params.currentPage = vm.billPage;
			//请求接口数据
			vm.receiveData.getData(
				vm,
				vm.url,
				'pageData',
				function(){
	  				tempArr = vm.pageData.result.bill_info;//物业缴费
	  				if(tempArr && tempArr.length > 0){
	  					
	  					vm.billInfo =vm.billInfo.concat(tempArr) //物业缴费
	  					vm.bAllSelect = false;
	  				}else{
						  vm.bisLastPage = true;
							vm.quan2=true;
	  				}
	  			},
	  			vm.params
	  		)
			  this.$refs.loadmore2.onBottomLoaded(); 	
			},1500)    
		},
		carLoadBottom(){//停车缴费，上拉加载数据
		  		//临时接收的数组
		  		let tempArr = null;
		  		//页码自增 
		  		vm.carBillPage+=1
				vm.params.currentPage = vm.carBillPage;
				//请求接口数据
				vm.receiveData.getData(
					vm,
					vm.url,
					'pageData2',
					function(){
		  				tempArr = vm.pageData2.result.car_bill_info;//停车缴费
		  				if(tempArr && tempArr.length > 0){
		  					vm.carBillInfo =vm.carBillInfo.concat(tempArr) //停车缴费
		  					vm.carAllselect = false;
		  				}else{
							  vm.carisLastPage = true;
							  vm.quan=true;
		  				}
		  			},vm.params)
		  		 vm.$refs.loadmore.onBottomLoaded()
		  			
		  	},
		//查询缴费
		queryLoadBottom() {
			setTimeout(()=>{ 	
			let tempArr = null;
	  		//页码加1
	  		vm.queryBillPage += 1;
	  		vm.params.currentPage = vm.queryBillPage;
	  		let url = 'billList';
	  		vm.receiveData.getData(vm,url,'pageData4',function(){
	  			tempArr = vm.pageData4.result.bill_info;
	  			if( tempArr && tempArr.length > 0){
  					vm.queryBillInfo =vm.queryBillInfo.concat(tempArr) //快捷缴费
  					vm.queryAllselect = false;
	  			}else{
					  vm.queryisLastPage = true;
					  vm.quan3=true;
	  			}
			},vm.params)
			this.$refs.loadmore3.onBottomLoaded();
		},1500)	
		},
        //点击全选
        allSelect(arr,a) {
            	if(vm[a] ){//取消全选
	  			for(let i in arr){
	  				vm.$set(arr[i],'selected',false);
	  			}
	  		}else{//全部选中
	  			for(let i in arr){
			  		if(vm.$set(arr[i],'selected',true)){
  						vm.$set(arr[i],'selected',true);
  					}
	  			}
	  		}
	  		//取反
	  		vm[a] = !vm[a];
        },
        //点击账单缴费按钮
        //第一个参数 账单数组，第二个参数 总价 第三个参数 是否全选,所有参数 string
       pay(list,allPrice,allselect){//第一个参数 账单数组，第二个参数 总价 第三个参数 是否全选,所有参数 string
	  		if( vm[allPrice] < 0.01){
	  			alert('请选择账单后支付');
	  			return
			  }
	  		let selectedArr = [];//所有数据 
	  		var sel_bill_arr = new Array(); //日期
	  		if(vm[allselect] == true){
	  			//全部选中
	  			for(let i in vm[list]){
	  				var ret = jQuery.inArray(vm[list][i].service_fee_cycle,sel_bill_arr);
		  			if(-1 == ret){
		  				sel_bill_arr.push(vm[list][i].service_fee_cycle);
		  			}	
  					selectedArr.push(vm[list][i])
	  			}

	  		}else{
	  			//只选中一部分
	  			for( let i in vm[list]){
	  				if(vm[list][i].selected){
	  				var ret = jQuery.inArray(vm[list][i].service_fee_cycle,sel_bill_arr);
			  			if(-1 == ret){
			  				sel_bill_arr.push(vm[list][i].service_fee_cycle);
			  			}	
	  					selectedArr.push(vm[list][i])
	  				}
	  			}
	  		}
	  		let bills="";//id
	  		let pay_addr = selectedArr[0].pay_addr;
	  		//let pay_addr = sel_bill_arr[0].pay_addr;
	  		for(let i in selectedArr){
	  			if(selectedArr.length - 1 == i){
	  				bills+=selectedArr[i].bill_id;
	  			}else{
	  				bills+=selectedArr[i].bill_id+',';	
	  			}	  			
	  		}
	  		if(vm.pay_least_month>0){
				if(vm.pay_least_month>sel_bill_arr.length){
					alert("请至少选择"+vm.pay_least_month+"个月的账单进行支付。");
					return false;
				}
			}
	  		//----------过佳家
	  		let url = vm.config.wuye_pay.url1+'#/?billIds='+bills+"&stmtId="+vm.stmtId+"&payAddr="+escape(pay_addr)+"&totalPrice="+vm[allPrice]+"&reduceMode="+vm.reduceMode;
            window.location.href = url;
	  		
	  	},
		
       
   },
   computed: {
       //快捷缴费总价
       quickAllPrice() {
           let ap = 0;
	  		for(let i in this.quickBillInfo){
	  			if(this.quickBillInfo[i].selected == true && this.quickBillInfo[i].pay_status=="02"){
	  				ap+=Number(this.quickBillInfo[i].fee_price)
	  			}
	  		}
	  		return parseFloat(ap).toFixed(2)
       },
       //物业总价
       allPrice() {
	  		let ap = 0;
	  		for(let i in this.billInfo){
	  			if(this.billInfo[i].selected == true ){
	  				ap+=Number(this.billInfo[i].fee_price)
	  			}
	  		}
	  		return parseFloat(ap).toFixed(2)
		  },
	   queryAllPrice() {
		   let ap = 0;
	  		for(let i in this.queryBillInfo){
	  			if(this.queryBillInfo[i].selected == true){
	  				ap+=Number(this.queryBillInfo[i].fee_price)
	  			}
	  		}
	  		return parseFloat(ap).toFixed(2)
		},
		//停车缴费总价
	  	carAllPrice : function(){
	  		let ap = 0;
	  		for(let i in this.carBillInfo){
	  			if(this.carBillInfo[i].selected == true){
	  				ap+=Number(this.carBillInfo[i].fee_price)
	  			}
	  		}
	  		return parseFloat(ap).toFixed(2)
	    },
   },
}
</script>
<style>
	.mint-tab-item-label{
		font-size: 0.3rem;
	}
</style>
<style  scoped>
.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}
 
.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}
.main{
 		margin:0 0.3rem;
 	}
.mint-navbar .mint-tab-item{
	 	border-bottom: 1px solid #cdcdcb;
	 }
.mint-navbar .mint-tab-item.is-selected{
	 	border-bottom: 1px solid #ff8a00;
	 	margin-bottom: 0;
	 	color:#ff8a00;
	 }
.lite-divider{
		border-bottom: 1px solid #d4cfc8;
		/* padding-left: 0.15rem; */
		overflow: hidden;
		padding: 1px;
		margin-top:35px;
	}
.hidden-input{
		height: 0.4rem;
		margin-top: 0.4rem;
		width: 4rem;
		background: black;
		border: none;
		outline: none;
		background-color: transparent;
		font-size: 0.28rem;
		padding: 0 0.15rem 0.15rem;
	}
.scan-icon{
		float: right;
		display: inline-block;
		height: 0.4rem;
		width: 0.4rem;
		background: url('../../assets/images/icon_scan.png') ;
		background-size: cover;
		margin-top: 10px;
	} 
.subBtn{
		height: 0.88rem;
		line-height: 0.88rem;
		background-color: #ff8a00;
		font-size: 0.3rem;
		color: white;
		width: 6rem;
		margin: 0.6rem auto 0;
	}    
	.btn-fixed{
		position: fixed;
		color: #fff;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.92rem;
        line-height: 0.92rem;
        text-align: center;
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
		background-color: #ccc;
		-moz-opacity: .8;
		opacity: .80;
		filter: alpha(opacity=80);
		z-index: 1998;
		overflow: auto;
		-moz-border-radius: 15px;
		-webkit-border-radius: 15px
	}	
.select-btn{
		padding-left: 36px;
        background: url('../../assets/images/icon_unselect_white.png') no-repeat;
        background-color: rgba(0,0,0,0.6);
        background-size: 16px;
        background-position: 15px center;
        height: 0.92rem;
        line-height: 0.92rem;
	} 
.allSelected{
		background: url('../../assets/images/icon_selected_white.png') no-repeat;
		background-color: rgba(0,0,0,0.6);
        background-size: 16px;
        background-position: 15px center;
	}    
.pay{
		overflow: hidden;
		background: #ff8a00;
		text-align: center;	
	}  
a{color:black}
	/*查询缴费*/
	
.query-data{
		/*height: 100%;*/
		padding: 0.25rem 1.2rem;
		/*margin-bottom: 0.2rem;*/
	} 
.virtual-input{
		width:3.4rem;
		border:1px solid #4c4c4c;
		border-radius: 5px;
		padding-left: 0.2rem;
		display: inline-block;
		height: 0.5rem;
		background: white;
	}
.input-row{
		padding-bottom: 0.3rem;
		font: 0.26rem/0.5rem "";
		color: #a6937c;
		height: 0.5rem;
	} 
.fs15{font-size: 15px;}
.highlight{color:#ff8a00}               
</style>