<style scoped>
	.chooseRepair{font-family: PingFangSC-Regular;width: 100%;height:100%;
      	background-color:#e5e2dd;font-size: 14px;text-align: center}
	.lite-divider {border-bottom: 1px solid #d4cfc8;}
	.menu-link {
	    display: block;background-size: 8px 12px;margin:0px 15px;
	    background: url("../../assets/images/icon_arrow.png") no-repeat;
	    background-position:right center;line-height: 44px;
	    padding: 0px 4px;overflow: hidden;color: #3b3937;}
	a {text-decoration: none;display: inline-block;}
	.input-info{font-size:16px;}
	.top-title{height: 120px;color:#3b3937;border-bottom: 1px solid #d4cfc8;
	    margin: 15px auto;background: #F7F7F1;border-top: 1px solid #d4cfc8;}
	.icon-repair {height: 60px;width: 60px;margin: 15px;padding: 3%;float:left;
	    border: 1px solid #31a8e6;border-radius: 3px; background: #fff;}
	.project_name{height: 120px;line-height: 120px;color:#31A8E6;
		font-size:16px;}

</style>
<template>
	<div>
		<div class="ov top-title pr15">
		    <img class="icon-repair" :src="typeImg" />
		    <div class="ov ptb15">
		        <span class="project_name">{{typeName}}</span>
		    </div>
		</div>
		<div class="" v-for="(item,index) in project">
			<div class="menu-link lite-divider" @click="go(item)">
				<span class="input-info">{{item.name}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				typeConfig:{
			    	1:["浴室维修",require('../../assets/images/icon_btn_yushiweixiu_03.png')],
			    	2:["厨房维修",require('../../assets/images/icon_btn_chufangweixiu_03.png')],
			    	3:["客厅卧室维修",require('../../assets/images/icon_btn_ketingweixiu_03.png')],
			    	4:["强弱电维修",require('../../assets/images/icon_btn_qiangruodianweixiu_03.png')],
			    	5:["门窗维修",require('../../assets/images/icon_btn_menchuanweixiu_03.png')],
			        6:["其它维修",require('../../assets/images/icon_btn_qitaweixiu_03.png')],
			        7:["家电",require('../../assets/images/icon_btn_jiadianweixiu_03.png')]
			    },
			    typeName:'',
			    typeImg:'',
			    project:''
			}
		},
		beforeCreate(){//刷新页面
			
		},
		created(){
			// this.init();
		},
		watch:{
			
		},
		mounted(){
			// console.log(this.$route.query.category);
	  		this.init();
		},
		methods:{
			init(){
				let _this = this;
				let type = this.$route.query.category;
				if(!type){
					type = 1;
				}
				_this.typeName = _this.typeConfig[type][0];
				_this.typeImg = _this.typeConfig[type][1];
				let url = 'repair/project/'+type;
				_this.receiveData.getData(_this,url,'res',function(){
					console.log(_this.res);
					_this.project = _this.res.result;
				})
			},
			go(ele){
				console.log(ele);
				this.$router.push({
					name:'zhifu',
					query:{
						projectId:ele.id
					}
				})
			}

		}
	}
	
</script>