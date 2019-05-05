<template>
	<div class="first-page">
		<div class="header">
			<div class="showpop">
				<img class="avatar" src="../../assets/images/md.png" @click="showPop">
			</div>
			<div :class="['navbar',active?'active':null]" @click="changeTab('doing')">
				<img src="../../assets/images/doing.png"/>
			</div>
			<div :class="['navbar',!active?'active':null]" @click="changeTab('finished')">
				<img src="../../assets/images/finished.png"/>
			</div>
		</div>
		<div class="content">
			<ul v-if="active">
				<li v-for="(item,index) in doingList" :key="index" :class="liBackgroundClass(item.taskType)">
					<p class="name">
                        <img v-if="item.isRemind" src="../../assets/images/green.png">
						<img v-else src="../../assets/images/red.png">					
						<span>{{item.name}}</span>
						<span :class="timeTipClass(item.taskTime).class">{{timeTipClass(item.taskTime).text}}</span>
						<img class="fr" src="../../assets/images/delete.png" @click="deleteTask(item._id)">
						<img class="fr" src="../../assets/images/edit.png" @click="editTask(item._id)">
					</p>
					<p class="time">
						{{formatDate(item.taskTime)}}
						<span class="handleFinish" @click="handleFinish(item)">点击完成</span>
					</p>
					<p class="taskDes">{{item.taskDes}}</p>
				</li>
			</ul>
			<ul v-else>
				<li v-for="(item,index) in finishList" :key="index">
					<p class="name">
                        <img v-if="item.isRemind" src="../../assets/images/green.png">
						<img v-else src="../../assets/images/red.png">					
						<span>{{item.name}}</span>
						<img class="fr" src="../../assets/images/delete.png" @click="deleteTask(item._id)">
						<img class="fr" src="../../assets/images/edit.png" @click="editTask(item._id)">
					</p>
					<p class="time">
						{{formatDate(item.taskTime)}}
					</p>
					<p class="taskDes">{{item.taskDes}}</p>
				</li>
			</ul>
		</div>
		<div class="add" @click="toAdd">
			<img src="../../assets/images/plus.png">
		</div>
		<mt-popup
			v-model="popupVisible"
			position="left">
			<div class="popbox">
				<img class="innerAvatar" src="../../assets/images/md.png" @click="showPop">
				<p class="nickname">{{userInfo.nickName  || "未设置"}}</p>
				<p class="signature">{{userInfo.introduce || ""}}</p>
				<ul>
					<li v-for="(item,index) in leftList"
						:key="index"
						@click="toOther(item.toRoute)">
						<img :src="item.src">
						<span>{{item.text}}</span>
					</li>
				</ul>
				<div class="weather">
					<p>{{weather.citynm}} <img :src="weather.weather_icon"></p>
					<p>{{weather.temperature}}</p>
				</div>
			</div>
		</mt-popup>
	</div>
</template>
<script type="text/javascript">
import util from "../../global-ui/util.js"
	export default{
		data(){
			return {
				popupVisible: false,
				active: true,
				leftList: [{
					text: "我的信息",
					src: require("../../assets/images/hs.png"),
					toRoute: "my"
				},{
					text: "任务统计",
					src: require("../../assets/images/qybs.png"),
					toRoute: "taskCount"
				},{
					text: "软件介绍",
					src: require("../../assets/images/lj.png"),
					toRoute: "introduce"
				},{
					text: "关于我们",
					src: require("../../assets/images/dr.png"),
					toRoute: "aboutUs"
				},{
					text: "退出登录",
					src: require("../../assets/images/xj.png"),
					toRoute: "login"
				}],
				list: [],
				userInfo: {},
				searchTimer: null,
				weather: {}
			}
		},
		computed: {
			doingList() {
				return this.list.filter(item => {
					return !item.isFinished
				})
			},
			finishList() {
				return this.list.filter(item => {
					return item.isFinished
				})
			}
		},
		methods:{
			liBackgroundClass(type) {
				if(type == '学习任务') return 'study';
				else if(type == '活动时间') return 'activity';
				else if(type == '读书计划') return 'readbook';
				else if(type == '运动计划') return 'running';
				return 'diwork'
			},
			timeTipClass(time) {
				let now = (new Date()).valueOf();
				if(new Date(time).valueOf() > now){
					return {
						class: "noStart",
						text: "未开始"
					}
				}else {
					return {
						class: "overdue",
						text: "已过期"
					}
				}
			},
			getUserInfo() {
				let id = localStorage.getItem("memberId")
				this.$ajax.get(`/userInfo?id=${id}`,{}).then(res=>{
					if(res.status){
						this.userInfo = res.data;
					};
                }).catch(err=>{
                    this.$tip.say("获取个人信息失败");
                })
			},
			getTaskList() {
				let id = localStorage.getItem("memberId")
				this.$ajax.get(`/task?userId=${id}`
				).then(res=>{
					if(res.status) this.list = res.data;
                }).catch(err=>{
                    this.$tip.say("获取任务信息失败");
                })
			},
			getWeather() {
				this.$ajax.get(`/other/weather`
				).then(res=>{
					if(res.status){
						this.weather = res.data;
					};
                }).catch(err=>{
                    this.$tip.say("获取任务信息失败");
                })
			},
			changeTab(type){
				if(type == 'doing') return this.active = true;
				return this.active = false;
			},
			editTask(id) {
				this.$router.push({
					path: './add',
					query: {
						id: id
					}
				})
			},
			deleteTask(id) {
				console.log("ssss")
				this.$ajax.delete(`/task?id=${id}`
				).then(res => {
					if(res.status) this.$tip.say("删除成功");
					this.getTaskList();
				})
			},
			handleFinish(item) {
				item.isFinished = true;
				this.$ajax.put(`/task/edit?id=${item._id}`,item).then(res=>{
                    if(res.status){
                        this.$tip.say("修改成功");
                    }
                }).catch(err=>{
                    this.$tip.say("创建失败");
                })
			},
			taskTip(){
				this.searchTimer = setInterval(() => {
					this.doingList.forEach(item => {
						let nowDate = Math.round(new Date().valueOf()/1000);
						let itemDate = Math.round(new Date(item.taskTime).valueOf()/1000)
						if(nowDate == itemDate && item.isRemind){
							confirm("点击开始任务")
						}
					});
				},1000)
			},
			showPop() {
				this.popupVisible=true;
			},
			toAdd() {
				this.$router.push({
					path: './add'
				})
			},
			toOther(val) {
				this.$router.push({
					path: `./${val}`
				})
			},
			formatDate(date){
				return util.formatDate(new Date(date),"YYYY-MM-DD HH:mm");
			}
		},
		created() {
			this.getUserInfo();
			this.getTaskList();
			this.getWeather();
			this.taskTip();
		}
	}
</script>
<style lang="less" scoped>
	.first-page{
		width: 100%;
		height: 100%;
		background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552968645178&di=21ad955ecf2ec572da9518d3bef67ba2&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180611%2Fad05746dd5c6449eb9ac560ffa00436c.jpeg);
		background-size: cover; 
		position: relative;
		.header{
			position: absolute;
			right: 0;left: 0;
			top: 10px;
			height: 70px;
			font-size: 0;
			display: flex;
			.showpop{
				display: inline-block;
				width: 20%;
				.avatar{
					width: 100%;
				}
			}
			.navbar{
				display: inline-block;
				width: 40%;
				height: 60px;
				padding: 0 10px;
				text-align: center;
				img{
					width: 80%;
					transform: translateY(50%);
				}
			}
			.active{
				border-bottom: 3px #ff535380 solid;
			}
		}
		.content{
			position: absolute;
			right: 0;left: 0;
			top: 80px;bottom: 80px;
			overflow: scroll;
			ul{
				.study{
					background-color: rgba(247, 148, 148, 0.4);
				}
				.activity{
					background-color: rgba(248, 169, 119, 0.4);
				}
				.readbook{
					background-color: rgba(214, 148, 247, 0.4);
				}
				.running{
					background-color: rgba(138, 239, 58, 0.4);
				}
				.diwork{
					background-color: rgba(63, 158, 252, 0.4);
				}
				li{
					width: 85%;
					margin: 10px auto 0 auto;
					padding: 10px 10px;
					color: #7d7d7d;
					border-radius: 10px;
					background-color: rgba(223, 223, 223, 0.5);
					font-size: 3rem;
					.name{
						color: #555555;
						font-size: 0;
						line-height: 28px;
						span{
							font-size: 16px;
							vertical-align: bottom;
						}
						.noStart{
							font-size: 3rem;
							color: #fff;
							background-color: #FFAB00;
							margin-left: 8px;
							border-radius: 2px;
							padding: 4px 6px;
						}
						.overdue{
							font-size: 12px;
							color: #fff;
							background-color: #888;
							margin-left: 8px;
							border-radius: 2px;
							padding: 4px 6px;
						}
						img{
							height: 30px;
							vertical-align: top;
						}
						.fr{
							float: right;
							width: 20px;
							height: 20px;
							margin-left: 10px;
							margin-top: 5px;
						}
					}
					.time{
						line-height: 30px;
						.handleFinish{
							float: right;
							height: 30px;
							line-height: 30px;
							background-color: #bfbfbf;
							color: #fff;
							border-radius: 5px;
							font-size: 12px;
							padding: 0 5px;
						}
					}
				}
			}
		}
		.add{
			position: absolute;
			bottom: 10px;
			left: 50%;
			width: 70px;
			height: 70px;
			transform: translateX(-50%);
			img{
				width:100%;
			}
		}
		.mint-popup{
			width: 50%;
			height: 100%;
			background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552899256258&di=9db085c740f1541ca2633baed44be6db&imgtype=0&src=http%3A%2F%2Fp1.qhimgs4.com%2Ft011c5a2c99743f5301.jpg);
			background-position: center;
			background-origin: content-box;
			background-size: cover;
		}
		.popbox{
			height: 100%;
			width:100%;
			position: relative;
			.innerAvatar{
				margin: 20px auto 0 auto;
				display: block;
				width: 80px;
			}
			.nickname{
				font-size: 3.6rem;
				text-align: center;
				color: #fff;
			}
			.signature{
				font-size: 1.2rem;
				text-align: center;
				color: #fff;
				margin-top: 10px;
			}
			ul{
				margin-top: 20px;
				li{
					color: #fff;
					line-height: 45px;
					font-size: 15px;
					font-weight: lighter;
					padding-left: 10px;
					img{
						width: 40px;
						vertical-align: middle;
					}
				}
			}
			.weather{
				position: absolute;
				bottom: 5%; right: 10px;
				height: 10%;
				width: 100%;
				text-align: right;
				p{
					margin-top: 15px;
					color: #fff;
					font-size: 3rem;
					img{
						vertical-align: sub;
					}
				}
			}
		}
	}
</style>
<style lang="less">
	.v-modal{
		background-color: #fff !important;
	}
</style>
