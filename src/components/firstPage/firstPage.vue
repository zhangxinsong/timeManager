<template>
	<div class="first-page">
		<div class="header">
			<img class="avatar" src="../../assets/images/md.png" @click="showPop">
			<div :class="['navbar', 'doing', active?'active':null]" @click="doing"></div>
			<div :class="['navbar', 'finished', !active?'active':null]" @click="finished"></div>
		</div>
		<div class="content">
			<ul>
				<li v-for="(item,index) in list" :key="index">
					<p class="name">
                        <img v-if="item.isRemind" src="../../assets/images/green.png">
						<img v-else src="../../assets/images/red.png">					
						<span>{{item.name}}</span>
						<img class="fr" src="../../assets/images/delete.png">
						<img class="fr" src="../../assets/images/edit.png">
					</p>
					<p class="time">{{formatDate(item.time)}}</p>
					<p>{{item.describe}}</p>
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
				<p class="nickname">dasdasda</p>
				<p class="signature">我们都在爱情中，才发现世间有太多舍不得！</p>
				<ul>
					<li @click="toMy">
						<img src="../../assets/images/hs.png">
						<span>我的信息</span>
					</li>
					<li @click="toIntroduce">
						<img src="../../assets/images/lj.png">
						<span>软件介绍</span>
					</li>
					<li @click="toAboutUs">
						<img src="../../assets/images/dr.png">
						<span>关于我们</span>
					</li>
					<li @click="logout">
						<img src="../../assets/images/xj.png">
						<span>退出登录</span>
					</li>
				</ul>
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
				list: [],
				doingList: [{
					name:'吃饭',
					time: new Date(),
					describe: '我还爱你，但是我不喜欢你了。你仍然美好的让我心动，可我已经没有勇气和力气去拥抱你了。我还是可以陪你一起去死，但此生不再为你。',
					taskType: '读书任务',
					isRemind: true,
					id: 'dsadasdsa'
				},{
					name:'睡觉',
					time: new Date(),
					describe: 'dasdadadada',
					taskType: '活动时间',
					isRemind: false
				},{
					name:'打豆豆',
					time: new Date(),
					describe: 'dasdadadada',
					taskType: '活动时间',
					isRemind: false
				},{
					name:'豆豆是谁',
					time: new Date(),
					describe: 'dasdadadada',
					taskType: '活动时间',
					isRemind: true
				},{
					name:'豆豆是二狗',
					time: new Date(),
					describe: 'dasdadadada',
					taskType: '活动时间',
					isRemind: true
				},{
					name:'二狗二狗',
					time: new Date(),
					describe: 'dasdadadada',
					taskType: '活动时间',
					isRemind: true
				},{
					name:'二狗一米五',
					time: new Date(),
					describe: 'dasdadadada',
					taskType: '活动时间',
					isRemind: true
				}],
				finishedList: [{
					name:'二狗二狗',
					time: new Date(),
					describe: 'dasdadadada',
					taskType: '活动时间',
					isRemind: true
				},{
					name:'二狗一米五',
					time: new Date(),
					describe: 'dasdadadada',
					taskType: '活动时间',
					isRemind: true
				}]
			}
		},
		methods:{
			// getIp() {
			// 	this.$ajax({
			// 		url: '/api?app=weather.today&weaid=1&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&jsoncallback=data',
			// 		method: 'get',
			// 		responseType: 'jsonp',
			// 	}).then(res => {
			// 	}).catch(err => {
			// 		console.log(err);
			// 	})
			// },
			// getWather() {
			// 	this.$ajax({
			// 		url: '/api?app=ip.local&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&jsoncallback=data',
			// 		method: 'get',
			// 		responseType: 'jsonp'
			// 	}).then(res => {
			// 		console.log(res);
			// 	}).catch(err => {
			// 		console.log(err);
			// 	})
			// },
			doing() {
				this.list = this.doingList;
				this.active = true;
			},
			finished() {
				this.list = this.finishedList;
				this.active = false;
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

			},
			showPop() {
				this.popupVisible=true;
			},
			toAdd() {
				this.$router.push({
					path: './add'
				})
			},
			toMy() {
				this.$router.push({
					path: './my'
				})
			},
			toIntroduce() {
				this.$router.push({
					path: './introduce'
				})
			},
			toAboutUs() {
				this.$router.push({
					path: './aboutUs'
				})
			},
			logout() {
				this.$router.push({
					path: './login'
				})
			},
			formatDate(date){
				return util.formatDate(new Date(date),"YYYY-MM-DD HH:mm");
			}
		},
		created() {
			this.list = this.doingList;
			// this.getIp();
			// this.getWather();
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
			height: 80px;;
			.avatar{
				width: 80px;
			}
			.navbar{
				display: inline-block;
				width: 30%;
				height: 60px;
				background-size: contain;
				background-repeat: no-repeat;
				vertical-align: super;
				margin: 0 20px;
			}
			.doing{
				background-image: url(../../assets/images/doing.png);
			}
			.finished{
				background-image: url(../../assets/images/finished.png);
			}
			.active{
				border-bottom: 5px #ff535380 solid;
			}
		}
		.content{
			position: absolute;
			right: 0;left: 0;
			top: 90px;bottom: 110px;
			overflow: scroll;
			ul{
				li{
					width: 80%;
					margin: 20px auto 0 auto;
					padding: 10px 20px;
					color: #7d7d7d;
					border-radius: 10px;
					background-color: rgba(243, 243, 243, 0.4);
					font-size: 3rem;
					.name{
						color: #555555;
						font-size: 3.6rem;
						line-height: 36px;
						img{
							height: 32px;
							vertical-align: top;
						}
						.fr{
							float: right;
							margin-left: 10px;
						}
					}
					.time{
						line-height: 30px;
					}
				}
			}
		}
		.add{
			position: absolute;
			bottom: 15px;
			left: 50%;
			width: 90px;
			height: 90px;
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
				margin: 40px auto 0 auto;
				display: block;
				width: 100px;
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
				margin-top: 40px;
				li{
					height: 40px;
					color: #fff;
					line-height: 40px;
					font-size: 3.6rem;
					font-weight: lighter;
					margin: 20px 0;
					padding-left: 10px;
					img{
						width: 40px;
						vertical-align: bottom;
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
